import {Pressable} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import IconFe from 'react-native-vector-icons/Feather';

export default function HamburgerMenu({navigation}) {
  return (
    <Pressable
      // bg="gray"
      position="absolute"
      _android={{
        top: '6',
        right: '8',
      }}
      _ios={{
        top: '12',
        right: '8',
      }}
      mt="4"
      onPress={() => {
        navigation.toggleDrawer();
      }}
      style={styles.button}>
      <IconFe name="menu" size={30} color="#4d4d4d" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    zIndex: 1,
  },
});
