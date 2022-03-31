import React from 'react';
import I18n from '../Translations';
import {Box, Text, VStack, Center, Image, Button} from 'native-base';
import {Images} from '../Theme';
import HamburgerMenu from '../Components/HamburgerMenu';
import NavButton from '../Components/Button';
import i18n from '../Translations';

const HomeScreen = ({navigation}) => {
  return (
    <Box safeArea bg="white">
      <HamburgerMenu navigation={navigation} />

      <VStack>
        <VStack space={0} alignItems="center" py="10" height="60%">
          <Center>
            <Image
              size={300}
              resizeMode={'contain'}
              // borderRadius={100}
              source={Images.welcome}
              alt="Alternate Text"
            />
            <Text fontWeight={400} fontSize={30} color={'appColor'}>
              {I18n.t('home.title')}
            </Text>
          </Center>
        </VStack>
        <Box bg="appColor" height="40%" mt="auto" py="10" px="5">
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
          <Box py="2">
            <NavButton
              label={I18n.t('home.button1')}
              onPress={() => navigation.navigate(i18n.t('menu.markAttendance'))}
            />
            <NavButton
              label={I18n.t('home.button2')}
              onPress={() =>
                navigation.navigate(i18n.t('menu.previousClasses'))
              }
            />
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default HomeScreen;
