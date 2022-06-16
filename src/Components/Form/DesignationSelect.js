import {useFormikContext} from 'formik';
import {
  Box,
  CheckIcon,
  FormControl,
  Select,
  WarningOutlineIcon,
  Text,
} from 'native-base';
import React from 'react';
import i18n from '../../Translations';

export default function DesignationSelect({name, width = '45%'}) {
  const {setFieldValue, errors, touched, values} = useFormikContext();

  return (
    <FormControl w={width} isRequired isInvalid={name in errors}>
      <FormControl.Label fontSize="16">Designation</FormControl.Label>
      <Box marginTop="0">
        <Select
          selectedValue={values[name]}
          onValueChange={value => setFieldValue(name, value)}
          // bg="gray"
          h="10"
          rounded={0}
          color="text"
          accessibilityLabel="Choose Designation"
          placeholder={'SELECT NURSE'}
          _selectedItem={{
            bg: 'appColor',
            endIcon: <CheckIcon size={5} />,
          }}>
          <Select.Item label={'Nurse'} value="Nurse" />
          <Select.Item label={'Head Nurse'} value="Head Nurse" />
        </Select>{' '}
      </Box>
      {errors[name] && touched[name] && (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Please make a selection!
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  );
}
