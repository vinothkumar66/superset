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
  const { contourLevels, colorScheme, showLabels } = formData;

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
    Array(xValues.length).fill(0),
  );

  // Populate the z matrix based on the data
  data.forEach(row => {
    const xIndex = xValues.indexOf(row[xAxisColumn]);
    const yIndex = yValues.indexOf(row[yAxisColumn]);
    const zValue = typeof row[zAxisColumn] === 'number' ? row[zAxisColumn] : 0; // Ensure this is a number

    if (xIndex !== -1 && yIndex !== -1) {
      zMatrix[yIndex][xIndex] = zValue;
    } else {
      console.warn(
        `Invalid indices - xIndex: ${xIndex}, yIndex: ${yIndex} for row:`,
        row,
      );
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
