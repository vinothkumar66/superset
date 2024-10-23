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
import { isFeatureEnabled, FeatureFlag } from '@superset-ui/core';
import {
  isUserWithPermissionsAndRoles,
  UndefinedUser,
  UserWithPermissionsAndRoles,
} from 'src/types/bootstrapTypes';
import { ReportViewer } from 'src/types/ReportViewer';
import { findPermission } from 'src/utils/findPermission';

// this should really be a config value,
// but is hardcoded in backend logic already, so...
const ADMIN_ROLE_NAME = 'admin';

export const isUserAdmin = (
  user?: UserWithPermissionsAndRoles | UndefinedUser,
) =>
  isUserWithPermissionsAndRoles(user) &&
  Object.keys(user.roles || {}).some(
    role => role.toLowerCase() === ADMIN_ROLE_NAME,
  );

const isUserReportViewerOwner = (
  reportViewer: ReportViewer,
  user: UserWithPermissionsAndRoles | UndefinedUser,
) =>
  isUserWithPermissionsAndRoles(user) &&
  reportViewer.owners.some(owner => owner.id === user.userId);

export const canUserEditReportViewer = (
  reportViewer: ReportViewer,
  user?: UserWithPermissionsAndRoles | UndefinedUser | null,
) =>
  isUserWithPermissionsAndRoles(user) &&
  (isUserAdmin(user) || isUserReportViewerOwner(reportViewer, user)) &&
  findPermission('can_write', 'ReportViewer', user?.roles);

export function userHasPermission(
  user: UserWithPermissionsAndRoles | UndefinedUser,
  viewName: string,
  permissionName: string,
) {
  return (
    isUserAdmin(user) ||
    (isUserWithPermissionsAndRoles(user) &&
      Object.values(user.roles || {})
        .flat()
        .some(
          permissionView =>
            permissionView[0] === permissionName &&
            permissionView[1] === viewName,
        ))
  );
}

export const canUserSaveAsReportViewer = (
  reportViewer: ReportViewer,
  user?: UserWithPermissionsAndRoles | UndefinedUser | null,
) =>
  isUserWithPermissionsAndRoles(user) &&
  findPermission('can_write', 'ReportViewer', user?.roles) &&
  (!isFeatureEnabled(FeatureFlag.ReportViewerRbac) ||
    isUserAdmin(user) ||
    isUserReportViewerOwner(reportViewer, user));
