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
import sinon from 'sinon';
import { SupersetClient } from '@superset-ui/core';
import { waitFor } from '@testing-library/react';

import {
  SAVE_REPORTVIEWER_STARTED,
  saveReportViewerRequest,
  SET_OVERRIDE_CONFIRM,
} from 'src/reportViewer/actions/reportViewerState';
import * as uiCore from '@superset-ui/core';
import { UPDATE_COMPONENTS_PARENTS_LIST } from 'src/reportViewer/actions/reportViewerLayout';
import {
  REPORTVIEWER_GRID_ID,
  SAVE_TYPE_OVERWRITE,
  SAVE_TYPE_OVERWRITE_CONFIRMED,
} from 'src/reportViewer/util/constants';
import {
  filterId,
  sliceEntitiesForReportViewer as sliceEntities,
} from 'spec/fixtures/mockSliceEntities';
import { emptyFilters } from 'spec/fixtures/mockReportViewerFilters';
import mockReportViewerData from 'spec/fixtures/mockReportViewerData';

describe('reportViewerState actions', () => {
  const mockState = {
    reportViewerState: {
      sliceIds: [filterId],
      hasUnsavedChanges: true,
    },
    reportViewerInfo: {
      metadata: {
        color_scheme: 'supersetColors',
      },
    },
    sliceEntities,
    reportViewerFilters: emptyFilters,
    reportViewerLayout: {
      past: [],
      present: mockReportViewerData.positions,
      future: {},
    },
  };
  const newReportViewerData = mockReportViewerData;

  let postStub;
  let getStub;
  let putStub;
  const updatedCss = '.updated_css_value {\n  color: black;\n}';

  beforeEach(() => {
    postStub = sinon
      .stub(SupersetClient, 'post')
      .resolves('the value you want to return');
    getStub = sinon.stub(SupersetClient, 'get').resolves({
      json: {
        result: {
          ...mockReportViewerData,
          css: updatedCss,
        },
      },
    });
    putStub = sinon.stub(SupersetClient, 'put').resolves({
      json: {
        result: mockReportViewerData,
      },
    });
  });
  afterEach(() => {
    postStub.restore();
    getStub.restore();
    putStub.restore();
  });

  function setup(stateOverrides) {
    const state = { ...mockState, ...stateOverrides };
    const getState = sinon.spy(() => state);
    const dispatch = sinon.stub();
    return { getState, dispatch, state };
  }

  describe('saveReportViewerRequest', () => {
    it('should dispatch UPDATE_COMPONENTS_PARENTS_LIST action', () => {
      const { getState, dispatch } = setup({
        reportViewerState: { hasUnsavedChanges: false },
      });
      const thunk = saveReportViewerRequest(newReportViewerData, 1, 'save_report');
      thunk(dispatch, getState);
      expect(dispatch.callCount).toBe(2);
      expect(dispatch.getCall(0).args[0].type).toBe(
        UPDATE_COMPONENTS_PARENTS_LIST,
      );
      expect(dispatch.getCall(1).args[0].type).toBe(SAVE_REPORTVIEWER_STARTED);
    });

    it('should post reportViewer data with updated redux state', () => {
      const { getState, dispatch } = setup({
        reportViewerState: { hasUnsavedChanges: false },
      });

      // start with mockReportViewerData, it didn't have parents attr
      expect(
        newReportViewerData.positions[REPORTVIEWER_GRID_ID].parents,
      ).not.toBeDefined();

      // mock redux work: dispatch an event, cause modify redux state
      const mockParentsList = ['ROOT_ID'];
      dispatch.callsFake(() => {
        mockState.reportViewerLayout.present[REPORTVIEWER_GRID_ID].parents =
          mockParentsList;
      });

      // call saveReportViewerRequest, it should post reportViewer data with updated
      // layout object (with parents attribute)
      const thunk = saveReportViewerRequest(newReportViewerData, 1, 'save_report');
      thunk(dispatch, getState);
      expect(postStub.callCount).toBe(1);
      const { jsonPayload } = postStub.getCall(0).args[0];
      const parsedJsonMetadata = JSON.parse(jsonPayload.json_metadata);
      expect(
        parsedJsonMetadata.positions[REPORTVIEWER_GRID_ID].parents,
      ).toStrictEqual(mockParentsList);
    });

    describe('FeatureFlag.CONFIRM_REPORTVIEWER_DIFF', () => {
      let isFeatureEnabledMock;
      beforeEach(() => {
        isFeatureEnabledMock = jest
          .spyOn(uiCore, 'isFeatureEnabled')
          .mockImplementation(feature => feature === 'CONFIRM_REPORTVIEWER_DIFF');
      });

      afterEach(() => {
        isFeatureEnabledMock.mockRestore();
      });

      it('dispatches SET_OVERRIDE_CONFIRM when an inspect value has diff', async () => {
        const id = 192;
        const { getState, dispatch } = setup();
        const thunk = saveReportViewerRequest(
          newReportViewerData,
          id,
          SAVE_TYPE_OVERWRITE,
        );
        thunk(dispatch, getState);
        expect(getStub.callCount).toBe(1);
        expect(postStub.callCount).toBe(0);
        await waitFor(() =>
          expect(dispatch.getCall(2).args[0].type).toBe(SET_OVERRIDE_CONFIRM),
        );
        expect(
          dispatch.getCall(2).args[0].overwriteConfirmMetadata.reportViewerId,
        ).toBe(id);
      });

      it('should post reportViewer data with after confirm the overwrite values', async () => {
        const id = 192;
        const { getState, dispatch } = setup();
        const confirmedReportViewerData = {
          ...newReportViewerData,
          css: updatedCss,
        };
        const thunk = saveReportViewerRequest(
          confirmedReportViewerData,
          id,
          SAVE_TYPE_OVERWRITE_CONFIRMED,
        );
        thunk(dispatch, getState);
        expect(getStub.callCount).toBe(0);
        expect(postStub.callCount).toBe(0);
        await waitFor(() => expect(putStub.callCount).toBe(1));
        const { body } = putStub.getCall(0).args[0];
        expect(body).toBe(JSON.stringify(confirmedReportViewerData));
      });
    });
  });
});
