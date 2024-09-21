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
import {
  isFeatureEnabled,
  FeatureFlag,
  styled,
  SupersetClient,
  t,
} from '@superset-ui/core';
import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import rison from 'rison';
import {
  createErrorHandler,
  handleDashboardDelete,
} from 'src/views/CRUD/utils';
import { useListViewResource, useFavoriteStatus } from 'src/views/CRUD/hooks';
import ConfirmStatusChange from 'src/components/ConfirmStatusChange';
import handleResourceExport from 'src/utils/export';
import Loading from 'src/components/Loading';
import SubMenu, { SubMenuProps } from 'src/features/home/SubMenu';
import ListView, {
  ListViewProps,
  Filter,
  Filters,
  FilterOperator,
} from 'src/components/ListView';
import { dangerouslyGetItemDoNotUse } from 'src/utils/localStorageHelpers';
import Owner from 'src/types/Owner';
import Tag from 'src/types/TagType';
import withToasts from 'src/components/MessageToasts/withToasts';
import Icons from 'src/components/Icons';
import DeleteModal from 'src/components/DeleteModal';
import FaveStar from 'src/components/FaveStar';
import PropertiesModal from 'src/dashboard/components/PropertiesModal';
import { Tooltip } from 'src/components/Tooltip';

import Dashboard from 'src/dashboard/containers/Dashboard';
import {
  Dashboard as CRUDDashboard,
  QueryObjectColumns,
} from 'src/views/CRUD/types';
import CertifiedBadge from 'src/components/CertifiedBadge';
import DashboardCard from 'src/features/dashboards/DashboardCard';
import { Button } from 'antd';
import { ModifiedInfo } from 'src/components/AuditInfo';

const PAGE_SIZE = 25;

interface ReportListProps {
  addDangerToast: (msg: string) => void;
  addSuccessToast: (msg: string) => void;
  user: {
    userId: string | number;
    firstName: string;
    lastName: string;
  };
}

export interface Dashboard {
  changed_by_name: string;
  changed_on_delta_humanized: string;
  changed_by: string;
  dashboard_title: string;
  id: number;
  published: boolean;
  url: string;
  thumbnail_url: string;
  owners: Owner[];
  tags: Tag[];
  created_by: object;
}

const Actions = styled.div`
  color: ${({ theme }) => theme.colors.grayscale.base};
`;

const DASHBOARD_COLUMNS_TO_FETCH = [
  'id',
  'dashboard_title',
  'published',
  'url',
  'slug',
  'changed_by',
  'changed_on_delta_humanized',
  'owners.id',
  'owners.first_name',
  'owners.last_name',
  'owners',
  'tags.id',
  'tags.name',
  'tags.type',
  'status',
  'certified_by',
  'certification_details',
  'changed_on',
];

function ReportViewer(props: ReportListProps) {
  const { addDangerToast, addSuccessToast, user } = props;

  const {
    state: {
      loading,
      resourceCount: dashboardCount,
      resourceCollection: dashboards,
      bulkSelectEnabled,
    },
    setResourceCollection: setDashboards,
    hasPerm,
    fetchData,
    toggleBulkSelect,
    refreshData,
  } = useListViewResource<Dashboard>(
    'dashboard',
    t('dashboard'),
    addDangerToast,
    undefined,
    undefined,
    undefined,
    undefined,
    DASHBOARD_COLUMNS_TO_FETCH,
  );
  const dashboardIds = useMemo(() => dashboards.map(d => d.id), [dashboards]);
  const [saveFavoriteStatus, favoriteStatus] = useFavoriteStatus(
    'dashboard',
    dashboardIds,
    addDangerToast,
  );

  const [dashboardToEdit, setDashboardToEdit] = useState<Dashboard | null>(
    null,
  );
  const [dashboardToDelete, setDashboardToDelete] =
    useState<CRUDDashboard | null>(null);

  const [preparingExport, setPreparingExport] = useState<boolean>(false);

  const userKey = dangerouslyGetItemDoNotUse(user?.userId?.toString(), null);

  const canEdit = hasPerm('can_write');
  const canDelete = hasPerm('can_write');
  const canExport = hasPerm('can_export');

  const initialSort = [{ id: 'changed_on_delta_humanized', desc: true }];

  function openDashboardEditModal(dashboard: Dashboard) {
    setDashboardToEdit(dashboard);
  }

  function handleDashboardEdit(edits: Dashboard) {
    return SupersetClient.get({
      endpoint: `/api/v1/dashboard/${edits.id}`,
    }).then(
      ({ json = {} }) => {
        setDashboards(
          dashboards.map(dashboard => {
            if (dashboard.id === json?.result?.id) {
              const {
                changed_by_name,
                changed_by, 
                dashboard_title = '',
                slug = '',
                json_metadata = '',
                changed_on_delta_humanized,
                url = '',
                certified_by = '',
                certification_details = '',
                owners,
                tags,
              } = json.result;
              return {
                ...dashboard,
                changed_by_name,
                changed_by,
                dashboard_title,
                slug,
                json_metadata,
                changed_on_delta_humanized,
                url,
                certified_by,
                certification_details,
                owners,
                tags,
              };
            }
            return dashboard;
          }),
        );
      },
      createErrorHandler(errMsg =>
        addDangerToast(
          t('An error occurred while fetching dashboards: %s', errMsg),
        ),
      ),
    );
  }

  const handleBulkDashboardExport = (dashboardsToExport: Dashboard[]) => {
    const ids = dashboardsToExport.map(({ id }) => id);
    handleResourceExport('dashboard', ids, () => {
      setPreparingExport(false);
    });
    setPreparingExport(true);
  };

  function handleBulkDashboardDelete(dashboardsToDelete: Dashboard[]) {
    return SupersetClient.delete({
      endpoint: `/api/v1/dashboard/?q=${rison.encode(
        dashboardsToDelete.map(({ id }) => id),
      )}`,
    }).then(
      ({ json = {} }) => {
        refreshData();
        addSuccessToast(json.message);
      },
      createErrorHandler(errMsg =>
        addDangerToast(
          t('There was an issue deleting the selected dashboards: ', errMsg),
        ),
      ),
    );
  }

  const columns = useMemo(
    () => [
      {
        Cell: ({
          row: {
            original: { id },
          },
        }: any) =>
          user?.userId && (
            <FaveStar
              itemId={id}
              saveFaveStar={saveFavoriteStatus}
              isStarred={favoriteStatus[id]}
            />
          ),
        Header: '',
        id: 'id',
        disableSortBy: true,
        size: 'xs',
        hidden: !user?.userId,
      },
      {
        Cell: ({
          row: {
            original: {
              url,
              dashboard_title: dashboardTitle,
              certified_by: certifiedBy,
              certification_details: certificationDetails,
            },
          },
        }: any) => (
          <Link to={url}>
            {certifiedBy && (
              <>
                <CertifiedBadge
                  certifiedBy={certifiedBy}
                  details={certificationDetails}
                />{' '}
              </>
            )}
            {dashboardTitle}
          </Link>
        ),
        Header: t('Report Name'),
        accessor: 'dashboard_title',
      },
      {
        Cell: ({
          row: {
            original: {
              changed_on_delta_humanized: changedOn,
              changed_by: changedBy,
            },
          },
        }: any) => <ModifiedInfo date={changedOn} user={changedBy} />,
        Header: t('Last modified'),
        accessor: 'changed_on_delta_humanized',
        size: 'xl',
      },
      {
        Cell: ({ row: { original } }: any) => {
          const handleDelete = () =>
            handleDashboardDelete(
              original,
              refreshData,
              addSuccessToast,
              addDangerToast,
            );
          const handleEdit = () => openDashboardEditModal(original);
          const handleExport = () => handleBulkDashboardExport([original]);

          return (
            <Actions className="actions">
              {canDelete && (
                <ConfirmStatusChange
                  title={t('Please confirm')}
                  description={
                    <>
                      {t('Are you sure you want to delete')}{' '}
                      <b>{original.dashboard_title}</b>?
                    </>
                  }
                  onConfirm={handleDelete}
                >
                  {confirmDelete => (
                    <Tooltip
                      id="delete-action-tooltip"
                      title={t('Delete')}
                      placement="bottom"
                    >
                      <Button
                        role="button"
                        tabIndex={0}
                        className="action-button"
                        onClick={confirmDelete}
                      >
                        <Icons.Trash data-test="dashboard-list-trash-icon" />
                      </Button>
                    </Tooltip>
                  )}
                </ConfirmStatusChange>
              )}
              {canExport && (
                <Tooltip
                  id="export-action-tooltip"
                  title={t('Export')}
                  placement="bottom"
                >
                  <Button
                    role="button"
                    tabIndex={0}
                    className="action-button"
                    onClick={handleExport}
                  >
                    <Icons.Share />
                  </Button>
                </Tooltip>
              )}
              {canEdit && (
                <Tooltip
                  id="edit-action-tooltip"
                  title={t('Edit')}
                  placement="bottom"
                >
                  <Button
                    role="button"
                    tabIndex={0}
                    className="action-button"
                    onClick={handleEdit}
                  >
                    <Icons.EditAlt data-test="edit-alt" />
                  </Button>
                </Tooltip>
              )}
            </Actions>
          );
        },
        Header: t('Actions'),
        id: 'actions',
        hidden: !canEdit && !canDelete && !canExport,
        disableSortBy: true,
      },
      {
        accessor: QueryObjectColumns.ChangedBy,
        hidden: true,
      },
    ],
    [
      user?.userId,
      canEdit,
      canDelete,
      canExport,
      saveFavoriteStatus,
      favoriteStatus,
      refreshData,
      addSuccessToast,
      addDangerToast,
    ],
  );

  const favoritesFilter: Filter = useMemo(
    () => ({
      Header: t('Favorite'),
      key: 'favorite',
      id: 'id',
      urlDisplay: 'favorite',
      input: 'select',
      operator: FilterOperator.DashboardIsFav,
      unfilteredLabel: t('Any'),
      selects: [
        { label: t('Yes'), value: true },
        { label: t('No'), value: false },
      ],
    }),
    [],
  );

  const filters: Filters = useMemo(() => {
    const filters_list = [
      {
        Header: t('Report Name'),
        key: 'search',
        id: 'dashboard_title',
        input: 'search',
        operator: FilterOperator.TitleOrSlug,
      },
      {
        Header: t('Date range'),
        key: 'range',
        id: 'dashboard_title',
        input: 'datetime_range',
        operator: FilterOperator.Between,
      },
    ] as Filters;
    return filters_list;
  }, [addDangerToast, favoritesFilter, props.user]);

  const renderCard = useCallback(
    (dashboard: Dashboard) => (
      <DashboardCard
        dashboard={dashboard}
        hasPerm={hasPerm}
        bulkSelectEnabled={bulkSelectEnabled}
        showThumbnails={
          userKey
            ? userKey.thumbnails
            : isFeatureEnabled(FeatureFlag.Thumbnails)
        }
        userId={user?.userId}
        loading={loading}
        openDashboardEditModal={openDashboardEditModal}
        saveFavoriteStatus={saveFavoriteStatus}
        favoriteStatus={favoriteStatus[dashboard.id]}
        handleBulkDashboardExport={handleBulkDashboardExport}
        onDelete={dashboard => setDashboardToDelete(dashboard)}
      />
    ),
    [
      bulkSelectEnabled,
      favoriteStatus,
      hasPerm,
      loading,
      user?.userId,
      saveFavoriteStatus,
      userKey,
    ],
  );

  const subMenuButtons: SubMenuProps['buttons'] = [];

  return (
    <>
      <SubMenu name={t('Report Viewer')} buttons={subMenuButtons} />
      <ConfirmStatusChange
        title={t('Please confirm')}
        description={t(
          'Are you sure you want to delete the selected dashboards?',
        )}
        onConfirm={handleBulkDashboardDelete}
      >
        {confirmDelete => {
          const bulkActions: ListViewProps['bulkActions'] = [];
          if (canDelete) {
            bulkActions.push({
              key: 'delete',
              name: t('Delete'),
              type: 'danger',
              onSelect: confirmDelete,
            });
          }
          if (canExport) {
            bulkActions.push({
              key: 'export',
              name: t('Export'),
              type: 'primary',
              onSelect: handleBulkDashboardExport,
            });
          }
          return (
            <>
              {dashboardToEdit && (
                <PropertiesModal
                  dashboardId={dashboardToEdit.id}
                  show
                  onHide={() => setDashboardToEdit(null)}
                  onSubmit={handleDashboardEdit}
                />
              )}
              {dashboardToDelete && (
                <DeleteModal
                  description={
                    <>
                      {t('Are you sure you want to delete')}{' '}
                      <b>{dashboardToDelete.dashboard_title}</b>?
                    </>
                  }
                  onConfirm={() => {
                    handleDashboardDelete(
                      dashboardToDelete,
                      refreshData,
                      addSuccessToast,
                      addDangerToast,
                      undefined,
                      user?.userId,
                    );
                    setDashboardToDelete(null);
                  }}
                  onHide={() => setDashboardToDelete(null)}
                  open={!!dashboardToDelete}
                  title={t('Please confirm')}
                />
              )}
              <ListView<Dashboard>
                bulkActions={bulkActions}
                bulkSelectEnabled={bulkSelectEnabled}
                className="dashboard-list-view"
                columns={columns}
                count={dashboardCount}
                data={dashboards}
                disableBulkSelect={toggleBulkSelect}
                fetchData={fetchData}
                refreshData={refreshData}
                filters={filters}
                initialSort={initialSort}
                loading={loading}
                pageSize={PAGE_SIZE}
                addSuccessToast={addSuccessToast}
                addDangerToast={addDangerToast}
                showThumbnails={
                  userKey
                    ? userKey.thumbnails
                    : isFeatureEnabled(FeatureFlag.Thumbnails)
                }
                renderCard={renderCard}
                defaultViewMode={
                  isFeatureEnabled(FeatureFlag.ListviewsDefaultCardView)
                    ? 'card'
                    : 'table'
                }
                enableBulkTag
                bulkTagResourceName="dashboard"
              />
            </>
          );
        }}
      </ConfirmStatusChange>

      {preparingExport && <Loading />}
    </>
  );
}

export default withToasts(ReportViewer);
