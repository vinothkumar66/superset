// /**
//  * Licensed to the Apache Software Foundation (ASF) under one
//  * or more contributor license agreements.  See the NOTICE file
//  * distributed with this work for additional information
//  * regarding copyright ownership.  The ASF licenses this file
//  * to you under the Apache License, Version 2.0 (the
//  * "License"); you may not use this file except in compliance
//  * with the License.  You may obtain a copy of the License at
//  *
//  *   http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing,
//  * software distributed under the License is distributed on an
//  * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
//  * KIND, either express or implied.  See the License for the
//  * specific language governing permissions and limitations
//  * under the License.
//  */
// import React, { useEffect, createRef } from 'react';
// import { styled } from '@superset-ui/core';
// import {
//   SupersetPluginChartCandlestickPlotProps,
//   SupersetPluginChartCandlestickPlotStylesProps,
// } from './types';

// // The following Styles component is a <div> element, which has been styled using Emotion
// // For docs, visit https://emotion.sh/docs/styled

// // Theming variables are provided for your use via a ThemeProvider
// // imported from @superset-ui/core. For variables available, please visit
// // https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

// const Styles = styled.div<SupersetPluginChartCandlestickPlotStylesProps>`
//   background-color: ${({ theme }) => theme.colors.secondary.light2};
//   padding: ${({ theme }) => theme.gridUnit * 4}px;
//   border-radius: ${({ theme }) => theme.gridUnit * 2}px;
//   height: ${({ height }) => height}px;
//   width: ${({ width }) => width}px;

//   h3 {
//     /* You can use your props to control CSS! */
//     margin-top: 0;
//     margin-bottom: ${({ theme }) => theme.gridUnit * 3}px;
//     font-size: ${({ theme, headerFontSize }) =>
//       theme.typography.sizes[headerFontSize]}px;
//     font-weight: ${({ theme, boldText }) =>
//       theme.typography.weights[boldText ? 'bold' : 'normal']};
//   }

//   pre {
//     height: ${({ theme, headerFontSize, height }) =>
//       height - theme.gridUnit * 12 - theme.typography.sizes[headerFontSize]}px;
//   }
// `;

// /**
//  * ******************* WHAT YOU CAN BUILD HERE *******************
//  *  In essence, a chart is given a few key ingredients to work with:
//  *  * Data: provided via `props.data`
//  *  * A DOM element
//  *  * FormData (your controls!) provided as props by transformProps.ts
//  */

// export default function SupersetPluginChartCandlestickPlot(
//   props: SupersetPluginChartCandlestickPlotProps,
// ) {
//   // height and width are the height and width of the DOM element as it exists in the dashboard.
//   // There is also a `data` prop, which is, of course, your DATA 🎉
//   const { data, height, width } = props;

//   const rootElem = createRef<HTMLDivElement>();

//   // Often, you just want to access the DOM and do whatever you want.
//   // Here, you can do that with createRef, and the useEffect hook.
//   useEffect(() => {
//     const root = rootElem.current as HTMLElement;
//     console.log('Plugin element', root);
//   });

//   console.log('Plugin props', props);

//   return (
//     <Styles
//       ref={rootElem}
//       boldText={props.boldText}
//       headerFontSize={props.headerFontSize}
//       height={height}
//       width={width}
//     >
//       <h3>{props.headerText}</h3>
//       <pre>${JSON.stringify(data, null, 2)}</pre>
//     </Styles>
//   );
// }

import React, { createRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { styled } from '@superset-ui/core';
import {
  SupersetPluginChartCandlestickPlotProps,
  SupersetPluginChartCandlestickPlotStylesProps,
} from './types';

// Styles component
const Styles = styled.div<SupersetPluginChartCandlestickPlotStylesProps>`
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
`;

// Main Component
export default function SupersetPluginChartCandlestickPlot(
  props: SupersetPluginChartCandlestickPlotProps,
) {
  const { data, height, width } = props;
  const chartRef = createRef<HTMLDivElement>();

  useEffect(() => {
    console.log('Data:', data);

    if (!chartRef.current) return;

    // Initialize ECharts instance
    const chartInstance = echarts.init(chartRef.current);

    // Format data for ECharts candlestick series
    const candlestickData = Array.isArray(data)
      ? data.map(item => [item.open, item.close, item.low, item.high])
      : [];
    const dates = data.map(item => {
      const date = new Date(item.__timestamp);

      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(date.getUTCDate()).padStart(2, '0');
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      const seconds = String(date.getUTCSeconds()).padStart(2, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    });

    // ECharts configuration
    const options = {
      title: {
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: [any]) => {
          const [data] = params;
          return `
              <div>
                <strong>Date: ${data.name}</strong><br />
                Open: ${data.value[1]}<br />
                High: ${data.value[4]}<br />
                Low: ${data.value[3]}<br />
                Close: ${data.value[2]}
              </div>
            `;
        },
      },
      // legend: {
      //   data: dates, // Define the name for the candlestick series
      //   top: '10%',            // Positioning options: top, bottom, left, right
      //   align: 'auto',         // Aligns legend automatically
      //   textStyle: {
      //     color: '#000',       // Legend text color
      //   },
      // },
      xAxis: {
        type: 'category',
        data: dates,
        boundaryGap: true,
        axisLabel: {
          show: true,
          interval: 0, // Show every label without skipping
          // rotate: 45, // Rotate labels if they overlap
        },
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: {
        scale: true,
      },
      series: [
        {
          name: 'Candlestick',
          type: 'candlestick',
          data: candlestickData,
          itemStyle: {
            color: '#00da3c', // color for rising candlestick
            color0: '#ec0000', // color for falling candlestick
          },
        },
      ],
      // series:dates.map(date => ({
      //   name: date, // Each date will have its own legend item
      //   type: 'candlestick',
      //   data: data.filter(item => new Date(item.__timestamp).toLocaleDateString() === date).map(item => [
      //     item.open,
      //     item.close,
      //     item.low,
      //     item.high,
      //   ]),
      //   itemStyle: {
      //     color: '#00da3c', // color for rising candlestick
      //     color0: '#ec0000', // color for falling candlestick
      //   },
      // })),
    };

    // Render chart with options
    chartInstance.setOption(options);

    // Cleanup on component unmount
    return () => {
      chartInstance.dispose(); // Dispose of the chart instance to free up resources
    };
  }, [data]);

  return (
    <Styles height={height} width={width}>
      <div ref={chartRef} style={{ height: height - 40, width: '100%' }} />
    </Styles>
  );
}
