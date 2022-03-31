/* eslint-disable radix */
import React from 'react';
import {useFormikContext} from 'formik';
import {FormControl, Input, WarningOutlineIcon, Text} from 'native-base';

export default function TotalFormField({
  name,
  label,
  placeholder,
  width = '45%',
  ...otherProps
}) {
  const {setFieldTouched, handleBlur, handleChange, errors, touched, values} =
    useFormikContext();
  return (
    <FormControl w={width} {...otherProps}>
      <FormControl.Label mb="2">{label}</FormControl.Label>
      <Input
        size="md"
        onBlur={handleBlur(name)}
        placeholder={placeholder}
        // bg="gray"
        rounded={0}
        h="10"
        onChangeText={handleChange(name)}
        value={
          (
            parseInt(values.noOfCaregivers) + parseInt(values.noOfMothers)
          ).toString() === 'NaN'
            ? '0'
            : (
                parseInt(values.noOfCaregivers) + parseInt(values.noOfMothers)
              ).toString()
        }
        {...otherProps}
      />
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {errors[name]}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
