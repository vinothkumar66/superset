/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { createContext, lazy, FC, useEffect, useMemo, useRef } from 'react';
import { Global } from '@emotion/react';
import { useHistory } from 'react-router-dom';
import {
  CategoricalColorNamespace,
  getSharedLabelColor,
  SharedLabelColorSource,
  t,
  useTheme,
} from '@superset-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'src/components/MessageToasts/withToasts';
import Loading from 'src/components/Loading';
import {
  useReportViewer,
  useReportViewerCharts,
  useReportViewerDatasets,
} from 'src/hooks/apiResources';
import { hydrateReportViewer } from 'src/reportViewer/actions/hydrate';
import { setDatasources } from 'src/reportViewer/actions/datasources';
import injectCustomCss from 'src/reportViewer/util/injectCustomCss';

import { LocalStorageKeys, setItem } from 'src/utils/localStorageHelpers';
import { URL_PARAMS } from 'src/constants';
import { getUrlParam } from 'src/utils/urlUtils';
import { setDatasetsStatus } from 'src/reportViewer/actions/reportViewerState';
import {
  getFilterValue,
  getPermalinkValue,
} from 'src/reportViewer/components/nativeFilters/FilterBar/keyValue';
import ReportViewerContainer from 'src/reportViewer/containers/ReportViewer';

import shortid from 'shortid';
import { RootState } from '../types';
import {
  chartContextMenuStyles,
  filterCardPopoverStyle,
  focusStyle,
  headerStyles,
  chartHeaderStyles,
} from '../styles';
import SyncReportViewerState, {
  getReportViewerContextLocalStorage,
} from '../components/SyncReportViewerState';

export const ReportViewerPageIdContext = createContext('');

const ReportViewerBuilder = lazy(
  () =>
    import(
      /* webpackChunkName: "ReportViewerContainer" */
      /* webpackPreload: true */
      'src/reportViewer/components/ReportViewerBuilder/ReportViewerBuilder'
    ),
);

const originalDocumentTitle = document.title;

type PageProps = {
  idOrSlug: string;
};

export const ReportViewerPage: FC<PageProps> = ({ idOrSlug }: PageProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useHistory();
  const reportViewerPageId = useMemo(() => shortid.generate(), []);
  const hasReportViewerInfoInitiated = useSelector<RootState, Boolean>(
    ({ reportViewerInfo }) =>
      reportViewerInfo && Object.keys(reportViewerInfo).length > 0,
  );
  const { addDangerToast } = useToasts();
  const { result: reportViewer, error: reportViewerApiError } =
    useReportViewer(idOrSlug);
  const { result: charts, error: chartsApiError } =
    useReportViewerCharts(idOrSlug);
  const {
    result: datasets,
    error: datasetsApiError,
    status,
  } = useReportViewerDatasets(idOrSlug);
  const isReportViewerHydrated = useRef(false);

  const error = reportViewerApiError || chartsApiError;
  const readyToRender = Boolean(reportViewer && charts);
  const { reportViewer_title, css, metadata, id = 0 } = reportViewer || {};

  useEffect(() => {
    // mark tab id as redundant when user closes browser tab - a new id will be
    // generated next time user opens a reportViewer and the old one won't be reused
    const handleTabClose = () => {
      const reportViewersContexts : any = getReportViewerContextLocalStorage();
      setItem(LocalStorageKeys.ReportViewerExploreContext, {
        ...reportViewersContexts,
        [reportViewerPageId]: {
          ...reportViewersContexts[reportViewerPageId],
          isRedundant: true,
        },
      });
    };
    window.addEventListener('beforeunload', handleTabClose);
    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, [reportViewerPageId]);

  useEffect(() => {
    dispatch(setDatasetsStatus(status));
  }, [dispatch, status]);

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    async function getDataMaskApplied() {
      const permalinkKey = getUrlParam(URL_PARAMS.permalinkKey);
      const nativeFilterKeyValue = getUrlParam(URL_PARAMS.nativeFiltersKey);
      const isOldRison = getUrlParam(URL_PARAMS.nativeFilters);

      let dataMask = nativeFilterKeyValue || {};
      // activeTabs is initialized with undefined so that it doesn't override
      // the currently stored value when hydrating
      let activeTabs: string[] | undefined;
      if (permalinkKey) {
        const permalinkValue = await getPermalinkValue(permalinkKey);
        if (permalinkValue) {
          ({ dataMask, activeTabs } = permalinkValue.state);
        }
      } else if (nativeFilterKeyValue) {
        dataMask = await getFilterValue(id, nativeFilterKeyValue);
      }
      if (isOldRison) {
        dataMask = isOldRison;
      }

      if (readyToRender) {
        if (!isReportViewerHydrated.current) {
          isReportViewerHydrated.current = true;
        }
        dispatch(
          hydrateReportViewer({
            history,
            reportViewer,
            charts,
            activeTabs,
            dataMask,
          }),
        );
      }
      return null;
    }
    if (id) getDataMaskApplied();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyToRender]);

  useEffect(() => {
    if (reportViewer_title) {
      document.title = reportViewer_title;
    }
    return () => {
      document.title = originalDocumentTitle;
    };
  }, [reportViewer_title]);

  useEffect(() => {
    if (typeof css === 'string') {
      // returning will clean up custom css
      // when reportViewer unmounts or changes
      return injectCustomCss(css);
    }
    return () => {};
  }, [css]);

  useEffect(() => {
    const sharedLabelColor = getSharedLabelColor();
    sharedLabelColor.source = SharedLabelColorSource.ReportViewer;
    return () => {
      // clean up label color
      const categoricalNamespace = CategoricalColorNamespace.getNamespace(
        metadata?.color_namespace,
      );
      categoricalNamespace.resetColors();
      sharedLabelColor.clear();
    };
  }, [metadata?.color_namespace]);

  useEffect(() => {
    if (datasetsApiError) {
      addDangerToast(
        t('Error loading chart datasources. Filters may not work correctly.'),
      );
    } else {
      dispatch(setDatasources(datasets));
    }
  }, [addDangerToast, datasets, datasetsApiError, dispatch]);

  if (error) throw error; // caught in error boundary
  if (!readyToRender || !hasReportViewerInfoInitiated) return <Loading />;

  return (
    <>
      <Global
        styles={[
          filterCardPopoverStyle(theme),
          headerStyles(theme),
          chartContextMenuStyles(theme),
          focusStyle(theme),
          chartHeaderStyles(theme),
        ]}
      />
      <SyncReportViewerState reportViewerPageId={reportViewerPageId} />
      <ReportViewerPageIdContext.Provider value={reportViewerPageId}>
        <ReportViewerContainer>
          <ReportViewerBuilder />
        </ReportViewerContainer>
      </ReportViewerPageIdContext.Provider>
    </>
  );
};

export default ReportViewerPage;
