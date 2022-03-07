import {useFormikContext} from 'formik';
import {Button} from 'native-base';
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
      title={title}
      onPress={handleSubmit}
      style={{color: textColor}}
      {...otherProps}
      bg={bg}
      h="12">
      {title}
    </Button>
  );
}
