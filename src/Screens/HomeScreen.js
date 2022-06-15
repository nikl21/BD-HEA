import React, {useState, useEffect} from 'react';
import I18n from '../Translations';
import {
  Box,
  Text,
  VStack,
  Center,
  Image,
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
import SignUp from './SignUp';

const HomeScreen = ({navigation}) => {
  const user = auth().currentUser;

  // if (user.displayName) {
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
              source={Images.welcome}
              alt="Alternate Text"
            />
            <Text fontWeight={400} fontSize={30} color={'appColor'}>
              {I18n.t('home.title')}
            </Text>
          </Center>
        </VStack>
        <Box bg="appColor" height="40%" mt="auto" pt="10" px="5">
          <Text fontSize="2xl" color="white" fontWeight="800">
            {I18n.t('home.name')}
          </Text>
          <Text fontSize="xl" color="white">
            {I18n.t('home.subTitle')}
          </Text>
          <Flex h="50%" mt="4">
            <NavButton
              label={I18n.t('home.button1')}
              onPress={() => navigation.navigate(i18n.t('menu.markAttendance'))}
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
  // } else {
  //   return <SignUp />;
  // }
};

export default HomeScreen;
