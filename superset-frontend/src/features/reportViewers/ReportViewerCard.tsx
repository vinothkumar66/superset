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
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  isFeatureEnabled,
  FeatureFlag,
  t,
  useTheme,
  SupersetClient,
} from '@superset-ui/core';
import { CardStyles } from 'src/views/CRUD/utils';
import { AntdDropdown } from 'src/components';
import { Menu } from 'src/components/Menu';
import ListViewCard from 'src/components/ListViewCard';
import Icons from 'src/components/Icons';
import Label from 'src/components/Label';
import FacePile from 'src/components/FacePile';
import FaveStar from 'src/components/FaveStar';
import { ReportViewer } from 'src/views/CRUD/types';

interface ReportViewerCardProps {
  isChart?: boolean;
  reportViewer: ReportViewer;
  hasPerm: (name: string) => boolean;
  bulkSelectEnabled: boolean;
  loading: boolean;
  openReportViewerEditModal?: (d: ReportViewer) => void;
  saveFavoriteStatus: (id: number, isStarred: boolean) => void;
  favoriteStatus: boolean;
  userId?: string | number;
  showThumbnails?: boolean;
  handleBulkReportViewerExport: (reportViewersToExport: ReportViewer[]) => void;
  onDelete: (reportViewer: ReportViewer) => void;
}

function ReportViewerCard({
  reportViewer,
  hasPerm,
  bulkSelectEnabled,
  userId,
  openReportViewerEditModal,
  favoriteStatus,
  saveFavoriteStatus,
  showThumbnails,
  handleBulkReportViewerExport,
  onDelete,
}: ReportViewerCardProps) {
  const history = useHistory();
  const canEdit = hasPerm('can_write');
  const canDelete = hasPerm('can_write');
  const canExport = hasPerm('can_export');

  const theme = useTheme();

  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [fetchingThumbnail, setFetchingThumbnail] = useState<boolean>(false);

  useEffect(() => {
    // fetch thumbnail only if it's not already fetched
    if (
      !fetchingThumbnail &&
      reportViewer.id &&
      (thumbnailUrl === undefined || thumbnailUrl === null) &&
      isFeatureEnabled(FeatureFlag.Thumbnails)
    ) {
      // fetch thumbnail
      if (reportViewer.thumbnail_url) {
        // set to empty string if null so that we don't
        // keep fetching the thumbnail
        setThumbnailUrl(reportViewer.thumbnail_url || '');
        return;
      }
      setFetchingThumbnail(true);
      SupersetClient.get({
        endpoint: `/api/v1/reportViewer/${reportViewer.id}`,
      }).then(({ json = {} }) => {
        setThumbnailUrl(json.thumbnail_url || '');
        setFetchingThumbnail(false);
      });
    }
  }, [reportViewer, thumbnailUrl]);

  const menu = (
    <Menu>
      {canEdit && openReportViewerEditModal && (
        <Menu.Item>
          <div
            role="button"
            tabIndex={0}
            className="action-button"
            onClick={() => openReportViewerEditModal?.(reportViewer)}
            data-test="reportViewer-card-option-edit-button"
          >
            <Icons.EditAlt iconSize="l" data-test="edit-alt" /> {t('Edit')}
          </div>
        </Menu.Item>
      )}
      {canExport && (
        <Menu.Item>
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleBulkReportViewerExport([reportViewer])}
            className="action-button"
            data-test="reportViewer-card-option-export-button"
          >
            <Icons.Share iconSize="l" /> {t('Export')}
          </div>
        </Menu.Item>
      )}
      {canDelete && (
        <Menu.Item>
          <div
            role="button"
            tabIndex={0}
            className="action-button"
            onClick={() => onDelete(reportViewer)}
            data-test="reportViewer-card-option-delete-button"
          >
            <Icons.Trash iconSize="l" /> {t('Delete')}
          </div>
        </Menu.Item>
      )}
    </Menu>
  );
  return (
    <CardStyles
      onClick={() => {
        if (!bulkSelectEnabled) {
          history.push(reportViewer.url);
        }
      }}
    >
      <ListViewCard
        loading={reportViewer.loading || false}
        title={reportViewer.reportViewer_title}
        certifiedBy={reportViewer.certified_by}
        certificationDetails={reportViewer.certification_details}
        titleRight={
          <Label>{reportViewer.published ? t('published') : t('draft')}</Label>
        }
        cover={
          !isFeatureEnabled(FeatureFlag.Thumbnails) || !showThumbnails ? (
            <></>
          ) : null
        }
        url={bulkSelectEnabled ? undefined : reportViewer.url}
        linkComponent={Link}
        imgURL={reportViewer.thumbnail_url}
        imgFallbackURL="/static/assets/images/reportViewer-card-fallback.svg"
        description={t('Modified %s', reportViewer.changed_on_delta_humanized)}
        coverLeft={<FacePile users={reportViewer.owners || []} />}
        actions={
          <ListViewCard.Actions
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {userId && (
              <FaveStar
                itemId={reportViewer.id}
                saveFaveStar={saveFavoriteStatus}
                isStarred={favoriteStatus}
              />
            )}
            <AntdDropdown overlay={menu}>
              <Icons.MoreVert iconColor={theme.colors.grayscale.base} />
            </AntdDropdown>
          </ListViewCard.Actions>
        }
      />
    </CardStyles>
  );
}

export default ReportViewerCard;
