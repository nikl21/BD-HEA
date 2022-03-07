import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AddAttendanceScreen from '../Screens/AddAttendanceScreen';
import HomeScreen from '../Screens/HomeScreen';
import CustomDrawerContent from './DrawerContent';
import {Box, Text} from 'native-base';
import {Colors} from '../Theme';
import SessionListingScreen from '../Screens/SessionListingScreen';

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'right',
        drawerType: 'front',
        headerShown: false,
        drawerActiveTintColor: Colors.appColor,

        // headerShown: false,
        // headerStyle: {
        //   backgroundColor: 'appColor',
        //   elevation: 0,
        //   shadowOpacity: 0,
        //   height: 50,
        // },
        // headerTitleStyle: {
        //   fontFamily: 'Assistant-Bold',
        //   fontSize: 24,
        //   color: 'white',
        // },
        drawerStyle: {
          // backgroundColor: '#c6cbef',
          marginLeft: 150,
          width: 240,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} options={{}} />
      <Drawer.Screen name="Add Session" component={AddAttendanceScreen} />
      <Drawer.Screen
        name="Previous Sessions"
        component={SessionListingScreen}
      />
    </Drawer.Navigator>
  );
}
