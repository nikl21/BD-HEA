import React, {useState} from 'react';
import {Box, Flex, KeyboardAvoidingView, Spacer, Text} from 'native-base';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {Formik} from 'formik';
import AppFormField from '../Components/Form/AppFormField';
import HospitalSelect from '../Components/Form/HospitalSelect';
import AppDatePicker from '../Components/Form/AppDatePicker';
import DesignationSelect from '../Components/Form/DesignationSelect';
import SubmitButton from '../Components/Form/SubmitButton';

const SignUp = ({setUserExists}) => {
  const user = auth().currentUser;

  return (
    <KeyboardAvoidingView>
      <Box safeArea h="100%">
        <Formik
          // validateOnChange={false}
          validateOnBlur={false}
          initialValues={{
            name: '',
            number: user.phoneNumber,
            hospital: '',
            designation: '',
            dob: new Date(),
            dateOfTot: new Date(),
          }}
          onSubmit={values => {
            console.log(values);
            firestore()
              .collection('users')
              .doc(user.uid)
              .set(values)
              .then(() => {
                setUserExists(true);
                console.log('User added!');
              });
          }}
          // validationSchema={{}}
        >
          {({handleSubmit}) => (
            <>
              <Flex h="100%" bg="white" px="8" py="4">
                <Box py="6">
                  <Text color="appColor" fontSize="3xl" bold>
                    Almost there,
                  </Text>
                  <Text color="appColor" fontSize="xl" bold>
                    Complete your profile to continue!
                  </Text>
                </Box>
                <AppFormField
                  width="100%"
                  isRequired
                  name="name"
                  label={'Name'}
                  placeholder={'ENTER YOUR NAME'}
                />
                <HospitalSelect name="hospital" width="100%" />
                <DesignationSelect name="designation" width="100%" />

                <AppDatePicker
                  name="dob"
                  label={'Date of Birth'}
                  width="100%"
                />
                <AppDatePicker
                  name="dateOfTot"
                  label={'Date of TOT'}
                  width="100%"
                />
                <Spacer />
                <SubmitButton
                  // isPrimary={true}
                  title={'Continue'}
                  onPress={async () => {
                    handleSubmit();
                  }}
                />
              </Flex>
            </>
          )}
        </Formik>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
