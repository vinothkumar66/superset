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
  UPDATE_REPORTVIEWER_FILTERS_SCOPE,
} from 'src/reportViewer/actions/reportViewerFilters';
import reportViewerFiltersReducer, {
  REPORTVIEWER_FILTER_SCOPE_GLOBAL,
} from 'src/reportViewer/reducers/reportViewerFilters';
import * as activeReportViewerFilters from 'src/reportViewer/util/activeReportViewerFilters';
import { reportViewerFilters } from 'spec/fixtures/mockReportViewerFilters';
import {
  sliceEntitiesForReportViewer,
  filterId,
  column,
} from 'spec/fixtures/mockSliceEntities';
import { filterComponent } from 'spec/fixtures/mockReportViewerLayout';

describe('reportViewerFilters reducer', () => {
  const { form_data } = sliceEntitiesForReportViewer.slices[filterId];
  const component = filterComponent;
  const directPathToFilter = (component.parents || []).slice();
  directPathToFilter.push(component.id);

  it('should overwrite a filter if merge is false', () => {
    expect(
      reportViewerFiltersReducer(reportViewerFilters, {
        type: CHANGE_FILTER,
        chartId: filterId,
        newSelectedValues: {
          region: ['c'],
          gender: ['body', 'girl'],
        },
        merge: false,
      }),
    ).toEqual({
      [filterId]: {
        chartId: filterId,
        componentId: component.id,
        directPathToFilter,
        isDateFilter: false,
        isInstantFilter: !!form_data.instant_filtering,
        columns: {
          region: ['c'],
          gender: ['body', 'girl'],
        },
        labels: {
          [column]: column,
        },
        scopes: {
          [column]: REPORTVIEWER_FILTER_SCOPE_GLOBAL,
          gender: REPORTVIEWER_FILTER_SCOPE_GLOBAL,
        },
      },
    });
  });

  it('should merge a filter if merge is true', () => {
    expect(
      reportViewerFiltersReducer(reportViewerFilters, {
        type: CHANGE_FILTER,
        chartId: filterId,
        newSelectedValues: {
          region: ['c'],
          gender: ['body', 'girl'],
        },
        merge: true,
      }),
    ).toEqual({
      [filterId]: {
        chartId: filterId,
        componentId: component.id,
        directPathToFilter,
        isDateFilter: false,
        isInstantFilter: !!form_data.instant_filtering,
        columns: {
          region: ['a', 'b', 'c'],
          gender: ['body', 'girl'],
        },
        labels: {
          [column]: column,
        },
        scopes: {
          region: REPORTVIEWER_FILTER_SCOPE_GLOBAL,
          gender: REPORTVIEWER_FILTER_SCOPE_GLOBAL,
        },
      },
    });
  });

  it('should buildActiveFilters on UPDATE_REPORTVIEWER_FILTERS_SCOPE', () => {
    const regionScope = {
      scope: ['TAB-1'],
      immune: [],
    };
    const genderScope = {
      scope: ['ROOT_ID'],
      immune: [1],
    };
    const scopes = {
      [`${filterId}_region`]: regionScope,
      [`${filterId}_gender`]: genderScope,
    };
    activeReportViewerFilters.buildActiveFilters = jest.fn();
    expect(
      reportViewerFiltersReducer(reportViewerFilters, {
        type: UPDATE_REPORTVIEWER_FILTERS_SCOPE,
        scopes,
      })[filterId].scopes,
    ).toEqual({
      region: regionScope,
      gender: genderScope,
    });

    // when UPDATE_REPORTVIEWER_FILTERS_SCOPE is changed, applicable filters to a chart
    // might be changed.
    expect(activeReportViewerFilters.buildActiveFilters).toBeCalled();
  });
});
