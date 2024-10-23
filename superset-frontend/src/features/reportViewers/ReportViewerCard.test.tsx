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

import { MemoryRouter } from 'react-router-dom';
import { FeatureFlag, SupersetClient } from '@superset-ui/core';
import * as uiCore from '@superset-ui/core';

import { render, screen, waitFor } from 'spec/helpers/testing-library';

import ReportViewerCard from './ReportViewerCard';

const mockReportViewer = {
  id: 1,
  reportViewer_title: 'Sample ReportViewer',
  certified_by: 'John Doe',
  certification_details: 'Certified on 2022-01-01',
  published: true,
  url: '/reportViewer/1',
  thumbnail_url: '/thumbnails/1.png',
  changed_on_delta_humanized: '2 days ago',
  owners: [
    { id: 1, name: 'Alice', first_name: 'Alice', last_name: 'Doe' },
    { id: 2, name: 'Bob', first_name: 'Bob', last_name: 'Smith' },
  ],
  changed_by_name: 'John Doe',
  changed_by: 'john.doe@example.com',
};

const mockHasPerm = jest.fn().mockReturnValue(true);
const mockOpenReportViewerEditModal = jest.fn();
const mockSaveFavoriteStatus = jest.fn();
const mockHandleBulkReportViewerExport = jest.fn();
const mockOnDelete = jest.fn();

let isFeatureEnabledMock: jest.MockInstance<boolean, [feature: FeatureFlag]>;

beforeAll(() => {
  isFeatureEnabledMock = jest
    .spyOn(uiCore, 'isFeatureEnabled')
    .mockImplementation(() => true);
});

afterAll(() => {
  // @ts-ignore
  isFeatureEnabledMock.mockClear();
});

beforeEach(() => {
  render(
    <MemoryRouter>
      <ReportViewerCard
        reportViewer={mockReportViewer}
        hasPerm={mockHasPerm}
        bulkSelectEnabled={false}
        loading={false}
        openReportViewerEditModal={mockOpenReportViewerEditModal}
        saveFavoriteStatus={mockSaveFavoriteStatus}
        favoriteStatus={false}
        handleBulkReportViewerExport={mockHandleBulkReportViewerExport}
        onDelete={mockOnDelete}
      />
    </MemoryRouter>,
  );
});

it('Renders the reportViewer title', () => {
  const titleElement = screen.getByText('Sample ReportViewer');
  expect(titleElement).toBeInTheDocument();
});

it('Renders the certification details', () => {
  const certificationDetailsElement = screen.getByLabelText(/certified/i);
  expect(certificationDetailsElement).toBeInTheDocument();
});

it('Renders the published status', () => {
  const publishedElement = screen.getByText(/published/i);
  expect(publishedElement).toBeInTheDocument();
});

it('Renders the modified date', () => {
  const modifiedDateElement = screen.getByText('Modified 2 days ago');
  expect(modifiedDateElement).toBeInTheDocument();
});

it('should fetch thumbnail when reportViewer has no thumbnail URL and feature flag is enabled', async () => {
  const mockGet = jest.spyOn(SupersetClient, 'get').mockResolvedValue({
    response: new Response(
      JSON.stringify({ thumbnail_url: '/new-thumbnail.png' }),
    ),
    json: () => Promise.resolve({ thumbnail_url: '/new-thumbnail.png' }),
  });
  const { rerender } = render(
    <ReportViewerCard
      reportViewer={{
        id: 1,
        thumbnail_url: '',
        changed_by_name: '',
        changed_by: '',
        reportViewer_title: '',
        published: false,
        url: '',
        owners: [],
      }}
      hasPerm={() => true}
      bulkSelectEnabled={false}
      loading={false}
      saveFavoriteStatus={() => {}}
      favoriteStatus={false}
      handleBulkReportViewerExport={() => {}}
      onDelete={() => {}}
    />,
  );
  await waitFor(() => {
    expect(mockGet).toHaveBeenCalledWith({
      endpoint: '/api/v1/reportViewer/1',
    });
  });
  rerender(
    <ReportViewerCard
      reportViewer={{
        id: 1,
        thumbnail_url: '/new-thumbnail.png',
        changed_by_name: '',
        changed_by: '',
        reportViewer_title: '',
        published: false,
        url: '',
        owners: [],
      }}
      hasPerm={() => true}
      bulkSelectEnabled={false}
      loading={false}
      saveFavoriteStatus={() => {}}
      favoriteStatus={false}
      handleBulkReportViewerExport={() => {}}
      onDelete={() => {}}
    />,
  );
  mockGet.mockRestore();
});
