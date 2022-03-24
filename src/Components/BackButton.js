import {Box} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import IconIc from 'react-native-vector-icons/Ionicons';

export default function BackButton({onPress}) {
  return (
    <Box
      position="absolute"
      mt="10"
      style={styles.button}
      _android={{
        top: '2',
        left: '8',
      }}
      _ios={{
        top: '8',
        left: '10',
      }}>
      <TouchableOpacity onPress={onPress}>
        <IconIc name="arrow-back" size={30} color="black" absolute />
      </TouchableOpacity>
    </Box>
  );
}
const styles = StyleSheet.create({
  button: {
    zIndex: 1,
  },
});
