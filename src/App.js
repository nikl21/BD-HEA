/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import I18n from './Translations';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';

const App = () => {
  const [patientData, setPatientData] = useState(null);
  const [token, setToken] = useState(null);
  console.log(token);
  useEffect(() => {
    firestore()
      .collection('patients')
      .get()
      .then(querySnapshot => {
        const objectsArray = [];
        querySnapshot.forEach(user => {
          objectsArray.push(user.data());
        });
        console.log(objectsArray);
        setPatientData(objectsArray);
      });
    const cred = {
      grant_type: 'password',
      client_id: 'HtgZ9aPEswoaNqfXLSNlnd9EhAUzmU_ett_MGXqAoHk',
      client_secret: '6MkGM8zX4rjk0LTU7vt3pB-hjqhWgX1P8VydKzmvLXI',
      mobile_number: '8105739684',
      password: 'Noora@123',
    };
    axios
      .post(`http://35.200.144.91/cca/oauth/token.json`, cred)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView>
        <Text style={styles.label}>
          {patientData ? patientData[0].name : 'none'}
        </Text>
        <Text>{I18n.t('home.label')}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Assistant-Regular',
  },
});

export default App;
