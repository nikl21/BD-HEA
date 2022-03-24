import {Formik} from 'formik';
import {Center, Flex, Spacer} from 'native-base';
import React from 'react';
import {ClassFormSchema} from '../../Services/formData';
import i18n from '../../Translations';
import AppDatePicker from './AppDatePicker';
import AppFormField from './AppFormField';
import ClassSelect from './ClassSelect';
import HospitalSelect from './HospitalSelect';
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
              name: '',
              hospital: '',
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
          <Center mb="20">
            <Flex flexDirection="row" w="100%">
              <AppDatePicker name="date" label={i18n.t('addAttendance.date')} />
              <Spacer />
              <ClassSelect name="classType" />
            </Flex>
            <Flex flexDirection="row" w="100%">
              <AppFormField
                isRequired
                name="name"
                label={i18n.t('addAttendance.nurseName')}
                placeholder={i18n.t('addAttendance.placeholderName')}
              />
              <Spacer />
              <HospitalSelect name="hospital" />
            </Flex>
            <Flex flexDirection="row" w="100%">
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
            <Flex w="100%" mt="4">
              <AppFormField
                width="100%"
                name="location"
                label={i18n.t('addAttendance.location')}
                placeholder={i18n.t('addAttendance.ward')}
              />
            </Flex>
          </Center>
          <SubmitButton title={i18n.t('addAttendance.submit')} />
        </>
      )}
    </Formik>
  );
}
