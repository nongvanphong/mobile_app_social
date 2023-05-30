import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SEVER} from '../../../Severs/index';
const Main = ({item}) => {
  return (
    <View style={{paddingLeft: 10, paddingRight: 10}}>
      <View style={styles.top}>
        <View style={styles.topmenuheder_left}>
          {item.avatar != null ? (
            <Image
              style={styles.topmenuheder_rotate}
              source={{uri: SEVER.link_img_main + item.avatar}}></Image>
          ) : (
            <Image
              style={styles.topmenuheder_rotate}
              source={require('../../../img/img/avtxxx.jpg')}></Image>
          )}
        </View>
        <View style={styles.topmenuheder_text}>
          <Text style={styles.topmenuheder_textname}>{item.nameuser}</Text>
          <Text style={styles.topmenuheder_texttime}>{item.thoigiandang}</Text>
        </View>
        <View style={styles.topmenuheder_right}>
          <Image
            style={[styles.topmenuheder_rotate, {width: 25, height: 25}]}
            source={require('../../../img/icon/menu.png')}></Image>
        </View>
      </View>
      <View style={styles.center_tastus}>
        <Text style={styles.center_text}>{item.noidungdang}</Text>
        {item.hinhanh === null
          ? false
          : true && (
              <Image
                style={styles.center_image}
                source={{uri: SEVER.link_img_main + item.hinhanh}}></Image>
            )}
      </View>
      <View style={styles.bottom}>
        <View style={styles.bottom_boxicon}>
          <Image
            style={styles.bottom_boxicon_icon}
            source={require('../../../img/icon/heart.png')}></Image>
          <Text style={{paddingLeft: 5}}>6.3k</Text>
        </View>
        <View style={styles.bottom_boxicon}>
          <Image
            style={styles.bottom_boxicon_icon}
            source={require('../../../img/icon/comment1.png')}></Image>
          <Text style={{paddingLeft: 5}}>5.3k</Text>
        </View>
        <View style={styles.bottom_boxicon}>
          <Image
            style={styles.bottom_boxicon_icon}
            source={require('../../../img/icon/share1.png')}></Image>
          <Text style={{paddingLeft: 5}}>2.3k</Text>
        </View>
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  top: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
  },
  topmenuheder_left: {
    width: '15%',
    height: 50,
    justifyContent: 'center',
  },
  topmenuheder_right: {
    width: '15%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  topmenuheder_text: {width: '70%', height: 50, justifyContent: 'center'},
  topmenuheder_textname: {fontSize: 16, fontWeight: 'bold'},
  topmenuheder_texttime: {fontSize: 10},
  topmenuheder_rotate: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  bottom: {
    width: '100%',
    height: 40,

    flexDirection: 'row',
  },
  bottom_boxicon: {
    width: '20%',
    height: '100%',

    alignItems: 'center',
    flexDirection: 'row',
  },
  bottom_boxicon_icon: {
    width: 25,
    height: 25,
  },
  center_image: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
  center_tastus: {
    width: '100%',
  },
  center_text: {
    width: '100%',
    maxHeight: 70,
    paddingBottom: 10,
  },
});
