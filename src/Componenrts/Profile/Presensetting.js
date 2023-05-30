import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Presonsetting = () => {
  const navigation = useNavigation();
  logout = async key => {
    try {
      await AsyncStorage.removeItem('login');
      navigation.navigate('Login');
    } catch (e) {}
  };
  return (
    <View style={{paddingLeft: 10, paddingRight: 10}}>
      <View style={styles.toptxt}>
        <Text style={styles.txt}>Cài đặt</Text>
      </View>
      <View style={styles.boxitem}>
        <Image
          style={styles.imgitem}
          source={require('../../img/icon/exchange.png')}></Image>
        <Text style={styles.texitem}>Đổi mật khẩu</Text>
      </View>
      <View style={styles.boxitem}>
        <Image
          style={styles.imgitem}
          source={require('../../img/icon/pen.png')}></Image>
        <Text style={styles.texitem}>Đổi tên</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          logout();
        }}
        style={styles.boxitem}>
        <Image
          style={styles.imgitem}
          source={require('../../img/icon/logout.png')}></Image>
        <Text style={styles.texitem}>Đăn xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Presonsetting;

const styles = StyleSheet.create({
  toptxt: {
    width: '100%',
    height: 70,

    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {fontSize: 20, fontWeight: 'bold'},
  boxitem: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(178, 190, 181,0.3)',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
  imgitem: {width: 30, height: 30},
  texitem: {fontSize: 16, paddingLeft: 20},
});
