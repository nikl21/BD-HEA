import React, {useRef} from 'react';
import NetInfo from '@react-native-community/netinfo';
import firestore from '@react-native-firebase/firestore';
import {Box, Text, VStack, Center, useToast, ScrollView} from 'native-base';

import i18n from '../Translations';
import HamburgerMenu from '../Components/HamburgerMenu';
import AttendanceForm from '../Components/Form/AttendanceForm';
import {ImageUpload} from '../Components/ImageUpload';

const AddAttendanceScreen = ({navigation}) => {
  const toast = useToast();
  const ImgUpload = useRef();

  return (
    <Box bg="white" safeArea flex>
      <HamburgerMenu navigation={navigation} />
      <ScrollView>
        <Center>
          <Text
            fontSize={26}
            fontWeight={600}
            w={220}
            px={5}
            _android={{
              mt: '10',
            }}
            _ios={{
              mt: '5',
            }}>
            {i18n.t('addAttendance.title')}
          </Text>
        </Center>
        <VStack space={10} p={4}>
          <ImageUpload ref={ImgUpload} />
          <AttendanceForm
            onSubmit={(values, {resetForm}) => {
              console.log(values);
              ImgUpload.current.uploadImageToStorage();
              firestore()
                .collection('classes')
                .add(values)
                .then(() => {
                  navigation.navigate(i18n.t('menu.previousClasses'));
                  console.log('User added!');
                });
              resetForm();
              toast.show({
                render: () => {
                  return (
                    <Box bg="primary.500" px="2" py="1" rounded="sm" mb={5}>
                      Class Added!
                    </Box>
                  );
                },
              });
              NetInfo.fetch().then(state => {
                if (!state.isConnected) {
                  navigation.navigate(i18n.t('menu.previousClasses'));
                }
              });
            }}
          />
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default AddAttendanceScreen;
