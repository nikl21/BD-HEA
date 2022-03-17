import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SessionListingScreen from '../Screens/SessionListingScreen';
import EditAttendanceScreen from '../Screens/EditAttendanceScreen';

const Stack = createStackNavigator();

const SessionNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Session Lists" component={SessionListingScreen} />
    <Stack.Screen name="Edit Attendance" component={EditAttendanceScreen} />
  </Stack.Navigator>
);

export default SessionNavigator;
