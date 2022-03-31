import React, {useContext} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import {Text, StyleSheet, Pressable, View, Platform} from 'react-native';
import {Colors} from '../Theme';
import Icon from 'react-native-vector-icons/AntDesign';
// import {AppContext} from './AppContext';
import i18n from '../Translations';

export default function CustomDrawerContent(props) {
  // const {isLoggedIn, setLoggedIn, setUserData} = useContext(AppContext);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Pressable onPress={props.navigation.toggleDrawer}>
            <Icon
              name={'close'}
              size={30}
              color={'#4d4d4d'}
              style={styles.icon}
            />
          </Pressable>
        </View>
        <View style={styles.drawerContent}>
          <Text style={styles.drawerHeader}>{i18n.t('menu.hello')}!</Text>
        </View>
        {/* <DrawerItemList {...props} /> */}
        <DrawerItem
          style={styles.drawerItem}
          label={i18n.t('menu.home')}
          onPress={() => {
            props.navigation.navigate(i18n.t('menu.home'));
          }}
        />
        <DrawerItem
          style={styles.drawerItem}
          label={i18n.t('menu.markAttendance')}
          onPress={() => {
            props.navigation.navigate(i18n.t('menu.markAttendance'));
          }}
        />
        <DrawerItem
          style={styles.drawerItem}
          label={i18n.t('menu.previousClasses')}
          onPress={() => {
            props.navigation.navigate(i18n.t('menu.previousClasses'));
          }}
        />
        {/* <DrawerItem
          label="Logout"
          onPress={() => {
            // setLoggedIn(!isLoggedIn);
            // setUserData(null);
            // AsyncStorage.removeItem('token');
            // AsyncStorage.removeItem('username');
          }}
        /> */}
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerItem: {
    textTransform: 'uppercase',
    borderBottomWidth: 2,
    borderBottomColor: Colors.appColor,
  },
  drawerContent: {
    padding: 20,
  },
  drawerHeader: {
    fontSize: 32,
    fontFamily: 'Assistant-Bold',
    color: Colors.appColor,
  },
  iconContainer: {
    height: 60,
  },
  icon: {
    position: 'absolute',
    zIndex: 100,
    padding: 20,
    right: Platform.OS === 'ios' ? 10 : 15,
    top: Platform.OS === 'ios' ? 0 : 20,
  },
});
