import React, {useState, useEffect} from 'react';
import {NativeBaseProvider} from 'native-base';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {theme} from './Theme/NativeBaseTheme';
import auth from '@react-native-firebase/auth';
import {LogBox} from 'react-native';
import RNUxcam from 'react-native-ux-cam';
import AuthNavigator from './Navigation/AuthNavigator';
import AppNavigator from './Navigation/AppNavigator';

RNUxcam.optIntoSchematicRecordings(); // Add this line to enable iOS screen recordings
RNUxcam.startWithKey('bp7gcau0a16qb10');
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  // Handle user state changes

  useEffect(() => {
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [initializing]);
  if (initializing) return null;
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
