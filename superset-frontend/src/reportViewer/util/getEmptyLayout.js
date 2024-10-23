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
import { REPORTVIEWER_ROOT_TYPE, REPORTVIEWER_GRID_TYPE } from './componentTypes';

import {
  REPORTVIEWER_GRID_ID,
  REPORTVIEWER_ROOT_ID,
  REPORTVIEWER_VERSION_KEY,
} from './constants';

export default function getEmptyLayout() {
  return {
    [REPORTVIEWER_VERSION_KEY]: 'v2',
    [REPORTVIEWER_ROOT_ID]: {
      type: REPORTVIEWER_ROOT_TYPE,
      id: REPORTVIEWER_ROOT_ID,
      children: [REPORTVIEWER_GRID_ID],
    },
    [REPORTVIEWER_GRID_ID]: {
      type: REPORTVIEWER_GRID_TYPE,
      id: REPORTVIEWER_GRID_ID,
      children: [],
      parents: [REPORTVIEWER_ROOT_ID],
    },
  };
}
