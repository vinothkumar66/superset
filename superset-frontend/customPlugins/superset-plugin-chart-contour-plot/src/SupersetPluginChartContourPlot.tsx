import React from 'react';
import Plot from 'react-plotly.js';
import { styled } from '@superset-ui/core';
import { SupersetPluginChartContourPlotProps } from './types';

const Styles = styled.div<{ height: number; width: number }>`
  background-color: ${({ theme }) => theme.colors.secondary.light2};
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;

  h3 {
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.gridUnit * 3}px;
    font-size: ${({ theme, headerFontSize }) =>
      theme.typography.sizes[headerFontSize]}px;
    font-weight: ${({ theme, boldText }) =>
      theme.typography.weights[boldText ? 'bold' : 'normal']};
  }
`;

const SupersetPluginChartContourPlot: React.FC<
  SupersetPluginChartContourPlotProps
> = ({
  height,
  width,
  headerText,
  boldText,
  headerFontSize,
  contourLevels,
  colorScheme,
  showLabels,
  data, // Superset data prop
}) => {
  // Destructure x, y, and z arrays directly from the data prop
  const { x, y, z } = data;

  return (
    <Styles height={height} width={width}>
      <h3>{headerText}</h3>
      <Plot
        data={[
          {
            z, // Data for z-axis
            x, // Data for x-axis
            y, // Data for y-axis
            type: 'contour',
            contours: {
              coloring: 'heatmap',
              showlabels: showLabels,
              labelfont: {
                size: 12,
                color: '#fffff',
              },
            },
            colorscale: colorScheme,
            ncontours: contourLevels,
          },
        ]}
        layout={{
          width,
          height,
          title: headerText,
        }}
      />
    </Styles>
  );
};

export default SupersetPluginChartContourPlot;
