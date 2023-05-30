import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import axios from 'axios';
import {COLORS} from '../../../color/color';
import {SEVER} from '../../../Severs';
import {useNavigation} from '@react-navigation/native';

const Listmyfriend = item => {
  const navigation = useNavigation();
  cancelfriend = async idadd => {
    const data = {
      idadd: idadd,
      iduser: SEVER.ID_USER,
    };
    SEVER.IO.emit('DELETEFRIEND', data);

    SEVER.IO.on('DELETEFRIEND', data => {
      // setdt(data.data);
      if (data.data == null) {
        alert('Gỡ bạn thành công');
      }
    });
  };
  return (
    <View>
      <View style={styles.box}>
        <View style={styles.box_img}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Xem chi tiết', {
                item: {
                  id: item.item.iduser,
                  name: item.item.nameuser,
                  avt: item.item.avatar,
                },
              });
            }}>
            {item.item.avatar != null ? (
              <Image
                style={styles.image}
                source={{uri: SEVER.link_img_main + item.item.avatar}}></Image>
            ) : (
              <Image
                style={styles.image}
                source={require('../../../img/img/avtxxx.jpg')}></Image>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.box_text}>
          <Text style={styles.text_name}>{item.item.nameuser}</Text>
          <Text style={styles.text_friends}>10k bạn bè</Text>
        </View>
        <View style={styles.box_delete}>
          <TouchableOpacity
            onPress={() => {
              cancelfriend(item.item.iduser);
            }}
            style={styles.delete}>
            <Text style={styles.delete_text}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Listmyfriend;

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  box_img: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
  },
  box_text: {
    width: '60%',
    height: '100%',
    justifyContent: 'center',
  },
  text_name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text_friends: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  box_delete: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',

    alignItems: 'flex-end',
  },
  delete: {
    width: '90%',
    height: '50%',
    backgroundColor: COLORS.boxOrinal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  delete_text: {
    fontWeight: 'bold',
  },
});
