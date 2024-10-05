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
import memoizeOne from 'memoize-one';
import { addAlpha, DataRecord } from '@superset-ui/core';
import {
  ColorFormatters,
  Comparator,
  ConditionalFormattingConfig,
  MultipleValueComparators,
} from '../types';

export const round = (num: number, precision = 0) =>
  Number(`${Math.round(Number(`${num}e+${precision}`))}e-${precision}`);

const MIN_OPACITY_BOUNDED = 0.05;
const MIN_OPACITY_UNBOUNDED = 0;
const MAX_OPACITY = 1;
export const getOpacity = (
  value: number,
  cutoffPoint: number,
  extremeValue: number,
  minOpacity = MIN_OPACITY_BOUNDED,
  maxOpacity = MAX_OPACITY,
) => {
  if (extremeValue === cutoffPoint) {
    return maxOpacity;
  }
  return Math.min(
    maxOpacity,
    round(
      Math.abs(
        ((maxOpacity - minOpacity) / (extremeValue - cutoffPoint)) *
          (value - cutoffPoint),
      ) + minOpacity,
      2,
    ),
  );
};

// export const getColorFunction = (
//   {
//     operator,
//     targetValue,
//     targetValueLeft,
//     targetValueRight,
//     colorScheme,
//     textColor,

//   }: ConditionalFormattingConfig,
//   columnValues: number[],
//   alpha?: boolean,
// ) => {
//   let minOpacity = MIN_OPACITY_BOUNDED;
//   const maxOpacity = MAX_OPACITY;

//   let comparatorFunction: (
//     value: number,
//     allValues: number[],
//   ) => false | { cutoffValue: number; extremeValue: number };
//   if (
//     operator === undefined ||
//     colorScheme === undefined ||
//     textColor === undefined
//   ) {
//     return () => undefined;
//   }
//   if (
//     MultipleValueComparators.includes(operator) &&
//     (targetValueLeft === undefined || targetValueRight === undefined)
//   ) {
//     return () => undefined;
//   }
//   if (
//     operator !== Comparator.None &&
//     !MultipleValueComparators.includes(operator) &&
//     targetValue === undefined
//   ) {
//     return () => undefined;
//   }
//   switch (operator) {
//     case Comparator.None:
//       minOpacity = MIN_OPACITY_UNBOUNDED;
//       comparatorFunction = (value: number, allValues: number[]) => {
//         const cutoffValue = Math.min(...allValues);
//         const extremeValue = Math.max(...allValues);
//         return value >= cutoffValue && value <= extremeValue
//           ? { cutoffValue, extremeValue }
//           : false;
//       };
//       break;
//     case Comparator.GreaterThan:
//       comparatorFunction = (value: number, allValues: number[]) =>
//         value > targetValue!
//           ? { cutoffValue: targetValue!, extremeValue: Math.max(...allValues) }
//           : false;
//       break;
//     case Comparator.LessThan:
//       comparatorFunction = (value: number, allValues: number[]) =>
//         value < targetValue!
//           ? { cutoffValue: targetValue!, extremeValue: Math.min(...allValues) }
//           : false;
//       break;
//     case Comparator.GreaterOrEqual:
//       comparatorFunction = (value: number, allValues: number[]) =>
//         value >= targetValue!
//           ? { cutoffValue: targetValue!, extremeValue: Math.max(...allValues) }
//           : false;
//       break;
//     case Comparator.LessOrEqual:
//       comparatorFunction = (value: number, allValues: number[]) =>
//         value <= targetValue!
//           ? { cutoffValue: targetValue!, extremeValue: Math.min(...allValues) }
//           : false;
//       break;
//     case Comparator.Equal:
//       comparatorFunction = (value: number) =>
//         value === targetValue!
//           ? { cutoffValue: targetValue!, extremeValue: targetValue! }
//           : false;
//       break;
//     case Comparator.NotEqual:
//       comparatorFunction = (value: number, allValues: number[]) => {
//         if (value === targetValue!) {
//           return false;
//         }
//         const max = Math.max(...allValues);
//         const min = Math.min(...allValues);
//         return {
//           cutoffValue: targetValue!,
//           extremeValue:
//             Math.abs(targetValue! - min) > Math.abs(max - targetValue!)
//               ? min
//               : max,
//         };
//       };
//       break;
//     case Comparator.Between:
//       comparatorFunction = (value: number) =>
//         value > targetValueLeft! && value < targetValueRight!
//           ? { cutoffValue: targetValueLeft!, extremeValue: targetValueRight! }
//           : false;
//       break;
//     case Comparator.BetweenOrEqual:
//       comparatorFunction = (value: number) =>
//         value >= targetValueLeft! && value <= targetValueRight!
//           ? { cutoffValue: targetValueLeft!, extremeValue: targetValueRight! }
//           : false;
//       break;
//     case Comparator.BetweenOrLeftEqual:
//       comparatorFunction = (value: number) =>
//         value >= targetValueLeft! && value < targetValueRight!
//           ? { cutoffValue: targetValueLeft!, extremeValue: targetValueRight! }
//           : false;
//       break;
//     case Comparator.BetweenOrRightEqual:
//       comparatorFunction = (value: number) =>
//         value > targetValueLeft! && value <= targetValueRight!
//           ? { cutoffValue: targetValueLeft!, extremeValue: targetValueRight! }
//           : false;
//       break;
//     default:
//       comparatorFunction = () => false;
//       break;
//   }

//   // return (value: number) => {
//   //   console.log(value,"value");
//   //   const compareResult = comparatorFunction(value, columnValues);
//   //   console.log(compareResult,"compareResult")
//   //   if (compareResult === false) return undefined;
//   //   const { cutoffValue, extremeValue } = compareResult;
//   //   const backgroundColor = alpha === undefined || alpha
//   //     ? addAlpha(
//   //         colorScheme,
//   //         getOpacity(value, cutoffValue, extremeValue, minOpacity, maxOpacity),
//   //       )
//   //     : colorScheme;
    
//   //   // Return both backgroundColor and textColor
//   //   return { backgroundColor, textColor };

//   return (value: number) => {
//     console.log(value, "value");
  
//     // Compare the value using your comparator function
//     const compareResult = comparatorFunction(value, columnValues);
//     console.log(compareResult, "compareResult");
  
//     if (compareResult === false) return undefined;
  
//     const { cutoffValue, extremeValue } = compareResult;
  
//     // Calculate backgroundColor using the compare result
//     const backgroundColor = alpha === undefined || alpha
//       ? addAlpha(
//           colorScheme,
//           getOpacity(value, cutoffValue, extremeValue, minOpacity, maxOpacity),
//         )
//       : colorScheme;
  
  
//     // Now find the row that contains the value and apply formatting
//     const rowElements = document.querySelectorAll('.pvtTable tbody tr');
    
//     rowElements.forEach((rowElement) => {
//       const cellValues = Array.from(rowElement.querySelectorAll('td, th')).map(
//         (cell) => {
//           const htmlCell = cell as HTMLElement; // Cast to HTMLElement to avoid TS error
//           return parseFloat(htmlCell.textContent || "") || htmlCell.textContent;
//         }
//       );
  
//       // If the row contains the value we are comparing, apply formatting
//       if (cellValues.includes(value)) {
//         console.log(`Applying formatting to row with value: ${value}`);
  
//         const htmlRowElement = rowElement as HTMLElement; // Cast to HTMLElement to use style
//         htmlRowElement.style.backgroundColor = backgroundColor;
//         htmlRowElement.style.color = textColor;
  
//         // Apply the formatting to all cells in the row
//         rowElement.querySelectorAll('td, th').forEach((cell) => {
//           const htmlCell = cell as HTMLElement; // Cast to HTMLElement to use style
//           htmlCell.style.backgroundColor = backgroundColor;
//           htmlCell.style.color = textColor;
//         });
//       }
//     });
  
//     // Return both backgroundColor and textColor
//     return { backgroundColor, textColor };

  
  
    
//     // if (alpha === undefined || alpha) {
//     //   return addAlpha(
//     //     colorScheme,
//     //     getOpacity(value, cutoffValue, extremeValue, minOpacity, maxOpacity),
//     //   );
//     // }
//     // return colorScheme;
//   };
// };

// export const getColorFormatters = memoizeOne(
//   (
//     columnConfig: ConditionalFormattingConfig[] | undefined,
//     data: DataRecord[],
//     alpha?: boolean,
//   ) =>
//     columnConfig?.reduce(
//       (acc: ColorFormatters, config: ConditionalFormattingConfig) => {
//         console.log(acc,"acc,config",config);
//         if (
//           config?.column !== undefined &&
//           (config?.operator === Comparator.None ||
//             (config?.operator !== undefined &&
//               (MultipleValueComparators.includes(config?.operator)
//                 ? config?.targetValueLeft !== undefined &&
//                   config?.targetValueRight !== undefined
//                 : config?.targetValue !== undefined)))
//         ) {
//           acc.push({
//             column: config?.column,
//             getColorFromValue: getColorFunction(
//               config,
//               data.map(row => row[config.column!] as number),
//               alpha,
//             ),
//           });
//           console.log(config?.column,config,data,alpha,"config?.column,config,data,alpha")
//         }
//         return acc;
//       },
//       [],
//     ) ?? [],


export const getColorFunction = (
  {
    operator,
    targetValue,
    targetValueLeft,
    targetValueRight,
    colorScheme,
    textColor,
  }: ConditionalFormattingConfig,
  columnValues: number[],
  alpha?: boolean,
) => {
  let minOpacity = MIN_OPACITY_BOUNDED;
  const maxOpacity = MAX_OPACITY;

  // Comparator logic
  let comparatorFunction: (
    value: number,
    allValues: number[],
  ) => false | { cutoffValue: number; extremeValue: number };

  // Check for invalid configurations and return undefined if not valid
  if (
    operator === undefined ||
    colorScheme === undefined ||
    textColor === undefined
  ) {
    return () => undefined;
  }

  if (
    MultipleValueComparators.includes(operator) &&
    (targetValueLeft === undefined || targetValueRight === undefined)
  ) {
    return () => undefined;
  }

  if (
    operator !== Comparator.None &&
    !MultipleValueComparators.includes(operator) &&
    targetValue === undefined
  ) {
    return () => undefined;
  }

  // Define comparator functions based on the operator
  switch (operator) {
    case Comparator.None:
      minOpacity = MIN_OPACITY_UNBOUNDED;
      comparatorFunction = (value: number, allValues: number[]) => {
        const cutoffValue = Math.min(...allValues);
        const extremeValue = Math.max(...allValues);
        return value >= cutoffValue && value <= extremeValue
          ? { cutoffValue, extremeValue }
          : false;
      };
      break;
    case Comparator.GreaterThan:
      comparatorFunction = (value: number, allValues: number[]) =>
        value > targetValue!
          ? { cutoffValue: targetValue!, extremeValue: Math.max(...allValues) }
          : false;
      break;
    case Comparator.LessThan:
      comparatorFunction = (value: number, allValues: number[]) =>
        value < targetValue!
          ? { cutoffValue: targetValue!, extremeValue: Math.min(...allValues) }
          : false;
      break;
    case Comparator.Equal:
      comparatorFunction = (value: number) =>
        value === targetValue!
          ? { cutoffValue: targetValue!, extremeValue: targetValue! }
          : false;
      break;
    // Add cases for other comparators as needed...
    default:
      comparatorFunction = () => false;
      break;
  }

  // Function to apply the formatting
  return (value: number) => {
    console.log(value, "value");

    // Compare the value using the comparator function
    const compareResult = comparatorFunction(value, columnValues);
    console.log(compareResult, "compareResult");

    if (compareResult === false) return undefined;

    const { cutoffValue, extremeValue } = compareResult;

    // Calculate backgroundColor using the compare result
    const backgroundColor = alpha === undefined || alpha
      ? addAlpha(
          colorScheme,
          getOpacity(value, cutoffValue, extremeValue, minOpacity, maxOpacity),
        )
      : colorScheme;

    // Now find the row or column containing the value and apply formatting
    const rowElements = document.querySelectorAll('.pvtTable tbody tr');

    rowElements.forEach((rowElement) => {
      const cellValues = Array.from(rowElement.querySelectorAll('td, th')).map(
        (cell) => {
          const htmlCell = cell as HTMLElement; // Cast to HTMLElement to avoid TS error
          return parseFloat(htmlCell.textContent || "") || htmlCell.textContent;
        }
      );

      // If the row or cell contains the value we are comparing, apply formatting
      if (cellValues.includes(value)) {
        console.log(`Applying formatting to cell with value: ${value}`);

        rowElement.querySelectorAll('td, th').forEach((cell) => {
          const htmlCell = cell as HTMLElement; // Cast to HTMLElement to use style
          htmlCell.style.backgroundColor = backgroundColor;
          htmlCell.style.color = textColor;
        });
      }
    });

    // Return the applied backgroundColor and textColor
    return { backgroundColor, textColor };
  };
};

// Function to get color formatters
export const getColorFormatters = memoizeOne(
  (
    columnConfig: ConditionalFormattingConfig[] | undefined,
    data: DataRecord[],
    alpha?: boolean,
  ) =>
    columnConfig?.reduce(
      (acc: ColorFormatters, config: ConditionalFormattingConfig) => {
        console.log(acc, "acc, config", config);

        if (
          config?.column !== undefined &&
          (config?.operator === Comparator.None ||
            (config?.operator !== undefined &&
              (MultipleValueComparators.includes(config?.operator)
                ? config?.targetValueLeft !== undefined &&
                  config?.targetValueRight !== undefined
                : config?.targetValue !== undefined)))
        ) {
          acc.push({
            column: config?.column,
            getColorFromValue: getColorFunction(
              config,
              data.map(row => row[config.column!] as number),
              alpha,
            ),
          });
          console.log(config?.column, config, data, alpha, "config?.column, config, data, alpha");
        }
        return acc;
      },
      [],
    ) ?? [],
);
