import React, {useState} from 'react';

import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {
  Avatar,
  Changepass,
  Chat,
  Friends,
  HomeMain,
  Login,
  Otp,
  Puststatus,
  ScreenHome,
  Screen_chat,
  Seach,
  Search_user_chat,
  SignUp,
  Test,
  ViewDetial,
} from './src';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Update_status from './src/Componenrts/Profile/Update_status';

const App = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          // hiển thị thanh tiêu đề và thanh tiêu đề dưới
          tabBarShowLabel: false,
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Singup" component={SignUp} />
        <Stack.Screen name="ScreenHome" component={ScreenHome} />
        <Stack.Screen
          options={{
            // hiển thị thanh tiêu đề và thanh tiêu đề dưới
            tabBarShowLabel: true,
            headerShown: true,
          }}
          name="Đăng bài"
          component={Puststatus}
        />
        <Stack.Screen
          options={{
            // hiển thị thanh tiêu đề và thanh tiêu đề dưới
            tabBarShowLabel: true,
            headerShown: true,
          }}
          name="Sửa bài viết"
          component={Update_status}
        />
        <Stack.Screen
          options={{
            // hiển thị thanh tiêu đề và thanh tiêu đề dưới
            tabBarShowLabel: true,
            headerShown: true,
          }}
          name="Tìm kiếm"
          component={Seach}
        />
        <Stack.Screen
          options={{
            // hiển thị thanh tiêu đề và thanh tiêu đề dưới
            tabBarShowLabel: true,
            headerShown: true,
          }}
          name="Xem chi tiết"
          component={ViewDetial}
        />
        <Stack.Screen name="Avatar" component={Avatar} />
        <Stack.Screen name="OTP" component={Otp} />
        <Stack.Screen name="Change password" component={Changepass} />
        <Stack.Screen name="Chat" component={Screen_chat} />
        <Stack.Screen name="Search" component={Search_user_chat} />
        <Stack.Screen name="Chatnew" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
