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
import { fireEvent, render } from 'spec/helpers/testing-library';

import ReportViewerGrid from 'src/reportViewer/components/ReportViewerGrid';
import newComponentFactory from 'src/reportViewer/util/newComponentFactory';

import { REPORTVIEWER_GRID_TYPE } from 'src/reportViewer/util/componentTypes';
import { GRID_COLUMN_COUNT } from 'src/reportViewer/util/constants';

const args = { id: 'id', widthMultiple: 1, heightMultiple: 3 };

jest.mock(
  'src/reportViewer/containers/ReportViewerComponent',
  () =>
    ({ onResizeStart, onResizeStop }) => (
      <button
        type="button"
        data-test="mock-reportViewer-component"
        onClick={() => onResizeStart()}
        onBlur={() => onResizeStop(args)}
      >
        Mock
      </button>
    ),
);

const props = {
  depth: 1,
  editMode: false,
  gridComponent: {
    ...newComponentFactory(REPORTVIEWER_GRID_TYPE),
    children: ['a'],
  },
  handleComponentDrop() {},
  resizeComponent() {},
  width: 500,
  isComponentVisible: true,
  setDirectPathToChild() {},
};

function setup(overrideProps) {
  return render(<ReportViewerGrid {...props} {...overrideProps} />, {
    useRedux: true,
    useDnd: true,
  });
}

test('should render a div with class "reportViewer-grid"', () => {
  const { container } = setup();
  expect(container.querySelector('.reportViewer-grid')).toBeInTheDocument();
});

test('should render one ReportViewerComponent for each gridComponent child', () => {
  const { getAllByTestId } = setup({
    gridComponent: { ...props.gridComponent, children: ['a', 'b'] },
  });
  expect(getAllByTestId('mock-reportViewer-component')).toHaveLength(2);
});

test('should render two empty DragDroppables in editMode to increase the drop target zone', () => {
  const { queryAllByTestId } = setup({ editMode: false });
  expect(queryAllByTestId('dragdroppable-object').length).toEqual(0);
  const { getAllByTestId } = setup({ editMode: true });
  expect(getAllByTestId('dragdroppable-object').length).toEqual(2);
});

test('should render grid column guides when resizing', () => {
  const { container, getAllByTestId } = setup({ editMode: true });
  expect(container.querySelector('.grid-column-guide')).not.toBeInTheDocument();

  // map handleResizeStart to the onClick prop of the mock ReportViewerComponent
  fireEvent.click(getAllByTestId('mock-reportViewer-component')[0]);

  expect(container.querySelectorAll('.grid-column-guide')).toHaveLength(
    GRID_COLUMN_COUNT,
  );
});

test('should call resizeComponent when a child ReportViewerComponent calls resizeStop', () => {
  const resizeComponent = jest.fn();
  const { getAllByTestId } = setup({ resizeComponent });
  const reportViewerComponent = getAllByTestId('mock-reportViewer-component')[0];
  fireEvent.blur(reportViewerComponent);

  expect(resizeComponent).toHaveBeenCalledTimes(1);
  expect(resizeComponent).toHaveBeenCalledWith({
    id: 'id',
    width: 1,
    height: 3,
  });
});
