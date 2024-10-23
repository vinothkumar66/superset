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
import { shallow } from 'enzyme';
import sinon from 'sinon';

import ReportViewer from 'src/reportViewer/components/ReportViewer';
import { CHART_TYPE } from 'src/reportViewer/util/componentTypes';
import newComponentFactory from 'src/reportViewer/util/newComponentFactory';

// mock data
import chartQueries from 'spec/fixtures/mockChartQueries';
import datasources from 'spec/fixtures/mockDatasource';
import {
  extraFormData,
  NATIVE_FILTER_ID,
  singleNativeFiltersState,
  dataMaskWith1Filter,
} from 'spec/fixtures/mockNativeFilters';
import reportViewerInfo from 'spec/fixtures/mockReportViewerInfo';
import { reportViewerLayout } from 'spec/fixtures/mockReportViewerLayout';
import reportViewerState from 'spec/fixtures/mockReportViewerState';
import { sliceEntitiesForChart as sliceEntities } from 'spec/fixtures/mockSliceEntities';
import { getAllActiveFilters } from 'src/reportViewer/util/activeAllReportViewerFilters';

describe('ReportViewer', () => {
  const props = {
    actions: {
      addSliceToReportViewer() {},
      removeSliceFromReportViewer() {},
      triggerQuery() {},
      logEvent() {},
    },
    reportViewerState,
    reportViewerInfo,
    charts: chartQueries,
    activeFilters: {},
    ownDataCharts: {},
    slices: sliceEntities.slices,
    datasources,
    layout: reportViewerLayout.present,
    timeout: 60,
    userId: reportViewerInfo.userId,
    impressionId: 'id',
    loadStats: {},
  };

  const ChildrenComponent = () => <div>Test</div>;

  function setup(overrideProps) {
    const wrapper = shallow(
      <ReportViewer {...props} {...overrideProps}>
        <ChildrenComponent />
      </ReportViewer>,
    );
    return wrapper;
  }

  // activeFilters map use id_column) as key
  const OVERRIDE_FILTERS = {
    '1_region': { values: [], scope: [1] },
    '2_country_name': { values: ['USA'], scope: [1, 2] },
    '3_region': { values: [], scope: [1] },
    '3_country_name': { values: ['USA'], scope: [] },
  };

  it('should render the children component', () => {
    const wrapper = setup();
    expect(wrapper.find(ChildrenComponent)).toExist();
  });

  describe('UNSAFE_componentWillReceiveProps', () => {
    const layoutWithExtraChart = {
      ...props.layout,
      1001: newComponentFactory(CHART_TYPE, { chartId: 1001 }),
    };

    it('should call addSliceToReportViewer if a new slice is added to the layout', () => {
      const wrapper = setup();
      const spy = sinon.spy(props.actions, 'addSliceToReportViewer');
      wrapper.instance().UNSAFE_componentWillReceiveProps({
        ...props,
        layout: layoutWithExtraChart,
      });
      spy.restore();
      expect(spy.callCount).toBe(1);
    });

    it('should call removeSliceFromReportViewer if a slice is removed from the layout', () => {
      const wrapper = setup({ layout: layoutWithExtraChart });
      const spy = sinon.spy(props.actions, 'removeSliceFromReportViewer');
      const nextLayout = { ...layoutWithExtraChart };
      delete nextLayout[1001];

      wrapper.instance().UNSAFE_componentWillReceiveProps({
        ...props,
        layout: nextLayout,
      });
      spy.restore();
      expect(spy.callCount).toBe(1);
    });
  });

  describe('componentDidUpdate', () => {
    let wrapper;
    let prevProps;
    let refreshSpy;

    beforeEach(() => {
      wrapper = setup({ activeFilters: OVERRIDE_FILTERS });
      wrapper.instance().appliedFilters = OVERRIDE_FILTERS;
      prevProps = wrapper.instance().props;
      refreshSpy = sinon.spy(wrapper.instance(), 'refreshCharts');
    });

    afterEach(() => {
      refreshSpy.restore();
    });

    it('should not call refresh when is editMode', () => {
      wrapper.setProps({
        reportViewerState: {
          ...reportViewerState,
          editMode: true,
        },
      });
      wrapper.instance().componentDidUpdate(prevProps);
      expect(refreshSpy.callCount).toBe(0);
    });

    it('should not call refresh when there is no change', () => {
      wrapper.setProps({
        activeFilters: OVERRIDE_FILTERS,
      });
      wrapper.instance().componentDidUpdate(prevProps);
      expect(refreshSpy.callCount).toBe(0);
      expect(wrapper.instance().appliedFilters).toBe(OVERRIDE_FILTERS);
    });

    it('should call refresh when native filters changed', () => {
      wrapper.setProps({
        activeFilters: {
          ...OVERRIDE_FILTERS,
          ...getAllActiveFilters({
            dataMask: dataMaskWith1Filter,
            nativeFilters: singleNativeFiltersState.filters,
            allSliceIds: [227, 229, 230],
          }),
        },
      });
      wrapper.instance().componentDidUpdate(prevProps);
      expect(refreshSpy.callCount).toBe(1);
      expect(wrapper.instance().appliedFilters).toEqual({
        ...OVERRIDE_FILTERS,
        [NATIVE_FILTER_ID]: {
          scope: [230],
          values: extraFormData,
        },
      });
    });

    it('should call refresh if a filter is added', () => {
      const newFilter = {
        gender: { values: ['boy', 'girl'], scope: [1] },
      };
      wrapper.setProps({
        activeFilters: newFilter,
      });
      expect(refreshSpy.callCount).toBe(1);
      expect(wrapper.instance().appliedFilters).toEqual(newFilter);
    });

    it('should call refresh if a filter is removed', () => {
      wrapper.setProps({
        activeFilters: {},
      });
      expect(refreshSpy.callCount).toBe(1);
      expect(wrapper.instance().appliedFilters).toEqual({});
    });

    it('should call refresh if a filter is changed', () => {
      const newFilters = {
        ...OVERRIDE_FILTERS,
        '1_region': { values: ['Canada'], scope: [1] },
      };
      wrapper.setProps({
        activeFilters: newFilters,
      });
      expect(refreshSpy.callCount).toBe(1);
      expect(wrapper.instance().appliedFilters).toEqual(newFilters);
      expect(refreshSpy.getCall(0).args[0]).toEqual([1]);
    });

    it('should call refresh with multiple chart ids', () => {
      const newFilters = {
        ...OVERRIDE_FILTERS,
        '2_country_name': { values: ['New Country'], scope: [1, 2] },
      };
      wrapper.setProps({
        activeFilters: newFilters,
      });
      expect(refreshSpy.callCount).toBe(1);
      expect(wrapper.instance().appliedFilters).toEqual(newFilters);
      expect(refreshSpy.getCall(0).args[0]).toEqual([1, 2]);
    });

    it('should call refresh if a filter scope is changed', () => {
      const newFilters = {
        ...OVERRIDE_FILTERS,
        '3_country_name': { values: ['USA'], scope: [2] },
      };

      wrapper.setProps({
        activeFilters: newFilters,
      });
      expect(refreshSpy.callCount).toBe(1);
      expect(refreshSpy.getCall(0).args[0]).toEqual([2]);
    });

    it('should call refresh with empty [] if a filter is changed but scope is not applicable', () => {
      const newFilters = {
        ...OVERRIDE_FILTERS,
        '3_country_name': { values: ['CHINA'], scope: [] },
      };

      wrapper.setProps({
        activeFilters: newFilters,
      });
      expect(refreshSpy.callCount).toBe(1);
      expect(refreshSpy.getCall(0).args[0]).toEqual([]);
    });
  });
});
