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
/* eslint-env browser */
import cx from 'classnames';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  addAlpha,
  css,
  isFeatureEnabled,
  FeatureFlag,
  JsonObject,
  styled,
  t,
  useTheme,
  useElementOnScreen,
} from '@superset-ui/core';
import { Global } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorBoundary from 'src/components/ErrorBoundary';
import BuilderComponentPane from 'src/reportViewer/components/BuilderComponentPane';
import ReportViewerHeader from 'src/reportViewer/containers/ReportViewerHeader';
import Icons from 'src/components/Icons';
import IconButton from 'src/reportViewer/components/IconButton';
import { Droppable } from 'src/reportViewer/components/dnd/DragDroppable';
import ReportViewerComponent from 'src/reportViewer/containers/ReportViewerComponent';
import WithPopoverMenu from 'src/reportViewer/components/menu/WithPopoverMenu';
import getDirectPathToTabIndex from 'src/reportViewer/util/getDirectPathToTabIndex';
import { URL_PARAMS } from 'src/constants';
import { getUrlParam } from 'src/utils/urlUtils';
import {
  ReportViewerLayout,
  FilterBarOrientation,
  RootState,
} from 'src/reportViewer/types';
import {
  setDirectPathToChild,
  setEditMode,
} from 'src/reportViewer/actions/reportViewerState';
import {
  deleteTopLevelTabs,
  handleComponentDrop,
} from 'src/reportViewer/actions/reportViewerLayout';
import {
  REPORTVIEWER_GRID_ID,
  REPORTVIEWER_ROOT_DEPTH,
  REPORTVIEWER_ROOT_ID,
  ReportViewerStandaloneMode,
} from 'src/reportViewer/util/constants';
import FilterBar from 'src/reportViewer/components/nativeFilters/FilterBar';
import Loading from 'src/components/Loading';
import { EmptyStateBig } from 'src/components/EmptyState';
import { useUiConfig } from 'src/components/UiConfigContext';
import ResizableSidebar from 'src/components/ResizableSidebar';
import {
  BUILDER_SIDEPANEL_WIDTH,
  CLOSED_FILTER_BAR_WIDTH,
  FILTER_BAR_HEADER_HEIGHT,
  MAIN_HEADER_HEIGHT,
  OPEN_FILTER_BAR_MAX_WIDTH,
  OPEN_FILTER_BAR_WIDTH,
  EMPTY_CONTAINER_Z_INDEX,
} from 'src/reportViewer/constants';
import { getRootLevelTabsComponent, shouldFocusTabs } from './utils';
import ReportViewerContainer from './ReportViewerContainer';
import { useNativeFilters } from './state';
import ReportViewerWrapper from './ReportViewerWrapper';

type ReportViewerBuilderProps = {};

// @z-index-above-reportViewer-charts + 1 = 11
const FiltersPanel = styled.div<{ width: number; hidden: boolean }>`
  grid-column: 1;
  grid-row: 1 / span 2;
  z-index: 11;
  width: ${({ width }) => width}px;
  ${({ hidden }) => hidden && `display: none;`}
`;

const StickyPanel = styled.div<{ width: number }>`
  position: sticky;
  top: -1px;
  width: ${({ width }) => width}px;
  flex: 0 0 ${({ width }) => width}px;
`;

// @z-index-above-reportViewer-popovers (99) + 1 = 100
const StyledHeader = styled.div`
  ${({ theme }) => css`
    grid-column: 2;
    grid-row: 1;
    position: sticky;
    top: 0;
    z-index: 100;
    max-width: 100vw;

    .empty-droptarget:before {
      position: absolute;
      content: '';
      display: none;
      width: calc(100% - ${theme.gridUnit * 2}px);
      height: calc(100% - ${theme.gridUnit * 2}px);
      left: ${theme.gridUnit}px;
      top: ${theme.gridUnit}px;
      border: 1px dashed transparent;
      border-radius: ${theme.gridUnit}px;
      opacity: 0.5;
    }
  `}
`;

const StyledContent = styled.div<{
  fullSizeChartId: number | null;
}>`
  grid-column: 2;
  grid-row: 2;
  // @z-index-above-reportViewer-header (100) + 1 = 101
  ${({ fullSizeChartId }) => fullSizeChartId && `z-index: 101;`}
`;

const ReportViewerContentWrapper = styled.div`
  ${({ theme }) => css`
    &.reportViewer {
      position: relative;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      height: 100%;

      /* drop shadow for top-level tabs only */
      & .reportViewer-component-tabs {
        box-shadow: 0 ${theme.gridUnit}px ${theme.gridUnit}px 0
          ${addAlpha(
            theme.colors.grayscale.dark2,
            parseFloat(theme.opacity.light) / 100,
          )};
        padding-left: ${theme.gridUnit *
        2}px; /* note this is added to tab-level padding, to match header */
      }

      .dropdown-toggle.btn.btn-primary .caret {
        color: ${theme.colors.grayscale.light5};
      }

      .background--transparent {
        background-color: transparent;
      }

      .background--white {
        background-color: ${theme.colors.grayscale.light5};
      }
    }
    &.reportViewer--editing {
      .grid-row:after,
      .reportViewer-component-tabs > .hover-menu:hover + div:after {
        border: 1px dashed transparent;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1;
        pointer-events: none;
      }

      .grid-row.grid-row--hovered:after,
      .reportViewer-component-tabs > .grid-row--hovered:after {
        border: 2px dashed ${theme.colors.primary.base};
      }

      .resizable-container {
        & .reportViewer-component-chart-holder {
          .reportViewer-chart {
            .chart-container {
              cursor: move;
              opacity: 0.2;
            }

            .slice_container {
              /* disable chart interactions in edit mode */
              pointer-events: none;
            }
          }

          &:hover .reportViewer-chart .chart-container {
            opacity: 0.7;
          }
        }

        &:hover,
        &.resizable-container--resizing:hover {
          & > .reportViewer-component-chart-holder:after {
            border: 1px dashed ${theme.colors.primary.base};
          }
        }
      }

      .resizable-container--resizing:hover > .grid-row:after,
      .hover-menu:hover + .grid-row:after,
      .reportViewer-component-tabs > .hover-menu:hover + div:after {
        border: 1px dashed ${theme.colors.primary.base};
        z-index: 2;
      }

      .grid-row:after,
      .reportViewer-component-tabs > .hover-menu + div:after {
        border: 1px dashed ${theme.colors.grayscale.light2};
      }

      /* provide hit area in case row contents is edge to edge */
      .reportViewer-component-tabs-content {
        > .dragdroppable-row {
          padding-top: ${theme.gridUnit * 4}px;
        }
      }

      .reportViewer-component-chart-holder {
        &:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 1;
          pointer-events: none;
          border: 1px solid transparent;
        }

        &:hover:after {
          border: 1px dashed ${theme.colors.primary.base};
          z-index: 2;
        }
      }

      .contract-trigger:before {
        display: none;
      }
    }

    & .reportViewer-component-tabs-content {
      & > div:not(:last-child):not(.empty-droptarget) {
        margin-bottom: ${theme.gridUnit * 4}px;
      }

      & > .empty-droptarget {
        z-index: ${EMPTY_CONTAINER_Z_INDEX};
        position: absolute;
        width: 100%;
      }

      & > .empty-droptarget:first-child:not(.empty-droptarget--full) {
        height: ${theme.gridUnit * 4}px;
        top: 0;
      }

      & > .empty-droptarget:last-child {
        height: ${theme.gridUnit * 4}px;
        bottom: ${-theme.gridUnit * 4}px;
      }
    }
  `}
`;

const StyledReportViewerContent = styled.div<{
  editMode: boolean;
  marginLeft: number;
}>`
  ${({ theme, editMode, marginLeft }) => css`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    height: auto;
    flex: 1;

    .grid-container .reportViewer-component-tabs {
      box-shadow: none;
      padding-left: 0;
    }

    .grid-container {
      /* without this, the grid will not get smaller upon toggling the builder panel on */
      width: 0;
      flex: 1;
      position: relative;
      margin-top: ${theme.gridUnit * 6}px;
      margin-right: ${theme.gridUnit * 8}px;
      margin-bottom: ${theme.gridUnit * 6}px;
      margin-left: ${marginLeft}px;

      ${editMode &&
      `
      max-width: calc(100% - ${
        BUILDER_SIDEPANEL_WIDTH + theme.gridUnit * 16
      }px);
    `}

      /* this is the ParentSize wrapper */
    & > div:first-child {
        height: inherit !important;
      }
    }

    .reportViewer-builder-sidepane {
      width: ${BUILDER_SIDEPANEL_WIDTH}px;
      z-index: 1;
    }

    .reportViewer-component-chart-holder {
      width: 100%;
      height: 100%;
      background-color: ${theme.colors.grayscale.light5};
      position: relative;
      padding: ${theme.gridUnit * 4}px;
      overflow-y: visible;

      // transitionable traits to show filter relevance
      transition:
        opacity ${theme.transitionTiming}s ease-in-out,
        border-color ${theme.transitionTiming}s ease-in-out,
        box-shadow ${theme.transitionTiming}s ease-in-out;

      &.fade-in {
        border-radius: ${theme.borderRadius}px;
        box-shadow:
          inset 0 0 0 2px ${theme.colors.primary.base},
          0 0 0 3px
            ${addAlpha(
              theme.colors.primary.base,
              parseFloat(theme.opacity.light) / 100,
            )};
      }

      &.fade-out {
        border-radius: ${theme.borderRadius}px;
        box-shadow: none;
      }

      & .missing-chart-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: auto;
        justify-content: center;

        .missing-chart-body {
          font-size: ${theme.typography.sizes.s}px;
          position: relative;
          display: flex;
        }
      }
    }
  `}
`;

const ReportViewerBuilder: FC<ReportViewerBuilderProps> = () => {
  const dispatch = useDispatch();
  const uiConfig = useUiConfig();
  const theme = useTheme();

  const reportViewerId = useSelector<RootState, string>(
    ({ reportViewerInfo }) => `${reportViewerInfo.id}`,
  );
  const reportViewerLayout = useSelector<RootState, ReportViewerLayout>(
    state => state.reportViewerLayout.present,
  );
  const editMode = useSelector<RootState, boolean>(
    state => state.reportViewerState.editMode,
  );
  const canEdit = useSelector<RootState, boolean>(
    ({ reportViewerInfo }) => reportViewerInfo.reportedit_perm,
  );
  const reportViewerIsSaving = useSelector<RootState, boolean>(
    ({ reportViewerState }) => reportViewerState.reportViewerIsSaving,
  );
  const fullSizeChartId = useSelector<RootState, number | null>(
    state => state.reportViewerState.fullSizeChartId,
  );
  const crossFiltersEnabled = isFeatureEnabled(
    FeatureFlag.ReportViewerCrossFilters,
  );
  const filterBarOrientation = useSelector<RootState, FilterBarOrientation>(
    ({ reportViewerInfo }) =>
      isFeatureEnabled(FeatureFlag.HorizontalFilterBar)
        ? reportViewerInfo.filterBarOrientation
        : FilterBarOrientation.Vertical,
  );

  const handleChangeTab = useCallback(
    ({ pathToTabIndex }: { pathToTabIndex: string[] }) => {
      dispatch(setDirectPathToChild(pathToTabIndex));
      window.scrollTo(0, 0);
    },
    [dispatch],
  );

  const handleDeleteTopLevelTabs = useCallback(() => {
    dispatch(deleteTopLevelTabs());

    const firstTab = getDirectPathToTabIndex(
      getRootLevelTabsComponent(reportViewerLayout),
      0,
    );
    dispatch(setDirectPathToChild(firstTab));
  }, [reportViewerLayout, dispatch]);

  const handleDrop = useCallback(
    dropResult => dispatch(handleComponentDrop(dropResult)),
    [dispatch],
  );

  const headerRef = useRef<HTMLDivElement>(null);
  const reportViewerRoot = reportViewerLayout[REPORTVIEWER_ROOT_ID];
  const rootChildId = reportViewerRoot?.children[0];
  const topLevelTabs =
    rootChildId !== REPORTVIEWER_GRID_ID
      ? reportViewerLayout[rootChildId]
      : undefined;
  const standaloneMode = getUrlParam(URL_PARAMS.standalone);
  const isReportViewer = standaloneMode === ReportViewerStandaloneMode.ReportViewer;
  const hideReportViewerHeader =
    uiConfig.hideTitle ||
    standaloneMode === ReportViewerStandaloneMode.HideNavAndTitle ||
    isReportViewer;

  const [barTopOffset, setBarTopOffset] = useState(0);

  useEffect(() => {
    setBarTopOffset(headerRef.current?.getBoundingClientRect()?.height || 0);

    let observer: ResizeObserver;
    if (global.hasOwnProperty('ResizeObserver') && headerRef.current) {
      observer = new ResizeObserver(entries => {
        setBarTopOffset(
          current => entries?.[0]?.contentRect?.height || current,
        );
      });

      observer.observe(headerRef.current);
    }

    return () => {
      observer?.disconnect();
    };
  }, []);

  const {
    showReportViewer,
    reportViewerFiltersOpen,
    toggleReportViewerFiltersOpen,
    nativeFiltersEnabled,
  } = useNativeFilters();

  const [containerRef, isSticky] = useElementOnScreen<HTMLDivElement>({
    threshold: [1],
  });

  const showFilterBar =
    (crossFiltersEnabled || nativeFiltersEnabled) && !editMode;

  const offset =
    FILTER_BAR_HEADER_HEIGHT +
    (isSticky || standaloneMode ? 0 : MAIN_HEADER_HEIGHT);

  const filterBarHeight = `calc(100vh - ${offset}px)`;
  const filterBarOffset = reportViewerFiltersOpen ? 0 : barTopOffset + 20;

  const draggableStyle = useMemo(
    () => ({
      marginLeft:
        reportViewerFiltersOpen ||
        editMode ||
        !nativeFiltersEnabled ||
        filterBarOrientation === FilterBarOrientation.Horizontal
          ? 0
          : -32,
    }),
    [
      reportViewerFiltersOpen,
      editMode,
      filterBarOrientation,
      nativeFiltersEnabled,
    ],
  );

  // If a new tab was added, update the directPathToChild to reflect it
  const currentTopLevelTabs = useRef(topLevelTabs);
  useEffect(() => {
    const currentTabsLength = currentTopLevelTabs.current?.children?.length;
    const newTabsLength = topLevelTabs?.children?.length;

    if (
      currentTabsLength !== undefined &&
      newTabsLength !== undefined &&
      newTabsLength > currentTabsLength
    ) {
      const lastTab = getDirectPathToTabIndex(
        getRootLevelTabsComponent(reportViewerLayout),
        newTabsLength - 1,
      );
      dispatch(setDirectPathToChild(lastTab));
    }

    currentTopLevelTabs.current = topLevelTabs;
  }, [topLevelTabs]);

  const renderDraggableContent = useCallback(
    ({ dropIndicatorProps }: { dropIndicatorProps: JsonObject }) => (
      <div>
        {!hideReportViewerHeader && <ReportViewerHeader />}
        {showFilterBar &&
          filterBarOrientation === FilterBarOrientation.Horizontal && (
            <FilterBar
              orientation={FilterBarOrientation.Horizontal}
              hidden={isReportViewer}
            />
          )}
        {dropIndicatorProps && <div {...dropIndicatorProps} />}
        {!isReportViewer && topLevelTabs && !uiConfig.hideNav && (
          <WithPopoverMenu
            shouldFocus={shouldFocusTabs}
            menuItems={[
              <IconButton
                icon={<Icons.FallOutlined iconSize="xl" />}
                label={t('Collapse tab content')}
                onClick={handleDeleteTopLevelTabs}
              />,
            ]}
            editMode={editMode}
          >
            {/* @ts-ignore */}
            <ReportViewerComponent
              id={topLevelTabs?.id}
              parentId={REPORTVIEWER_ROOT_ID}
              depth={REPORTVIEWER_ROOT_DEPTH + 1}
              index={0}
              renderTabContent={false}
              renderHoverMenu={false}
              onChangeTab={handleChangeTab}
            />
          </WithPopoverMenu>
        )}
      </div>
    ),
    [
      nativeFiltersEnabled,
      filterBarOrientation,
      editMode,
      handleChangeTab,
      handleDeleteTopLevelTabs,
      hideReportViewerHeader,
      isReportViewer,
      topLevelTabs,
      uiConfig.hideNav,
    ],
  );

  const reportViewerContentMarginLeft =
    !reportViewerFiltersOpen &&
    !editMode &&
    nativeFiltersEnabled &&
    filterBarOrientation !== FilterBarOrientation.Horizontal
      ? 0
      : theme.gridUnit * 8;

  return (
    <ReportViewerWrapper>
      {showFilterBar &&
        filterBarOrientation === FilterBarOrientation.Vertical && (
          <>
            <ResizableSidebar
              id={`reportViewer:${reportViewerId}`}
              enable={reportViewerFiltersOpen}
              minWidth={OPEN_FILTER_BAR_WIDTH}
              maxWidth={OPEN_FILTER_BAR_MAX_WIDTH}
              initialWidth={OPEN_FILTER_BAR_WIDTH}
            >
              {adjustedWidth => {
                const filterBarWidth = reportViewerFiltersOpen
                  ? adjustedWidth
                  : CLOSED_FILTER_BAR_WIDTH;
                return (
                  <FiltersPanel
                    width={filterBarWidth}
                    hidden={isReportViewer}
                    data-test="reportViewer-filters-panel"
                  >
                    <StickyPanel ref={containerRef} width={filterBarWidth}>
                      <ErrorBoundary>
                        <FilterBar
                          orientation={FilterBarOrientation.Vertical}
                          verticalConfig={{
                            filtersOpen: reportViewerFiltersOpen,
                            toggleFiltersBar: toggleReportViewerFiltersOpen,
                            width: filterBarWidth,
                            height: filterBarHeight,
                            offset: filterBarOffset,
                          }}
                        />
                      </ErrorBoundary>
                    </StickyPanel>
                  </FiltersPanel>
                );
              }}
            </ResizableSidebar>
          </>
        )}
      <StyledHeader ref={headerRef}>
        {/* @ts-ignore */}
        <Droppable
          data-test="top-level-tabs"
          className={cx(!topLevelTabs && editMode && 'empty-droptarget')}
          component={reportViewerRoot}
          parentComponent={null}
          depth={REPORTVIEWER_ROOT_DEPTH}
          index={0}
          orientation="column"
          onDrop={handleDrop}
          editMode={editMode}
          // you cannot drop on/displace tabs if they already exist
          disableDragDrop={!!topLevelTabs}
          style={draggableStyle}
        >
          {renderDraggableContent}
        </Droppable>
      </StyledHeader>
      <StyledContent fullSizeChartId={fullSizeChartId}>
        <Global
          styles={css`
            // @z-index-above-reportViewer-header (100) + 1 = 101
            ${fullSizeChartId &&
            `div > .filterStatusPopover.ant-popover{z-index: 101}`}
          `}
        />
        {!editMode &&
          !topLevelTabs &&
          reportViewerLayout[REPORTVIEWER_GRID_ID]?.children?.length === 0 && (
            <EmptyStateBig
              title={t('There are no charts added to this reportViewer')}
              description={
                canEdit &&
                t(
                  'Go to the edit mode to configure the reportViewer and add charts',
                )
              }
              buttonText={canEdit && t('Edit the reportViewer')}
              buttonAction={() => dispatch(setEditMode(true))}
              image="reportViewer.svg"
            />
          )}
        <ReportViewerContentWrapper
          data-test="reportViewer-content-wrapper"
          className={cx('reportViewer', editMode && 'reportViewer--editing')}
        >
          <StyledReportViewerContent
            className="reportViewer-content"
            editMode={editMode}
            marginLeft={reportViewerContentMarginLeft}
          >
            {showReportViewer ? (
              <ReportViewerContainer topLevelTabs={topLevelTabs} />
            ) : (
              <Loading />
            )}
            {editMode && <BuilderComponentPane topOffset={barTopOffset} />}
          </StyledReportViewerContent>
        </ReportViewerContentWrapper>
      </StyledContent>
      {reportViewerIsSaving && (
        <Loading
          css={css`
            && {
              position: fixed;
            }
          `}
        />
      )}
    </ReportViewerWrapper>
  );
};

export default ReportViewerBuilder;
