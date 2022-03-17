import React from 'react';
import {useFormikContext} from 'formik';
import {FormControl, Input, WarningOutlineIcon, Text} from 'native-base';

export default function AppFormField({
  name,
  label,
  placeholder,
  width = '130',
  ...otherProps
}) {
  const {setFieldTouched, handleBlur, handleChange, errors, touched, values} =
    useFormikContext();
  return (
    <FormControl isInvalid={name in errors} w={width}>
      <Text fontSize="16" mb="2">
        {label}
      </Text>
      <Input
        size="xl"
        onBlur={handleBlur(name)}
        placeholder={placeholder}
        bg="gray"
        onChangeText={handleChange(name)}
        value={values[name]}
        keyboardType="numeric"
        {...otherProps}
      />
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {errors[name]}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
