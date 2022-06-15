import React, {useState} from 'react';
import {
  Box,
  Flex,
  Input,
  KeyboardAvoidingView,
  Spacer,
  Text,
} from 'native-base';
import NavButton from '../Components/Button';
import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';
import AppFormField from '../Components/Form/AppFormField';
import HospitalSelect from '../Components/Form/HospitalSelect';

const SignUp = () => {
  const [name, setName] = useState(null);

  return (
    <KeyboardAvoidingView>
      <Box safeArea h="100%">
        <Flex h="100%" bg="white" px="8" py="4">
          <Box py="6">
            <Text color="appColor" fontSize="3xl" bold>
              Almost there,
            </Text>
            <Text color="appColor" fontSize="xl" bold>
              Complete your profile to continue!
            </Text>
          </Box>
          <Formik
            // validateOnChange={false}
            validateOnBlur={false}
            initialValues={{
              name: '',
              hospital: '',
              designation: '',
              dob: new Date(),
              dateOfTot: new Date(),
            }}
            onSubmit={() => {}}
            validationSchema={{}}>
            {() => (
              <>
                <AppFormField
                  width="100%"
                  isRequired
                  name="name"
                  label={'Name'}
                  placeholder={'ENTER YOUR NAME'}
                />
                <HospitalSelect name="hospital" width="100%" />
              </>
            )}
          </Formik>
          <Spacer />
          <NavButton
            isPrimary={true}
            label={'Continue'}
            onPress={async () => {
              await auth().currentUser.updateProfile({displayName: name});
              setName(null);
            }}
          />
        </Flex>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
