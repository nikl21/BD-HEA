import {useFormikContext} from 'formik';
import {FormControl, Pressable, Text} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import i18n from '../../Translations';

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
  width = '45%',
}) {
  const {setFieldValue, errors, touched, values} = useFormikContext();
  const [open, setOpen] = useState(false);

  return (
    <>
      <FormControl isRequired isInvalid={name in errors} w={width} py="2">
        <FormControl.Label fontSize="16">{label}</FormControl.Label>

        <Pressable onPress={() => setOpen(true)}>
          <View style={styles.date}>
            <Text px={4}>
              {formatDate(
                values[name] instanceof Date
                  ? values[name]
                  : values[name].toDate(),
              )}
            </Text>
          </View>
          <DatePicker
            date={
              values[name] instanceof Date
                ? values[name]
                : values[name].toDate()
            }
            locale={'bn-BA'}
            modal
            mode="date"
            title={i18n.t('addAttendance.dateTitle')}
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
        {errors[name] && touched[name] && (
          <FormControl.ErrorMessage>{errors[name]}</FormControl.ErrorMessage>
        )}
      </FormControl>
    </>
  );
}

const styles = StyleSheet.create({
  date: {
    borderWidth: 1,
    borderColor: '#E7E7EA',
    textAlign: 'center',
    justifyContent: 'center',
    height: 40,
  },
});
