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
/* eslint-env browser */
import { createRef, PureComponent } from 'react';
import { Radio } from 'src/components/Radio';
import { RadioChangeEvent } from 'src/components';
import { Input } from 'src/components/Input';
import Button from 'src/components/Button';
import { t, JsonResponse } from '@superset-ui/core';

import ModalTrigger, { ModalTriggerRef } from 'src/components/ModalTrigger';
import Checkbox from 'src/components/Checkbox';
import {
  SAVE_TYPE_OVERWRITE,
  SAVE_TYPE_NEWREPORTVIEWER,
} from 'src/reportViewer/util/constants';

type SaveType = typeof SAVE_TYPE_OVERWRITE | typeof SAVE_TYPE_NEWREPORTVIEWER;

type SaveModalProps = {
  addSuccessToast: (arg: string) => void;
  addDangerToast: (arg: string) => void;
  reportViewerId: number;
  reportViewerTitle: string;
  reportViewerInfo: Record<string, any>;
  expandedSlices: Record<string, any>;
  layout: Record<string, any>;
  saveType: SaveType;
  triggerNode: JSX.Element;
  customCss: string;
  colorNamespace?: string;
  colorScheme?: string;
  onSave: (data: any, id: number | string, saveType: SaveType) => void;
  canOverwrite: boolean;
  shouldPersistRefreshFrequency: boolean;
  refreshFrequency: number;
  lastModifiedTime: number;
};

type SaveModalState = {
  saveType: SaveType;
  newReportName: string;
  duplicateSlices: boolean;
};

const defaultProps = {
  saveType: SAVE_TYPE_OVERWRITE,
  colorNamespace: undefined,
  colorScheme: undefined,
  shouldPersistRefreshFrequency: false,
};

class SaveModal extends PureComponent<SaveModalProps, SaveModalState> {
  static defaultProps = defaultProps;

  modal: ModalTriggerRef | null;

  onSave: (
    data: Record<string, any>,
    reportViewerId: number | string,
    saveType: SaveType,
  ) => Promise<JsonResponse>;

  constructor(props: SaveModalProps) {
    super(props);
    this.state = {
      saveType: props.saveType,
      newReportName: `${props.reportViewerTitle} ${t('[copy]')}`,
      duplicateSlices: false,
    };

    this.handleSaveTypeChange = this.handleSaveTypeChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.saveReportViewer = this.saveReportViewer.bind(this);
    this.toggleDuplicateSlices = this.toggleDuplicateSlices.bind(this);
    this.onSave = this.props.onSave.bind(this);
    this.modal = createRef() as ModalTriggerRef;
  }

  toggleDuplicateSlices(): void {
    this.setState(prevState => ({
      duplicateSlices: !prevState.duplicateSlices,
    }));
  }

  handleSaveTypeChange(event: RadioChangeEvent) {
    this.setState({
      saveType: (event.target as HTMLInputElement).value as SaveType,
    });
  }

  handleNameChange(name: string) {
    this.setState({
      newReportName: name,
      saveType: SAVE_TYPE_NEWREPORTVIEWER,
    });
  }

  saveReportViewer() {
    const { saveType, newReportName } = this.state;
    const {
      reportViewerTitle,
      reportViewerInfo,
      layout: positions,
      customCss,
      reportViewerId,
      refreshFrequency: currentRefreshFrequency,
      shouldPersistRefreshFrequency,
      lastModifiedTime,
    } = this.props;

    // check refresh frequency is for current session or persist
    const refreshFrequency = shouldPersistRefreshFrequency
      ? currentRefreshFrequency
      : reportViewerInfo.metadata?.refresh_frequency; // eslint-disable camelcase

    const data = {
      certified_by: reportViewerInfo.certified_by,
      certification_details: reportViewerInfo.certification_details,
      css: customCss,
      reportViewer_title:
        saveType === SAVE_TYPE_NEWREPORTVIEWER ? newReportName : reportViewerTitle,
      duplicate_slices: this.state.duplicateSlices,
      last_modified_time: lastModifiedTime,
      owners: reportViewerInfo.owners,
      roles: reportViewerInfo.roles,
      metadata: {
        ...reportViewerInfo?.metadata,
        positions,
        refresh_frequency: refreshFrequency,
      },
    };

    if (saveType === SAVE_TYPE_NEWREPORTVIEWER && !newReportName) {
      this.props.addDangerToast(
        t('You must pick a name for the new reportViewer'),
      );
    } else {
      this.onSave(data, reportViewerId, saveType).then((resp: JsonResponse) => {
        if (saveType === SAVE_TYPE_NEWREPORTVIEWER && resp.json?.result?.id) {
          window.location.href = `/superset/reportViewer/${resp.json.result.id}/`;
        }
      });
      this.modal?.current?.close?.();
    }
  }

  render() {
    return (
      <ModalTrigger
        ref={this.modal}
        triggerNode={this.props.triggerNode}
        modalTitle={t('Save reportViewer')}
        modalBody={
          <div>
            <Radio
              value={SAVE_TYPE_OVERWRITE}
              onChange={this.handleSaveTypeChange}
              checked={this.state.saveType === SAVE_TYPE_OVERWRITE}
              disabled={!this.props.canOverwrite}
            >
              {t('Overwrite ReportViewer [%s]', this.props.reportViewerTitle)}
            </Radio>
            <hr />
            <Radio
              value={SAVE_TYPE_NEWREPORTVIEWER}
              onChange={this.handleSaveTypeChange}
              checked={this.state.saveType === SAVE_TYPE_NEWREPORTVIEWER}
            >
              {t('Save as:')}
            </Radio>
            <Input
              type="text"
              placeholder={t('[reportViewer name]')}
              value={this.state.newReportName}
              onFocus={e => this.handleNameChange(e.target.value)}
              onChange={e => this.handleNameChange(e.target.value)}
            />
            <div className="m-l-25 m-t-5">
              <Checkbox
                checked={this.state.duplicateSlices}
                onChange={() => this.toggleDuplicateSlices()}
              />
              <span className="m-l-5">{t('also copy (duplicate) charts')}</span>
            </div>
          </div>
        }
        modalFooter={
          <div>
            <Button
              data-test="modal-save-reportViewer-button"
              buttonStyle="primary"
              onClick={this.saveReportViewer}
            >
              {t('Save')}
            </Button>
          </div>
        }
      />
    );
  }
}

export default SaveModal;
