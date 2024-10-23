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

import { DataMaskStateWithId, JsonObject } from '@superset-ui/core';
import { useSelector } from 'react-redux';
import { ReportViewerLayout, RootState } from 'src/reportViewer/types';
import crossFiltersSelector from './selectors';
import VerticalCollapse from './VerticalCollapse';
import { useChartsVerboseMaps } from '../utils';

const CrossFiltersVertical = () => {
  const dataMask = useSelector<RootState, DataMaskStateWithId>(
    state => state.dataMask,
  );
  const chartConfiguration = useSelector<RootState, JsonObject>(
    state => state.reportViewerInfo.metadata?.chart_configuration,
  );
  const reportViewerLayout = useSelector<RootState, ReportViewerLayout>(
    state => state.reportViewerLayout.present,
  );
  const verboseMaps = useChartsVerboseMaps();
  const selectedCrossFilters = crossFiltersSelector({
    dataMask,
    chartConfiguration,
    reportViewerLayout,
    verboseMaps,
  });

  return <VerticalCollapse crossFilters={selectedCrossFilters} />;
};

export default CrossFiltersVertical;
