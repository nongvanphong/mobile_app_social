import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
const Menu = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.box}>
      <View style={styles.box_top}>
        <View style={styles.boxtop_imgleft}>
          <TouchableOpacity
            onPress={
              (change_screen_pust_status = () => {
                navigation.navigate('Đăng bài' );
              })
            }>
            <Image
              style={styles.img}
              source={require('../../../img/icon/camera.png')}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.boxtop_imgright}>
          <Image
            style={styles.img}
            source={require('../../../img/icon/notification.png')}></Image>
        </View>
      </View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  box: {paddingLeft: 10, paddingRight: 10},
  box_top: {
    width: '100%',
    height: 70,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxtop_imgleft: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
  },
  boxtop_imgright: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  img: {width: 30, height: 30},
});
