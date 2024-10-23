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
import { useSelector } from 'react-redux';
import { css, SupersetTheme, useTheme, useTruncation } from '@superset-ui/core';
import Icons from 'src/components/Icons';
import { RootState } from 'src/reportViewer/types';
import { Row, FilterName, InternalRow } from './Styles';
import { FilterCardRowProps } from './types';
import { FilterConfigurationLink } from '../FilterBar/FilterConfigurationLink';
import { TooltipWithTruncation } from './TooltipWithTruncation';

export const NameRow = ({
  filter,
  hidePopover,
}: FilterCardRowProps & { hidePopover: () => void }) => {
  const theme = useTheme();
  const [filterNameRef, , elementsTruncated] = useTruncation();
  const reportViewerId = useSelector<RootState, number>(
    ({ reportViewerInfo }) => reportViewerInfo.id,
  );

  const canEdit = useSelector<RootState, boolean>(
    ({ reportViewerInfo }) => reportViewerInfo.reportedit_perm,
  );

  return (
    <Row
      css={(theme: SupersetTheme) => css`
        margin-bottom: ${theme.gridUnit * 3}px;
        justify-content: space-between;
      `}
    >
      <InternalRow>
        <Icons.FilterSmall
          css={(theme: SupersetTheme) => css`
            margin-right: ${theme.gridUnit}px;
          `}
        />
        <TooltipWithTruncation title={elementsTruncated ? filter.name : null}>
          <FilterName ref={filterNameRef}>{filter.name}</FilterName>
        </TooltipWithTruncation>
      </InternalRow>
      {canEdit && (
        <FilterConfigurationLink
          reportViewerId={reportViewerId}
          onClick={hidePopover}
          initialFilterId={filter.id}
        >
          <Icons.Edit iconSize="l" iconColor={theme.colors.grayscale.light1} />
        </FilterConfigurationLink>
      )}
    </Row>
  );
};
