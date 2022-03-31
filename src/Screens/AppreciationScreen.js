import {Box, Flex} from 'native-base';
import React from 'react';
import HamburgerMenu from '../Components/HamburgerMenu';

const AppreciationScreen = navigation => {
  return (
    <Flex safeArea bg="white">
      <HamburgerMenu navigation={navigation} />
    </Flex>
  );
};

export default AppreciationScreen;
