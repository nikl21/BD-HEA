import React from 'react';
import I18n from '../Translations';
import {Box, Text, VStack, Center, Image, Button} from 'native-base';
import {Images} from '../Theme';
import {View} from 'react-native';
import HamburgerMenu from '../Components/HamburgerMenu';
import IconFe from 'react-native-vector-icons/Feather';
import NavButton from '../Components/Button';

const HomeScreen = ({navigation}) => {
  return (
    <Box safeArea>
      <HamburgerMenu navigation={navigation} />

      <VStack>
        <VStack space={4} alignItems="center" py="20" height="60%">
          <Text fontWeight={400} fontSize={30} color={'appColor'}>
            {I18n.t('home.title')}
          </Text>
          <Center>
            <Image
              size={250}
              resizeMode={'contain'}
              // borderRadius={100}
              source={Images.welcome}
              alt="Alternate Text"
            />
          </Center>
        </VStack>
        <Box bg="appColor" w="100%" height="40%" mt="auto" py="10" px="5">
          <Text
            fontSize="2xl"
            color="white"
            w="200"
            // textAlign="center"
            fontWeight="800">
            {I18n.t('home.name')}
          </Text>
          <Text fontSize="xl" color="white">
            {I18n.t('home.subTitle')}
          </Text>
          <Box py="4">
            <NavButton
              label={I18n.t('home.button1')}
              onPress={() => navigation.navigate('Mark Attendance')}
            />
            <NavButton
              label={I18n.t('home.button2')}
              onPress={() => navigation.navigate('Session')}
            />
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default HomeScreen;
