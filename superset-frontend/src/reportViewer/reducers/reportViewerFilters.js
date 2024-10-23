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
/* eslint-disable camelcase */
import {
  CHANGE_FILTER,
  UPDATE_DIRECT_PATH_TO_FILTER,
  UPDATE_LAYOUT_COMPONENTS,
  UPDATE_REPORTVIEWER_FILTERS_SCOPE,
} from '../actions/reportViewerFilters';
import { HYDRATE_REPORTVIEWER } from '../actions/hydrate';
import { REPORTVIEWER_ROOT_ID } from '../util/constants';
import { buildActiveFilters } from '../util/activeReportViewerFilters';
import { getChartIdAndColumnFromFilterKey } from '../util/getReportViewerFilterKey';

export const REPORTVIEWER_FILTER_SCOPE_GLOBAL = {
  scope: [REPORTVIEWER_ROOT_ID],
  immune: [],
};

export const reportViewerFilter = {
  chartId: null,
  componentId: null,
  filterName: null,
  datasourceId: null,
  directPathToFilter: [],
  isDateFilter: false,
  isInstantFilter: true,
  columns: {},
  labels: {},
  scopes: {},
};

const CHANGE_FILTER_VALUE_ACTIONS = [CHANGE_FILTER];

export default function reportViewerFiltersReducer(reportViewerFilters = {}, action) {
  const actionHandlers = {
    [CHANGE_FILTER](state) {
      const { newSelectedValues, merge } = action;
      const updatedColumns = Object.keys(newSelectedValues).reduce(
        (columns, name) => {
          // override existed column value, or add new column name
          if (!merge || !(name in columns)) {
            return {
              ...columns,
              [name]: newSelectedValues[name],
            };
          }

          return {
            ...columns,
            [name]: [...columns[name], ...newSelectedValues[name]],
          };
        },
        { ...state.columns },
      );

      return {
        ...state,
        columns: updatedColumns,
      };
    },

    [UPDATE_DIRECT_PATH_TO_FILTER](state) {
      const { path } = action;
      return {
        ...state,
        directPathToFilter: path,
      };
    },
  };

  if (action.type === UPDATE_LAYOUT_COMPONENTS) {
    buildActiveFilters({
      reportViewerFilters,
      components: action.components,
    });
    return reportViewerFilters;
  }
  if (action.type === UPDATE_REPORTVIEWER_FILTERS_SCOPE) {
    const allReportViewerFiltersScope = action.scopes;
    // update filter scope for each filter field
    const updatedFilters = Object.entries(allReportViewerFiltersScope).reduce(
      (map, entry) => {
        const [filterKey, { scope, immune }] = entry;
        const { chartId, column } = getChartIdAndColumnFromFilterKey(filterKey);
        const scopes = {
          ...map[chartId].scopes,
          [column]: {
            scope,
            immune,
          },
        };
        return {
          ...map,
          [chartId]: {
            ...map[chartId],
            scopes,
          },
        };
      },
      reportViewerFilters,
    );

    buildActiveFilters({ reportViewerFilters: updatedFilters });
    return updatedFilters;
  }
  if (action.type === HYDRATE_REPORTVIEWER) {
    return action.data.reportViewerFilters;
  }

  if (action.type in actionHandlers) {
    const updatedFilters = {
      ...reportViewerFilters,
      [action.chartId]: actionHandlers[action.type](
        reportViewerFilters[action.chartId],
      ),
    };
    if (CHANGE_FILTER_VALUE_ACTIONS.includes(action.type)) {
      buildActiveFilters({ reportViewerFilters: updatedFilters });
    }

    return updatedFilters;
  }

  return reportViewerFilters;
}
