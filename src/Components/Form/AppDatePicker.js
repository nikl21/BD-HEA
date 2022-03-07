import {useFormikContext} from 'formik';
import {Box, Center, FormControl, Input, Pressable, Text} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

function formatDate(date) {
  const options = {year: 'numeric', month: 'long', day: 'numeric'};
  var date1 = new Date(date);
  // @ts-ignore
  return date1.toLocaleDateString([], options);
}

export default function AppDatePicker({
  name,
  label = 'Date',
  maximumDate = new Date(),
  minimumDate = null,
}) {
  const {setFieldValue, handleBlur, handleChange, errors, touched, values} =
    useFormikContext();
  const [open, setOpen] = useState(false);
  return (
    <>
      <FormControl isInvalid={name in errors} w="130">
        <Text fontSize="16" mb="2">
          {label}
        </Text>

        <Pressable onPress={() => setOpen(true)}>
          <Center h="10" bg="gray" rounded="sm">
            <Text>{formatDate(values[name])}</Text>
          </Center>
          <DatePicker
            date={
              values[name] instanceof Date
                ? values[name]
                : values[name].toDate()
            }
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
