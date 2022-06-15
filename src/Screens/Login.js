import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import auth from '@react-native-firebase/auth';
import {
  Box,
  Center,
  Flex,
  Input,
  KeyboardAvoidingView,
  Spacer,
  Text,
} from 'native-base';
import NavButton from '../Components/Button';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const Login = ({navigation}) => {
  const [confirm, setConfirm] = useState(null);
  const [number, setNumber] = useState(null);
  const [code, setCode] = useState('');

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);

    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  return (
    <KeyboardAvoidingView behavior="position">
      <Box safeArea h="100%">
        <Flex h="60%" bg="white" px="8" py="10">
          <Center py="8">
            <Text fontSize="8xl" bold letterSpacing="4" color="appColor">
              CARE
            </Text>
            <Text fontSize="4xl" letterSpacing="4" color="text">
              COMPANION
            </Text>
          </Center>
          <Spacer />
          <Input
            value={number}
            borderColor="appColor"
            rounded="0"
            borderWidth="1.5"
            size="2xl"
            h="10"
            letterSpacing="2"
            placeholder="Enter Your Mobile Number"
            isDisabled={confirm ? true : false}
            onChangeText={text => setNumber(text)}
          />
        </Flex>
        <Flex h="40%" bg="appColor" px="8" py="4">
          <Flex flexDirection="row" flexWrap="wrap" width="100%">
            <Text color="white" fontSize="lg" px="2">
              We will send a
            </Text>
            <Text color="white" fontSize="lg" bold>
              One Time Password (OTP)
            </Text>
            <Text color="white" fontSize="lg" px="2">
              to this number for verification.
            </Text>
          </Flex>
          <Spacer />
          <Center bg="white" py="2">
            {/* <Input
            h="10"
            bg="white"
            rounded={0}
            maxLength={6}
            keyboardType="numeric"
            value={code}
            onChangeText={text => setCode(text)}
            isDisabled={!confirm ? true : false}
            size="xl"
            placeholder="Enter OTP"
          /> */}
            <OTPInputView
              pinCount={6}
              style={{width: '80%', height: 30}}
              onCodeFilled={text => setCode(text)}
              codeInputFieldStyle={styles.underlineStyleBase}
            />
          </Center>
          <Spacer />
          <NavButton
            label={!confirm ? 'SENT OTP' : 'CONFIRM OTP'}
            onPress={() =>
              !confirm ? signInWithPhoneNumber(number) : confirmCode()
            }
          />
        </Flex>
      </Box>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  // borderStyleBase: {
  //   width: 30,
  //   height: 45,
  // },

  // borderStyleHighLighted: {
  //   borderColor: '#03DAC6',
  // },

  underlineStyleBase: {
    width: 30,
    marginBottom: 15,
    // marginRight: 10,
    marginHorizontal: 2,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: '#FAAF1B',
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
export default Login;
