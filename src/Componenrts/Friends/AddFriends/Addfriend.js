import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import axios from 'axios';
import {COLORS} from '../../../color/color';
import {SEVER} from '../../../Severs';
import {useNavigation} from '@react-navigation/native';

const Addfriend = item => {
  const navigation = useNavigation();
  addfriends = async idadd => {
    console.log(idadd);
    const data = {
      idadd: idadd,
      iduser: SEVER.ID_USER,
    };
    SEVER.IO.emit('ACEPTFRIEND', data);

    SEVER.IO.on('ACEPTFRIEND', data => {
      // setdt(data.data);
      if (data.data == null) {
        alert('thêm bạn thành công');
      }
    });

    // let config = {
    //   method: 'post',

    //   url: SEVER.link_accept_friend,
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
    //       alert('đã là bạn');
    //     }
    //   })
    //   .catch(function (error) {
    //     // alert(error.message);
    //     console.log('-er--->', error.message);

    //     return;
    //   });
  };

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
        <View style={styles.box_right}>
          <View style={styles.box_right_top}>
            <Text style={styles.text_name}>{item.item.nameuser}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              height: '100%',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                addfriends(item.item.iduser);
              }}
              style={styles.box_right_bottom}>
              <Text style={styles.text_add}>Thêm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                cancelfriend(item.item.iduser);
              }}
              style={styles.box_right_bottom}>
              <Text style={styles.text_add}>Gỡ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Addfriend;

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
    width: '45%',
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
