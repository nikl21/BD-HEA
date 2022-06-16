import {Formik} from 'formik';
import {Center, Flex, Spacer} from 'native-base';
import React from 'react';
import {ClassFormSchema} from '../../Services/formData';
import i18n from '../../Translations';
import AppDatePicker from './AppDatePicker';
import AppFormField from './AppFormField';
import TotalFormField from './TotalFormField';

import SubmitButton from './SubmitButton';

export default function AttendanceForm({initialValues, onSubmit}) {
  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={
        initialValues
          ? initialValues
          : {
              noOfCaregivers: '',
              noOfMothers: '',
              classType: '',
              date: new Date(),
              location: '',
            }
      }
      onSubmit={onSubmit}
      validationSchema={ClassFormSchema}>
      {() => (
        <>
          <Center mb="12">
            <AppDatePicker
              name="date"
              label={i18n.t('addAttendance.date')}
              width="100%"
            />
            <AppFormField
              width="100%"
              disabled
              name="location"
              label={i18n.t('addAttendance.location')}
              placeholder={i18n.t('addAttendance.ward')}
            />

            <Flex flexDirection="row">
              <AppFormField
                isRequired
                name="noOfMothers"
                label={i18n.t('addAttendance.noOfMothers')}
                keyboardType="numeric"
                placeholder={Intl.NumberFormat('bn').format(19)}
              />
              <Spacer />
              <AppFormField
                isRequired
                name="noOfCaregivers"
                label={i18n.t('addAttendance.noOfCaregivers')}
                keyboardType="numeric"
                placeholder={Intl.NumberFormat('bn').format(13)}
              />
            </Flex>

            <Spacer />
            <TotalFormField
              isDisabled
              name="total"
              label={i18n.t('addAttendance.totalNo')}
              keyboardType="numeric"
              width="100%"
              placeholder={Intl.NumberFormat('bn').format(13)}
            />
          </Center>
          <SubmitButton title={i18n.t('addAttendance.submit')} />
        </>
      )}
    </Formik>
  );
}
