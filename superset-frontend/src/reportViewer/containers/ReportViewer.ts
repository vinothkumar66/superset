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
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from 'src/reportViewer/types';
import ReportViewer from 'src/reportViewer/components/ReportViewer';
import {
  addSliceToReportViewer,
  removeSliceFromReportViewer,
} from 'src/reportViewer/actions/reportViewerState';
import { setDatasources } from 'src/reportViewer/actions/datasources';

import { triggerQuery } from 'src/components/Chart/chartAction';
import { logEvent } from 'src/logger/actions';
import { getActiveFilters } from 'src/reportViewer/util/activeReportViewerFilters';
import {
  getAllActiveFilters,
  getRelevantDataMask,
} from 'src/reportViewer/util/activeAllReportViewerFilters';
import { clearDataMaskState } from '../../dataMask/actions';

function mapStateToProps(state: RootState) {
  const {
    datasources,
    sliceEntities,
    dataMask,
    reportViewerInfo,
    reportViewerState,
    reportViewerLayout,
    impressionId,
    nativeFilters,
  } = state;

  return {
    timeout: reportViewerInfo.common?.conf?.SUPERSET_WEBSERVER_TIMEOUT,
    userId: reportViewerInfo.userId,
    reportViewerInfo,
    reportViewerState,
    datasources,
    // filters prop: a map structure for all the active filter's values and scope in this reportViewer,
    // for each filter field. map key is [chartId_column]
    // When reportViewer is first loaded into browser,
    // its value is from preselect_filters that reportViewer owner saved in reportViewer's meta data
    activeFilters: {
      ...getActiveFilters(),
      ...getAllActiveFilters({
        // eslint-disable-next-line camelcase
        chartConfiguration: reportViewerInfo.metadata?.chart_configuration,
        nativeFilters: nativeFilters.filters,
        dataMask,
        allSliceIds: reportViewerState.sliceIds,
      }),
    },
    chartConfiguration: reportViewerInfo.metadata?.chart_configuration,
    ownDataCharts: getRelevantDataMask(dataMask, 'ownState'),
    slices: sliceEntities.slices,
    layout: reportViewerLayout.present,
    impressionId,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators(
      {
        setDatasources,
        clearDataMaskState,
        addSliceToReportViewer,
        removeSliceFromReportViewer,
        triggerQuery,
        logEvent,
      },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportViewer);
