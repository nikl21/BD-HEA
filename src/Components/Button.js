import {Button, Text} from 'native-base';
import React from 'react';

export default function NavButton({label, ...otherProps}) {
  return (
    <Button
      colorScheme="button"
      round="null"
      rounded="0"
      {...otherProps}
      my="3"
      {...otherProps}>
      <Text
        textTransform="uppercase"
        color="appColor"
        fontWeight="600"
        x
        fontSize="16">
        {label}
      </Text>
    </Button>
  );
}
