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
  REPORTVIEWER_GRID_ID,
  REPORTVIEWER_ROOT_ID,
} from 'src/reportViewer/util/constants';
import { ReportViewerLayout } from 'src/reportViewer/types';

export const getRootLevelTabsComponent = (reportViewerLayout: ReportViewerLayout) => {
  const reportViewerRoot = reportViewerLayout[REPORTVIEWER_ROOT_ID];
  const rootChildId = reportViewerRoot?.children[0];
  return rootChildId === REPORTVIEWER_GRID_ID
    ? reportViewerLayout[REPORTVIEWER_ROOT_ID]
    : reportViewerLayout[rootChildId];
};

export const shouldFocusTabs = (
  event: { target: { className: string } },
  container: { contains: (arg0: any) => any },
) =>
  // don't focus the tabs when we click on a tab
  event.target.className === 'ant-tabs-nav-wrap' ||
  container.contains(event.target);
