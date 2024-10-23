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
import { throttle } from 'lodash';
import { REPORTVIEWER_ROOT_TYPE } from 'src/reportViewer/util/componentTypes';
import getDropPosition from 'src/reportViewer/util/getDropPosition';
import handleScroll from './handleScroll';

const HOVER_THROTTLE_MS = 100;

function handleHover(props, monitor, Component) {
  // this may happen due to throttling
  if (!Component.mounted) return;

  const dropPosition = getDropPosition(monitor, Component);

  const isReportViewerRoot =
    Component?.props?.component?.type === REPORTVIEWER_ROOT_TYPE;
  const scroll = isReportViewerRoot ? 'SCROLL_TOP' : null;

  handleScroll(scroll);

  if (!dropPosition) {
    Component.setState(() => ({ dropIndicator: null }));
    return;
  }

  Component?.props?.onHover();

  Component.setState(() => ({
    dropIndicator: dropPosition,
  }));
}

// this is called very frequently by react-dnd
export default throttle(handleHover, HOVER_THROTTLE_MS);
