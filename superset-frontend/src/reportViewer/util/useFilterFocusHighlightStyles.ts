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
import { useTheme } from '@superset-ui/core';
import { useSelector } from 'react-redux';

import { getChartIdsInFilterScope } from 'src/reportViewer/util/activeReportViewerFilters';
import { ReportViewerState, RootState } from 'src/reportViewer/types';

const selectFocusedFilterScope = (
  reportViewerState: ReportViewerState,
  reportViewerFilters: any,
) => {
  if (!reportViewerState.focusedFilterField) return null;
  const { chartId, column } = reportViewerState.focusedFilterField;
  return {
    chartId,
    scope: reportViewerFilters[chartId].scopes[column],
  };
};

const useFilterFocusHighlightStyles = (chartId: number) => {
  const theme = useTheme();

  const nativeFilters = useSelector((state: RootState) => state.nativeFilters);
  const reportViewerState = useSelector(
    (state: RootState) => state.reportViewerState,
  );
  const reportViewerFilters = useSelector(
    (state: RootState) => state.reportViewerFilters,
  );
  const focusedFilterScope = selectFocusedFilterScope(
    reportViewerState,
    reportViewerFilters,
  );

  const highlightedFilterId =
    nativeFilters?.focusedFilterId || nativeFilters?.hoveredFilterId;
  if (!(focusedFilterScope || highlightedFilterId)) {
    return {};
  }

  // we use local styles here instead of a conditionally-applied class,
  // because adding any conditional class to this container
  // causes performance issues in Chrome.

  // default to the "de-emphasized" state
  const unfocusedChartStyles = { opacity: 0.3, pointerEvents: 'none' };
  const focusedChartStyles = {
    borderColor: theme.colors.primary.light2,
    opacity: 1,
    boxShadow: `0px 0px ${theme.gridUnit * 2}px ${theme.colors.primary.base}`,
    pointerEvents: 'auto',
  };

  if (highlightedFilterId) {
    if (
      nativeFilters.filters[highlightedFilterId]?.chartsInScope?.includes(
        chartId,
      )
    ) {
      return focusedChartStyles;
    }
  } else if (
    chartId === focusedFilterScope?.chartId ||
    getChartIdsInFilterScope({
      filterScope: focusedFilterScope?.scope,
    }).includes(chartId)
  ) {
    return focusedChartStyles;
  }

  // inline styles are used here due to a performance issue when adding/changing a class, which causes a reflow
  return unfocusedChartStyles;
};

export default useFilterFocusHighlightStyles;
