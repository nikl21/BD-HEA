import React, {useState, useEffect} from 'react';
import I18n from '../Translations';
import {
  Box,
  Text,
  VStack,
  Center,
  Image,
  Flex,
  HStack,
  Spinner,
  Heading,
} from 'native-base';
import firestore from '@react-native-firebase/firestore';

import {Images} from '../Theme';
import HamburgerMenu from '../Components/HamburgerMenu';
import NavButton from '../Components/Button';
import i18n from '../Translations';
import auth from '@react-native-firebase/auth';
import SignUp from './SignUp';

const HomeScreen = ({navigation}) => {
  const [userExists, setUserExists] = useState(false);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const userExist = async () => {
      await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .get()
        .then(user => {
          setUserExists(user.exists);
          setLoading(false);
        });
    };
    userExist();
  }, []);
  if (isLoading) {
    console.log('true');
    return (
      <Flex safeArea bg="white" flex justify="center">
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
      </Flex>
    );
  } else if (userExists && !isLoading) {
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
    return <SignUp navigation={navigation} setUserExists={setUserExists} />;
  }
};

export default HomeScreen;
