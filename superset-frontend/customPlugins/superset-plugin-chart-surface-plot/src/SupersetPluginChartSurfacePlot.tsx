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
// import { SupersetPluginChartSurfacePlotProps, SupersetPluginChartSurfacePlotStylesProps } from './types';

// // The following Styles component is a <div> element, which has been styled using Emotion
// // For docs, visit https://emotion.sh/docs/styled

// // Theming variables are provided for your use via a ThemeProvider
// // imported from @superset-ui/core. For variables available, please visit
// // https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

// const Styles = styled.div<SupersetPluginChartSurfacePlotStylesProps>`
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

// export default function SupersetPluginChartSurfacePlot(props: SupersetPluginChartSurfacePlotProps) {
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

// import React, { useEffect, createRef } from 'react';
// import { styled } from '@superset-ui/core';
// import { SupersetPluginChartSurfacePlotProps, SupersetPluginChartSurfacePlotStylesProps } from './types';
// import * as echarts from 'echarts';

// const Styles = styled.div<SupersetPluginChartSurfacePlotStylesProps>`
//   padding: ${({ theme }) => theme.gridUnit * 4}px;
//   border-radius: ${({ theme }) => theme.gridUnit * 2}px;
//   height: ${({ height }) => height}px;
//   width: ${({ width }) => width}px;

//   h3 {
//     margin-top: 0;
//     margin-bottom: ${({ theme }) => theme.gridUnit * 3}px;
//     font-size: ${({ theme, headerFontSize }) => theme.typography.sizes[headerFontSize]}px;
//     font-weight: ${({ theme, boldText }) => theme.typography.weights[boldText ? 'bold' : 'normal']};
//   }
// `;

// export default function SupersetPluginChartSurfacePlot(props: SupersetPluginChartSurfacePlotProps) {
//   const { data, height, width, headerText, boldText, headerFontSize, xAxisColumn, yAxisColumn, zAxisColumn } = props;
//   const rootElem = createRef<HTMLDivElement>();

//   useEffect(() => {
//     const root = rootElem.current as HTMLElement;
    
//     const myChart = echarts.init(root, undefined, { renderer: 'canvas' });

//     const option = {
//       tooltip: {},
//       visualMap: {
//         show: false,
//         min: -1,
//         max: 1,
//         inRange: {
//           color: [
//             '#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8',
//             '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026',
//           ],
//         },
//       },
//       xAxis3D: { type: 'value', name: xAxisColumn },
//       yAxis3D: { type: 'value', name: yAxisColumn },
//       zAxis3D: { type: 'value', name: zAxisColumn },
//       grid3D: {
//         viewControl: { autoRotate: true },
//       },
//       series: [
//         {
//           type: 'surface',
//           wireframe: { show: false },
//           data: data.map((d: any) => [d[xAxisColumn], d[yAxisColumn], d[zAxisColumn]]),
//         },
//       ],
//     };

//     myChart.setOption(option);

//     const handleResize = () => {
//       myChart.resize();
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       myChart.dispose();
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [data, xAxisColumn, yAxisColumn, zAxisColumn]);

//   return (
//     <Styles
//       ref={rootElem}
//       boldText={boldText}
//       headerFontSize={headerFontSize}
//       height={height}
//       width={width}
//     >
//       <h3>{headerText}</h3>
//     </Styles>
//   );
// }



import React, { useEffect, createRef } from 'react';
import { SupersetPluginChartSurfacePlotProps, SupersetPluginChartSurfacePlotStylesProps } from './types';
import { styled } from '@superset-ui/core';
import * as echarts from 'echarts';
import 'echarts-gl';

const Styles = styled.div<SupersetPluginChartSurfacePlotStylesProps>`
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;

  h3 {
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.gridUnit * 3}px;
    font-size: ${({ theme, headerFontSize }) => theme.typography.sizes[headerFontSize]}px;
    font-weight: ${({ theme, boldText }) => theme.typography.weights[boldText ? 'bold' : 'normal']};
  }
`;


export default function SupersetPluginChartSurfacePlot(props: SupersetPluginChartSurfacePlotProps) {
  const {
    data, // use sample data if no data prop is provided
    height,
    width,
    headerText,
    boldText,
    headerFontSize,
    xAxisColumn = 'x',
    yAxisColumn = 'y',
    zAxisColumn = 'z',
  } = props;

  const rootElem = createRef<HTMLDivElement>();

  useEffect(() => {
    if (!rootElem.current) return;

    const root = rootElem.current;
    const myChart = echarts.init(root, undefined, { renderer: 'canvas' });
    const option = {
      tooltip: {},
      backgroundColor: '#fff',
      visualMap: {
        show: false,
        dimension: 2,
        min: -1,
        max: 1,
        inRange: {
          color: [
            '#313695',
            '#4575b4',
            '#74add1',
            '#abd9e9',
            '#e0f3f8',
            '#ffffbf',
            '#fee090',
            '#fdae61',
            '#f46d43',
            '#d73027',
            '#a50026'
          ]
        }
      },
      xAxis3D: {
        type: 'value',
        name: xAxisColumn
      },
      yAxis3D: {
        type: 'value',
        name: yAxisColumn
      },
      zAxis3D: {
        type: 'value',
        name: zAxisColumn
      },
      grid3D: {
        viewControl: {
          // projection: 'orthographic'
        }
      },
      series: [
        {
          type: 'surface',
          wireframe: {
            // show: false
          },
          
          equation: {
            x: {
              step: 0.05
            },
            y: {
              step: 0.05
            },
            z: function (x: number, y: number) {
              if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) {
                return '-';
              }
              return Math.sin(x * Math.PI) * Math.sin(y * Math.PI);
            }
          }
        }
      ]
    };
    myChart.setOption(option);

    const handleResize = () => {
      myChart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      myChart.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [data, xAxisColumn, yAxisColumn, zAxisColumn]);

  return (
    <Styles ref={rootElem} boldText={boldText} headerFontSize={headerFontSize} height={height} width={width}>
      <h3>{headerText}</h3>
    </Styles>
  );
}

// import React, { useEffect, createRef } from 'react';
// import { SupersetPluginChartSurfacePlotProps, SupersetPluginChartSurfacePlotStylesProps } from './types';
// import { styled } from '@superset-ui/core';
// import * as echarts from 'echarts';
// import 'echarts-gl';

// const Styles = styled.div<SupersetPluginChartSurfacePlotStylesProps>`
//   padding: ${({ theme }) => theme.gridUnit * 4}px;
//   border-radius: ${({ theme }) => theme.gridUnit * 2}px;
//   height: ${({ height }) => height}px;
//   width: ${({ width }) => width}px;

//   h3 {
//     margin-top: 0;
//     margin-bottom: ${({ theme }) => theme.gridUnit * 3}px;
//     font-size: ${({ theme, headerFontSize }) => theme.typography.sizes[headerFontSize]}px;
//     font-weight: ${({ theme, boldText }) => theme.typography.weights[boldText ? 'bold' : 'normal']};
//   }
// `;



// export default function SupersetPluginChartSurfacePlot(props: SupersetPluginChartSurfacePlotProps) {
//   const {
//     data, // This should be the incoming data from control panel, can be empty if generated
//     height,
//     width,
//     headerText,
//     boldText,
//     headerFontSize,
//     xAxisColumn = 'x', // Default column names
//     yAxisColumn = 'y',
//     zAxisColumn = 'z',
//   } = props;

//   const rootElem = createRef<HTMLDivElement>();

//   useEffect(() => {
//     if (!rootElem.current) return;

//     const root = rootElem.current;
//     const myChart = echarts.init(root, undefined, { renderer: 'canvas' });

//     // Define xRange, yRange, and step size
//     const xRange = [-2, 2]; // Example range for x-axis
//     const yRange = [-2, 2]; // Example range for y-axis
//     const step = 0.1; // Step size for sampling

//     const generateSurfaceData = (xRange: number[], yRange: number[], step: number, xCol: any, yCol: any, zCol: any) => {
//       const data = [];
//       for (let x = xRange[0]; x <= xRange[1]; x += step) {
//         for (let y = yRange[0]; y <= yRange[1]; y += step) {
//           const z = Math.sin(x * Math.PI) * Math.sin(y * Math.PI); // Example function
//           data.push({ [xCol]: x, [yCol]: y, [zCol]: z });
//         }
//       }
//       return data;
//     };
//     // If no data is provided, generate sample data
//     const generatedData = data.length ? data : generateSurfaceData(xRange, yRange, step, xAxisColumn, yAxisColumn, zAxisColumn);

//     const option = {
//       tooltip: {},
//       backgroundColor: '#fff',
//       visualMap: {
//         show: false,
//         dimension: 2,
//         min: -1,
//         max: 1,
//         inRange: {
//           color: [
//             '#313695',
//             '#4575b4',
//             '#74add1',
//             '#abd9e9',
//             '#e0f3f8',
//             '#ffffbf',
//             '#fee090',
//             '#fdae61',
//             '#f46d43',
//             '#d73027',
//             '#a50026'
//           ]
//         }
//       },
//       xAxis3D: {
//         type: 'value',
//         name: xAxisColumn // Use the provided column name
//       },
//       yAxis3D: {
//         type: 'value',
//         name: yAxisColumn // Use the provided column name
//       },
//       zAxis3D: {
//         type: 'value',
//         name: zAxisColumn // Use the provided column name
//       },
//       grid3D: {
//         viewControl: {}
//       },
//       series: [
//         {
//           type: 'surface',
//           wireframe: {
//             show: false // Uncomment if you want to show the wireframe
//           },
//           data: generatedData.map((d: { [x: string]: any; }) => [d[xAxisColumn], d[yAxisColumn], d[zAxisColumn]]), // Map to required format
//         }
//       ]
//     };

//     myChart.setOption(option);

//     const handleResize = () => {
//       myChart.resize();
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       myChart.dispose();
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [data, xAxisColumn, yAxisColumn, zAxisColumn]);

//   return (
//     <Styles ref={rootElem} boldText={boldText} headerFontSize={headerFontSize} height={height} width={width}>
//       <h3>{headerText}</h3>
//     </Styles>
//   );
// }

