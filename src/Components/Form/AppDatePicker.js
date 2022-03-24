import {useFormikContext} from 'formik';
import {Box, Center, FormControl, Input, Pressable, Text} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

function formatDate(date) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  var date1 = new Date(date);
  // @ts-ignore
  return Intl.DateTimeFormat('bn', options).format(date1);
}

export default function AppDatePicker({
  name,
  label = 'Date',
  maximumDate = new Date(),
  minimumDate = null,
}) {
  const {setFieldValue, errors, touched, values} = useFormikContext();
  const [open, setOpen] = useState(false);

  return (
    <>
      <FormControl isInvalid={name in errors} w="130">
        <FormControl.Label fontSize="16">{label}</FormControl.Label>

        <Pressable onPress={() => setOpen(true)}>
          <Center height="10" border="1" bg="gray" rounded="0">
            <Text>
              {formatDate(
                values[name] instanceof Date
                  ? values[name]
                  : values[name].toDate(),
              )}
            </Text>
          </Center>
          <DatePicker
            date={
              values[name] instanceof Date
                ? values[name]
                : values[name].toDate()
            }
            locale={'bn-BA'}
            modal
            mode="date"
            label={label}
            open={open}
            setOpen={setOpen}
            name={name}
            maximumDate={maximumDate}
            minimumDate={new Date(minimumDate)}
            onConfirm={date => {
              setOpen(false);
              setFieldValue(name, date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </Pressable>
        <FormControl.ErrorMessage>{errors[name]}</FormControl.ErrorMessage>
      </FormControl>
    </>
  );
}
