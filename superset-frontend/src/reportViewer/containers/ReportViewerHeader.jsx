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
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateDataMask } from 'src/dataMask/actions';
import ReportViewerHeader from 'src/reportViewer/components/Header';
import isReportViewerLoading from 'src/reportViewer/util/isReportViewerLoading';

import { reportViewerInfoChanged } from 'src/reportViewer/actions/reportViewerInfo';

import {
  setEditMode,
  showBuilderPane,
  fetchFaveStar,
  saveFaveStar,
  savePublished,
  setColorScheme,
  setUnsavedChanges,
  fetchCharts,
  updateCss,
  onChange,
  saveReportViewerRequest,
  setMaxUndoHistoryExceeded,
  maxUndoHistoryToast,
  setRefreshFrequency,
  onRefresh,
} from 'src/reportViewer/actions/reportViewerState';

import {
  undoLayoutAction,
  redoLayoutAction,
  updateReportViewerTitle,
  reportViewerTitleChanged,
} from 'src/reportViewer/actions/reportViewerLayout';
import {
  addSuccessToast,
  addDangerToast,
  addWarningToast,
} from 'src/components/MessageToasts/actions';

import { logEvent } from 'src/logger/actions';
import { REPORTVIEWER_HEADER_ID } from 'src/reportViewer/util/constants';

function mapStateToProps({
  reportViewerLayout: undoableLayout,
  reportViewerState,
  reportViewers,
  reportViewerInfo,
  charts,
  dataMask,
  user,
}) {
  return {
    reportViewerInfo,
    undoLength: undoableLayout.past.length,
    redoLength: undoableLayout.future.length,
    layout: undoableLayout.present,
    reportViewerTitle: (
      (undoableLayout.present[REPORTVIEWER_HEADER_ID] || {}).meta || {}
    ).text,
    expandedSlices: reportViewerState.expandedSlices,
    refreshFrequency: reportViewerState.refreshFrequency,
    shouldPersistRefreshFrequency:
      !!reportViewerState.shouldPersistRefreshFrequency,
    customCss: reportViewerState.css,
    colorNamespace: reportViewerState.colorNamespace,
    colorScheme: reportViewerState.colorScheme,
    charts,
    dataMask,
    user,
    isStarred: !!reportViewerState.isStarred,
    isPublished: !!reportViewerState.isPublished,
    isLoading: isReportViewerLoading(charts),
    hasUnsavedChanges: !!reportViewerState.hasUnsavedChanges,
    maxUndoHistoryExceeded: !!reportViewerState.maxUndoHistoryExceeded,
    lastModifiedTime: Math.max(
      reportViewerState.lastModifiedTime,
      reportViewerInfo.last_modified_time,
    ),
    editMode: !!reportViewerState.editMode,
    slug: reportViewerInfo.slug,
    metadata: reportViewerInfo.metadata,
    reportViewers,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addSuccessToast,
      addDangerToast,
      addWarningToast,
      onUndo: undoLayoutAction,
      onRedo: redoLayoutAction,
      setEditMode,
      showBuilderPane,
      setColorScheme,
      setUnsavedChanges,
      fetchFaveStar,
      saveFaveStar,
      savePublished,
      fetchCharts,
      updateReportViewerTitle,
      updateCss,
      onChange,
      onSave: saveReportViewerRequest,
      setMaxUndoHistoryExceeded,
      maxUndoHistoryToast,
      logEvent,
      setRefreshFrequency,
      onRefresh,
      reportViewerInfoChanged,
      reportViewerTitleChanged,
      updateDataMask,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportViewerHeader);
