import {Box, Divider, HStack, Text, VStack, Flex, FlatList} from 'native-base';
import React from 'react';
import HamburgerMenu from '../Components/HamburgerMenu';
import ListSession from '../Components/ListSession';
import i18n from '../Translations';

export default function SessionListingScreen({navigation}) {
  return (
    <Flex safeArea h="100%">
      <HamburgerMenu navigation={navigation} />

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
            26
          </Text>
          <Text fontSize="18" color="white" width="100" fontWeight="600">
            {i18n.t('sessions.subtitle1')}
          </Text>
          <Divider bg="white" orientation="vertical" mx="3" p="0.5" />
          <Text fontSize="36" color="white" fontWeight="bold">
            02
          </Text>
          <Text fontSize="18" color="white" width="100" fontWeight="600">
            {i18n.t('sessions.subtitle2')}
          </Text>
        </HStack>
      </Box>
      <FlatList
        data={[
          {class: 'ANC', date: new Date()},
          {class: 'PNC', date: new Date()},
        ]}
        keyExtractor={(item, index) => index}
        ListFooterComponent={<Box h="90" />}
        renderItem={({item, index}) => {
          return (
            <ListSession
              name={item.class}
              date={item.date}
              index={index}
              onPress={() => navigation.navigate('Edit Attendance', item)}
            />
          );
        }}
      />
    </Flex>
  );
}
