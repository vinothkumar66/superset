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
  toggleExpandSlice,
  setFocusedFilterField,
  unsetFocusedFilterField,
} from 'src/reportViewer/actions/reportViewerState';
import { updateComponents } from 'src/reportViewer/actions/reportViewerLayout';
import { changeFilter } from 'src/reportViewer/actions/reportViewerFilters';
import {
  addSuccessToast,
  addDangerToast,
} from 'src/components/MessageToasts/actions';
import { refreshChart } from 'src/components/Chart/chartAction';
import { logEvent } from 'src/logger/actions';
import {
  getActiveFilters,
  getAppliedFilterValues,
} from 'src/reportViewer/util/activeReportViewerFilters';
import getFormDataWithExtraFilters from 'src/reportViewer/util/charts/getFormDataWithExtraFilters';
import Chart from 'src/reportViewer/components/gridComponents/Chart';
import { PLACEHOLDER_DATASOURCE } from 'src/reportViewer/constants';

const EMPTY_OBJECT = {};

function mapStateToProps(
  {
    charts: chartQueries,
    reportViewerInfo,
    reportViewerState,
    dataMask,
    datasources,
    sliceEntities,
    nativeFilters,
    common,
  },
  ownProps,
) {
  const { id, extraControls, setControlValue } = ownProps;
  const chart = chartQueries[id] || EMPTY_OBJECT;
  const datasource =
    (chart && chart.form_data && datasources[chart.form_data.datasource]) ||
    PLACEHOLDER_DATASOURCE;
  const { colorScheme, colorNamespace, datasetsStatus } = reportViewerState;
  const labelColors = reportViewerInfo?.metadata?.label_colors || {};
  const sharedLabelColors = reportViewerInfo?.metadata?.shared_label_colors || {};
  // note: this method caches filters if possible to prevent render cascades
  const formData = getFormDataWithExtraFilters({
    chart,
    chartConfiguration: reportViewerInfo.metadata?.chart_configuration,
    charts: chartQueries,
    filters: getAppliedFilterValues(id),
    colorScheme,
    colorNamespace,
    sliceId: id,
    nativeFilters: nativeFilters?.filters,
    allSliceIds: reportViewerState.sliceIds,
    dataMask,
    extraControls,
    labelColors,
    sharedLabelColors,
  });

  formData.reportViewerId = reportViewerInfo.id;

  return {
    chart,
    datasource,
    labelColors,
    sharedLabelColors,
    slice: sliceEntities.slices[id],
    timeout: reportViewerInfo.common.conf.SUPERSET_WEBSERVER_TIMEOUT,
    filters: getActiveFilters() || EMPTY_OBJECT,
    formData,
    editMode: reportViewerState.editMode,
    isExpanded: !!reportViewerState.expandedSlices[id],
    supersetCanExplore: !!reportViewerInfo.superset_can_explore,
    supersetCanShare: !!reportViewerInfo.superset_can_share,
    supersetCanCSV: !!reportViewerInfo.superset_can_csv,
    ownState: dataMask[id]?.ownState,
    filterState: dataMask[id]?.filterState,
    maxRows: common.conf.SQL_MAX_ROW,
    setControlValue,
    datasetsStatus,
    emitCrossFilters: !!reportViewerInfo.crossFiltersEnabled,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateComponents,
      addSuccessToast,
      addDangerToast,
      toggleExpandSlice,
      changeFilter,
      setFocusedFilterField,
      unsetFocusedFilterField,
      refreshChart,
      logEvent,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
