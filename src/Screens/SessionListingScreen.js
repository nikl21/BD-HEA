import {Box, Text} from 'native-base';
import React from 'react';
import HamburgerMenu from '../Components/HamburgerMenu';

export default function SessionListingScreen({navigation}) {
  return (
    <Box safeArea>
      <HamburgerMenu navigation={navigation} />

      <Text>Session Listing</Text>
    </Box>
  );
}
