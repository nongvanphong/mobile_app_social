import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SEVER} from '../../Severs';
import {useNavigation} from '@react-navigation/native';

const Top_profile = ({itemname, itemid, itemavt}) => {
  const navigation = useNavigation();
  return (
    <View style={{paddingRight: 10, paddingLeft: 10}}>
      <View style={styles.box}>
        <View style={styles.boximg}>
          {itemavt != null ? (
            <Image
              style={styles.img}
              source={{uri: SEVER.link_img_main + itemavt}}></Image>
          ) : (
            <Image
              style={styles.img}
              source={require('../../img/img/avtxxx.jpg')}></Image>
          )}
          {itemid === SEVER.ID_USER ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Avatar');
              }}
              style={{
                width: 40,
                height: 40,
                position: 'absolute',
                top: '65%',
                borderRadius: 50,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                }}
                source={require('../../img/icon/camera.png')}></Image>
            </TouchableOpacity>
          ) : (
            <View></View>
          )}
        </View>
        <View style={styles.boxtxt}>
          <View style={styles.boxtxt1}></View>
          <View style={styles.boxtxt2}>
            <View style={styles.txt}>
              <Text style={styles.txtname}>{itemname}</Text>
            </View>
            <View style={styles.bottom}>
              <View style={styles.follow}>
                <View style={styles.boxitemmenu}>
                  <Text>Add</Text>
                </View>
              </View>
              <View style={styles.mss}>
                <View style={styles.boxitemmenu}>
                  <Text>Messenger</Text>
                </View>
              </View>
              <View style={styles.menu}>
                <View style={styles.boxitemmenu}>
                  <Image
                    style={styles.imgmenu}
                    source={require('../../img/icon/menu3cham.png')}></Image>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Top_profile;

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: 150,

    flexDirection: 'row',
  },
  boximg: {
    flex: 1,

    justifyContent: 'center',
  },
  boxtxt: {
    paddingLeft: 10,
    flex: 2,
  },
  img: {
    width: 100,
    height: 100,
    backgroundColor: 'green',
    borderRadius: 100,
  },
  boxtxt1: {
    flex: 1,
  },
  boxtxt2: {
    flex: 2,
  },
  txt: {
    flex: 1,

    justifyContent: 'center',
  },
  bottom: {
    flex: 1,

    flexDirection: 'row',
  },
  txtname: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  follow: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  mss: {
    flex: 2,

    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  boxitemmenu: {
    width: '90%',
    height: '50%',

    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
  },
  imgmenu: {
    width: 30,
    height: 30,
  },
});
