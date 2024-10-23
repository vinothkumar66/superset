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
import { FC, useEffect } from 'react';

import { pick } from 'lodash';
import { shallowEqual, useSelector } from 'react-redux';
import { ReportViewerContextForExplore } from 'src/types/ReportViewerContextForExplore';
import {
  getItem,
  LocalStorageKeys,
  setItem,
} from 'src/utils/localStorageHelpers';
import { RootState } from 'src/reportViewer/types';
import { getActiveFilters } from 'src/reportViewer/util/activeReportViewerFilters';

type Props = { reportViewerPageId: string };

const EMPTY_OBJECT = {};

export const getReportViewerContextLocalStorage = () => {
  const reportViewersContexts = getItem(
    LocalStorageKeys.ReportViewerExploreContext,
    {},
  );

  // Check if the returned value is an object before proceeding
  if (typeof reportViewersContexts === 'object' && reportViewersContexts !== null) {
    return Object.fromEntries(
      Object.entries(reportViewersContexts).filter(
        ([, value]) => !value.isRedundant,
      ),
    );
  }

  return {}; 
};


const updateReportViewerTabLocalStorage = (
  reportViewerPageId: string,
  reportViewerContext: ReportViewerContextForExplore,
) => {
  const reportViewersContexts = getReportViewerContextLocalStorage();
  setItem(LocalStorageKeys.ReportViewerExploreContext, {
    ...reportViewersContexts,
    [reportViewerPageId]: reportViewerContext,
  });
};

const SyncReportViewerState: FC<Props> = ({ reportViewerPageId }) => {
  const reportViewerContextForExplore = useSelector<
    RootState,
    ReportViewerContextForExplore
  >(
    ({ reportViewerInfo, reportViewerState, nativeFilters, dataMask }) => ({
      labelColors: reportViewerInfo.metadata?.label_colors || EMPTY_OBJECT,
      sharedLabelColors:
        reportViewerInfo.metadata?.shared_label_colors || EMPTY_OBJECT,
      colorScheme: reportViewerState?.colorScheme,
      chartConfiguration:
        reportViewerInfo.metadata?.chart_configuration || EMPTY_OBJECT,
      nativeFilters: Object.entries(nativeFilters.filters).reduce(
        (acc, [key, filterValue]) => ({
          ...acc,
          [key]: pick(filterValue, ['chartsInScope']),
        }),
        {},
      ),
      dataMask,
      reportViewerId: reportViewerInfo.id,
      filterBoxFilters: getActiveFilters(),
      reportViewerPageId,
    }),
    shallowEqual,
  );

  useEffect(() => {
    updateReportViewerTabLocalStorage(reportViewerPageId, reportViewerContextForExplore);
    return () => {
      // mark tab id as redundant when reportViewer unmounts - case when user opens
      // Explore in the same tab
      updateReportViewerTabLocalStorage(reportViewerPageId, {
        ...reportViewerContextForExplore,
        isRedundant: true,
      });
    };
  }, [reportViewerContextForExplore, reportViewerPageId]);

  return null;
};

export default SyncReportViewerState;
