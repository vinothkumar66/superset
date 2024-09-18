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

import { Component } from 'react';
import { t } from '@superset-ui/core';
import PropTypes from 'prop-types';
import { PivotData, aggregators, flatKey } from './utilities';
import { Styles } from './Styles';

const parseLabel = value => {
  if (typeof value === 'string') {
    if (value === 'metric') return t('metric');
    return value;
  }
  if (typeof value === 'number') {
    return value;
  }
  return String(value);
};

function displayHeaderCell(
  needToggle,
  ArrowIcon,
  onArrowClick,
  value,
  namesMapping,
) {
  const name = namesMapping[value] || value;
  return needToggle ? (
    <span className="toggle-wrapper">
      <span
        role="button"
        tabIndex="0"
        className="toggle"
        onClick={ onArrowClick }
      >
        { ArrowIcon }
      </span>
      <span className="toggle-val">{ parseLabel(name) }</span>
    </span>
  ) : (
    parseLabel(name)
  );
}

export class TableRenderer extends Component {
  constructor(props) {
    super(props);

    // We need state to record which entries are collapsed and which aren't.
    // This is an object with flat-keys indicating if the corresponding rows
    // should be collapsed.
    this.state = { collapsedRows: {}, collapsedCols: {} };

    this.clickHeaderHandler = this.clickHeaderHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  getBasePivotSettings() {
    // One-time extraction of pivot settings that we'll use throughout the render.

    const { props } = this;
    const colAttrs = props.cols;
    const rowAttrs = props.rows;

    const tableOptions = {
      rowTotals: true,
      colTotals: true,
      ...props.tableOptions,
    };
    const rowTotals = tableOptions.rowTotals || colAttrs.length === 0;
    const colTotals = tableOptions.colTotals || rowAttrs.length === 0;

    const namesMapping = props.namesMapping || {};
    const subtotalOptions = {
      arrowCollapsed: '\u25B2',
      arrowExpanded: '\u25BC',
      ...props.subtotalOptions,
    };

    const colSubtotalDisplay = {
      displayOnTop: false,
      enabled: tableOptions.colSubTotals,
      hideOnExpand: false,
      ...subtotalOptions.colSubtotalDisplay,
    };

    const rowSubtotalDisplay = {
      displayOnTop: false,
      enabled: tableOptions.rowSubTotals,
      hideOnExpand: false,
      ...subtotalOptions.rowSubtotalDisplay,
    };

    const pivotData = new PivotData(props, {
      rowEnabled: rowSubtotalDisplay.enabled,
      colEnabled: colSubtotalDisplay.enabled,
      rowPartialOnTop: rowSubtotalDisplay.displayOnTop,
      colPartialOnTop: colSubtotalDisplay.displayOnTop,
    });
    const rowKeys = pivotData.getRowKeys();
    const colKeys = pivotData.getColKeys();

    // Also pre-calculate all the callbacks for cells, etc... This is nice to have to
    // avoid re-calculations of the call-backs on cell expansions, etc...
    const cellCallbacks = {};
    const rowTotalCallbacks = {};
    const colTotalCallbacks = {};
    let grandTotalCallback = null;
    if (tableOptions.clickCallback) {
      rowKeys.forEach(rowKey => {
        const flatRowKey = flatKey(rowKey);
        if (!(flatRowKey in cellCallbacks)) {
          cellCallbacks[flatRowKey] = {};
        }
        colKeys.forEach(colKey => {
          cellCallbacks[flatRowKey][flatKey(colKey)] = this.clickHandler(
            pivotData,
            rowKey,
            colKey,
          );
        });
      });

      // Add in totals as well.
      if (rowTotals) {
        rowKeys.forEach(rowKey => {
          rowTotalCallbacks[flatKey(rowKey)] = this.clickHandler(
            pivotData,
            rowKey,
            [],
          );
        });
      }
      if (colTotals) {
        colKeys.forEach(colKey => {
          colTotalCallbacks[flatKey(colKey)] = this.clickHandler(
            pivotData,
            [],
            colKey,
          );
        });
      }
      if (rowTotals && colTotals) {
        grandTotalCallback = this.clickHandler(pivotData, [], []);
      }
    }

    return {
      pivotData,
      colAttrs,
      rowAttrs,
      colKeys,
      rowKeys,
      rowTotals,
      colTotals,
      arrowCollapsed: subtotalOptions.arrowCollapsed,
      arrowExpanded: subtotalOptions.arrowExpanded,
      colSubtotalDisplay,
      rowSubtotalDisplay,
      cellCallbacks,
      rowTotalCallbacks,
      colTotalCallbacks,
      grandTotalCallback,
      namesMapping,
    };
  }

  clickHandler(pivotData, rowValues, colValues) {
    const colAttrs = this.props.cols;
    const rowAttrs = this.props.rows;
    const value = pivotData.getAggregator(rowValues, colValues).value();
    console.log(value, "value$$")

    const filters = {};
    const colLimit = Math.min(colAttrs.length, colValues.length);
    for (let i = 0; i < colLimit; i += 1) {
      const attr = colAttrs[i];
      if (colValues[i] !== null) {
        filters[attr] = colValues[i];
      }
    }
    const rowLimit = Math.min(rowAttrs.length, rowValues.length);
    for (let i = 0; i < rowLimit; i += 1) {
      const attr = rowAttrs[i];
      if (rowValues[i] !== null) {
        filters[attr] = rowValues[i];
      }
    }
    return e =>
      this.props.tableOptions.clickCallback(e, value, filters, pivotData);
  }

  clickHeaderHandler(
    pivotData,
    values,
    attrs,
    attrIdx,
    callback,
    isSubtotal = false,
    isGrandTotal = false,
  ) {
    const filters = {};
    for (let i = 0; i <= attrIdx; i += 1) {
      const attr = attrs[i];
      filters[attr] = values[i];
    }
    return e =>
      callback(
        e,
        values[attrIdx],
        filters,
        pivotData,
        isSubtotal,
        isGrandTotal,
      );
  }

  collapseAttr(rowOrCol, attrIdx, allKeys) {
    return e => {
      // Collapse an entire attribute.
      e.stopPropagation();
      const keyLen = attrIdx + 1;
      const collapsed = allKeys.filter(k => k.length === keyLen).map(flatKey);

      const updates = {};
      collapsed.forEach(k => {
        updates[k] = true;
      });

      if (rowOrCol) {
        this.setState(state => ({
          collapsedRows: { ...state.collapsedRows, ...updates },
        }));
      } else {
        this.setState(state => ({
          collapsedCols: { ...state.collapsedCols, ...updates },
        }));
      }
    };
  }

  expandAttr(rowOrCol, attrIdx, allKeys) {
    return e => {
      // Expand an entire attribute. This implicitly implies expanding all of the
      // parents as well. It's a bit inefficient but ah well...
      e.stopPropagation();
      const updates = {};
      allKeys.forEach(k => {
        for (let i = 0; i <= attrIdx; i += 1) {
          updates[flatKey(k.slice(0, i + 1))] = false;
        }
      });

      if (rowOrCol) {
        this.setState(state => ({
          collapsedRows: { ...state.collapsedRows, ...updates },
        }));
      } else {
        this.setState(state => ({
          collapsedCols: { ...state.collapsedCols, ...updates },
        }));
      }
    };
  }

  toggleRowKey(flatRowKey) {
    return e => {
      e.stopPropagation();
      this.setState(state => ({
        collapsedRows: {
          ...state.collapsedRows,
          [flatRowKey]: !state.collapsedRows[flatRowKey],
        },
      }));
    };
  }

  toggleColKey(flatColKey) {
    return e => {
      e.stopPropagation();
      this.setState(state => ({
        collapsedCols: {
          ...state.collapsedCols,
          [flatColKey]: !state.collapsedCols[flatColKey],
        },
      }));
    };
  }

  calcAttrSpans(attrArr, numAttrs) {
    // Given an array of attribute values (i.e. each element is another array with
    // the value at every level), compute the spans for every attribute value at
    // every level. The return value is a nested array of the same shape. It has
    // -1's for repeated values and the span number otherwise.

    const spans = [];
    // Index of the last new value
    const li = Array(numAttrs).map(() => 0);
    let lv = Array(numAttrs).map(() => null);
    for (let i = 0; i < attrArr.length; i += 1) {
      // Keep increasing span values as long as the last keys are the same. For
      // the rest, record spans of 1. Update the indices too.
      const cv = attrArr[i];
      const ent = [];
      let depth = 0;
      const limit = Math.min(lv.length, cv.length);
      while (depth < limit && lv[depth] === cv[depth]) {
        ent.push(-1);
        spans[li[depth]][depth] += 1;
        depth += 1;
      }
      while (depth < cv.length) {
        li[depth] = i;
        ent.push(1);
        depth += 1;
      }
      spans.push(ent);
      lv = cv;
    }
    return spans;
  }

  renderColHeaderRow(attrName, attrIdx, pivotSettings) {
    // Render a single row in the column header at the top of the pivot table.

    const {
      rowAttrs,
      colAttrs,
      colKeys,
      visibleColKeys,
      colAttrSpans,
      rowTotals,
      arrowExpanded,
      arrowCollapsed,
      colSubtotalDisplay,
      maxColVisible,
      pivotData,
      namesMapping,
    } = pivotSettings;
    const {
      highlightHeaderCellsOnHover,
      omittedHighlightHeaderGroups = [],
      highlightedHeaderCells,
      dateFormatters,
    } = this.props.tableOptions;

    const spaceCell =
      attrIdx === 0 && rowAttrs.length !== 0 ? (
        <th
          key="padding"
          colSpan={ rowAttrs.length }
          rowSpan={ colAttrs.length }
          aria-hidden="true"
        />
      ) : null;

    const needToggle =
      colSubtotalDisplay.enabled && attrIdx !== colAttrs.length - 1;
    let arrowClickHandle = null;
    let subArrow = null;
    if (needToggle) {
      arrowClickHandle =
        attrIdx + 1 < maxColVisible
          ? this.collapseAttr(false, attrIdx, colKeys)
          : this.expandAttr(false, attrIdx, colKeys);
      subArrow = attrIdx + 1 < maxColVisible ? arrowExpanded : arrowCollapsed;
    }
    const attrNameCell = (
      <th key="label" className="pvtAxisLabel">
        { displayHeaderCell(
          needToggle,
          subArrow,
          arrowClickHandle,
          attrName,
          namesMapping,
        ) }
      </th>
    );

    const attrValueCells = [];
    const rowIncrSpan = rowAttrs.length !== 0 ? 1 : 0;
    // Iterate through columns. Jump over duplicate values.
    let i = 0;
    while (i < visibleColKeys.length) {
      let handleContextMenu;
      const colKey = visibleColKeys[i];
      const colSpan = attrIdx < colKey.length ? colAttrSpans[i][attrIdx] : 1;
      let colLabelClass = 'pvtColLabel';
      if (attrIdx < colKey.length) {
        if (!omittedHighlightHeaderGroups.includes(colAttrs[attrIdx])) {
          if (highlightHeaderCellsOnHover) {
            colLabelClass += ' hoverable';
          }
          handleContextMenu = e =>
            this.props.onContextMenu(e, colKey, undefined, {
              [attrName]: colKey[attrIdx],
            });
        }
        if (
          highlightedHeaderCells &&
          Array.isArray(highlightedHeaderCells[colAttrs[attrIdx]]) &&
          highlightedHeaderCells[colAttrs[attrIdx]].includes(colKey[attrIdx])
        ) {
          colLabelClass += ' active';
        }

        const rowSpan = 1 + (attrIdx === colAttrs.length - 1 ? rowIncrSpan : 0);
        const flatColKey = flatKey(colKey.slice(0, attrIdx + 1));
        const onArrowClick = needToggle ? this.toggleColKey(flatColKey) : null;

        const headerCellFormattedValue =
          dateFormatters &&
            dateFormatters[attrName] &&
            typeof dateFormatters[attrName] === 'function'
            ? dateFormatters[attrName](colKey[attrIdx])
            : colKey[attrIdx];
        attrValueCells.push(
          <th
            className={ colLabelClass }
            key={ `colKey-${flatColKey}` }
            colSpan={ colSpan }
            rowSpan={ rowSpan }
            role="columnheader button"
            onClick={ this.clickHeaderHandler(
              pivotData,
              colKey,
              this.props.cols,
              attrIdx,
              this.props.tableOptions.clickColumnHeaderCallback,
            ) }
            onContextMenu={ handleContextMenu }
          >
            { displayHeaderCell(
              needToggle,
              this.state.collapsedCols[flatColKey]
                ? arrowCollapsed
                : arrowExpanded,
              onArrowClick,
              headerCellFormattedValue,
              namesMapping,
            ) }
          </th>,
        );
      } else if (attrIdx === colKey.length) {
        const rowSpan = colAttrs.length - colKey.length + rowIncrSpan;
        attrValueCells.push(
          <th
            className={ `${colLabelClass} pvtSubtotalLabel` }
            key={ `colKeyBuffer-${flatKey(colKey)}` }
            colSpan={ colSpan }
            rowSpan={ rowSpan }
            role="columnheader button"
            onClick={ this.clickHeaderHandler(
              pivotData,
              colKey,
              this.props.cols,
              attrIdx,
              this.props.tableOptions.clickColumnHeaderCallback,
              true,
            ) }
          >
            { t('Subtotal') }
          </th>,
        );
      }
      // The next colSpan columns will have the same value anyway...
      i += colSpan;
    }
    const totalCells =
      attrIdx === 0 && rowTotals
        ? this.props.aggregatorName.map((aggName, idx) => (
          <th
            key={ `total-${aggName}-${idx}` }
            className="pvtTotalLabel"
            rowSpan={ colAttrs.length + Math.min(rowAttrs.length, 1) }
            role="columnheader button"
            onClick={ this.clickHeaderHandler(
              pivotData,
              [],
              this.props.cols,
              attrIdx,
              this.props.tableOptions.clickColumnHeaderCallback,
              false,
              true,
            ) }
          >
            { t('Total (%(aggregatorName)s)', {
              aggregatorName: t(aggName),
            }) }
          </th>
        ))
        : null;
    const cells = [spaceCell, attrNameCell, ...attrValueCells, totalCells];
    return <tr key={ `colAttr-${attrIdx}` }>{ cells }</tr>;
  }

  renderRowHeaderRow(pivotSettings) {
    // Render just the attribute names of the rows (the actual attribute values
    // will show up in the individual rows).
    const {
      rowAttrs,
      colAttrs,
      rowKeys,
      arrowCollapsed,
      arrowExpanded,
      rowSubtotalDisplay,
      maxRowVisible,
      pivotData,
      namesMapping,
    } = pivotSettings;

    return (
      <tr key="rowHdr">
        { rowAttrs.map((r, i) => {
          const needLabelToggle =
            rowSubtotalDisplay.enabled && i !== rowAttrs.length - 1;
          let arrowClickHandle = null;
          let subArrow = null;
          if (needLabelToggle) {
            arrowClickHandle =
              i + 1 < maxRowVisible
                ? this.collapseAttr(true, i, rowKeys)
                : this.expandAttr(true, i, rowKeys);
            subArrow = i + 1 < maxRowVisible ? arrowExpanded : arrowCollapsed;
          }
          return (
            <th className="pvtAxisLabel" key={ `rowAttr-${i}` }>
              { displayHeaderCell(
                needLabelToggle,
                subArrow,
                arrowClickHandle,
                r,
                namesMapping,
              ) }
            </th>
          );
        }) }

        {/* Render multiple aggregator function names for the "Total" header */ }
        { colAttrs.length === 0
          ? this.props.aggregatorName.map((aggName, idx) => (
            <th
              className="pvtTotalLabel"
              key={ `total-${aggName}-${idx}` }
              role="columnheader button"
              onClick={ this.clickHeaderHandler(
                pivotData,
                [],
                this.props.rows,
                0,
                this.props.tableOptions.clickRowHeaderCallback,
                false,
                true,
              ) }
            >
              { t('Total (%(aggregatorName)s)', {
                aggregatorName: t(aggName),
              }) }
            </th>
          ))
          : null }
      </tr>
    );
  }
  
  renderTableRow(rowKey, rowIdx, pivotSettings) {
    // Render a single row in the pivot table.
    console.log(rowKey, rowIdx, pivotSettings, "rowKey, rowIdx, pivotSettings");

    const {
      rowAttrs,
      colAttrs,
      rowAttrSpans,
      visibleColKeys,
      pivotData,
      rowTotals,
      rowSubtotalDisplay,
      arrowExpanded,
      arrowCollapsed,
      cellCallbacks,
      rowTotalCallbacks,
      namesMapping,
    } = pivotSettings;

    const {
      highlightHeaderCellsOnHover,
      omittedHighlightHeaderGroups = [],
      highlightedHeaderCells,
      cellColorFormatters,
      dateFormatters,
    } = this.props.tableOptions;

    const flatRowKey = flatKey(rowKey);
    const colIncrSpan = colAttrs.length !== 0 ? 1 : 0;

    // Create row header cells
    const attrValueCells = rowKey.map((r, i) => {
      let handleContextMenu;
      let valueCellClassName = 'pvtRowLabel';
      if (!omittedHighlightHeaderGroups.includes(rowAttrs[i])) {
        if (highlightHeaderCellsOnHover) {
          valueCellClassName += ' hoverable';
        }
        handleContextMenu = (e) =>
          this.props.onContextMenu(e, undefined, rowKey, {
            [rowAttrs[i]]: r,
          });
      }
      if (
        highlightedHeaderCells &&
        Array.isArray(highlightedHeaderCells[rowAttrs[i]]) &&
        highlightedHeaderCells[rowAttrs[i]].includes(r)
      ) {
        valueCellClassName += ' active';
      }
      const rowSpan = rowAttrSpans[rowIdx][i];
      if (rowSpan > 0) {
        const flatRowKey = flatKey(rowKey.slice(0, i + 1));
        const colSpan = 1 + (i === rowAttrs.length - 1 ? colIncrSpan : 0);
        const needRowToggle =
          rowSubtotalDisplay.enabled && i !== rowAttrs.length - 1;
        const onArrowClick = needRowToggle
          ? this.toggleRowKey(flatRowKey)
          : null;

        const headerCellFormattedValue =
          dateFormatters && dateFormatters[rowAttrs[i]]
            ? dateFormatters[rowAttrs[i]](r)
            : r;

        return (
          <th
            key={ `rowKeyLabel-${i}` }
            className={ valueCellClassName }
            rowSpan={ rowSpan }
            colSpan={ colSpan }
            role="columnheader button"
            onClick={ this.clickHeaderHandler(
              pivotData,
              rowKey,
              this.props.rows,
              i,
              this.props.tableOptions.clickRowHeaderCallback,
            ) }
            onContextMenu={ handleContextMenu }
          >
            { displayHeaderCell(
              needRowToggle,
              this.state.collapsedRows[flatRowKey]
                ? arrowCollapsed
                : arrowExpanded,
              onArrowClick,
              headerCellFormattedValue,
              namesMapping,
            ) }
          </th>
        );
      }
      return null;
    });

    // Add padding cell for subtotal rows
    const attrValuePaddingCell =
      rowKey.length < rowAttrs.length ? (
        <th
          className="pvtRowLabel pvtSubtotalLabel"
          key="rowKeyBuffer"
          colSpan={ rowAttrs.length - rowKey.length + colIncrSpan }
          rowSpan={ 1 }
          role="columnheader button"
          onClick={ this.clickHeaderHandler(
            pivotData,
            rowKey,
            this.props.rows,
            rowKey.length,
            this.props.tableOptions.clickRowHeaderCallback,
            true,
          ) }
        >
          { t('Subtotal') }
        </th>
      ) : null;

    const rowClickHandlers = cellCallbacks[flatRowKey] || {};
    
    const valueCells = visibleColKeys.map(colKey => {
      const flatColKey = flatKey(colKey);
      const agg = pivotData.getAggregator(rowKey, colKey);
      console.log(agg,"agg RTR")
      const firstAggregatorName = this.props.aggregatorName[0];
      let firstAggregator = agg[firstAggregatorName];
      if (!firstAggregator) {
        console.warn(`Aggregator '${firstAggregatorName}' is not found. Using default 'Sum' aggregator.`);
        // Assuming 'Sum' is a default aggregator and is available
        firstAggregator = agg
      }
      console.log(firstAggregatorName,firstAggregator,"1st agg name,1st agg")
      const aggValue = firstAggregator.value();

      const keys = [...rowKey, ...colKey];
      let backgroundColor;
      if (cellColorFormatters) {
        Object.values(cellColorFormatters).forEach(cellColorFormatter => {
          if (Array.isArray(cellColorFormatter)) {
            keys.forEach(key => {
              if (backgroundColor) {
                return;
              }
              cellColorFormatter
                .filter(formatter => formatter.column === key)
                .forEach(formatter => {
                  const formatterResult = formatter.getColorFromValue(aggValue);
                  if (formatterResult) {
                    backgroundColor = formatterResult;
                  }
                });
            });
          }
        });
      }

      const style = agg.isSubtotal
        ? { fontWeight: 'bold' }
        : { backgroundColor };

      return (
        <td
          role="gridcell"
          className="pvtVal"
          key={`pvtVal-${flatColKey}`}
          onClick={rowClickHandlers[flatColKey]}
          onContextMenu={e => this.props.onContextMenu(e, colKey, rowKey)}
          style={style}
        >
          {firstAggregator.format(aggValue)}
        </td>
      );
    });
    

    const totalCells = rowTotals
    ? this.props.aggregatorName.map((aggName, idx) => {
        const agg = pivotData.getAggregator(rowKey, []); // Updated method call
        // const totalSum = agg['Sum'].value();
        // console.log(totalSum,"total sum",rowKey)
        // Ensure that the aggregator object is valid
        if (!agg || typeof agg !== 'object') {
          console.error(`Invalid aggregator object for rowKey: ${rowKey}`);
          return <td key={`error-${idx}`}>Error</td>;
        }
  
        // Ensure that the current aggregator is valid
        const currentAgg = agg[aggName];
        if (!currentAgg || typeof currentAgg.value !== 'function') {
          console.error(`Invalid aggregator for ${aggName}:`, currentAgg);
          return <td key={`error-${aggName}-${idx}`}>Error</td>;
        }
  
        const aggValue = currentAgg.value();
  console.log(aggValue,"aggvalue %%%%%",currentAgg,agg,"currentAgg,agg")
        return (
          <td
            role="gridcell"
            key={`total-${aggName}-${idx}`}
            className="pvtTotal"
            onClick={rowTotalCallbacks[flatRowKey]}
            onContextMenu={(e) => this.props.onContextMenu(e, undefined, rowKey)}
          >
            {currentAgg.format(aggValue)}
          </td>
        );
      })
    : [];
  
  
console.log(totalCells,"totalCells")
    const rowCells = [
      ...attrValueCells,
      attrValuePaddingCell,
      ...valueCells,
      totalCells,
    ];

    return <tr key={ `keyRow-${flatRowKey}` }>{ rowCells }</tr>;
  }

  renderTotalsRow(pivotSettings) {
    const {
      rowAttrs,
      colAttrs,
      visibleColKeys,
      pivotData,
      colTotalCallbacks,
      grandTotalCallback,
      rowTotals,
    } = pivotSettings;

    const totalRows = this.props.aggregatorName.map((aggName, aggIdx) => {
      const aggregatorFactory = pivotData.aggregators[aggName];
      console.log(aggregatorFactory, "aggregatorFactory JJJJJ")
      if (typeof aggregatorFactory !== 'function') {
        console.error(`Aggregator ${aggName} is not a function`);
        return (
          <tr key={ `total-row-${aggIdx}` } className="pvtRowTotals">
            <th
              key={ `label-${aggIdx}` }
              className="pvtTotalLabel pvtRowTotalLabel"
              colSpan={ rowAttrs.length + Math.min(colAttrs.length, 1) }
              role="columnheader button"
            >
              { `Total (${aggName})` }
            </th>
            { visibleColKeys.map(colKey => (
              <td
                key={ `total-${flatKey(colKey)}-${aggIdx}` }
                className="pvtTotal pvtRowTotal"
                style={ { padding: '5px' } }
              >
                Error in aggregator
              </td>
            )) }
          </tr>
        );
      }

      const totalLabelCell = (
        <th
          key={ `label-${aggIdx}` }
          className="pvtTotalLabel pvtRowTotalLabel"
          colSpan={ rowAttrs.length + Math.min(colAttrs.length, 1) }
          role="columnheader button"
          onClick={ this.clickHeaderHandler(
            pivotData,
            [],
            this.props.rows,
            0,
            this.props.tableOptions.clickRowHeaderCallback,
            false,
            true,
          ) }
        >
          { `Total (${aggName})` }
        </th>
      );

  // For each aggregation function (e.g., 'Sum', 'Count'), we generate a full row of values
  const totalValueCells = visibleColKeys.map((colKey, idx) => {
    const flatColKey = flatKey(colKey);  // Get a flattened version of the column key
    const aggregator = pivotData.getAggregator([], colKey);  // Fetch the aggregator for the column

    // Get the specific aggregator dynamically based on the name (e.g., 'Sum', 'Count')
    const currentAggregator = aggregator[aggName];

    // Check if the aggregator is valid
    if (typeof currentAggregator !== 'object' || typeof currentAggregator.value !== 'function') {
      console.error(`Aggregator for ${aggName} is not valid`, currentAggregator);
      return (
        <td
          key={`total-${flatColKey}-${aggIdx}-${idx}`}
          className="pvtTotal pvtRowTotal"
          style={{ padding: '5px', color: 'red' }}
        >
          Error
        </td>
      );
    }

    // Get the value from the aggregator
    let aggValue;
    try {
      aggValue = currentAggregator.value();  // Fetch the total value
    } catch (e) {
      console.error(`Error fetching value for ${aggName}`, e);
      return (
        <td
          key={`total-${flatColKey}-${aggIdx}-${idx}`}
          className="pvtTotal pvtRowTotal"
          style={{ padding: '5px', color: 'red' }}
        >
          Error
        </td>
      );
    }
    console.log(aggValue,"aggValue ++++++++++++++++++++++")
console.log( currentAggregator.format(aggValue)," currentAggregator.format(aggValue)")
    // Render the value (formatted if a formatter exists)
    return (
      <td
        key={`total-${flatColKey}-${aggIdx}-${idx}`}
        className="pvtTotal pvtRowTotal"
        onClick={colTotalCallbacks[flatColKey]}
        onContextMenu={e => this.props.onContextMenu(e, colKey, undefined)}
        style={{ padding: '5px' }}
      >
        {/* {aggName} */}
        {currentAggregator.format ? currentAggregator.format(aggValue) : aggValue}
      </td>
    );
  });

      let grandTotalCells = [];

      if (rowTotals && this.props.aggregatorName) {
        grandTotalCells = this.props.aggregatorName.map((aggName, idx) => {
          const aggregatorFunction = pivotData.aggregators[aggName];
          if (typeof aggregatorFunction !== 'function') {
            console.error(`Aggregator ${aggName} is not a function`);
            return (
              <td key={ `total-${idx}` } className="pvtGrandTotal pvtRowTotal">
                Error in aggregator
              </td>
            );
          }

          const agg = pivotData.getAggregator([], []);
          const currentAggregator = agg[aggName];
          if (typeof currentAggregator !== 'object' || typeof currentAggregator.value !== 'function') {
            console.error(`Aggregator for ${aggName} is not valid`, currentAggregator);
            return (
              <td key={ `total-${idx}` } className="pvtGrandTotal pvtRowTotal">
                Error grandtot
              </td>
            );
          }

          const aggValue = currentAggregator.value();
          console.log(aggValue,"aggValue &&&&&&&&&&&&&&&&&&&&&&&")
          console.log( currentAggregator.format(aggValue)," currentAggregator.format(aggValue)&&&&&&&&&&&&&&&&&&&&&&")
          return (
            <td
              role="gridcell"
              key={ `total-${idx}` }
              className="pvtGrandTotal pvtRowTotal"
              onClick={ grandTotalCallback }
              onContextMenu={ e => this.props.onContextMenu(e, undefined, undefined) }
            >
              {/* g.tot {aggName} */}
            { currentAggregator.format ? currentAggregator.format(aggValue) : aggValue }
            </td>
          );
        });
      }

      return (
        <tr key={ `total-row-${aggIdx}` } className="pvtRowTotals">
          { totalLabelCell }
          { totalValueCells }
          {grandTotalCells} 
        </tr>
      );
    });

    return totalRows;
  }


  visibleKeys(keys, collapsed, numAttrs, subtotalDisplay) {
    return keys.filter(
      key =>
        // Is the key hidden by one of its parents?
        !key.some((k, j) => collapsed[flatKey(key.slice(0, j))]) &&
        // Leaf key.
        (key.length === numAttrs ||
          // Children hidden. Must show total.
          flatKey(key) in collapsed ||
          // Don't hide totals.
          !subtotalDisplay.hideOnExpand),
    );
  }

  isDashboardEditMode() {
    return document.contains(document.querySelector('.dashboard--editing'));
  }

  render() {
    if (this.cachedProps !== this.props) {
      this.cachedProps = this.props;
      this.cachedBasePivotSettings = this.getBasePivotSettings();
    }
    const {
      colAttrs,
      rowAttrs,
      rowKeys,
      colKeys,
      colTotals,
      rowSubtotalDisplay,
      colSubtotalDisplay,
    } = this.cachedBasePivotSettings;

    // Need to account for exclusions to compute the effective row
    // and column keys.
    const visibleRowKeys = this.visibleKeys(
      rowKeys,
      this.state.collapsedRows,
      rowAttrs.length,
      rowSubtotalDisplay,
    );
    const visibleColKeys = this.visibleKeys(
      colKeys,
      this.state.collapsedCols,
      colAttrs.length,
      colSubtotalDisplay,
    );

    const pivotSettings = {
      visibleRowKeys,
      maxRowVisible: Math.max(...visibleRowKeys.map(k => k.length)),
      visibleColKeys,
      maxColVisible: Math.max(...visibleColKeys.map(k => k.length)),
      rowAttrSpans: this.calcAttrSpans(visibleRowKeys, rowAttrs.length),
      colAttrSpans: this.calcAttrSpans(visibleColKeys, colAttrs.length),
      ...this.cachedBasePivotSettings,
    };

    return (
      <Styles isDashboardEditMode={ this.isDashboardEditMode() }>
        <table className="pvtTable" role="grid">
          <thead>
            { colAttrs.map((c, j) =>
              this.renderColHeaderRow(c, j, pivotSettings),
            ) }
            { rowAttrs.length !== 0 && this.renderRowHeaderRow(pivotSettings) }
          </thead>
          <tbody>
            { visibleRowKeys.map((r, i) =>
              this.renderTableRow(r, i, pivotSettings),
            ) }
            { colTotals && this.renderTotalsRow(pivotSettings) }
          </tbody>
        </table>
      </Styles>
    );
  }
}

TableRenderer.propTypes = {
  ...PivotData.propTypes,
  tableOptions: PropTypes.object,
  onContextMenu: PropTypes.func,
};
TableRenderer.defaultProps = { ...PivotData.defaultProps, tableOptions: {} };
