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
import {
  AdhocFilter,
  Behavior,
  DataMaskStateWithId,
  EXTRA_FORM_DATA_APPEND_KEYS,
  EXTRA_FORM_DATA_OVERRIDE_KEYS,
  ExtraFormData,
  isFeatureEnabled,
  FeatureFlag,
  Filter,
  getChartMetadataRegistry,
  QueryFormData,
  t,
} from '@superset-ui/core';
import { ReportViewerLayout } from 'src/reportViewer/types';
import extractUrlParams from 'src/reportViewer/util/extractUrlParams';
import { CHART_TYPE, TAB_TYPE } from '../../util/componentTypes';
import { REPORTVIEWER_GRID_ID, REPORTVIEWER_ROOT_ID } from '../../util/constants';
import getBootstrapData from '../../../utils/getBootstrapData';

const getDefaultRowLimit = (): number => {
  const bootstrapData = getBootstrapData();
  const nativeFilterDefaultRowLimit =
    bootstrapData?.common?.conf?.NATIVE_FILTER_DEFAULT_ROW_LIMIT;
  return nativeFilterDefaultRowLimit || 1000;
};

export const getFormData = ({
  datasetId,
  dependencies = {},
  groupby,
  defaultDataMask,
  controlValues,
  filterType,
  sortMetric,
  adhoc_filters,
  time_range,
  granularity_sqla,
  type,
  reportViewerId,
  id,
}: Partial<Filter> & {
  reportViewerId: number;
  datasetId?: number;
  dependencies?: object;
  groupby?: string;
  adhoc_filters?: AdhocFilter[];
  time_range?: string;
}): Partial<QueryFormData> => {
  const otherProps: {
    datasource?: string;
    groupby?: string[];
    sortMetric?: string;
  } = {};
  if (datasetId) {
    otherProps.datasource = `${datasetId}__table`;
  }
  if (groupby) {
    otherProps.groupby = [groupby];
  }
  if (sortMetric) {
    otherProps.sortMetric = sortMetric;
  }
  return {
    ...controlValues,
    ...otherProps,
    adhoc_filters: adhoc_filters ?? [],
    extra_filters: [],
    extra_form_data: dependencies,
    granularity_sqla,
    metrics: ['count'],
    row_limit: getDefaultRowLimit(),
    showSearch: true,
    defaultValue: defaultDataMask?.filterState?.value,
    time_range,
    url_params: extractUrlParams('regular'),
    inView: true,
    viz_type: filterType,
    type,
    reportViewerId,
    native_filter_id: id,
  };
};

export function mergeExtraFormData(
  originalExtra: ExtraFormData = {},
  newExtra: ExtraFormData = {},
): ExtraFormData {
  const mergedExtra: ExtraFormData = {};
  EXTRA_FORM_DATA_APPEND_KEYS.forEach((key: string) => {
    const mergedValues = [
      ...(originalExtra[key] || []),
      ...(newExtra[key] || []),
    ];
    if (mergedValues.length) {
      mergedExtra[key] = mergedValues;
    }
  });
  EXTRA_FORM_DATA_OVERRIDE_KEYS.forEach((key: string) => {
    const originalValue = originalExtra[key];
    if (originalValue !== undefined) {
      mergedExtra[key] = originalValue;
    }
    const newValue = newExtra[key];
    if (newValue !== undefined) {
      mergedExtra[key] = newValue;
    }
  });
  return mergedExtra;
}

export function isCrossFilter(vizType: string) {
  // @ts-ignore need export from superset-ui `ItemWithValue`
  return getChartMetadataRegistry().items[vizType]?.value.behaviors?.includes(
    Behavior.InteractiveChart,
  );
}

export function getExtraFormData(
  dataMask: DataMaskStateWithId,
  filterIdsAppliedOnChart: string[],
): ExtraFormData {
  let extraFormData: ExtraFormData = {};
  filterIdsAppliedOnChart.forEach(key => {
    extraFormData = mergeExtraFormData(
      extraFormData,
      dataMask[key]?.extraFormData ?? {},
    );
  });
  return extraFormData;
}

export function nativeFilterGate(behaviors: Behavior[]): boolean {
  return (
    !behaviors.includes(Behavior.NativeFilter) ||
    (isFeatureEnabled(FeatureFlag.ReportViewerCrossFilters) &&
      behaviors.includes(Behavior.InteractiveChart))
  );
}

const isComponentATab = (
  reportViewerLayout: ReportViewerLayout,
  componentId: string,
) => reportViewerLayout?.[componentId]?.type === TAB_TYPE;

const findTabsWithChartsInScopeHelper = (
  reportViewerLayout: ReportViewerLayout,
  chartsInScope: number[],
  componentId: string,
  tabIds: string[],
  tabsToHighlight: Set<string>,
  visited: Set<string>,
) => {
  if (visited.has(componentId)) {
    return;
  }
  visited.add(componentId);
  if (
    reportViewerLayout?.[componentId]?.type === CHART_TYPE &&
    chartsInScope.includes(reportViewerLayout[componentId]?.meta?.chartId)
  ) {
    tabIds.forEach(tabsToHighlight.add, tabsToHighlight);
  }
  if (
    reportViewerLayout?.[componentId]?.children?.length === 0 ||
    (isComponentATab(reportViewerLayout, componentId) &&
      tabsToHighlight.has(componentId))
  ) {
    return;
  }
  reportViewerLayout[componentId]?.children.forEach(childId =>
    findTabsWithChartsInScopeHelper(
      reportViewerLayout,
      chartsInScope,
      childId,
      isComponentATab(reportViewerLayout, childId) ? [...tabIds, childId] : tabIds,
      tabsToHighlight,
      visited,
    ),
  );
};

export const findTabsWithChartsInScope = (
  reportViewerLayout: ReportViewerLayout,
  chartsInScope: number[],
) => {
  const reportViewerRoot = reportViewerLayout[REPORTVIEWER_ROOT_ID];
  const rootChildId = reportViewerRoot.children[0];
  const hasTopLevelTabs = rootChildId !== REPORTVIEWER_GRID_ID;
  const tabsInScope = new Set<string>();
  const visited = new Set<string>();
  if (hasTopLevelTabs) {
    reportViewerLayout[rootChildId]?.children?.forEach(tabId =>
      findTabsWithChartsInScopeHelper(
        reportViewerLayout,
        chartsInScope,
        tabId,
        [tabId],
        tabsInScope,
        visited,
      ),
    );
  } else {
    Object.values(reportViewerLayout)
      .filter(element => element?.type === TAB_TYPE)
      .forEach(element =>
        findTabsWithChartsInScopeHelper(
          reportViewerLayout,
          chartsInScope,
          element.id,
          [element.id],
          tabsInScope,
          visited,
        ),
      );
  }
  return tabsInScope;
};

export const getFilterValueForDisplay = (
  value?: string[] | null | string | number | object,
): string => {
  if (value === null || value === undefined) {
    return '';
  }
  if (typeof value === 'string' || typeof value === 'number') {
    return `${value}`;
  }
  if (Array.isArray(value)) {
    return value.join(', ');
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return t('Unknown value');
};
