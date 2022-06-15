import React, {useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

import firestore from '@react-native-firebase/firestore';
import {StyleSheet} from 'react-native';
import {Box, Text, VStack, Center, ScrollView, useToast} from 'native-base';
import i18n from '../Translations';
import HamburgerMenu from '../Components/HamburgerMenu';
import AttendanceForm from '../Components/Form/AttendanceForm';
import BackButton from '../Components/BackButton';

const EditAttendanceScreen = ({route, navigation}) => {
  const {key, ...initialValues} = route.params;
  const toast = useToast();
  return (
    <Box safeArea bg="white" style={styles.box}>
      <ScrollView>
        <BackButton
          onPress={() => {
            navigation.pop();
          }}
        />

        <HamburgerMenu navigation={navigation} />

        <Center>
          <Text
            textAlign="center"
            fontSize={26}
            w={220}
            px={5}
            mt={6}
            fontWeight={600}>
            {i18n.t('editClass.title')}
          </Text>
        </Center>
        <VStack space={10} p={8}>
          <AttendanceForm
            initialValues={initialValues}
            onSubmit={(values, {resetForm}) => {
              console.log(values);
              firestore()
                .collection('classes')
                .doc(key)
                .update(values)
                .then(() => {
                  resetForm();
                  console.log('User updated!');
                  navigation.pop();
                  // scrollRef.current?.scrollTo({
                  //   y: 0,
                  //   animated: true,
                  // });
                });
              console.log(values);
              toast.show({
                duration: 1200,
                render: () => {
                  return (
                    <Box bg="primary.500" px="2" py="1" rounded="sm" mb={5}>
                      Class updated!
                    </Box>
                  );
                },
              });
              NetInfo.fetch().then(state => {
                if (!state.isConnected) {
                  navigation.pop();
                }
              });
            }}
          />
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default EditAttendanceScreen;

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
});
