import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {COLORS} from '../../../color/color';
import {SEVER} from '../../../Severs';
import {useNavigation} from '@react-navigation/native';

const Listfriend = item => {
  const navigation = useNavigation();
  // add frien
  addfriend = async idadd => {
    const data = {
      idadd: idadd,
      iduser: SEVER.ID_USER,
    };
    SEVER.IO.emit('ADDFRIEND', data);

    SEVER.IO.on('ADDFRIEND', data => {
      if (data.data != null) {
        alert('Lỗi thêm bạn');
      }
    });

    // // console.log(idadd);
    // let config = {
    //   method: 'post',

    //   url: SEVER.link_add_friend,
    //   // url: 'https://61a5e3c48395690017be8ed2.mockapi.io/blogs/products',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   data: {
    //     idadd: idadd,
    //     iduser: SEVER.ID_USER,
    //   },
    // };

    // await axios(config)
    //   .then(function (response) {
    //     if (response.data.data == null) {
    //       alert('thêm thành công');
    //     }
    //   })
    //   .catch(function (error) {
    //     // alert(error.message);
    //     console.log('-er--->', error.message);

    //     return;
    //   });
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
        <View style={styles.box_right}>
          <View style={styles.box_right_top}>
            <Text style={styles.text_name}>{item.item.nameuser}</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              addfriend(item.item.iduser);
            }}
            style={styles.box_right_bottom}>
            <Text style={styles.text_add}>Thêm bạn bè</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Listfriend;

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    marginTop: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  box_img: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
  },
  box_right: {
    width: '80%',
    height: '100%',
  },
  box_right_top: {
    width: '100%',
    height: '50%',
  },
  box_right_bottom: {
    width: '100%',
    height: '50%',
    backgroundColor: COLORS.boxOrinal,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  text_name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  text_add: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
