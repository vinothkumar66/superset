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
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import {
  Filter,
  FilterConfiguration,
  Divider,
  isFilterDivider,
} from '@superset-ui/core';
import { ActiveTabs, ReportViewerLayout, RootState } from '../../types';
import { TAB_TYPE } from '../../util/componentTypes';

const defaultFilterConfiguration: Filter[] = [];

export function useFilterConfiguration() {
  return useSelector<any, FilterConfiguration>(
    state =>
      state.reportViewerInfo?.metadata?.native_filter_configuration ||
      defaultFilterConfiguration,
  );
}

/**
 * returns the reportViewer's filter configuration,
 * converted into a map of id -> filter
 */
export function useFilterConfigMap() {
  const filterConfig = useFilterConfiguration();
  return useMemo(
    () =>
      filterConfig.reduce(
        (acc: Record<string, Filter | Divider>, filter: Filter) => {
          acc[filter.id] = filter;
          return acc;
        },
        {} as Record<string, Filter | Divider>,
      ),
    [filterConfig],
  );
}

export function useReportViewerLayout() {
  return useSelector<any, ReportViewerLayout>(
    state => state.reportViewerLayout?.present,
  );
}

export function useReportViewerHasTabs() {
  const reportViewerLayout = useReportViewerLayout();
  return useMemo(
    () =>
      Object.values(reportViewerLayout).some(element => element.type === TAB_TYPE),
    [reportViewerLayout],
  );
}

function useActiveReportViewerTabs() {
  return useSelector<RootState, ActiveTabs>(
    state => state.reportViewerState?.activeTabs,
  );
}

function useSelectChartTabParents() {
  const reportViewerLayout = useReportViewerLayout();
  return (chartId: number) => {
    const chartLayoutItem = Object.values(reportViewerLayout).find(
      layoutItem => layoutItem.meta?.chartId === chartId,
    );
    return chartLayoutItem?.parents.filter(
      (parent: string) => reportViewerLayout[parent].type === TAB_TYPE,
    );
  };
}

export function useIsFilterInScope() {
  const activeTabs = useActiveReportViewerTabs();
  const selectChartTabParents = useSelectChartTabParents();

  // Filter is in scope if any of it's charts is visible.
  // Chart is visible if it's placed in an active tab tree or if it's not attached to any tab.
  // Chart is in an active tab tree if all of it's ancestors of type TAB are active
  // Dividers are always in scope
  return (filter: Filter | Divider) =>
    isFilterDivider(filter) ||
    ('chartsInScope' in filter &&
      filter.chartsInScope?.some((chartId: number) => {
        const tabParents = selectChartTabParents(chartId);
        return (
          tabParents?.length === 0 ||
          tabParents?.every(tab => activeTabs.includes(tab))
        );
      }));
}

export function useSelectFiltersInScope(filters: (Filter | Divider)[]) {
  const reportViewerHasTabs = useReportViewerHasTabs();
  const isFilterInScope = useIsFilterInScope();

  return useMemo(() => {
    let filtersInScope: (Filter | Divider)[] = [];
    const filtersOutOfScope: (Filter | Divider)[] = [];

    // we check native filters scopes only on reportViewers with tabs
    if (!reportViewerHasTabs) {
      filtersInScope = filters;
    } else {
      filters.forEach(filter => {
        const filterInScope = isFilterInScope(filter);

        if (filterInScope) {
          filtersInScope.push(filter);
        } else {
          filtersOutOfScope.push(filter);
        }
      });
    }
    return [filtersInScope, filtersOutOfScope];
  }, [filters, reportViewerHasTabs, isFilterInScope]);
}
