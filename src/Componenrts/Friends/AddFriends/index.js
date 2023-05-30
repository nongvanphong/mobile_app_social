import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Addfriend from './Addfriend';
import {SEVER} from '../../../Severs';
import {COLORS} from '../../../color/color';

const AddFriends = () => {
  const [dt, setdt] = useState([]);
  const [isload, setisload] = useState(false);
  const [isload1, setisload1] = useState(false);
  const [isshow, setshow] = useState(false);
  const [showitem, setshowitem] = useState(true);

  useEffect(() => {
    // gọi hàm get api lần đầu tiên sẽ loading api
    setisload(true);
    setshow(false);
    Loadingdata();
    // tiếp theo là cứ sau 30p || 1800000s thì call api 1 lần
    const intervalId = setInterval(() => {
      Loadingdata();
    }, 1800000);
    // sau khi gọi lại xóa
    return () => clearInterval(intervalId);
  }, []);

  const Loadingdata = async () => {
    let config = {
      method: 'post',

      url: SEVER.link_dagui_friend,
      // url: 'https://61a5e3c48395690017be8ed2.mockapi.io/blogs/products',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        iduser: SEVER.ID_USER,
      },
    };

    await axios(config)
      .then(function (response) {
        setisload(false);
        setshow(true);
        setdt(response.data.data);
      })
      .catch(function (error) {
        // alert(error.message);
        console.log('-er--->', error.message);
        setisload(true);
        setshow(false);
        return;
      });
  };

  // reset
  const onRefresh = () => {
    Loadingdata();
  };
  return (
    <View style={{paddingLeft: 10, paddingRight: 10, flex: 1}}>
      {isload && (
        <ActivityIndicator
          style={{position: 'absolute', alignSelf: 'center'}}
          size="large"
          color={COLORS.boxOrinal}
        />
      )}
      {isshow && (
        <FlatList
          style={{
            flex: 1,
          }}
          onRefresh={onRefresh}
          refreshing={isload1}
          data={dt}
          renderItem={({item}) => <Addfriend item={item} />}
        />
      )}
    </View>
  );
};

export default AddFriends;

const styles = StyleSheet.create({});
