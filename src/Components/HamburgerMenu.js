import {Button} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import IconFe from 'react-native-vector-icons/Feather';

export default function HamburgerMenu({navigation}) {
  return (
    <Button
      // bg="gray"
      colorScheme="button"
      position="absolute"
      _android={{
        top: '6',
        right: '8',
      }}
      _ios={{
        top: '12',
        right: '10',
      }}
      onPress={() => {
        navigation.toggleDrawer();
      }}
      style={styles.button}>
      <IconFe name="menu" size={30} color="black" />
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    zIndex: 1,
  },
});
