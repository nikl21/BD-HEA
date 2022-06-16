import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import auth from '@react-native-firebase/auth';
import {
  Box,
  Center,
  Flex,
  Input,
  KeyboardAvoidingView,
  Spacer,
  Text,
  Select,
  CheckIcon,
} from 'native-base';
import NavButton from '../Components/Button';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Colors} from '../Theme';

const Login = ({navigation}) => {
  const [confirm, setConfirm] = useState(null);
  const [number, setNumber] = useState(null);
  const [code, setCode] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [error, setError] = useState(null);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (e) {
      console.log(e);
    }
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (err) {
      setError('Invalid Code');
    }
  }

  return (
    <KeyboardAvoidingView behavior="position">
      <Box safeArea h="100%">
        <Flex h="60%" bg="white" justify="center">
          <Center>
            <Text fontSize="8xl" bold letterSpacing="4" color="appColor">
              CARE
            </Text>
            <Text fontSize="4xl" letterSpacing="4" color="text" marginTop="-6">
              COMPANION
            </Text>
          </Center>
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

          <Flex flexDirection="row" mt="4" h="30" justify="center" flex={1}>
            <Box flex={1}>
              {error && (
                <Text color="nooraRed" fontSize="lg" p="2" bold>
                  {error}
                </Text>
              )}
            </Box>
            {/* <Box flex="1" alignSelf="flex-end"> */}
            {confirm && (
              <TouchableOpacity
                onPress={() => {
                  console.log('Press');
                  setError(null);
                  signInWithPhoneNumber(countryCode + number, true);
                }}>
                <Text color="white" fontSize="lg" px="2" mt="2" bold>
                  Resend OTP
                </Text>
              </TouchableOpacity>
            )}
            {/* </Box> */}
          </Flex>

          <Spacer />
          {!confirm ? (
            <Flex flexDirection="row">
              <Select
                selectedValue={countryCode}
                h="12"
                w={65}
                size="lg"
                marginTop={0.1}
                accessibilityLabel="Choose Code"
                placeholder="Choose Service"
                backgroundColor="white"
                _selectedItem={{
                  bg: 'appColor',
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={itemValue => setCountryCode(itemValue)}>
                <Select.Item label="+91" value="+91" />
              </Select>
              <Input
                value={number}
                flex="1"
                rounded="0"
                backgroundColor="white"
                size="md"
                placeholderTextColor="text"
                h="12"
                letterSpacing="2"
                placeholder="ENTER YOUR MOBILE NUMBER"
                onChangeText={text => setNumber(text)}
              />
            </Flex>
          ) : (
            <Center bg="white" py="2">
              <OTPInputView
                pinCount={6}
                style={styles.otp}
                onCodeFilled={text => setCode(text)}
                codeInputFieldStyle={styles.underlineStyleBase}
              />
            </Center>
          )}
          <Spacer />
          <NavButton
            label={!confirm ? 'SEND OTP' : 'CONFIRM OTP'}
            onPress={() => {
              setError(null);
              !confirm
                ? signInWithPhoneNumber(countryCode + number)
                : confirmCode();
            }}
          />
        </Flex>
      </Box>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  otp: {
    width: '80%',
    height: 30,
  },
  underlineStyleBase: {
    width: 30,
    marginBottom: 10,
    fontWeight: '800',
    color: Colors.text,
    marginHorizontal: 2,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: '#FAAF1B',
  },
});
export default Login;
