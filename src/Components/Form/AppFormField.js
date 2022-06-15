import React from 'react';
import {useFormikContext} from 'formik';
import {FormControl, Input, WarningOutlineIcon, Text} from 'native-base';

export default function AppFormField({
  name,
  label,
  placeholder,
  width = '45%',
  ...otherProps
}) {
  const {setFieldTouched, handleBlur, handleChange, errors, touched, values} =
    useFormikContext();
  return (
    <FormControl isInvalid={name in errors} w={width} {...otherProps} py={4}>
      <FormControl.Label mb="2">{label}</FormControl.Label>
      <Input
        size="md"
        onBlur={handleBlur(name)}
        placeholder={placeholder}
        // bg="gray"
        rounded={0}
        h="10"
        onChangeText={handleChange(name)}
        value={values[name]}
        {...otherProps}
      />
      {errors[name] && touched[name] && (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {errors[name]}
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  );
}
