/* eslint-disable radix */
import {
  Box,
  Divider,
  HStack,
  Text,
  VStack,
  Flex,
  FlatList,
  Spinner,
  Center,
  Heading,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import HamburgerMenu from '../Components/HamburgerMenu';
import ListSession from '../Components/ListSession';
import firestore from '@react-native-firebase/firestore';
import i18n from '../Translations';

export default function SessionListingScreen({navigation}) {
  const [classData, setClassData] = useState();
  useEffect(() => {
    const subscriber = firestore()
      .collection('classes')
      .orderBy('date', 'desc')
      // .where('user', '==', username ? username : '')
      .onSnapshot(
        querySnapshot => {
          const patients = [];
          querySnapshot.forEach(documentSnapshot => {
            patients.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setClassData(patients);
        },
        err => console.log(err),
      );

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  return (
    <Flex safeArea h="100%">
      <HamburgerMenu navigation={navigation} />
      {classData ? (
        <>
          <Box bg="appColor" h="34%" py="10" px="8">
            <Text fontSize="32" color="white" fontWeight="bold">
              {i18n.t('sessions.hello')}
            </Text>
            <Text fontSize="20" color="white">
              {i18n.t('sessions.title')}
            </Text>
            <Divider bg="white" my="4" p="0.5" />

            <HStack space={13}>
              <Text fontSize="36" color="white" fontWeight="bold">
                {Intl.NumberFormat('bn').format(
                  classData
                    .map(
                      item =>
                        parseInt(item.noOfCaregivers) +
                        parseInt(item.noOfMothers),
                    )
                    .reduce((p, c) => p + c, 0),
                )}
              </Text>
              <Text fontSize="18" color="white" width="100" fontWeight="600">
                {i18n.t('sessions.subtitle1')}
              </Text>
              <Divider bg="white" orientation="vertical" mx="3" p="0.5" />
              <Text fontSize="36" color="white" fontWeight="bold">
                {Intl.NumberFormat('bn').format(classData.length)}
              </Text>
              <Text fontSize="18" color="white" width="100" fontWeight="600">
                {i18n.t('sessions.subtitle2')}
              </Text>
            </HStack>
          </Box>
          <FlatList
            data={classData}
            keyExtractor={(item, index) => index}
            ListFooterComponent={<Box h="90" />}
            renderItem={({item, index}) => {
              return (
                <ListSession
                  name={item.classType}
                  date={item.date.toDate()}
                  index={index}
                  onPress={() => navigation.navigate('Edit Attendance', item)}
                />
              );
            }}
          />
        </>
      ) : (
        <Center h="100%">
          <HStack space={2} justifyContent="center">
            <Spinner accessibilityLabel="Loading posts" />
            <Heading color="primary.500" fontSize="md">
              Loading
            </Heading>
          </HStack>
        </Center>
      )}
    </Flex>
  );
}
