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
import { FC, Suspense } from 'react';
import { ReportViewerComponentMetadata, JsonObject, t } from '@superset-ui/core';
import backgroundStyleOptions from 'src/reportViewer/util/backgroundStyleOptions';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import { Draggable } from '../dnd/DragDroppable';
import { COLUMN_TYPE, ROW_TYPE } from '../../util/componentTypes';
import WithPopoverMenu from '../menu/WithPopoverMenu';
import ResizableContainer from '../resizable/ResizableContainer';
import {
  BACKGROUND_TRANSPARENT,
  GRID_BASE_UNIT,
  GRID_MIN_COLUMN_COUNT,
} from '../../util/constants';
import HoverMenu from '../menu/HoverMenu';
import DeleteComponentButton from '../DeleteComponentButton';
import BackgroundStyleDropdown from '../menu/BackgroundStyleDropdown';
import reportViewerComponents from '../../../visualizations/presets/reportViewerComponents';
import { RootState } from '../../types';

type FilterSummaryType = {
  component: JsonObject;
  parentComponent: JsonObject;
  index: number;
  depth: number;
  handleComponentDrop: (...args: any[]) => any;
  editMode: boolean;
  columnWidth: number;
  availableColumnCount: number;
  onResizeStart: Function;
  onResizeStop: Function;
  onResize: Function;
  deleteComponent: Function;
  updateComponents: Function;
  parentId: number;
  id: number;
};

const DynamicComponent: FC<FilterSummaryType> = ({
  component,
  parentComponent,
  index,
  depth,
  handleComponentDrop,
  editMode,
  columnWidth,
  availableColumnCount,
  onResizeStart,
  onResizeStop,
  onResize,
  deleteComponent,
  parentId,
  updateComponents,
  id,
}) => {
  // inherit the size of parent columns
  const widthMultiple =
    parentComponent.type === COLUMN_TYPE
      ? parentComponent.meta.width || GRID_MIN_COLUMN_COUNT
      : component.meta.width || GRID_MIN_COLUMN_COUNT;

  const handleDeleteComponent = () => {
    deleteComponent(id, parentId);
  };

  const rowStyle = backgroundStyleOptions.find(
    opt => opt.value === (component.meta.background || BACKGROUND_TRANSPARENT),
  );

  const updateMeta = (metaKey: string, nextValue: string | number) => {
    updateComponents({
      [component.id]: {
        ...component,
        meta: {
          ...component.meta,
          [metaKey]: nextValue,
        },
      },
    });
  };

  const { Component } = reportViewerComponents.get(component.meta.componentKey);
  const reportViewerData = useSelector<RootState, ReportViewerComponentMetadata>(
    ({ nativeFilters, dataMask }) => ({
      nativeFilters,
      dataMask,
    }),
  );

  return (
    <Draggable
      // @ts-ignore
      component={component}
      // @ts-ignore
      parentComponent={parentComponent}
      orientation={parentComponent.type === ROW_TYPE ? 'column' : 'row'}
      index={index}
      depth={depth}
      onDrop={handleComponentDrop}
      editMode={editMode}
    >
      {({ dragSourceRef }) => (
        <WithPopoverMenu
          menuItems={[
            <BackgroundStyleDropdown
              id={`${component.id}-background`}
              value={component.meta.background}
              onChange={value => updateMeta('background', value)}
            />,
          ]}
          editMode={editMode}
        >
          <div
            data-test={`reportViewer-${component.componentKey}`}
            className={cx(
              'reportViewer-component',
              `reportViewer-${component.componentKey}`,
              rowStyle?.className,
            )}
            id={component.id}
          >
            <ResizableContainer
              id={component.id}
              adjustableWidth={parentComponent.type === ROW_TYPE}
              widthStep={columnWidth}
              widthMultiple={widthMultiple}
              heightStep={GRID_BASE_UNIT}
              adjustableHeight={false}
              heightMultiple={component.meta.height}
              minWidthMultiple={GRID_MIN_COLUMN_COUNT}
              minHeightMultiple={GRID_MIN_COLUMN_COUNT}
              maxWidthMultiple={availableColumnCount + widthMultiple}
              onResizeStart={onResizeStart}
              onResize={onResize}
              onResizeStop={onResizeStop}
            >
              <div
                ref={dragSourceRef}
                className="reportViewer-component"
                data-test="reportViewer-component-chart-holder"
              >
                {editMode && (
                  <HoverMenu position="top">
                    <DeleteComponentButton onDelete={handleDeleteComponent} />
                  </HoverMenu>
                )}
                <Suspense fallback={<div>{t('Loading...')}</div>}>
                  <Component reportViewerData={reportViewerData} />
                </Suspense>
              </div>
            </ResizableContainer>
          </div>
        </WithPopoverMenu>
      )}
    </Draggable>
  );
};
export default DynamicComponent;
