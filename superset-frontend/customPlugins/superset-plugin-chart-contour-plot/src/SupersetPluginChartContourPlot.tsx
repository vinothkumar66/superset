// import React from 'react';
// import Plot from 'react-plotly.js';
// // import { styled } from '@superset-ui/core';
// import { SupersetPluginChartContourPlotProps } from './types';

// // const Styles = styled.div<{ height: number; width: number }>`
// //   background-color: ${({ theme }) => theme.colors.secondary.light2};
// //   padding: ${({ theme }) => theme.gridUnit * 4}px;
// //   border-radius: ${({ theme }) => theme.gridUnit * 2}px;
// //   height: ${({ height }) => height}px;
// //   width: ${({ width }) => width}px;

// //   h3 {
// //     margin-top: 0;
// //     margin-bottom: ${({ theme }) => theme.gridUnit * 3}px;
// //     font-size: ${({ theme, headerFontSize }) =>
// //       theme.typography.sizes[headerFontSize]}px;
// //     font-weight: ${({ theme, boldText }) =>
// //       theme.typography.weights[boldText ? 'bold' : 'normal']};
// //   }
// // `;

// const SupersetPluginChartContourPlot: React.FC<
//   SupersetPluginChartContourPlotProps
// > = ({
//   height,
//   width,
//   headerText,
//   boldText,
//   headerFontSize,
//   contourLevels,
//   colorScheme,
//   showLabels,
//   data, // Superset data prop
// }) => {
//   // Destructure x, y, and z arrays directly from the data prop
//   const { x, y, z } = data;
// console.log(data,"data",height,
//   width,
//   headerText,
//   boldText,
//   headerFontSize,
//   contourLevels,
//   colorScheme,
//   showLabels,)
//   return (
//     // <Styles height={height} width={width}>
//     <>
//       <h3>{headerText}</h3>
//       <Plot
//         data={[
//           {
//             z, // Data for z-axis
//             x, // Data for x-axis
//             y, // Data for y-axis
//             type: 'contour',
//             contours: {
//               coloring: 'heatmap',
//               showlabels: showLabels,
//               labelfont: {
//                 size: 12,
//                 color: '#fffff',
//               },
//             },
//             colorscale: colorScheme,
//             ncontours: contourLevels,
//           },
//         ]}
//         layout={{
//           width,
//           height,
//           title: headerText,
//         }}
//       />
//     </>
//     // </Styles>
//   );
// };

// export default SupersetPluginChartContourPlot;

import React from 'react';
import Plot from 'react-plotly.js';
import { SupersetPluginChartContourPlotProps } from './types';

const SupersetPluginChartContourPlot: React.FC<
  SupersetPluginChartContourPlotProps
> = ({
  height,
  width,
  // headerText,
  // boldText,
  // headerFontSize,
  contourLevels,
  colorScheme,
  showLabels,
  xAxisColumn,
  yAxisColumn,
  zAxisColumn,
  data, // Superset data prop
}) => {
  console.log(data, 'data###########');
  // Destructure x, y, and z arrays directly from the data prop
  const { z, x, y } = data || { z: [], x: [], y: [] };
  console.log(
    xAxisColumn,
    yAxisColumn,
    zAxisColumn,
    'xAxisColumn,yAxisColumn,zAxisColumn',
  );
  // Debugging: Log the incoming data
  console.log('Contour Plot Data:', { x, y, z }, 'Other Props:', {
    height,
    width,
    // headerText,
    // boldText,
    // headerFontSize,
    contourLevels,
    colorScheme,
    showLabels,
  });

  return (
    <>
      {/* <h3
        style={{
          fontWeight: boldText ? 'bold' : 'normal',
          fontSize: headerFontSize,
        }}
      >
        {headerText}
      </h3> */}
      <Plot
        data={[
          {
            z,
            x,
            y,
            // z: z, // Data for z-axis
            // x: x, // Data for x-axis
            // y: y, // Data for y-axis
            // z: [
            //           [10, 10.625, 12.5, 15.625, 20],
            //           [5.625, 6.25, 8.125, 11.25, 15.625],
            //           [2.5, 3.125, 5, 8.125, 12.5],
            //           [0.625, 1.25, 3.125, 6.25, 10.625],
            //           [0, 0.625, 2.5, 5.625, 10],
            //         ],
            // x: [-9, -6, -5, -3, -1],
            // y: [0, 1, 4, 5, 7],
            type: 'contour',
            contours: {
              coloring: 'heatmap',
              showlabels: showLabels,
              labelfont: {
                size: 12,
                color: '#ffffff',
              },
            },
            colorscale: colorScheme,
            ncontours: contourLevels,
          },
        ]}
        layout={{
          width,
          height,
          // title: headerText,
        }}
        config={{
          responsive: true,
        }}
      />
    </>
  );
};

export default SupersetPluginChartContourPlot;
