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
    <FormControl isInvalid={name in errors} w={width} {...otherProps}>
      <FormControl.Label fontSize="16" mb="2">
        {label}
      </FormControl.Label>
      <Input
        onBlur={handleBlur(name)}
        placeholder={placeholder}
        bg="gray"
        rounded={0}
        h="10"
        onChangeText={handleChange(name)}
        value={values[name]}
        {...otherProps}
      />
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {errors[name]}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
