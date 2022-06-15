import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={Login} />
    {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
  </Stack.Navigator>
);

export default AuthNavigator;
