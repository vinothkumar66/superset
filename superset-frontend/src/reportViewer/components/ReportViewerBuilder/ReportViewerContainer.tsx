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
// ParentSize uses resize observer so the reportViewer will update size
// when its container size changes, due to e.g., builder side panel opening
import { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Filter,
  Filters,
  getCategoricalSchemeRegistry,
  SupersetClient,
  useComponentDidUpdate,
} from '@superset-ui/core';
import { ParentSize } from '@visx/responsive';
import { pick } from 'lodash';
import Tabs from 'src/components/Tabs';
import ReportViewerGrid from 'src/reportViewer/containers/ReportViewerGrid';
import {
  ReportViewerInfo,
  ReportViewerLayout,
  LayoutItem,
  RootState,
} from 'src/reportViewer/types';
import {
  REPORTVIEWER_GRID_ID,
  REPORTVIEWER_ROOT_DEPTH,
} from 'src/reportViewer/util/constants';
import { getChartIdsInFilterScope } from 'src/reportViewer/util/getChartIdsInFilterScope';
import findTabIndexByComponentId from 'src/reportViewer/util/findTabIndexByComponentId';
import { setInScopeStatusOfFilters } from 'src/reportViewer/actions/nativeFilters';
import { reportViewerInfoChanged } from 'src/reportViewer/actions/reportViewerInfo';
import { setColorScheme } from 'src/reportViewer/actions/reportViewerState';
import jsonStringify from 'json-stringify-pretty-compact';
import { NATIVE_FILTER_DIVIDER_PREFIX } from '../nativeFilters/FiltersConfigModal/utils';
import { findTabsWithChartsInScope } from '../nativeFilters/utils';
import { getRootLevelTabsComponent } from './utils';

type ReportViewerContainerProps = {
  topLevelTabs?: LayoutItem;
};

const useNativeFilterScopes = () => {
  const nativeFilters = useSelector<RootState, Filters>(
    state => state.nativeFilters?.filters,
  );
  return useMemo(
    () =>
      nativeFilters
        ? Object.values(nativeFilters).map((filter: Filter) =>
            pick(filter, ['id', 'scope', 'type']),
          )
        : [],
    [JSON.stringify(nativeFilters)],
  );
};

const ReportViewerContainer: FC<ReportViewerContainerProps> = ({ topLevelTabs }) => {
  const nativeFilterScopes = useNativeFilterScopes();
  const dispatch = useDispatch();

  const reportViewerLayout = useSelector<RootState, ReportViewerLayout>(
    state => state.reportViewerLayout.present,
  );
  const reportViewerInfo = useSelector<RootState, ReportViewerInfo>(
    state => state.reportViewerInfo,
  );
  const directPathToChild = useSelector<RootState, string[]>(
    state => state.reportViewerState.directPathToChild,
  );
  const chartIds = useSelector<RootState, number[]>(state =>
    Object.values(state.charts).map(chart => chart.id),
  );

  const prevTabIndexRef = useRef();
  const tabIndex = useMemo(() => {
    const nextTabIndex = findTabIndexByComponentId({
      currentComponent: getRootLevelTabsComponent(reportViewerLayout),
      directPathToChild,
    });

    if (nextTabIndex === -1) {
      return prevTabIndexRef.current ?? 0;
    }
    prevTabIndexRef.current = nextTabIndex;
    return nextTabIndex;
  }, [reportViewerLayout, directPathToChild]);

  useEffect(() => {
    if (nativeFilterScopes.length === 0) {
      return;
    }
    const scopes = nativeFilterScopes.map(filterScope => {
      if (filterScope.id.startsWith(NATIVE_FILTER_DIVIDER_PREFIX)) {
        return {
          filterId: filterScope.id,
          tabsInScope: [],
          chartsInScope: [],
        };
      }
      const chartsInScope: number[] = getChartIdsInFilterScope(
        filterScope.scope,
        chartIds,
        reportViewerLayout,
      );
      const tabsInScope = findTabsWithChartsInScope(
        reportViewerLayout,
        chartsInScope,
      );
      return {
        filterId: filterScope.id,
        tabsInScope: Array.from(tabsInScope),
        chartsInScope,
      };
    });
    dispatch(setInScopeStatusOfFilters(scopes));
  }, [nativeFilterScopes, reportViewerLayout, dispatch]);

  const verifyUpdateColorScheme = useCallback(() => {
    const currentMetadata = reportViewerInfo.metadata;
    if (currentMetadata?.color_scheme) {
      const metadata = { ...currentMetadata };
      const colorScheme = metadata?.color_scheme;
      const colorSchemeDomain = metadata?.color_scheme_domain || [];
      const categoricalSchemes = getCategoricalSchemeRegistry();
      const registryColorScheme =
        categoricalSchemes.get(colorScheme, true) || undefined;
      const registryColorSchemeDomain = registryColorScheme?.colors || [];
      const defaultColorScheme = categoricalSchemes.defaultKey;
      const colorSchemeExists = !!registryColorScheme;

      const updateReportViewerData = () => {
        SupersetClient.put({
          endpoint: `/api/v1/reportViewer/${reportViewerInfo.id}`,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            json_metadata: jsonStringify(metadata),
          }),
        }).catch(e => console.log(e));
      };
      const updateColorScheme = (scheme: string) => {
        dispatch(setColorScheme(scheme));
      };
      const updateReportViewer = () => {
        dispatch(
          reportViewerInfoChanged({
            metadata,
          }),
        );
        updateReportViewerData();
      };
      // selected color scheme does not exist anymore
      // must fallback to the available default one
      if (!colorSchemeExists) {
        const updatedScheme =
          defaultColorScheme?.toString() || 'supersetColors';
        metadata.color_scheme = updatedScheme;
        metadata.color_scheme_domain =
          categoricalSchemes.get(defaultColorScheme)?.colors || [];

        // reset shared_label_colors
        // TODO: Requires regenerating the shared_label_colors after
        // fixing a bug which affects their generation on reportViewers with tabs
        metadata.shared_label_colors = {};

        updateColorScheme(updatedScheme);
        updateReportViewer();
      } else {
        // if this reportViewer does not have a color_scheme_domain saved
        // must create one and store it for the first time
        if (colorSchemeExists && !colorSchemeDomain.length) {
          metadata.color_scheme_domain = registryColorSchemeDomain;
          updateReportViewer();
        }
        // if the color_scheme_domain is not the same as the registry domain
        // must update the existing color_scheme_domain
        if (
          colorSchemeExists &&
          colorSchemeDomain.length &&
          registryColorSchemeDomain.toString() !== colorSchemeDomain.toString()
        ) {
          metadata.color_scheme_domain = registryColorSchemeDomain;

          // reset shared_label_colors
          // TODO: Requires regenerating the shared_label_colors after
          // fixing a bug which affects their generation on reportViewers with tabs
          metadata.shared_label_colors = {};

          updateColorScheme(colorScheme);
          updateReportViewer();
        }
      }
    }
  }, [chartIds]);

  useComponentDidUpdate(verifyUpdateColorScheme);

  const childIds: string[] = topLevelTabs
    ? topLevelTabs.children
    : [REPORTVIEWER_GRID_ID];
  const min = Math.min(tabIndex, childIds.length - 1);
  const activeKey = min === 0 ? REPORTVIEWER_GRID_ID : min.toString();
  const TOP_OF_PAGE_RANGE = 220;

  return (
    <div className="grid-container" data-test="grid-container">
      <ParentSize>
        {({ width }) => (
          /*
            We use a TabContainer irrespective of whether top-level tabs exist to maintain
            a consistent React component tree. This avoids expensive mounts/unmounts of
            the entire reportViewer upon adding/removing top-level tabs, which would otherwise
            happen because of React's diffing algorithm
          */
          <Tabs
            id={REPORTVIEWER_GRID_ID}
            activeKey={activeKey}
            renderTabBar={() => <></>}
            fullWidth={false}
            animated={false}
            allowOverflow
            onFocus={e => {
              if (
                // prevent scrolling when tabbing to the tab pane
                e.target.classList.contains('ant-tabs-tabpane') &&
                window.scrollY < TOP_OF_PAGE_RANGE
              ) {
                // prevent window from jumping down when tabbing
                // if already at the top of the page
                // to help with accessibility when using keyboard navigation
                window.scrollTo(window.scrollX, 0);
              }
            }}
          >
            {childIds.map((id, index) => (
              // Matching the key of the first TabPane irrespective of topLevelTabs
              // lets us keep the same React component tree when !!topLevelTabs changes.
              // This avoids expensive mounts/unmounts of the entire reportViewer.
              <Tabs.TabPane
                key={index === 0 ? REPORTVIEWER_GRID_ID : index.toString()}
              >
                <ReportViewerGrid
                  gridComponent={reportViewerLayout[id]}
                  // see isValidChild for why tabs do not increment the depth of their children
                  depth={REPORTVIEWER_ROOT_DEPTH + 1} // (topLevelTabs ? 0 : 1)}
                  width={width}
                  isComponentVisible={index === tabIndex}
                />
              </Tabs.TabPane>
            ))}
          </Tabs>
        )}
      </ParentSize>
    </div>
  );
};

export default ReportViewerContainer;
