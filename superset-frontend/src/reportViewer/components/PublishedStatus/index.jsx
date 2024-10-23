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
import { Component } from 'react';
import PropTypes from 'prop-types';
import { t } from '@superset-ui/core';
import { Tooltip } from 'src/components/Tooltip';
import Label from 'src/components/Label';

const propTypes = {
  reportViewerId: PropTypes.number,
  isPublished: PropTypes.bool.isRequired,
  savePublished: PropTypes.func.isRequired,
  canEdit: PropTypes.bool,
  canSave: PropTypes.bool,
};

const draftButtonTooltip = t(
  'This reportViewer is not published, it will not show up in the list of reportViewers. ' +
    'Click here to publish this reportViewer.',
);

const draftDivTooltip = t(
  'This reportViewer is not published which means it will not show up in the list of reportViewers.' +
    ' Favorite it to see it there or access it by using the URL directly.',
);

const publishedTooltip = t(
  'This reportViewer is published. Click to make it a draft.',
);

export default class PublishedStatus extends Component {
  componentDidMount() {
    this.togglePublished = this.togglePublished.bind(this);
  }

  togglePublished() {
    this.props.savePublished(this.props.reportViewerId, !this.props.isPublished);
  }

  render() {
    // Show everybody the draft badge
    if (!this.props.isPublished) {
      // if they can edit the report, make the badge a button
      if (this.props.canEdit && this.props.canSave) {
        return (
          <Tooltip
            id="unpublished-reportViewer-tooltip"
            placement="bottom"
            title={draftButtonTooltip}
          >
            <Label
              onClick={() => {
                this.togglePublished();
              }}
            >
              {t('Draft')}
            </Label>
          </Tooltip>
        );
      }
      return (
        <Tooltip
          id="unpublished-reportViewer-tooltip"
          placement="bottom"
          title={draftDivTooltip}
        >
          <Label>{t('Draft')}</Label>
        </Tooltip>
      );
    }

    // Show the published badge for the owner of the reportViewer to toggle
    if (this.props.canEdit && this.props.canSave) {
      return (
        <Tooltip
          id="published-reportViewer-tooltip"
          placement="bottom"
          title={publishedTooltip}
        >
          <Label
            onClick={() => {
              this.togglePublished();
            }}
          >
            {t('Published')}
          </Label>
        </Tooltip>
      );
    }

    // Don't show anything if one doesn't own the reportViewer and it is published
    return null;
  }
}

PublishedStatus.propTypes = propTypes;
