import React, {useState, useEffect} from 'react';
import I18n from '../Translations';
import {
  Box,
  Text,
  VStack,
  Center,
  Image,
  Button,
  Spacer,
  Flex,
  Input,
  KeyboardAvoidingView,
} from 'native-base';
import {Images} from '../Theme';
import HamburgerMenu from '../Components/HamburgerMenu';
import NavButton from '../Components/Button';
import i18n from '../Translations';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({navigation}) => {
  const user = auth().currentUser;
  const [name, setName] = useState(null);

  if (user.displayName) {
    return (
      <Box safeArea bg="white">
        <HamburgerMenu navigation={navigation} />

        <VStack h="100%">
          <VStack space={0} alignItems="center" py="10" height="60%">
            <Center h="70%" width="70%" mt="10">
              <Image
                height="100%"
                width="100%"
                resizeMode={'cover'}
                // borderRadius={100}
                source={Images.welcome}
                alt="Alternate Text"
              />
              <Text fontWeight={400} fontSize={30} color={'appColor'}>
                {I18n.t('home.title')}
              </Text>
            </Center>
          </VStack>
          <Box bg="appColor" height="40%" mt="auto" pt="10" px="5">
            <Text
              fontSize="2xl"
              color="white"
              // w="200"
              // textAlign="center"
              fontWeight="800">
              {I18n.t('home.name')}
            </Text>
            <Text fontSize="xl" color="white">
              {I18n.t('home.subTitle')}
            </Text>
            <Flex h="50%" mt="4">
              <NavButton
                label={I18n.t('home.button1')}
                onPress={() =>
                  navigation.navigate(i18n.t('menu.markAttendance'))
                }
              />
              <Flex h="3" />
              <NavButton
                label={I18n.t('home.button2')}
                onPress={() =>
                  navigation.navigate(i18n.t('menu.previousClasses'))
                }
              />
            </Flex>
          </Box>
        </VStack>
      </Box>
    );
  } else {
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
          </Flex>
          <Flex h="40%" bg="appColor" px="8" py="4">
            <Flex flexDirection="row" flexWrap="wrap" width="100%" my={10}>
              <Text color="white" fontSize="2xl" bold>
                Please Enter Your Name
              </Text>
            </Flex>
            <Input
              value={name}
              borderColor="white"
              rounded="0"
              borderWidth="1.5"
              size="2xl"
              h="10"
              bg="white"
              letterSpacing="2"
              placeholder="Enter Your Name"
              onChangeText={text => setName(text)}
            />
            <Spacer />
            <NavButton
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
  }
};

export default HomeScreen;
