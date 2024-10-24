// import { ChartProps } from '@superset-ui/core';

// export default function transformProps(chartProps: ChartProps) {
//   const { width, height, formData, queriesData } = chartProps;
//   const { x_axis_column, y_axis_column, z_axis_column } = formData;

//   // Debugging: Log the incoming data
//   // console.log('transformProps - queriesData:', queriesData);
//   // console.log('transformProps - formData:', formData);

//   // Ensure queriesData and data are properly defined
//   const data = queriesData?.data;

//   // Handle the case where data is undefined
//   if (!data) {
//     console.warn('No data available in queriesData');
//     return {
//       width,
//       height,
//       data: [], // Return an empty array to handle gracefully in the visualization
//     };
//   }

//   // Handle the case where query is empty
//   if (data.length === 0) {
//     console.warn('Query returned no data');
//     return {
//       width,
//       height,
//       data: [],
//     };
//   }

//   const formattedData = [
//     {
//       // z: data.map(d => d.z),
//       // x: data.map(d => d.x),
//       // y: data.map(d => d.y),
//       // type: 'contour',
//       z: [
//         [10, 10.625, 12.5, 15.625, 20],
//         [5.625, 6.25, 8.125, 11.25, 15.625],
//         [2.5, 3.125, 5, 8.125, 12.5],
//         [0.625, 1.25, 3.125, 6.25, 10.625],
//         [0, 0.625, 2.5, 5.625, 10],
//       ],
//       x: [-9, -6, -5, -3, -1],
//       y: [0, 1, 4, 5, 7],
//     },
//   ];

//   // const formattedData = data.map((d: { [x: string]: any }) => ({
//   //   x: d[x_axis_column],
//   //   y: d[y_axis_column],
//   //   z: d[z_axis_column],
//   // }));

//   return {
//     width,
//     height,
//     data: formattedData,
//     headerText: formData.header_text,
//     boldText: formData.bold_text,
//     headerFontSize: formData.header_font_size,
//     contourLevels: formData.contour_levels,
//     colorScheme: formData.color_scheme,
//     showLabels: formData.show_labels,
//   };
// }

// import { ChartProps } from '@superset-ui/core';

// export default function transformProps(chartProps: ChartProps) {
//   const { width, height, formData, queriesData } = chartProps;
//   // const { x_axis_column, y_axis_column, z_axis_column } = formData;
//   const {
//     x_axis_column,
//     y_axis_column,
//     z_axis_column,
//     header_text,
//     bold_text,
//     header_font_size,
//     contour_levels,
//     show_labels,
//     color_scheme,
//   } = formData;
//   console.log(formData, 'formData');
//   const data = queriesData[0].data || [];

//   // Extract the x, y, and z values from the data using the selected columns
//   const x = data.map((row: { [x: string]: any }) => row[x_axis_column]);
//   const y = data.map((row: { [x: string]: any }) => row[y_axis_column]);
//   const z = data.map((row: { [x: string]: any }) => row[z_axis_column]);
//   // Ensure queriesData is defined and has at least one query result
//   if (!queriesData || queriesData.length === 0 || !queriesData[0].data) {
//     console.warn('No data available in queriesData');
//     return {
//       width,
//       height,
//       data: [], // Return an empty array to handle gracefully in the visualization
//     };
//   }

//   // const data = queriesData[0].data; // Get the data from the first query

//   // Handle the case where the query is empty
//   if (data.length === 0) {
//     console.warn('Query returned no data');
//     return {
//       width,
//       height,
//       data: [],
//     };
//   }

//   // Map the data to the required format for the contour plot
//   // const formattedData = data.map((d: { [key: string]: any }) => ({
//   //   x: d[x_axis_column],  // Use the x_axis_column from formData
//   //   y: d[y_axis_column],  // Use the y_axis_column from formData
//   //   z: d[z_axis_column],  // Use the z_axis_column from formData
//   // }));

//   // return {
//   //   width,
//   //   height,
//   //   data: [
//   //     {
//   //       z: formattedData.map((d: { z: any; }) => d.z), // This should form a 2D array if needed
//   //       x: formattedData.map((d: { x: any; }) => d.x), // x-values
//   //       y: formattedData.map((d: { y: any; }) => d.y), // y-values
//   //     },
//   //   ],
//   //   headerText: formData.header_text,
//   //   boldText: formData.bold_text,
//   //   headerFontSize: formData.header_font_size,
//   //   contourLevels: formData.contour_levels,
//   //   colorScheme: formData.color_scheme,
//   //   showLabels: formData.show_labels,
//   // };
//   return {
//     width,
//     height,
//     headerText: header_text,
//     boldText: bold_text,
//     headerFontSize: header_font_size,
//     contourLevels: contour_levels,
//     showLabels: show_labels,
//     colorScheme: color_scheme,
//     data: { x, y, z },
//   };
// }

import { ChartProps } from '@superset-ui/core';

// Define the DataRow type to represent the shape of your data
type DataRow = {
  [key: string]: any; // Adjust as needed based on your actual data structure
};

export default function transformProps(chartProps: ChartProps) {
  const { width, height, formData, queriesData } = chartProps;

  // Destructure the formData properties and ensure they are strings
  const xAxisColumn = formData.xAxisColumn; // Assuming this is an array
  const yAxisColumn = formData.yAxisColumn; // Assuming this is an array
  const zAxisColumn = formData.zAxisColumn; // Assuming this is an array
  const {
    contourLevels,
    colorScheme,
    showLabels,
  } = formData;

  console.log(formData, 'formData');

  // Ensure queriesData is defined and has at least one query result
  if (!queriesData || queriesData.length === 0 || !queriesData[0].data) {
    console.warn('No data available in queriesData');
    return {
      width,
      height,
      data: [], // Return an empty array to handle gracefully in the visualization
    };
  }

  // Get the data from the first query
  const data: DataRow[] = queriesData[0].data || [];

  // Validate that xAxisColumn, yAxisColumn, and zAxisColumn are defined
  if (!xAxisColumn || !yAxisColumn || !zAxisColumn) {
    console.warn('xAxisColumn, yAxisColumn, or zAxisColumn is not defined');
    return {
      width,
      height,
      data: [], // Return an empty array to handle gracefully in the visualization
    };
  }

  // Extract unique x and y values
  const xValues = Array.from(new Set(data.map(row => row[xAxisColumn]))).sort();
  const yValues = Array.from(new Set(data.map(row => row[yAxisColumn]))).sort();

  // Create a z matrix
  const zMatrix: number[][] = Array.from({ length: yValues.length }, () =>
    Array(xValues.length).fill(0)
  );

  // Populate the z matrix based on the data
  data.forEach(row => {
    const xIndex = xValues.indexOf(row[xAxisColumn]);
    const yIndex = yValues.indexOf(row[yAxisColumn]);
    const zValue = typeof row[zAxisColumn] === 'number' ? row[zAxisColumn] : 0; // Ensure this is a number

    if (xIndex !== -1 && yIndex !== -1) {
      zMatrix[yIndex][xIndex] = zValue;
    } else {
      console.warn(`Invalid indices - xIndex: ${xIndex}, yIndex: ${yIndex} for row:`, row);
    }
  });

  // Return the transformed properties needed for rendering the contour plot
  return {
    width,
    height,
    data: {
      x: xValues,
      y: yValues,
      z: zMatrix,
    },
    contourLevels,
    colorScheme,
    showLabels,
  };
}



// import { ChartProps } from '@superset-ui/core';

// export default function transformProps(chartProps: ChartProps) {
//   const { width, height, formData, queriesData } = chartProps;
  
//   // Destructure the formData properties
//   const {
//     xAxisColumn,
//     yAxisColumn,
//     zAxisColumn,
//     headerText,
//     boldText,
//     headerFontSize,
//     contourLevels,
//     showLabels,
//     colorScheme,
//   } = formData;

//   console.log(formData, 'formData');

//   // Ensure queriesData is defined and has at least one query result
//   if (!queriesData || queriesData.length === 0 || !queriesData[0].data) {
//     console.warn('No data available in queriesData');
//     return {
//       width,
//       height,
//       data: [], // Return an empty array to handle gracefully in the visualization
//     };
//   }

//   // Get the data from the first query
//   const data = queriesData[0].data || [];
// console.log(data,"data^^^^^",queriesData,"queriesData")
//   // Validate that xAxisColumn, yAxisColumn, and zAxisColumn are defined
//   if (!xAxisColumn || !yAxisColumn || !zAxisColumn) {
//     console.warn('xAxisColumn, yAxisColumn, or zAxisColumn is not defined');
//     return {
//       width,
//       height,
//       data: [], // Return an empty array to handle gracefully in the visualization
//     };
//   }

//   // Extract the column names (assuming they are the first elements in the arrays)
//   const xColumn = xAxisColumn[0];
//   const yColumn = yAxisColumn[0];
//   const zColumn = zAxisColumn[0];
// console.log(xColumn,yColumn,zColumn,"xyzColumn")
//   // Extract the x, y, and z values from the data using the selected columns
//   const x = data.map((row: { [key: string]: any }) => row[xColumn]);
//   const y = data.map((row: { [key: string]: any }) => row[yColumn]);
//   const z = data.map((row: { [key: string]: any }) => row[zColumn]);
//  console.log(x,y,z,"xyz")
//   // Handle the case where the data is empty or contains null/undefined values
//   if (x.length === 0 || y.length === 0 || z.length === 0) {
//     console.warn('Extracted data arrays are empty');
//     return {
//       width,
//       height,
//       data: [], // Return an empty array to handle gracefully in the visualization
//     };
//   }

//   // Return the transformed properties needed for rendering the contour plot
//   return {
//     width,
//     height,
//     headerText,
//     boldText,
//     headerFontSize,
//     contourLevels,
//     showLabels,
//     colorScheme,
//     data: { x, y, z },
//   };
// }
