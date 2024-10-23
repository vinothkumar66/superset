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
import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { t } from '@superset-ui/core';
import { Menu } from 'src/components/Menu';
import { URL_PARAMS } from 'src/constants';
import ShareMenuItems from 'src/reportViewer/components/menu/ShareMenuItems';
import DownloadMenuItems from 'src/reportViewer/components/menu/DownloadMenuItems';
import CssEditor from 'src/reportViewer/components/CssEditor';
import RefreshIntervalModal from 'src/reportViewer/components/RefreshIntervalModal';
import SaveModal from 'src/reportViewer/components/SaveModal';
import HeaderReportViewerDropdown from 'src/features/reportViewers/ReportViewerModal/HeaderReportViewerDropdown';
import injectCustomCss from 'src/reportViewer/util/injectCustomCss';
import { SAVE_TYPE_NEWREPORTVIEWER } from 'src/reportViewer/util/constants';
import FilterScopeModal from 'src/reportViewer/components/filterscope/FilterScopeModal';
import getReportViewerUrl from 'src/reportViewer/util/getReportViewerUrl';
import { getActiveFilters } from 'src/reportViewer/util/activeReportViewerFilters';
import { getUrlParam } from 'src/utils/urlUtils';
import { MenuKeys } from 'src/reportViewer/types';

const propTypes = {
  addSuccessToast: PropTypes.func.isRequired,
  addDangerToast: PropTypes.func.isRequired,
  reportViewerInfo: PropTypes.object.isRequired,
  reportViewerId: PropTypes.number,
  reportViewerTitle: PropTypes.string,
  dataMask: PropTypes.object.isRequired,
  customCss: PropTypes.string,
  colorNamespace: PropTypes.string,
  colorScheme: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  updateCss: PropTypes.func.isRequired,
  forceRefreshAllCharts: PropTypes.func.isRequired,
  refreshFrequency: PropTypes.number,
  shouldPersistRefreshFrequency: PropTypes.bool.isRequired,
  setRefreshFrequency: PropTypes.func.isRequired,
  startPeriodicRender: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  userCanEdit: PropTypes.bool,
  userCanShare: PropTypes.bool,
  userCanSave: PropTypes.bool,
  userCanCurate: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  layout: PropTypes.object.isRequired,
  expandedSlices: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  showPropertiesModal: PropTypes.func.isRequired,
  manageEmbedded: PropTypes.func.isRequired,
  logEvent: PropTypes.func,
  refreshLimit: PropTypes.number,
  refreshWarning: PropTypes.string,
  lastModifiedTime: PropTypes.number.isRequired,
};

const defaultProps = {
  colorNamespace: undefined,
  colorScheme: undefined,
  refreshLimit: 0,
  refreshWarning: null,
};

class HeaderActionsDropdown extends PureComponent {
  static discardChanges() {
    window.location.reload();
  }

  constructor(props) {
    super(props);
    this.state = {
      css: props.customCss,
      showReportViewerSubMenu: null,
    };

    this.changeCss = this.changeCss.bind(this);
    this.changeRefreshInterval = this.changeRefreshInterval.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.setShowReportViewerSubMenu = this.setShowReportViewerSubMenu.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.customCss !== nextProps.customCss) {
      this.setState({ css: nextProps.customCss }, () => {
        injectCustomCss(nextProps.customCss);
      });
    }
  }

  setShowReportViewerSubMenu(show) {
    this.setState({
      showReportViewerSubMenu: show,
    });
  }

  changeCss(css) {
    this.props.onChange();
    this.props.updateCss(css);
  }

  changeRefreshInterval(refreshInterval, isPersistent) {
    this.props.setRefreshFrequency(refreshInterval, isPersistent);
    this.props.startPeriodicRender(refreshInterval * 1000);
  }

  handleMenuClick({ key }) {
    switch (key) {
      case MenuKeys.RefreshReportViewer:
        this.props.forceRefreshAllCharts();
        this.props.addSuccessToast(t('Refreshing charts'));
        break;
      case MenuKeys.EditProperties:
        this.props.showPropertiesModal();
        break;
      case MenuKeys.ToggleFullscreen: {
        const url = getReportViewerUrl({
          pathname: window.location.pathname,
          filters: getActiveFilters(),
          hash: window.location.hash,
          standalone: !getUrlParam(URL_PARAMS.standalone),
        });
        window.location.replace(url);
        break;
      }
      case MenuKeys.ManageEmbedded: {
        this.props.manageEmbedded();
        break;
      }
      default:
        break;
    }
  }

  render() {
    const {
      reportViewerTitle,
      reportViewerId,
      reportViewerInfo,
      refreshFrequency,
      shouldPersistRefreshFrequency,
      editMode,
      customCss,
      colorNamespace,
      colorScheme,
      layout,
      expandedSlices,
      onSave,
      userCanEdit,
      userCanShare,
      userCanSave,
      userCanCurate,
      isLoading,
      refreshLimit,
      refreshWarning,
      lastModifiedTime,
      addSuccessToast,
      addDangerToast,
      setIsDropdownVisible,
      isDropdownVisible,
      ...rest
    } = this.props;

    const emailTitle = t('Superset reportViewer');
    const emailSubject = `${emailTitle} ${reportViewerTitle}`;
    const emailBody = t('Check out this reportViewer: ');

    const isEmbedded = !reportViewerInfo?.userId;

    const url = getReportViewerUrl({
      pathname: window.location.pathname,
      filters: getActiveFilters(),
      hash: window.location.hash,
    });

    const refreshIntervalOptions =
      reportViewerInfo.common?.conf?.REPORTVIEWER_AUTO_REFRESH_INTERVALS;

    return (
      <Menu selectable={false} data-test="header-actions-menu" {...rest}>
        {!editMode && (
          <Menu.Item
            key={MenuKeys.RefreshReportViewer}
            data-test="refresh-reportViewer-menu-item"
            disabled={isLoading}
            onClick={this.handleMenuClick}
          >
            {t('Refresh reportViewer')}
          </Menu.Item>
        )}
        {!editMode && !isEmbedded && (
          <Menu.Item
            key={MenuKeys.ToggleFullscreen}
            onClick={this.handleMenuClick}
          >
            {getUrlParam(URL_PARAMS.standalone)
              ? t('Exit fullscreen')
              : t('Enter fullscreen')}
          </Menu.Item>
        )}
        {editMode && (
          <Menu.Item
            key={MenuKeys.EditProperties}
            onClick={this.handleMenuClick}
          >
            {t('Edit properties')}
          </Menu.Item>
        )}
        {editMode && (
          <Menu.Item key={MenuKeys.EditCss}>
            <CssEditor
              triggerNode={<span>{t('Edit CSS')}</span>}
              initialCss={this.state.css}
              onChange={this.changeCss}
              addDangerToast={addDangerToast}
            />
          </Menu.Item>
        )}
        <Menu.Divider />
        {userCanSave && (
          <Menu.Item key={MenuKeys.SaveModal}>
            <SaveModal
              addSuccessToast={this.props.addSuccessToast}
              addDangerToast={this.props.addDangerToast}
              reportViewerId={reportViewerId}
              reportViewerTitle={reportViewerTitle}
              reportViewerInfo={reportViewerInfo}
              saveType={SAVE_TYPE_NEWREPORTVIEWER}
              layout={layout}
              expandedSlices={expandedSlices}
              refreshFrequency={refreshFrequency}
              shouldPersistRefreshFrequency={shouldPersistRefreshFrequency}
              lastModifiedTime={lastModifiedTime}
              customCss={customCss}
              colorNamespace={colorNamespace}
              colorScheme={colorScheme}
              onSave={onSave}
              triggerNode={
                <span data-test="save-as-menu-item">{t('Save as')}</span>
              }
              canOverwrite={userCanEdit}
            />
          </Menu.Item>
        )}
        <Menu.SubMenu
          key={MenuKeys.Download}
          disabled={isLoading}
          title={t('Download')}
          logEvent={this.props.logEvent}
        >
          <DownloadMenuItems
            pdfMenuItemTitle={t('Export to PDF')}
            imageMenuItemTitle={t('Download as Image')}
            reportViewerTitle={reportViewerTitle}
            addDangerToast={addDangerToast}
          />
        </Menu.SubMenu>
        {userCanShare && (
          <Menu.SubMenu
            key={MenuKeys.Share}
            data-test="share-reportViewer-menu-item"
            disabled={isLoading}
            title={t('Share')}
          >
            <ShareMenuItems
              url={url}
              copyMenuItemTitle={t('Copy permalink to clipboard')}
              emailMenuItemTitle={t('Share permalink by email')}
              emailSubject={emailSubject}
              emailBody={emailBody}
              addSuccessToast={addSuccessToast}
              addDangerToast={addDangerToast}
              reportViewerId={reportViewerId}
            />
          </Menu.SubMenu>
        )}
        {!editMode && userCanCurate && (
          <Menu.Item
            key={MenuKeys.ManageEmbedded}
            onClick={this.handleMenuClick}
          >
            {t('Embed reportViewer')}
          </Menu.Item>
        )}
        <Menu.Divider />
        {!editMode ? (
          this.state.showReportViewerSubMenu ? (
            <>
              <Menu.SubMenu title={t('Manage email reportViewer')}>
                <HeaderReportViewerDropdown
                  reportViewerId={reportViewerInfo.id}
                  setShowReportViewerSubMenu={this.setShowReportViewerSubMenu}
                  showReportViewerSubMenu={this.state.showReportViewerSubMenu}
                  setIsDropdownVisible={setIsDropdownVisible}
                  isDropdownVisible={isDropdownVisible}
                  useTextMenu
                />
              </Menu.SubMenu>
              <Menu.Divider />
            </>
          ) : (
            <Menu>
              <HeaderReportViewerDropdown
                reportViewerId={reportViewerInfo.id}
                setShowReportViewerSubMenu={this.setShowReportViewerSubMenu}
                setIsDropdownVisible={setIsDropdownVisible}
                isDropdownVisible={isDropdownVisible}
                useTextMenu
              />
            </Menu>
          )
        ) : null}
        {editMode && !isEmpty(reportViewerInfo?.metadata?.filter_scopes) && (
          <Menu.Item key={MenuKeys.SetFilterMapping}>
            <FilterScopeModal
              className="m-r-5"
              triggerNode={t('Set filter mapping')}
            />
          </Menu.Item>
        )}

        <Menu.Item key={MenuKeys.AutorefreshModal}>
          <RefreshIntervalModal
            addSuccessToast={this.props.addSuccessToast}
            refreshFrequency={refreshFrequency}
            refreshLimit={refreshLimit}
            refreshWarning={refreshWarning}
            onChange={this.changeRefreshInterval}
            editMode={editMode}
            refreshIntervalOptions={refreshIntervalOptions}
            triggerNode={<span>{t('Set auto-refresh interval')}</span>}
          />
        </Menu.Item>
      </Menu>
    );
  }
}

HeaderActionsDropdown.propTypes = propTypes;
HeaderActionsDropdown.defaultProps = defaultProps;

export default HeaderActionsDropdown;
