import React, { useState, useEffect } from 'react';
import { styled, SupersetTheme, t, useTheme } from '@superset-ui/core';
import {
  Comparator,
  MultipleValueComparators,
} from '@superset-ui/chart-controls';
import { Form, FormItem, FormProps } from 'src/components/Form';
import Select from 'src/components/Select/Select';
import { Col, Row } from 'src/components';
import { InputNumber } from 'src/components/Input';
import Button from 'src/components/Button';
import { ConditionalFormattingConfig } from './types';
import { ChromePicker } from 'react-color';

const FullWidthInputNumber = styled(InputNumber)`
  width: 100%;
`;

const JustifyEnd = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const colorSchemeOptions = (theme: SupersetTheme) => [
  { value: theme.colors.success.light1, label: t('success') },
  { value: theme.colors.alert.light1, label: t('alert') },
  { value: theme.colors.error.light1, label: t('error') },
  { value: theme.colors.success.dark1, label: t('success dark') },
  { value: theme.colors.alert.dark1, label: t('alert dark') },
  { value: theme.colors.error.dark1, label: t('error dark') },
  { value: theme.colors.custom.base, label: t('Dark Green') },
];

const operatorOptions = [
  { value: Comparator.None, label: t('None') },
  { value: Comparator.GreaterThan, label: '>' },
  { value: Comparator.LessThan, label: '<' },
  { value: Comparator.GreaterOrEqual, label: '≥' },
  { value: Comparator.LessOrEqual, label: '≤' },
  { value: Comparator.Equal, label: '=' },
  { value: Comparator.NotEqual, label: '≠' },
  { value: Comparator.Between, label: '< x <' },
  { value: Comparator.BetweenOrEqual, label: '≤ x ≤' },
  { value: Comparator.BetweenOrLeftEqual, label: '≤ x <' },
  { value: Comparator.BetweenOrRightEqual, label: '< x ≤' },
];

const targetValueValidator =
  (
    compare: (targetValue: number, compareValue: number) => boolean,
    rejectMessage: string,
  ) =>
  (targetValue: number | string) =>
  (_: any, compareValue: number | string) => {
    if (
      !targetValue ||
      !compareValue ||
      compare(Number(targetValue), Number(compareValue))
    ) {
      return Promise.resolve();
    }
    return Promise.reject(new Error(rejectMessage));
  };

const targetValueLeftValidator = targetValueValidator(
  (target: number, val: number) => target > val,
  t('This value should be smaller than the right target value'),
);

const targetValueRightValidator = targetValueValidator(
  (target: number, val: number) => target < val,
  t('This value should be greater than the left target value'),
);

const isOperatorMultiValue = (operator?: Comparator) =>
  operator && MultipleValueComparators.includes(operator);

const isOperatorNone = (operator?: Comparator) =>
  !operator || operator === Comparator.None;

const rulesRequired = [{ required: true, message: t('Required') }];

type GetFieldValue = Pick<Required<FormProps>['form'], 'getFieldValue'>;
const rulesTargetValueLeft = [
  { required: true, message: t('Required') },
  ({ getFieldValue }: GetFieldValue) => ({
    validator: targetValueLeftValidator(getFieldValue('targetValueRight')),
  }),
];

const rulesTargetValueRight = [
  { required: true, message: t('Required') },
  ({ getFieldValue }: GetFieldValue) => ({
    validator: targetValueRightValidator(getFieldValue('targetValueLeft')),
  }),
];

const targetValueLeftDeps = ['targetValueRight'];
const targetValueRightDeps = ['targetValueLeft'];

const shouldFormItemUpdate = (
  prevValues: ConditionalFormattingConfig,
  currentValues: ConditionalFormattingConfig,
) =>
  isOperatorNone(prevValues.operator) !==
    isOperatorNone(currentValues.operator) ||
  isOperatorMultiValue(prevValues.operator) !==
    isOperatorMultiValue(currentValues.operator);

const operatorField = (
  <FormItem
    name="operator"
    label={t('Operator')}
    rules={rulesRequired}
    initialValue={operatorOptions[0].value}
  >
    <Select ariaLabel={t('Operator')} options={operatorOptions} />
  </FormItem>
);

const renderOperatorFields = ({ getFieldValue }: GetFieldValue) =>
  isOperatorNone(getFieldValue('operator')) ? (
    <Row gutter={12}>
      <Col span={6}>{operatorField}</Col>
    </Row>
  ) : isOperatorMultiValue(getFieldValue('operator')) ? (
    <Row gutter={12}>
      <Col span={9}>
        <FormItem
          name="targetValueLeft"
          label={t('Left value')}
          rules={rulesTargetValueLeft}
          dependencies={targetValueLeftDeps}
          validateTrigger="onBlur"
          trigger="onBlur"
        >
          <FullWidthInputNumber />
        </FormItem>
      </Col>
      <Col span={6}>{operatorField}</Col>
      <Col span={9}>
        <FormItem
          name="targetValueRight"
          label={t('Right value')}
          rules={rulesTargetValueRight}
          dependencies={targetValueRightDeps}
          validateTrigger="onBlur"
          trigger="onBlur"
        >
          <FullWidthInputNumber />
        </FormItem>
      </Col>
    </Row>
  ) : (
    <Row gutter={12}>
      <Col span={6}>{operatorField}</Col>
      <Col span={18}>
        <FormItem
          name="targetValue"
          label={t('Target value')}
          rules={rulesRequired}
        >
          <FullWidthInputNumber />
        </FormItem>
      </Col>
    </Row>
  );
export const FormattingPopoverContent = ({
  config,
  onChange,
  columns = [],
}: {
  config?: ConditionalFormattingConfig;
  onChange: (config: ConditionalFormattingConfig) => void;
  columns: { label: string; value: string }[];
}) => {
  // Local state for the colors and form values
  const [localColor, setLocalColor] = useState(config?.textColor || '#156378');
  const [localColorScheme, setLocalColorScheme] = useState(
    config?.colorScheme || '#fff',
  );

  // Pickers' display control
  const [displayColorSchemePicker, setDisplayColorSchemePicker] =
    useState(false);
  const [displayTextColorPicker, setDisplayTextColorPicker] = useState(false);

  const [formValues, setFormValues] = useState<ConditionalFormattingConfig>({
    column: config?.column || columns[0]?.value,
    operator: config?.operator || Comparator.None,
    textColor: config?.textColor || localColor,
    colorScheme: config?.colorScheme || localColorScheme,
    targetValue: config?.targetValue || 0,
    targetValueLeft: config?.targetValueLeft || 0,
    targetValueRight: config?.targetValueRight || 0,
  });

  const handleFormChange = (changedValues: any) => {
    setFormValues(prevValues => ({
      ...prevValues,
      ...changedValues,
    }));
  };

  // Update the formValues in local state instead of calling onChange immediately
  const handleFormSubmit = () => {
    onChange({
      ...formValues,
      textColor: localColor,
      colorScheme: localColorScheme,
    });
  };

  // Prevent click outside from affecting the color picker display
  const handleClickOutside = (e: MouseEvent) => {
    if (
      e.target instanceof HTMLElement &&
      !e.target.closest('.chrome-picker') &&
      !e.target.closest('.color-picker')
    ) {
      setDisplayColorSchemePicker(false);
      setDisplayTextColorPicker(false);
    }
  };

  // Add and clean up event listeners
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Form
      initialValues={formValues}
      onValuesChange={handleFormChange}
      onFinish={handleFormSubmit}
      requiredMark="optional"
      layout="vertical"
    >
      <Row gutter={12}>
        <Col span={12}>
          <FormItem
            name="column"
            label={t('Column')}
            rules={rulesRequired}
            initialValue={columns[0]?.value}
          >
            <Select ariaLabel={t('Select column')} options={columns} />
          </FormItem>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <FormItem name="colorScheme" label={t('Background Color')}>
            <div>
              <div
                onClick={() =>
                  setDisplayColorSchemePicker(!displayColorSchemePicker)
                }
                style={{
                  width: '100%',
                  height: '35px',
                  backgroundColor: localColorScheme,
                  border: '1px solid #ccc',
                  cursor: 'pointer',
                }}
              />
              {displayColorSchemePicker && (
                <div
                  className="color-picker"
                  style={{ position: 'absolute', zIndex: 2 }}
                >
                  <ChromePicker
                    color={localColorScheme}
                    onChange={color => setLocalColorScheme(color.hex)}
                  />
                </div>
              )}
            </div>
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem name="textColor" label={t('Text Color')}>
            <div>
              <div
                onClick={() =>
                  setDisplayTextColorPicker(!displayTextColorPicker)
                }
                style={{
                  width: '100%',
                  height: '35px',
                  backgroundColor: localColor,
                  border: '1px solid #ccc',
                  cursor: 'pointer',
                }}
              />
              {displayTextColorPicker && (
                <div
                  className="color-picker"
                  style={{ position: 'absolute', zIndex: 2 }}
                >
                  <ChromePicker
                    color={localColor}
                    onChange={color => setLocalColor(color.hex)}
                  />
                </div>
              )}
            </div>
          </FormItem>
        </Col>
      </Row>
      <FormItem noStyle shouldUpdate={shouldFormItemUpdate}>
        {renderOperatorFields}
      </FormItem>
      <FormItem>
        <JustifyEnd>
          <Button htmlType="submit" buttonStyle="primary">
            {t('Apply')}
          </Button>
        </JustifyEnd>
      </FormItem>
    </Form>
  );
};
