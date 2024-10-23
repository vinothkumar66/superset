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
import getReportViewerUrl from 'src/reportViewer/util/getReportViewerUrl';
import { REPORTVIEWER_FILTER_SCOPE_GLOBAL } from 'src/reportViewer/reducers/reportViewerFilters';
import { ReportViewerStandaloneMode } from 'src/reportViewer/util/constants';

describe('getChartIdsFromLayout', () => {
  const filters = {
    '35_key': {
      values: ['value'],
      scope: REPORTVIEWER_FILTER_SCOPE_GLOBAL,
    },
  };

  const globalLocation = window.location;
  afterEach(() => {
    window.location = globalLocation;
  });

  it('should encode filters', () => {
    const url = getReportViewerUrl({ pathname: 'path', filters });
    expect(url).toBe(
      'path?preselect_filters=%7B%2235%22%3A%7B%22key%22%3A%5B%22value%22%5D%7D%7D',
    );
  });

  it('should encode filters with hash', () => {
    const urlWithHash = getReportViewerUrl({
      pathname: 'path',
      filters,
      hash: 'iamhashtag',
    });
    expect(urlWithHash).toBe(
      'path?preselect_filters=%7B%2235%22%3A%7B%22key%22%3A%5B%22value%22%5D%7D%7D#iamhashtag',
    );
  });

  it('should encode filters with standalone', () => {
    const urlWithStandalone = getReportViewerUrl({
      pathname: 'path',
      filters,
      standalone: ReportViewerStandaloneMode.HideNav,
    });
    expect(urlWithStandalone).toBe(
      `path?preselect_filters=%7B%2235%22%3A%7B%22key%22%3A%5B%22value%22%5D%7D%7D&standalone=${ReportViewerStandaloneMode.HideNav}`,
    );
  });

  it('should encode filters with missing standalone', () => {
    const urlWithStandalone = getReportViewerUrl({
      pathname: 'path',
      filters,
      standalone: null,
    });
    expect(urlWithStandalone).toBe(
      'path?preselect_filters=%7B%2235%22%3A%7B%22key%22%3A%5B%22value%22%5D%7D%7D',
    );
  });

  it('should encode filters with missing filters', () => {
    const urlWithStandalone = getReportViewerUrl({
      pathname: 'path',
      filters: undefined,
      standalone: ReportViewerStandaloneMode.HideNav,
    });
    expect(urlWithStandalone).toBe(
      `path?standalone=${ReportViewerStandaloneMode.HideNav}`,
    );
  });

  it('should preserve unknown filters', () => {
    const windowSpy = jest.spyOn(window, 'window', 'get');
    windowSpy.mockImplementation(() => ({
      location: {
        origin: 'https://localhost',
        search: '?unkown_param=value',
      },
    }));
    const urlWithStandalone = getReportViewerUrl({
      pathname: 'path',
      standalone: ReportViewerStandaloneMode.HideNav,
    });
    expect(urlWithStandalone).toBe(
      `path?unkown_param=value&standalone=${ReportViewerStandaloneMode.HideNav}`,
    );
    windowSpy.mockRestore();
  });

  it('should process native filters key', () => {
    const windowSpy = jest.spyOn(window, 'window', 'get');
    windowSpy.mockImplementation(() => ({
      location: {
        origin: 'https://localhost',
        search:
          '?preselect_filters=%7B%7D&native_filters_key=024380498jdkjf-2094838',
      },
    }));

    const urlWithNativeFilters = getReportViewerUrl({
      pathname: 'path',
    });
    expect(urlWithNativeFilters).toBe(
      'path?preselect_filters=%7B%7D&native_filters_key=024380498jdkjf-2094838',
    );
    windowSpy.mockRestore();
  });
});
