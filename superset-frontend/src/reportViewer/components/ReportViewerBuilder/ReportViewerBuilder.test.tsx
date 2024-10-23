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
import fetchMock from 'fetch-mock';
import { render } from 'spec/helpers/testing-library';
import { fireEvent, within } from '@testing-library/react';
import ReportViewerBuilder from 'src/reportViewer/components/ReportViewerBuilder/ReportViewerBuilder';
import useStoredSidebarWidth from 'src/components/ResizableSidebar/useStoredSidebarWidth';
import {
  fetchFaveStar,
  setActiveTab,
  setDirectPathToChild,
} from 'src/reportViewer/actions/reportViewerState';
import {
  reportViewerLayout as undoableReportViewerLayout,
  reportViewerLayoutWithTabs as undoableReportViewerLayoutWithTabs,
} from 'spec/fixtures/mockReportViewerLayout';
import { storeWithState } from 'spec/fixtures/mockStore';
import mockState from 'spec/fixtures/mockState';
import { REPORTVIEWER_ROOT_ID } from 'src/reportViewer/util/constants';

fetchMock.get('glob:*/csstemplateasyncmodelview/api/read', {});

jest.mock('src/reportViewer/actions/reportViewerState', () => ({
  ...jest.requireActual('src/reportViewer/actions/reportViewerState'),
  fetchFaveStar: jest.fn(),
  setActiveTab: jest.fn(),
  setDirectPathToChild: jest.fn(),
}));
jest.mock('src/components/ResizableSidebar/useStoredSidebarWidth');

// mock following dependant components to fix the prop warnings
jest.mock('src/components/Select/Select', () => () => (
  <div data-test="mock-select" />
));
jest.mock('src/components/Select/AsyncSelect', () => () => (
  <div data-test="mock-async-select" />
));
jest.mock('src/reportViewer/components/Header/HeaderActionsDropdown', () => () => (
  <div data-test="mock-header-actions-dropdown" />
));
jest.mock('src/components/PageHeaderWithActions', () => ({
  PageHeaderWithActions: () => (
    <div data-test="mock-page-header-with-actions" />
  ),
}));
jest.mock(
  'src/reportViewer/components/nativeFilters/FiltersConfigModal/FiltersConfigModal',
  () => () => <div data-test="mock-filters-config-modal" />,
);
jest.mock('src/reportViewer/components/BuilderComponentPane', () => () => (
  <div data-test="mock-builder-component-pane" />
));
jest.mock('src/reportViewer/components/nativeFilters/FilterBar', () => () => (
  <div data-test="mock-filter-bar" />
));
jest.mock('src/reportViewer/containers/ReportViewerGrid', () => () => (
  <div data-test="mock-reportViewer-grid" />
));

describe('ReportViewerBuilder', () => {
  let favStarStub: jest.Mock;
  let activeTabsStub: jest.Mock;

  beforeAll(() => {
    // this is invoked on mount, so we stub it instead of making a request
    favStarStub = (fetchFaveStar as jest.Mock).mockReturnValue({
      type: 'mock-action',
    });
    activeTabsStub = (setActiveTab as jest.Mock).mockReturnValue({
      type: 'mock-action',
    });
    (useStoredSidebarWidth as jest.Mock).mockImplementation(() => [
      100,
      jest.fn(),
    ]);
  });

  afterAll(() => {
    favStarStub.mockReset();
    activeTabsStub.mockReset();
    (useStoredSidebarWidth as jest.Mock).mockReset();
  });

  function setup(overrideState = {}) {
    return render(<ReportViewerBuilder />, {
      useRedux: true,
      store: storeWithState({
        ...mockState,
        reportViewerLayout: undoableReportViewerLayout,
        ...overrideState,
      }),
      useDnd: true,
    });
  }

  it('should render a StickyContainer with class "reportViewer"', () => {
    const { getByTestId } = setup();
    const stickyContainer = getByTestId('reportViewer-content-wrapper');
    expect(stickyContainer).toHaveClass('reportViewer');
  });

  it('should add the "reportViewer--editing" class if editMode=true', () => {
    const { getByTestId } = setup({
      reportViewerState: { ...mockState.reportViewerState, editMode: true },
    });
    const stickyContainer = getByTestId('reportViewer-content-wrapper');
    expect(stickyContainer).toHaveClass('reportViewer reportViewer--editing');
  });

  it('should render a DragDroppable ReportViewerHeader', () => {
    const { queryByTestId } = setup();
    const header = queryByTestId('reportViewer-header-container');
    expect(header).toBeTruthy();
  });

  it('should render a Sticky top-level Tabs if the reportViewer has tabs', async () => {
    const { findAllByTestId } = setup({
      reportViewerLayout: undoableReportViewerLayoutWithTabs,
    });
    const sticky = await findAllByTestId('nav-list');

    expect(sticky.length).toBe(1);
    expect(sticky[0]).toHaveAttribute('id', 'TABS_ID');

    const reportViewerTabComponents = within(sticky[0]).getAllByRole('tab');
    const tabChildren =
      undoableReportViewerLayoutWithTabs.present.TABS_ID.children;
    expect(reportViewerTabComponents.length).toBe(tabChildren.length);
    tabChildren.forEach((tabId, i) => {
      const idMatcher = new RegExp(`${tabId}$`);
      expect(reportViewerTabComponents[i]).toHaveAttribute(
        'id',
        expect.stringMatching(idMatcher),
      );
    });
  });

  it('should render one Tabs and two TabPane', async () => {
    const { findAllByRole } = setup({
      reportViewerLayout: undoableReportViewerLayoutWithTabs,
    });
    const tabs = await findAllByRole('tablist');
    expect(tabs.length).toBe(1);
    const tabPanels = await findAllByRole('tabpanel');
    expect(tabPanels.length).toBe(2);
  });

  it('should render a TabPane and ReportViewerGrid for first Tab', async () => {
    const { findByTestId } = setup({
      reportViewerLayout: undoableReportViewerLayoutWithTabs,
    });
    const parentSize = await findByTestId('grid-container');
    const expectedCount =
      undoableReportViewerLayoutWithTabs.present.TABS_ID.children.length;
    const tabPanels = within(parentSize).getAllByRole('tabpanel', {
      // to include invisiable tab panels
      hidden: true,
    });
    expect(tabPanels.length).toBe(expectedCount);
    expect(
      within(tabPanels[0]).getAllByTestId('mock-reportViewer-grid').length,
    ).toBe(1);
  });

  it('should render a TabPane and ReportViewerGrid for second Tab', async () => {
    const { findByTestId } = setup({
      reportViewerLayout: undoableReportViewerLayoutWithTabs,
      reportViewerState: {
        ...mockState.reportViewerState,
        directPathToChild: [REPORTVIEWER_ROOT_ID, 'TABS_ID', 'TAB_ID2'],
      },
    });
    const parentSize = await findByTestId('grid-container');
    const expectedCount =
      undoableReportViewerLayoutWithTabs.present.TABS_ID.children.length;
    const tabPanels = within(parentSize).getAllByRole('tabpanel', {
      // to include invisiable tab panels
      hidden: true,
    });
    expect(tabPanels.length).toBe(expectedCount);
    expect(
      within(tabPanels[1]).getAllByTestId('mock-reportViewer-grid').length,
    ).toBe(1);
  });

  it('should render a BuilderComponentPane if editMode=false and user selects "Insert Components" pane', () => {
    const { queryAllByTestId } = setup();
    const builderComponents = queryAllByTestId('mock-builder-component-pane');
    expect(builderComponents.length).toBe(0);
  });

  it('should render a BuilderComponentPane if editMode=true and user selects "Insert Components" pane', () => {
    const { queryAllByTestId } = setup({ reportViewerState: { editMode: true } });
    const builderComponents = queryAllByTestId('mock-builder-component-pane');
    expect(builderComponents.length).toBeGreaterThanOrEqual(1);
  });

  it('should change redux state if a top-level Tab is clicked', async () => {
    (setDirectPathToChild as jest.Mock).mockImplementation(arg0 => ({
      type: 'type',
      arg0,
    }));
    const { findByRole } = setup({
      reportViewerLayout: undoableReportViewerLayoutWithTabs,
    });
    const tabList = await findByRole('tablist');
    const tabs = within(tabList).getAllByRole('tab');
    expect(setDirectPathToChild).toHaveBeenCalledTimes(0);
    fireEvent.click(tabs[1]);
    expect(setDirectPathToChild).toHaveBeenCalledWith([
      'ROOT_ID',
      'TABS_ID',
      'TAB_ID2',
    ]);
    (setDirectPathToChild as jest.Mock).mockReset();
  });

  it('should not display a loading spinner when saving is not in progress', () => {
    const { queryByAltText } = setup();

    expect(queryByAltText('Loading...')).not.toBeInTheDocument();
  });

  it('should display a loading spinner when saving is in progress', async () => {
    const { findByAltText } = setup({
      reportViewerState: { reportViewerIsSaving: true },
    });

    expect(await findByAltText('Loading...')).toBeVisible();
  });

  it('should set FilterBar width by useStoredSidebarWidth', () => {
    const expectedValue = 200;
    const setter = jest.fn();
    (useStoredSidebarWidth as jest.Mock).mockImplementation(() => [
      expectedValue,
      setter,
    ]);
    const { getByTestId } = setup({
      reportViewerInfo: {
        ...mockState.reportViewerInfo,
        reportedit_perm: true,
      },
    });
    const filterbar = getByTestId('reportViewer-filters-panel');
    expect(filterbar).toHaveStyleRule('width', `${expectedValue}px`);
  });
});
