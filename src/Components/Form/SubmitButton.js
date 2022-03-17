import {useFormikContext} from 'formik';
import {Button, Text} from 'native-base';
import React from 'react';

export default function SubmitButton({
  title = 'submit',
  bg,
  textColor,
  ...otherProps
}) {
  const {handleSubmit} = useFormikContext();
  return (
    <Button
      // title={title}
      onPress={handleSubmit}
      style={{color: textColor}}
      {...otherProps}
      rounded="0"
      bg={bg}
      h="12">
      <Text
        textTransform={'uppercase'}
        color="white"
        fontSize="16"
        fontWeight="600">
        {title}
      </Text>
    </Button>
  );
}
