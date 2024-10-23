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

import { ReportViewer, Datasource, EmbeddedReportViewer } from 'src/reportViewer/types';
import { Chart } from 'src/types/Chart';
import { useApiV1Resource, useTransformedResource } from './apiResources';

export const useReportViewer = (idOrSlug: string | number) =>
  useTransformedResource(
    useApiV1Resource<ReportViewer>(`/api/v1/reportViewer/${idOrSlug}`),
    reportViewer => ({
      ...reportViewer,
      // TODO: load these at the API level
      metadata:
        (reportViewer.json_metadata && JSON.parse(reportViewer.json_metadata)) || {},
      position_data:
        reportViewer.position_json && JSON.parse(reportViewer.position_json),
      owners: reportViewer.owners || [],
    }),
  );

// gets the chart definitions for a reportViewer
export const useReportViewerCharts = (idOrSlug: string | number) =>
  useApiV1Resource<Chart[]>(`/api/v1/reportViewer/${idOrSlug}/charts`);

// gets the datasets for a reportViewer
// important: this endpoint only returns the fields in the dataset
// that are necessary for rendering the given reportViewer
export const useReportViewerDatasets = (idOrSlug: string | number) =>
  useApiV1Resource<Datasource[]>(`/api/v1/reportViewer/${idOrSlug}/datasets`);

export const useEmbeddedReportViewer = (idOrSlug: string | number) =>
  useApiV1Resource<EmbeddedReportViewer>(`/api/v1/reportViewer/${idOrSlug}/embedded`);
