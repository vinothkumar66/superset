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
import { SupersetClient, logging } from '@superset-ui/core';
import { ReportViewerPermalinkValue } from 'src/reportViewer/types';

const assembleEndpoint = (
  reportId: string | number,
  key?: string | null,
  tabId?: string,
) => {
  let endpoint = `api/v1/reportViewer/${reportId}/filter_state`;
  if (key) {
    endpoint = endpoint.concat(`/${key}`);
  }
  if (tabId) {
    endpoint = endpoint.concat(`?tab_id=${tabId}`);
  }
  return endpoint;
};

export const updateFilterKey = (
  reportId: string,
  value: string,
  key: string,
  tabId?: string,
) =>
  SupersetClient.put({
    endpoint: assembleEndpoint(reportId, key, tabId),
    jsonPayload: { value },
  })
    .then(r => r.json.message)
    .catch(err => {
      logging.error(err);
      return null;
    });

export const createFilterKey = (
  reportId: string | number,
  value: string,
  tabId?: string,
) =>
  SupersetClient.post({
    endpoint: assembleEndpoint(reportId, undefined, tabId),
    jsonPayload: { value },
  })
    .then(r => r.json.key as string)
    .catch(err => {
      logging.error(err);
      return null;
    });

export const getFilterValue = (reportId: string | number, key?: string | null) =>
  SupersetClient.get({
    endpoint: assembleEndpoint(reportId, key),
  })
    .then(({ json }) => JSON.parse(json.value))
    .catch(err => {
      logging.error(err);
      return null;
    });

export const getPermalinkValue = (key: string) =>
  SupersetClient.get({
    endpoint: `/api/v1/reportViewer/permalink/${key}`,
  })
    .then(({ json }) => json as ReportViewerPermalinkValue)
    .catch(err => {
      logging.error(err);
      return null;
    });
