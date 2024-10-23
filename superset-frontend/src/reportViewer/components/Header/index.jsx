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
import moment from 'moment';
import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  styled,
  css,
  isFeatureEnabled,
  FeatureFlag,
  t,
  getSharedLabelColor,
  getExtensionsRegistry,
} from '@superset-ui/core';
import { Global } from '@emotion/react';
import {
  LOG_ACTIONS_PERIODIC_RENDER_REPORTVIEWER,
  LOG_ACTIONS_FORCE_REFRESH_REPORTVIEWER,
  LOG_ACTIONS_TOGGLE_EDIT_REPORTVIEWER,
} from 'src/logger/LogUtils';
import Icons from 'src/components/Icons';
import Button from 'src/components/Button';
import { AntdButton } from 'src/components/';
import { findPermission } from 'src/utils/findPermission';
import { Tooltip } from 'src/components/Tooltip';
import { safeStringify } from 'src/utils/safeStringify';
import HeaderActionsDropdown from 'src/reportViewer/components/Header/HeaderActionsDropdown';
import PublishedStatus from 'src/reportViewer/components/PublishedStatus';
import UndoRedoKeyListeners from 'src/reportViewer/components/UndoRedoKeyListeners';
import PropertiesModal from 'src/reportViewer/components/PropertiesModal';
import { chartPropShape } from 'src/reportViewer/util/propShapes';
import getOwnerName from 'src/utils/getOwnerName';
import {
  UNDO_LIMIT,
  SAVE_TYPE_OVERWRITE,
  REPORTVIEWER_POSITION_DATA_LIMIT,
} from 'src/reportViewer/util/constants';
import setPeriodicRunner, {
  stopPeriodicRender,
} from 'src/reportViewer/util/setPeriodicRunner';
import { PageHeaderWithActions } from 'src/components/PageHeaderWithActions';
import MetadataBar, { MetadataType } from 'src/components/MetadataBar';
import ReportViewerEmbedModal from '../EmbeddedModal';
import OverwriteConfirm from '../OverwriteConfirm';

const extensionsRegistry = getExtensionsRegistry();

const propTypes = {
  addSuccessToast: PropTypes.func.isRequired,
  addDangerToast: PropTypes.func.isRequired,
  addWarningToast: PropTypes.func.isRequired,
  user: PropTypes.object, // UserWithPermissionsAndRoles,
  reportViewerInfo: PropTypes.object.isRequired,
  reportViewerTitle: PropTypes.string,
  dataMask: PropTypes.object.isRequired,
  charts: PropTypes.objectOf(chartPropShape).isRequired,
  layout: PropTypes.object.isRequired,
  expandedSlices: PropTypes.object,
  customCss: PropTypes.string,
  colorNamespace: PropTypes.string,
  colorScheme: PropTypes.string,
  setColorScheme: PropTypes.func.isRequired,
  setUnsavedChanges: PropTypes.func.isRequired,
  isStarred: PropTypes.bool.isRequired,
  isPublished: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  fetchFaveStar: PropTypes.func.isRequired,
  fetchCharts: PropTypes.func.isRequired,
  saveFaveStar: PropTypes.func.isRequired,
  savePublished: PropTypes.func.isRequired,
  updateReportViewerTitle: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func.isRequired,
  showBuilderPane: PropTypes.func.isRequired,
  updateCss: PropTypes.func.isRequired,
  logEvent: PropTypes.func.isRequired,
  hasUnsavedChanges: PropTypes.bool.isRequired,
  maxUndoHistoryExceeded: PropTypes.bool.isRequired,
  lastModifiedTime: PropTypes.number.isRequired,

  // redux
  onRefresh: PropTypes.func.isRequired,
  onUndo: PropTypes.func.isRequired,
  onRedo: PropTypes.func.isRequired,
  undoLength: PropTypes.number.isRequired,
  redoLength: PropTypes.number.isRequired,
  setMaxUndoHistoryExceeded: PropTypes.func.isRequired,
  maxUndoHistoryToast: PropTypes.func.isRequired,
  refreshFrequency: PropTypes.number,
  shouldPersistRefreshFrequency: PropTypes.bool.isRequired,
  setRefreshFrequency: PropTypes.func.isRequired,
  reportViewerInfoChanged: PropTypes.func.isRequired,
  reportViewerTitleChanged: PropTypes.func.isRequired,
};

const defaultProps = {
  colorNamespace: undefined,
  colorScheme: undefined,
};

const headerContainerStyle = theme => css`
  border-bottom: 1px solid ${theme.colors.grayscale.light2};
`;

const editButtonStyle = theme => css`
  color: ${theme.colors.primary.dark2};
`;

const actionButtonsStyle = theme => css`
  display: flex;
  align-items: center;

  .action-schedule-reportViewer {
    margin-left: ${theme.gridUnit * 2}px;
  }

  .undoRedo {
    display: flex;
    margin-right: ${theme.gridUnit * 2}px;
  }
`;

const StyledUndoRedoButton = styled(AntdButton)`
  padding: 0;
  &:hover {
    background: transparent;
  }
`;

const undoRedoStyle = theme => css`
  color: ${theme.colors.grayscale.light1};
  &:hover {
    color: ${theme.colors.grayscale.base};
  }
`;

const undoRedoEmphasized = theme => css`
  color: ${theme.colors.grayscale.base};
`;

const undoRedoDisabled = theme => css`
  color: ${theme.colors.grayscale.light2};
`;

const saveBtnStyle = theme => css`
  min-width: ${theme.gridUnit * 17}px;
  height: ${theme.gridUnit * 8}px;
`;

const discardBtnStyle = theme => css`
  min-width: ${theme.gridUnit * 22}px;
  height: ${theme.gridUnit * 8}px;
`;

class Header extends PureComponent {
  static discardChanges() {
    const url = new URL(window.location.href);

    url.searchParams.delete('edit');
    window.location.assign(url);
  }

  constructor(props) {
    super(props);
    this.state = {
      didNotifyMaxUndoHistoryToast: false,
      emphasizeUndo: false,
      emphasizeRedo: false,
      showingPropertiesModal: false,
      isDropdownVisible: false,
    };

    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleCtrlZ = this.handleCtrlZ.bind(this);
    this.handleCtrlY = this.handleCtrlY.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.forceRefresh = this.forceRefresh.bind(this);
    this.startPeriodicRender = this.startPeriodicRender.bind(this);
    this.overwriteReportViewer = this.overwriteReportViewer.bind(this);
    this.showPropertiesModal = this.showPropertiesModal.bind(this);
    this.hidePropertiesModal = this.hidePropertiesModal.bind(this);
    this.setIsDropdownVisible = this.setIsDropdownVisible.bind(this);
  }

  componentDidMount() {
    const { refreshFrequency } = this.props;
    this.startPeriodicRender(refreshFrequency * 1000);
  }

  componentDidUpdate(prevProps) {
    if (this.props.refreshFrequency !== prevProps.refreshFrequency) {
      const { refreshFrequency } = this.props;
      this.startPeriodicRender(refreshFrequency * 1000);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      UNDO_LIMIT - nextProps.undoLength <= 0 &&
      !this.state.didNotifyMaxUndoHistoryToast
    ) {
      this.setState(() => ({ didNotifyMaxUndoHistoryToast: true }));
      this.props.maxUndoHistoryToast();
    }
    if (
      nextProps.undoLength > UNDO_LIMIT &&
      !this.props.maxUndoHistoryExceeded
    ) {
      this.props.setMaxUndoHistoryExceeded();
    }
  }

  componentWillUnmount() {
    stopPeriodicRender(this.refreshTimer);
    this.props.setRefreshFrequency(0);
    clearTimeout(this.ctrlYTimeout);
    clearTimeout(this.ctrlZTimeout);
  }

  handleChangeText(nextText) {
    const { updateReportViewerTitle, onChange } = this.props;
    if (nextText && this.props.reportViewerTitle !== nextText) {
      updateReportViewerTitle(nextText);
      onChange();
    }
  }

  setIsDropdownVisible(visible) {
    this.setState({
      isDropdownVisible: visible,
    });
  }

  handleCtrlY() {
    this.props.onRedo();
    this.setState({ emphasizeRedo: true }, () => {
      if (this.ctrlYTimeout) clearTimeout(this.ctrlYTimeout);
      this.ctrlYTimeout = setTimeout(() => {
        this.setState({ emphasizeRedo: false });
      }, 100);
    });
  }

  handleCtrlZ() {
    this.props.onUndo();
    this.setState({ emphasizeUndo: true }, () => {
      if (this.ctrlZTimeout) clearTimeout(this.ctrlZTimeout);
      this.ctrlZTimeout = setTimeout(() => {
        this.setState({ emphasizeUndo: false });
      }, 100);
    });
  }

  forceRefresh() {
    if (!this.props.isLoading) {
      const chartList = Object.keys(this.props.charts);
      this.props.logEvent(LOG_ACTIONS_FORCE_REFRESH_REPORTVIEWER, {
        force: true,
        interval: 0,
        chartCount: chartList.length,
      });
      return this.props.onRefresh(
        chartList,
        true,
        0,
        this.props.reportViewerInfo.id,
      );
    }
    return false;
  }

  startPeriodicRender(interval) {
    let intervalMessage;

    if (interval) {
      const { reportViewerInfo } = this.props;
      const periodicRefreshOptions =
        reportViewerInfo.common?.conf?.REPORTVIEWER_AUTO_REFRESH_INTERVALS;
      const predefinedValue = periodicRefreshOptions.find(
        option => Number(option[0]) === interval / 1000,
      );

      if (predefinedValue) {
        intervalMessage = t(predefinedValue[1]);
      } else {
        intervalMessage = moment.duration(interval, 'millisecond').humanize();
      }
    }

    const periodicRender = () => {
      const { fetchCharts, logEvent, charts, reportViewerInfo } = this.props;
      const { metadata } = reportViewerInfo;
      const immune = metadata.timed_refresh_immune_slices || [];
      const affectedCharts = Object.values(charts)
        .filter(chart => immune.indexOf(chart.id) === -1)
        .map(chart => chart.id);

      logEvent(LOG_ACTIONS_PERIODIC_RENDER_REPORTVIEWER, {
        interval,
        chartCount: affectedCharts.length,
      });
      this.props.addWarningToast(
        t(
          `This reportViewer is currently auto refreshing; the next auto refresh will be in %s.`,
          intervalMessage,
        ),
      );
      if (reportViewerInfo.common.conf.REPORTVIEWER_AUTO_REFRESH_MODE === 'fetch') {
        // force-refresh while auto-refresh in reportViewer
        return fetchCharts(
          affectedCharts,
          false,
          interval * 0.2,
          reportViewerInfo.id,
        );
      }
      return fetchCharts(
        affectedCharts,
        true,
        interval * 0.2,
        reportViewerInfo.id,
      );
    };

    this.refreshTimer = setPeriodicRunner({
      interval,
      periodicRender,
      refreshTimer: this.refreshTimer,
    });
  }

  toggleEditMode() {
    this.props.logEvent(LOG_ACTIONS_TOGGLE_EDIT_REPORTVIEWER, {
      edit_mode: !this.props.editMode,
    });
    this.props.setEditMode(!this.props.editMode);
  }

  overwriteReportViewer() {
    const {
      reportViewerTitle,
      layout: positions,
      colorScheme,
      colorNamespace,
      customCss,
      reportViewerInfo,
      refreshFrequency: currentRefreshFrequency,
      shouldPersistRefreshFrequency,
      lastModifiedTime,
      slug,
    } = this.props;

    // check refresh frequency is for current session or persist
    const refreshFrequency = shouldPersistRefreshFrequency
      ? currentRefreshFrequency
      : reportViewerInfo.metadata?.refresh_frequency;

    const currentColorScheme =
      reportViewerInfo?.metadata?.color_scheme || colorScheme;
    const currentColorNamespace =
      reportViewerInfo?.metadata?.color_namespace || colorNamespace;
    const currentSharedLabelColors = Object.fromEntries(
      getSharedLabelColor().getColorMap(),
    );

    const data = {
      certified_by: reportViewerInfo.certified_by,
      certification_details: reportViewerInfo.certification_details,
      css: customCss,
      reportViewer_title: reportViewerTitle,
      last_modified_time: lastModifiedTime,
      owners: reportViewerInfo.owners,
      roles: reportViewerInfo.roles,
      slug,
      metadata: {
        ...reportViewerInfo?.metadata,
        color_namespace: currentColorNamespace,
        color_scheme: currentColorScheme,
        positions,
        refresh_frequency: refreshFrequency,
        shared_label_colors: currentSharedLabelColors,
      },
    };

    // make sure positions data less than DB storage limitation:
    const positionJSONLength = safeStringify(positions).length;
    const limit =
      reportViewerInfo.common.conf.SUPERSET_REPORTVIEWER_POSITION_DATA_LIMIT ||
      REPORTVIEWER_POSITION_DATA_LIMIT;
    if (positionJSONLength >= limit) {
      this.props.addDangerToast(
        t(
          'Your reportViewer is too large. Please reduce its size before saving it.',
        ),
      );
    } else {
      if (positionJSONLength >= limit * 0.9) {
        this.props.addWarningToast('Your reportViewer is near the size limit.');
      }

      this.props.onSave(data, reportViewerInfo.id, SAVE_TYPE_OVERWRITE);
    }
  }

  showPropertiesModal() {
    this.setState({ showingPropertiesModal: true });
  }

  hidePropertiesModal() {
    this.setState({ showingPropertiesModal: false });
  }

  showEmbedModal = () => {
    this.setState({ showingEmbedModal: true });
  };

  hideEmbedModal = () => {
    this.setState({ showingEmbedModal: false });
  };

  getMetadataItems = () => {
    const { reportViewerInfo } = this.props;
    return [
      {
        type: MetadataType.LastModified,
        value: reportViewerInfo.changed_on_delta_humanized,
        modifiedBy:
          getOwnerName(reportViewerInfo.changed_by) || t('Not available'),
      },
      {
        type: MetadataType.Owner,
        createdBy: getOwnerName(reportViewerInfo.created_by) || t('Not available'),
        owners:
          reportViewerInfo.owners.length > 0
            ? reportViewerInfo.owners.map(getOwnerName)
            : t('None'),
        createdOn: reportViewerInfo.created_on_delta_humanized,
      },
    ];
  };

  render() {
    const {
      reportViewerTitle,
      layout,
      expandedSlices,
      customCss,
      colorNamespace,
      dataMask,
      setColorScheme,
      setUnsavedChanges,
      colorScheme,
      onUndo,
      onRedo,
      undoLength,
      redoLength,
      onChange,
      onSave,
      updateCss,
      editMode,
      isPublished,
      user,
      reportViewerInfo,
      hasUnsavedChanges,
      isLoading,
      refreshFrequency,
      shouldPersistRefreshFrequency,
      setRefreshFrequency,
      lastModifiedTime,
      logEvent,
    } = this.props;

    const userCanEdit =
      reportViewerInfo.reportedit_perm && !reportViewerInfo.is_managed_externally;
    const userCanShare = reportViewerInfo.reportshare_perm;
    const userCanSaveAs = reportViewerInfo.reportsave_perm;
    const userCanCurate =
      isFeatureEnabled(FeatureFlag.EmbeddedSuperset) &&
      findPermission('can_set_embedded', 'ReportViewer', user.roles);
    const refreshLimit =
      reportViewerInfo.common?.conf?.SUPERSET_REPORTVIEWER_PERIODICAL_REFRESH_LIMIT;
    const refreshWarning =
      reportViewerInfo.common?.conf
        ?.SUPERSET_REPORTVIEWER_PERIODICAL_REFRESH_WARNING_MESSAGE;

    const handleOnPropertiesChange = updates => {
      const { reportViewerInfoChanged, reportViewerTitleChanged } = this.props;

      setColorScheme(updates.colorScheme);
      reportViewerInfoChanged({
        slug: updates.slug,
        metadata: JSON.parse(updates.jsonMetadata || '{}'),
        certified_by: updates.certifiedBy,
        certification_details: updates.certificationDetails,
        owners: updates.owners,
        roles: updates.roles,
      });
      setUnsavedChanges(true);
      reportViewerTitleChanged(updates.title);
    };

    const NavExtension = extensionsRegistry.get('reportViewer.nav.right');

    return (
      <div
        css={headerContainerStyle}
        data-test="reportViewer-header-container"
        data-test-id={reportViewerInfo.id}
        className="reportViewer-header-container"
      >
        <PageHeaderWithActions
          editableTitleProps={{
            title: reportViewerTitle,
            canEdit: userCanEdit && editMode,
            onSave: this.handleChangeText,
            placeholder: t('Add the name of the reportViewer'),
            label: t('ReportViewer title'),
            showTooltip: false,
          }}
          certificatiedBadgeProps={{
            certifiedBy: reportViewerInfo.certified_by,
            details: reportViewerInfo.certification_details,
          }}
          faveStarProps={{
            itemId: reportViewerInfo.id,
            fetchFaveStar: this.props.fetchFaveStar,
            saveFaveStar: this.props.saveFaveStar,
            isStarred: this.props.isStarred,
            showTooltip: true,
          }}
          titlePanelAdditionalItems={[
            !editMode && (
              <PublishedStatus
                reportViewerId={reportViewerInfo.id}
                isPublished={isPublished}
                savePublished={this.props.savePublished}
                canEdit={userCanEdit}
                canSave={userCanSaveAs}
                visible={!editMode}
              />
            ),
            !editMode && (
              <MetadataBar
                items={this.getMetadataItems()}
                tooltipPlacement="bottom"
              />
            ),
          ]}
          rightPanelAdditionalItems={
            <div className="button-container">
              {userCanSaveAs && (
                <div
                  className="button-container"
                  data-test="reportViewer-edit-actions"
                >
                  {editMode && (
                    <div css={actionButtonsStyle}>
                      <div className="undoRedo">
                        <Tooltip
                          id="reportViewer-undo-tooltip"
                          title={t('Undo the action')}
                        >
                          <StyledUndoRedoButton
                            type="text"
                            disabled={undoLength < 1}
                            onClick={undoLength && onUndo}
                          >
                            <Icons.Undo
                              css={[
                                undoRedoStyle,
                                this.state.emphasizeUndo && undoRedoEmphasized,
                                undoLength < 1 && undoRedoDisabled,
                              ]}
                              data-test="undo-action"
                              iconSize="xl"
                            />
                          </StyledUndoRedoButton>
                        </Tooltip>
                        <Tooltip
                          id="reportViewer-redo-tooltip"
                          title={t('Redo the action')}
                        >
                          <StyledUndoRedoButton
                            type="text"
                            disabled={redoLength < 1}
                            onClick={redoLength && onRedo}
                          >
                            <Icons.Redo
                              css={[
                                undoRedoStyle,
                                this.state.emphasizeRedo && undoRedoEmphasized,
                                redoLength < 1 && undoRedoDisabled,
                              ]}
                              data-test="redo-action"
                              iconSize="xl"
                            />
                          </StyledUndoRedoButton>
                        </Tooltip>
                      </div>
                      <Button
                        css={discardBtnStyle}
                        buttonSize="small"
                        onClick={this.constructor.discardChanges}
                        buttonStyle="default"
                        data-test="discard-changes-button"
                        aria-label={t('Discard')}
                      >
                        {t('Discard')}
                      </Button>
                      <Button
                        css={saveBtnStyle}
                        buttonSize="small"
                        disabled={!hasUnsavedChanges}
                        buttonStyle="primary"
                        onClick={this.overwriteReportViewer}
                        data-test="header-save-button"
                        aria-label={t('Save')}
                      >
                        {t('Save')}
                      </Button>
                    </div>
                  )}
                </div>
              )}
              {editMode ? (
                <UndoRedoKeyListeners
                  onUndo={this.handleCtrlZ}
                  onRedo={this.handleCtrlY}
                />
              ) : (
                <div css={actionButtonsStyle}>
                  {NavExtension && <NavExtension />}
                  {userCanEdit && (
                    <Button
                      buttonStyle="secondary"
                      onClick={this.toggleEditMode}
                      data-test="edit-reportViewer-button"
                      className="action-button"
                      css={editButtonStyle}
                      aria-label={t('Edit reportViewer')}
                    >
                      {t('Edit reportViewer')}
                    </Button>
                  )}
                </div>
              )}
            </div>
          }
          menuDropdownProps={{
            getPopupContainer: triggerNode =>
              triggerNode.closest('.header-with-actions'),
            visible: this.state.isDropdownVisible,
            onVisibleChange: this.setIsDropdownVisible,
          }}
          additionalActionsMenu={
            <HeaderActionsDropdown
              addSuccessToast={this.props.addSuccessToast}
              addDangerToast={this.props.addDangerToast}
              reportViewerId={reportViewerInfo.id}
              reportViewerTitle={reportViewerTitle}
              reportViewerInfo={reportViewerInfo}
              dataMask={dataMask}
              layout={layout}
              expandedSlices={expandedSlices}
              customCss={customCss}
              colorNamespace={colorNamespace}
              colorScheme={colorScheme}
              onSave={onSave}
              onChange={onChange}
              forceRefreshAllCharts={this.forceRefresh}
              startPeriodicRender={this.startPeriodicRender}
              refreshFrequency={refreshFrequency}
              shouldPersistRefreshFrequency={shouldPersistRefreshFrequency}
              setRefreshFrequency={setRefreshFrequency}
              updateCss={updateCss}
              editMode={editMode}
              hasUnsavedChanges={hasUnsavedChanges}
              userCanEdit={userCanEdit}
              userCanShare={userCanShare}
              userCanSave={userCanSaveAs}
              userCanCurate={userCanCurate}
              isLoading={isLoading}
              showPropertiesModal={this.showPropertiesModal}
              manageEmbedded={this.showEmbedModal}
              refreshLimit={refreshLimit}
              refreshWarning={refreshWarning}
              lastModifiedTime={lastModifiedTime}
              isDropdownVisible={this.state.isDropdownVisible}
              setIsDropdownVisible={this.setIsDropdownVisible}
              logEvent={logEvent}
            />
          }
          showFaveStar={user?.userId && reportViewerInfo?.id}
          showTitlePanelItems
        />
        {this.state.showingPropertiesModal && (
          <PropertiesModal
            reportViewerId={reportViewerInfo.id}
            reportViewerInfo={reportViewerInfo}
            reportViewerTitle={reportViewerTitle}
            show={this.state.showingPropertiesModal}
            onHide={this.hidePropertiesModal}
            colorScheme={this.props.colorScheme}
            onSubmit={handleOnPropertiesChange}
            onlyApply
          />
        )}

        <OverwriteConfirm />

        {userCanCurate && (
          <ReportViewerEmbedModal
            show={this.state.showingEmbedModal}
            onHide={this.hideEmbedModal}
            reportViewerId={reportViewerInfo.id}
          />
        )}
        <Global
          styles={css`
            .ant-menu-vertical {
              border-right: none;
            }
          `}
        />
      </div>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
