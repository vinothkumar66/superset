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
import { FeatureFlag, isFeatureEnabled } from '@superset-ui/core';
import { chart } from 'src/components/Chart/chartReducer';
import { initSliceEntities } from 'src/reportViewer/reducers/sliceEntities';
import { getInitialState as getInitialNativeFilterState } from 'src/reportViewer/reducers/nativeFilters';
import { applyDefaultFormData } from 'src/explore/store';
import { buildActiveFilters } from 'src/reportViewer/util/activeReportViewerFilters';
import { findPermission } from 'src/utils/findPermission';
import {
  canUserEditReportViewer,
  canUserSaveAsReportViewer,
} from 'src/reportViewer/util/permissionUtils';
import {
  getCrossFiltersConfiguration,
  isCrossFiltersEnabled,
} from 'src/reportViewer/util/crossFilters';
import {
  REPORTVIEWER_HEADER_ID,
  REPORTVIEWER_FOOTER_ID,
  GRID_DEFAULT_CHART_WIDTH,
  GRID_COLUMN_COUNT,
  REPORTVIEWER_ROOT_ID,
} from 'src/reportViewer/util/constants';
import {
  REPORTVIEWER_HEADER_TYPE,
  REPORTVIEWER_FOOTER_TYPE,
  CHART_TYPE,
  ROW_TYPE,
} from 'src/reportViewer/util/componentTypes';
import findFirstParentContainerId from 'src/reportViewer/util/findFirstParentContainer';
import getEmptyLayout from 'src/reportViewer/util/getEmptyLayout';
import getLocationHash from 'src/reportViewer/util/getLocationHash';
import newComponentFactory from 'src/reportViewer/util/newComponentFactory';
import { URL_PARAMS } from 'src/constants';
import { getUrlParam } from 'src/utils/urlUtils';
import { ResourceStatus } from 'src/hooks/apiResources/apiResources';
import extractUrlParams from '../util/extractUrlParams';
import { updateColorSchema } from './reportViewerInfo';
import updateComponentParentsList from '../util/updateComponentParentsList';
import { FilterBarOrientation } from '../types';

export const HYDRATE_REPORTVIEWER = 'HYDRATE_REPORTVIEWER';

export const hydrateReportViewer =
  ({ history, reportViewer, charts, dataMask, activeTabs }) =>
  (dispatch, getState) => {
    const { user, common, reportViewerState } = getState();
    const { metadata, position_data: positionData } = reportViewer;
    const regularUrlParams = extractUrlParams('regular');
    const reservedUrlParams = extractUrlParams('reserved');
    const editMode = reservedUrlParams.edit === 'true';

    charts.forEach(chart => {
      // eslint-disable-next-line no-param-reassign
      chart.slice_id = chart.form_data.slice_id;
    });

    if (metadata?.shared_label_colors) {
      updateColorSchema(metadata, metadata?.shared_label_colors);
    }

    // Priming the color palette with user's label-color mapping provided in
    // the reportViewer's JSON metadata
    if (metadata?.label_colors) {
      updateColorSchema(metadata, metadata?.label_colors);
    }

    // new report: position_json could be {} or null
    const layout =
      positionData && Object.keys(positionData).length > 0
        ? positionData
        : getEmptyLayout();

    // create a lookup to sync layout names with slice names
    const chartIdToLayoutId = {};
    Object.values(layout).forEach(layoutComponent => {
      if (layoutComponent.type === CHART_TYPE) {
        chartIdToLayoutId[layoutComponent.meta.chartId] = layoutComponent.id;
      }
    });

    // find root level chart container node for newly-added slices
    const parentId = findFirstParentContainerId(layout);
    const parent = layout[parentId];
    let newSlicesContainer;
    let newSlicesContainerWidth = 0;

    const chartQueries = {};
    const reportViewerFilters = {};
    const slices = {};
    const sliceIds = new Set();
    const slicesFromExploreCount = new Map();

    charts.forEach(slice => {
      const key = slice.slice_id;
      const formData = {
        ...slice.form_data,
        url_params: {
          ...slice.form_data.url_params,
          ...regularUrlParams,
        },
      };
      chartQueries[key] = {
        ...chart,
        id: key,
        form_data: applyDefaultFormData(formData),
      };

      slices[key] = {
        slice_id: key,
        slice_url: slice.slice_url,
        slice_name: slice.slice_name,
        form_data: slice.form_data,
        viz_type: slice.form_data.viz_type,
        datasource: slice.form_data.datasource,
        description: slice.description,
        description_markeddown: slice.description_markeddown,
        owners: slice.owners,
        modified: slice.modified,
        changed_on: new Date(slice.changed_on).getTime(),
      };

      sliceIds.add(key);

      // if there are newly added slices from explore view, fill slices into 1 or more rows
      if (!chartIdToLayoutId[key] && layout[parentId]) {
        if (
          newSlicesContainerWidth === 0 ||
          newSlicesContainerWidth + GRID_DEFAULT_CHART_WIDTH > GRID_COLUMN_COUNT
        ) {
          newSlicesContainer = newComponentFactory(
            ROW_TYPE,
            (parent.parents || []).slice(),
          );
          layout[newSlicesContainer.id] = newSlicesContainer;
          parent.children.push(newSlicesContainer.id);
          newSlicesContainerWidth = 0;
        }

        const chartHolder = newComponentFactory(
          CHART_TYPE,
          {
            chartId: slice.slice_id,
          },
          (newSlicesContainer.parents || []).slice(),
        );

        const count = (slicesFromExploreCount.get(slice.slice_id) ?? 0) + 1;
        chartHolder.id = `${CHART_TYPE}-explore-${slice.slice_id}-${count}`;
        slicesFromExploreCount.set(slice.slice_id, count);

        layout[chartHolder.id] = chartHolder;
        newSlicesContainer.children.push(chartHolder.id);
        chartIdToLayoutId[chartHolder.meta.chartId] = chartHolder.id;
        newSlicesContainerWidth += GRID_DEFAULT_CHART_WIDTH;
      }

      // sync layout names with current slice names in case a slice was edited
      // in explore since the layout was updated. name updates go through layout for undo/redo
      // functionality and python updates slice names based on layout upon reportViewer save
      const layoutId = chartIdToLayoutId[key];
      if (layoutId && layout[layoutId]) {
        layout[layoutId].meta.sliceName = slice.slice_name;
      }
    });

    // make sure that parents tree is built
    if (
      Object.values(layout).some(
        element => element.id !== REPORTVIEWER_ROOT_ID && !element.parents,
      )
    ) {
      updateComponentParentsList({
        currentComponent: layout[REPORTVIEWER_ROOT_ID],
        layout,
      });
    }

    buildActiveFilters({
      reportViewerFilters,
      components: layout,
    });

    // store the header as a layout component so we can undo/redo changes
    layout[REPORTVIEWER_HEADER_ID] = {
      id: REPORTVIEWER_HEADER_ID,
      type: REPORTVIEWER_HEADER_TYPE,
      meta: {
        text: reportViewer.reportViewer_title,
      },
    };
    layout[REPORTVIEWER_FOOTER_ID] = {
      id: REPORTVIEWER_FOOTER_ID,
      type: REPORTVIEWER_FOOTER_TYPE,
      meta: {
        text: reportViewer.reportViewer_title,
      },
    };
    const reportViewerLayout = {
      past: [],
      present: layout,
      future: [],
    };

    // Searches for a focused_chart parameter in the URL to automatically focus a chart
    const focusedChartId = getUrlParam(URL_PARAMS.reportViewerFocusedChart);
    let focusedChartLayoutId;
    if (focusedChartId) {
      // Converts focused_chart to reportViewer layout id
      const found = Object.values(reportViewerLayout.present).find(
        element => element.meta?.chartId === focusedChartId,
      );
      focusedChartLayoutId = found?.id;
      // Removes the focused_chart parameter from the URL
      const params = new URLSearchParams(window.location.search);
      params.delete(URL_PARAMS.reportViewerFocusedChart.name);
      history.replace({
        search: params.toString(),
      });
    }

    // find direct link component and path from root
    const directLinkComponentId = focusedChartLayoutId || getLocationHash();
    let directPathToChild = reportViewerState.directPathToChild || [];
    if (layout[directLinkComponentId]) {
      directPathToChild = (layout[directLinkComponentId].parents || []).slice();
      directPathToChild.push(directLinkComponentId);
    }

    const nativeFilters = getInitialNativeFilterState({
      filterConfig: metadata?.native_filter_configuration || [],
    });

    if (isFeatureEnabled(FeatureFlag.ReportViewerCrossFilters)) {
      const { chartConfiguration, globalChartConfiguration } =
        getCrossFiltersConfiguration(
          reportViewerLayout.present,
          metadata,
          chartQueries,
        );
      metadata.chart_configuration = chartConfiguration;
      metadata.global_chart_configuration = globalChartConfiguration;
    }

    const { roles } = user;
    const canEdit = canUserEditReportViewer(reportViewer, user);
    const crossFiltersEnabled = isCrossFiltersEnabled(
      metadata.cross_filters_enabled,
    );

    return dispatch({
      type: HYDRATE_REPORTVIEWER,
      data: {
        sliceEntities: { ...initSliceEntities, slices, isLoading: false },
        charts: chartQueries,
        // read-only data
        reportViewerInfo: {
          ...reportViewer,
          metadata,
          userId: user.userId ? String(user.userId) : null, // legacy, please use state.user instead
          reportedit_perm: canEdit,
          reportsave_perm: canUserSaveAsReportViewer(reportViewer, user),
          reportshare_perm: findPermission(
            'can_share_reportViewer',
            'Superset',
            roles,
          ),
          superset_can_explore: findPermission(
            'can_explore',
            'Superset',
            roles,
          ),
          superset_can_share: findPermission(
            'can_share_chart',
            'Superset',
            roles,
          ),
          superset_can_csv: findPermission('can_csv', 'Superset', roles),
          common: {
            // legacy, please use state.common instead
            flash_messages: common?.flash_messages,
            conf: common?.conf,
          },
          filterBarOrientation:
            (isFeatureEnabled(FeatureFlag.HorizontalFilterBar) &&
              metadata.filter_bar_orientation) ||
            FilterBarOrientation.Vertical,
          crossFiltersEnabled,
        },
        dataMask,
        reportViewerFilters,
        nativeFilters,
        reportViewerState: {
          preselectNativeFilters: getUrlParam(URL_PARAMS.nativeFilters),
          sliceIds: Array.from(sliceIds),
          directPathToChild,
          directPathLastUpdated: Date.now(),
          focusedFilterField: null,
          expandedSlices: metadata?.expanded_slices || {},
          refreshFrequency: metadata?.refresh_frequency || 0,
          // reportViewer viewers can set refresh frequency for the current visit,
          // only persistent refreshFrequency will be saved to backend
          shouldPersistRefreshFrequency: false,
          css: reportViewer.css || '',
          colorNamespace: metadata?.color_namespace || null,
          colorScheme: metadata?.color_scheme || null,
          editMode: canEdit && editMode,
          isPublished: reportViewer.published,
          hasUnsavedChanges: false,
          reportViewerIsSaving: false,
          maxUndoHistoryExceeded: false,
          lastModifiedTime: reportViewer.changed_on,
          isRefreshing: false,
          isFiltersRefreshing: false,
          activeTabs: activeTabs || reportViewerState?.activeTabs || [],
          datasetsStatus: ResourceStatus.Loading,
        },
        reportViewerLayout,
      },
    });
  };
