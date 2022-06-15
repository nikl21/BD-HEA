import {Button, Text} from 'native-base';
import React from 'react';

export default function NavButton({
  label,
  isPrimary = false,
  colorScheme = 'button',
  ...otherProps
}) {
  return (
    <Button
      colorScheme={colorScheme}
      round="null"
      rounded="0"
      height="12"
      // bg="white"
      {...otherProps}
      {...otherProps}>
      <Text
        textTransform="uppercase"
        color={isPrimary ? 'white' : 'appColor'}
        fontWeight="600"
        fontSize="16">
        {label}
      </Text>
    </Button>
  );
}
