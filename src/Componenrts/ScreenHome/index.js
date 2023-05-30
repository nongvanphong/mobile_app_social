import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeMain from '../HomeMain';
import Friends from '../Friends';
import Login from '../Login';
import Profile from '../Profile/profile';
import Profiletapview from '../Profile/Profiletapview';
import Tapviewfriends from '../Friends/Tapviewfriends';
import Screen_chat from '../Chatmessenger/Screen_chat';

const ScreenHome = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        // hiển thị thanh tiêu đề và thanh tiêu đề dưới
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeMain}
        options={{
          tabBarIcon: ({size, focused, color}) => {
            return (
              <Image
                style={{width: 30, height: 30}}
                source={require('../../img/icon/home.png')}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="chat"
        component={Screen_chat}
        options={{
          tabBarIcon: ({size, focused, color}) => {
            return (
              <Image
                style={{width: 30, height: 30}}
                source={require('../../img/icon/messenger.png')}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Friends"
        component={Friends}
        options={{
          tabBarIcon: ({size, focused, color}) => {
            return (
              <Image
                style={{width: 30, height: 30}}
                source={require('../../img/icon/friends.png')}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profiletapview}
        options={{
          tabBarIcon: ({size, focused, color}) => {
            return (
              <Image
                style={{width: 30, height: 30}}
                source={require('../../img/icon/profile.png')}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default ScreenHome;

const styles = StyleSheet.create({});
