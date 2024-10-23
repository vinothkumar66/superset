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

import userEvent from '@testing-library/user-event';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from 'spec/helpers/testing-library';
import ReportViewerComponent from 'src/reportViewer/containers/ReportViewerComponent';
import EditableTitle from 'src/components/EditableTitle';
import { setEditMode } from 'src/reportViewer/actions/reportViewerState';

import Tab from './Tab';
import Markdown from './Markdown';

jest.mock('src/reportViewer/containers/ReportViewerComponent', () =>
  jest.fn(() => <div data-test="ReportViewerComponent" />),
);
jest.mock('src/components/EditableTitle', () =>
  jest.fn(props => (
    <button type="button" data-test="EditableTitle" onClick={props.onSaveTitle}>
      {props.title}
    </button>
  )),
);
jest.mock('src/reportViewer/components/dnd/DragDroppable', () => ({
  ...jest.requireActual('src/reportViewer/components/dnd/DragDroppable'),
  Droppable: jest.fn(props => {
    const childProps = props.editMode
      ? {
          dragSourceRef: props.dragSourceRef,
          dropIndicatorProps: props.dropIndicatorProps,
        }
      : {};
    return (
      <div>
        <button type="button" data-test="MockDroppable" onClick={props.onDrop}>
          DragDroppable
        </button>
        {props.children(childProps)}
      </div>
    );
  }),
}));
jest.mock('src/reportViewer/actions/reportViewerState', () => ({
  setEditMode: jest.fn(() => ({
    type: 'SET_EDIT_MODE',
  })),
}));

const createProps = () => ({
  id: 'TAB-YT6eNksV-',
  parentId: 'TABS-L-d9eyOE-b',
  depth: 2,
  index: 1,
  renderType: 'RENDER_TAB_CONTENT',
  availableColumnCount: 12,
  columnWidth: 120,
  isFocused: false,
  component: {
    children: ['ROW-DR80aHJA2c', 'ROW--BIzjz9F0'],
    id: 'TAB-YT6eNksV-',
    meta: { text: '🚀 Aspiring Developers' },
    parents: ['ROOT_ID', 'GRID_ID', 'TABS-L-d9eyOE-b'],
    type: 'TAB',
  },
  parentComponent: {
    children: ['TAB-AsMaxdYL_t', 'TAB-YT6eNksV-', 'TAB-l_9I0aNYZ'],
    id: 'TABS-L-d9eyOE-b',
    meta: {},
    parents: ['ROOT_ID', 'GRID_ID'],
    type: 'TABS',
  },
  editMode: false,
  undoLength: 0,
  redoLength: 0,
  filters: {},
  directPathToChild: ['ROOT_ID', 'GRID_ID', 'TABS-L-d9eyOE-b', 'TAB-YT6eNksV-'],
  directPathLastUpdated: 1617374760080,
  reportViewerId: 23,
  focusedFilterScope: null,
  isComponentVisible: true,
  onDropOnTab: jest.fn(),
  handleComponentDrop: jest.fn(),
  updateComponents: jest.fn(),
  setDirectPathToChild: jest.fn(),
});

beforeEach(() => {
  jest.clearAllMocks();
});

test('Render tab (no content)', () => {
  const props = createProps();
  props.renderType = 'RENDER_TAB';
  const { getByTestId } = render(<Tab {...props} />, {
    useRedux: true,
    useDnd: true,
  });
  expect(screen.getByText('🚀 Aspiring Developers')).toBeInTheDocument();
  expect(EditableTitle).toBeCalledTimes(1);
  expect(getByTestId('dragdroppable-object')).toBeInTheDocument();
});

test('Render tab (no content) editMode:true', () => {
  const props = createProps();
  props.editMode = true;
  props.renderType = 'RENDER_TAB';
  const { getByTestId } = render(<Tab {...props} />, {
    useRedux: true,
    useDnd: true,
  });
  expect(screen.getByText('🚀 Aspiring Developers')).toBeInTheDocument();
  expect(EditableTitle).toBeCalledTimes(1);
  expect(getByTestId('dragdroppable-object')).toBeInTheDocument();
});

test('Drop on a tab', async () => {
  const props = createProps();
  const mockOnDropOnTab = jest.fn();
  render(
    <>
      <Tab {...props} renderType="RENDER_TAB" editMode />
      <Tab
        {...props}
        renderType="RENDER_TAB"
        index={2}
        component={{
          ...props.component,
          id: 'TAB-Next-',
          meta: { text: 'Next Tab' } as any,
        }}
        handleComponentDrop={mockOnDropOnTab}
        editMode
      />
      <Markdown
        id="MARKDOWN-1"
        parentId="GRID_ID"
        parentComponent={{
          id: 'GRID_ID',
          type: 'GRID',
          parents: ['ROOT_ID'],
        }}
        depth={0}
        editMode
        index={1}
        availableColumnCount={12}
        columnWidth={120}
        component={{
          ...props.component,
          type: 'MARKDOWN',
          id: 'MARKDOWN-1',
          meta: { code: 'ReportViewer Component' } as any,
        }}
        logEvent={jest.fn()}
        deleteComponent={jest.fn()}
        handleComponentDrop={jest.fn()}
        onResizeStart={jest.fn()}
        onResize={jest.fn()}
        onResizeStop={jest.fn()}
        updateComponents={jest.fn()}
        addDangerToast={jest.fn()}
      />
    </>,
    {
      useRedux: true,
      useDnd: true,
    },
  );

  fireEvent.dragStart(screen.getByText('🚀 Aspiring Developers'));
  fireEvent.drop(screen.getByText('Next Tab'));
  await waitFor(() => expect(mockOnDropOnTab).toHaveBeenCalled());
  expect(mockOnDropOnTab).toHaveBeenCalledWith(
    expect.objectContaining({
      destination: { id: props.parentComponent.id, index: 2, type: 'TABS' },
    }),
  );

  fireEvent.dragStart(screen.getByText('ReportViewer Component'));
  fireEvent.drop(screen.getByText('Next Tab'));
  await waitFor(() => expect(mockOnDropOnTab).toHaveBeenCalledTimes(2));
  expect(mockOnDropOnTab).toHaveBeenLastCalledWith(
    expect.objectContaining({
      destination: {
        id: 'TAB-Next-',
        index: props.component.children.length,
        type: 'TAB',
      },
    }),
  );
});

test('Edit table title', () => {
  const props = createProps();
  props.editMode = true;
  props.renderType = 'RENDER_TAB';
  const { getByTestId } = render(<Tab {...props} />, {
    useRedux: true,
    useDnd: true,
  });

  expect(EditableTitle).toBeCalledTimes(1);
  expect(getByTestId('dragdroppable-object')).toBeInTheDocument();

  expect(props.updateComponents).not.toBeCalled();
  userEvent.click(screen.getByText('🚀 Aspiring Developers'));
  expect(props.updateComponents).toBeCalled();
});

test('Render tab (with content)', () => {
  const props = createProps();
  props.isFocused = true;
  const { queryByTestId } = render(<Tab {...props} />, {
    useRedux: true,
    useDnd: true,
  });
  expect(ReportViewerComponent).toBeCalledTimes(2);
  expect(ReportViewerComponent).toHaveBeenNthCalledWith(
    1,
    expect.objectContaining({
      availableColumnCount: 12,
      columnWidth: 120,
      depth: 2,
      id: 'ROW-DR80aHJA2c',
      index: 0,
      isComponentVisible: true,
      onChangeTab: expect.any(Function),
      onDrop: expect.any(Function),
      onResize: expect.any(Function),
      onResizeStart: expect.any(Function),
      onResizeStop: expect.any(Function),
      parentId: 'TAB-YT6eNksV-',
    }),
    {},
  );
  expect(ReportViewerComponent).toHaveBeenNthCalledWith(
    2,
    expect.objectContaining({
      availableColumnCount: 12,
      columnWidth: 120,
      depth: 2,
      id: 'ROW--BIzjz9F0',
      index: 1,
      isComponentVisible: true,
      onChangeTab: expect.any(Function),
      onDrop: expect.any(Function),
      onResize: expect.any(Function),
      onResizeStart: expect.any(Function),
      onResizeStop: expect.any(Function),
      parentId: 'TAB-YT6eNksV-',
    }),
    {},
  );
  expect(queryByTestId('dragdroppable-object')).not.toBeInTheDocument();
});

test('Render tab content with no children', () => {
  const props = createProps();
  props.component.children = [];
  render(<Tab {...props} />, {
    useRedux: true,
    useDnd: true,
  });
  expect(
    screen.getByText('There are no components added to this tab'),
  ).toBeVisible();
  expect(screen.getByAltText('empty')).toBeVisible();
  expect(screen.queryByText('edit mode')).not.toBeInTheDocument();
});

test('Render tab content with no children, canEdit: true', () => {
  const props = createProps();
  props.component.children = [];
  render(<Tab {...props} />, {
    useRedux: true,
    useDnd: true,
    initialState: {
      reportViewerInfo: {
        reportedit_perm: true,
      },
    },
  });
  expect(screen.getByText('edit mode')).toBeVisible();
  userEvent.click(screen.getByRole('button', { name: 'edit mode' }));
  expect(setEditMode).toHaveBeenCalled();
});

test('Render tab (with content) editMode:true', () => {
  const props = createProps();
  props.isFocused = true;
  props.editMode = true;
  const { getAllByTestId } = render(<Tab {...props} />, {
    useRedux: true,
    useDnd: true,
  });
  expect(ReportViewerComponent).toBeCalledTimes(2);
  expect(ReportViewerComponent).toHaveBeenNthCalledWith(
    1,
    expect.objectContaining({
      availableColumnCount: 12,
      columnWidth: 120,
      depth: 2,
      id: 'ROW-DR80aHJA2c',
      index: 0,
      isComponentVisible: true,
      onChangeTab: expect.any(Function),
      onDrop: expect.any(Function),
      onResize: expect.any(Function),
      onResizeStart: expect.any(Function),
      onResizeStop: expect.any(Function),
      parentId: 'TAB-YT6eNksV-',
    }),
    {},
  );
  expect(ReportViewerComponent).toHaveBeenNthCalledWith(
    2,
    expect.objectContaining({
      availableColumnCount: 12,
      columnWidth: 120,
      depth: 2,
      id: 'ROW--BIzjz9F0',
      index: 1,
      isComponentVisible: true,
      onChangeTab: expect.any(Function),
      onDrop: expect.any(Function),
      onResize: expect.any(Function),
      onResizeStart: expect.any(Function),
      onResizeStop: expect.any(Function),
      parentId: 'TAB-YT6eNksV-',
    }),
    {},
  );
  // 3 droppable area exists for two child components
  expect(getAllByTestId('MockDroppable')).toHaveLength(3);
});

test('Should call "handleDrop" and "handleTopDropTargetDrop"', () => {
  const props = createProps();
  props.isFocused = true;
  props.editMode = true;
  const { getAllByTestId, rerender } = render(
    <Tab {...props} component={{ ...props.component, children: [] }} />,
    {
      useRedux: true,
      useDnd: true,
    },
  );

  expect(props.handleComponentDrop).not.toBeCalled();
  userEvent.click(getAllByTestId('MockDroppable')[0]);
  expect(props.handleComponentDrop).toBeCalledTimes(1);
  expect(props.onDropOnTab).not.toBeCalled();
  rerender(<Tab {...props} />);
  userEvent.click(getAllByTestId('MockDroppable')[1]);
  expect(props.onDropOnTab).toBeCalledTimes(1);
  expect(props.handleComponentDrop).toBeCalledTimes(2);
});

test('Render tab content with no children, editMode: true, canEdit: true', () => {
  const props = createProps();
  props.editMode = true;
  // props.canEdit = true;
  props.component.children = [];
  render(<Tab {...props} />, {
    useRedux: true,
    useDnd: true,
    initialState: {
      reportViewerInfo: {
        reportedit_perm: true,
      },
    },
  });
  expect(
    screen.getByText('Drag and drop components to this tab'),
  ).toBeVisible();
  expect(screen.getByAltText('empty')).toBeVisible();
  expect(
    screen.getByRole('link', { name: 'create a new chart' }),
  ).toBeVisible();
  expect(
    screen.getByRole('link', { name: 'create a new chart' }),
  ).toHaveAttribute('href', '/chart/add?reportViewer_id=23');
});
