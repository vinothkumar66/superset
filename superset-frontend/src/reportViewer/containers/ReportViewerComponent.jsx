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
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logEvent } from 'src/logger/actions';
import { addDangerToast } from 'src/components/MessageToasts/actions';
import { componentLookup } from 'src/reportViewer/components/gridComponents';
import getDetailedComponentWidth from 'src/reportViewer/util/getDetailedComponentWidth';
import { getActiveFilters } from 'src/reportViewer/util/activeReportViewerFilters';
import { componentShape } from 'src/reportViewer/util/propShapes';
import { COLUMN_TYPE, ROW_TYPE } from 'src/reportViewer/util/componentTypes';
import {
  createComponent,
  deleteComponent,
  updateComponents,
  handleComponentDrop,
} from 'src/reportViewer/actions/reportViewerLayout';
import {
  setDirectPathToChild,
  setActiveTab,
  setFullSizeChartId,
} from 'src/reportViewer/actions/reportViewerState';

const propTypes = {
  id: PropTypes.string,
  parentId: PropTypes.string,
  depth: PropTypes.number,
  index: PropTypes.number,
  renderHoverMenu: PropTypes.bool,
  renderTabContent: PropTypes.bool,
  onChangeTab: PropTypes.func,
  component: componentShape.isRequired,
  parentComponent: componentShape.isRequired,
  createComponent: PropTypes.func.isRequired,
  deleteComponent: PropTypes.func.isRequired,
  updateComponents: PropTypes.func.isRequired,
  handleComponentDrop: PropTypes.func.isRequired,
  logEvent: PropTypes.func.isRequired,
  directPathToChild: PropTypes.arrayOf(PropTypes.string),
  directPathLastUpdated: PropTypes.number,
  reportViewerId: PropTypes.number.isRequired,
  isComponentVisible: PropTypes.bool,
};

const defaultProps = {
  isComponentVisible: true,
};

function mapStateToProps(
  { reportViewerLayout: undoableLayout, reportViewerState, reportViewerInfo },
  ownProps,
) {
  const reportViewerLayout = undoableLayout.present;
  const { id, parentId } = ownProps;
  const component = reportViewerLayout[id];
  const props = {
    component,
    getComponentById: id => reportViewerLayout[id],
    parentComponent: reportViewerLayout[parentId],
    editMode: reportViewerState.editMode,
    filters: getActiveFilters(),
    reportViewerId: reportViewerInfo.id,
    fullSizeChartId: reportViewerState.fullSizeChartId,
  };

  // rows and columns need more data about their child dimensions
  // doing this allows us to not pass the entire component lookup to all Components
  if (component) {
    const componentType = component.type;
    if (componentType === ROW_TYPE || componentType === COLUMN_TYPE) {
      const { occupiedWidth, minimumWidth } = getDetailedComponentWidth({
        id,
        components: reportViewerLayout,
      });

      if (componentType === ROW_TYPE) props.occupiedColumnCount = occupiedWidth;
      if (componentType === COLUMN_TYPE) props.minColumnWidth = minimumWidth;
    }
  }

  return props;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addDangerToast,
      createComponent,
      deleteComponent,
      updateComponents,
      handleComponentDrop,
      setDirectPathToChild,
      setFullSizeChartId,
      setActiveTab,
      logEvent,
    },
    dispatch,
  );
}

class ReportViewerComponent extends PureComponent {
  render() {
    const { component } = this.props;
    const Component = component ? componentLookup[component.type] : null;
    return Component ? <Component {...this.props} /> : null;
  }
}

ReportViewerComponent.propTypes = propTypes;
ReportViewerComponent.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReportViewerComponent);
