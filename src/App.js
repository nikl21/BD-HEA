import React from 'react';
import {NativeBaseProvider} from 'native-base';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {theme} from './Theme/NativeBaseTheme';
import AppNavigator from './Navigation/AppNavigator';
import {LogBox} from 'react-native';
import RNUxcam from 'react-native-ux-cam';

RNUxcam.optIntoSchematicRecordings(); // Add this line to enable iOS screen recordings
RNUxcam.startWithKey('bp7gcau0a16qb10');
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
