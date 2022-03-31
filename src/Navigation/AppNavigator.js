import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AddAttendanceScreen from '../Screens/AddAttendanceScreen';
import HomeScreen from '../Screens/HomeScreen';
import CustomDrawerContent from './DrawerContent';
import {Box, Text} from 'native-base';
import {Colors} from '../Theme';
import SessionListingScreen from '../Screens/SessionListingScreen';
import EditAttendanceScreen from '../Screens/EditAttendanceScreen';
import SessionNavigator from './SessionNavigator';
import i18n from '../Translations';

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
          width: '53%',
          position: 'absolute',
          right: 0,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name={i18n.t('menu.home')}
        component={HomeScreen}
        options={{}}
      />
      <Drawer.Screen
        name={i18n.t('menu.markAttendance')}
        component={AddAttendanceScreen}
      />

      <Drawer.Screen
        name={i18n.t('menu.previousClasses')}
        component={SessionNavigator}
      />
    </Drawer.Navigator>
  );
}
