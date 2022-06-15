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

export default function HospitalSelect({name, width = '45%'}) {
  const {setFieldValue, errors, touched, values} = useFormikContext();

  return (
    <FormControl w={width} isRequired isInvalid={name in errors}>
      <FormControl.Label fontSize="16">
        {i18n.t('addAttendance.hospitalName')}
      </FormControl.Label>
      <Box marginTop="0">
        <Select
          selectedValue={values[name]}
          onValueChange={value => setFieldValue(name, value)}
          // bg="gray"
          h="10"
          rounded={0}
          color="text"
          accessibilityLabel="Choose Class"
          placeholder={i18n.t('addAttendance.programPlaceholder')}
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size={5} />,
          }}>
          <Select.Item label={i18n.t('hospital.1')} value="Rangpur" />
          <Select.Item label={i18n.t('hospital.2')} value="Thakurgaon" />
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
