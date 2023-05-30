import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Main_Top_rotare from './Main_Top_rotare';

import Main from './Main';
import Menu from './Menu';
import react from 'react';
import {SEVER} from '../../Severs/index';
import {COLORS} from '../../color/color';
import Loading from '../Loading/Loading';
const HomeMain = () => {
  const [dt, setdt] = useState([]);
  const [isload, setisload] = useState(false);
  const [isload1, setisload1] = useState(false);
  const [isshow, setishow] = useState(false);
  useEffect(() => {
    // gọi hàm get api lần đầu tiên sẽ loading api
    setisload(true);
    setishow(false);
    Loadingdata();
    // tiếp theo là cứ sau 30p || 1800000s thì call api 1 lần
    const intervalId = setInterval(() => {
      Loadingdata();
    }, 1800000);
    // sau khi gọi lại xóa
    return () => clearInterval(intervalId);
  }, []);

  const Loadingdata = async () => {
    SEVER.IO.emit(
      'GETMAIN',
      (data = {
        id: SEVER.ID_USER,
      }),
    );

    SEVER.IO.on('GETMAIN', data => {
      setdt(data.data);
      setisload(false);
      setishow(true);
    });

    // let config = {
    //   method: 'post',
    //   url: SEVER.link_get_satus,
    //   // url: 'https://61a5e3c48395690017be8ed2.mockapi.io/blogs/products',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   data: {
    //     id: SEVER.ID_USER,
    //   },
    // };
    // await axios(config)
    //   .then(function (response) {
    //     setisload(false);
    //     setishow(true);
    //     setdt(response.data.data);
    //   })
    //   .catch(function (error) {
    //     setisload(true);
    //     setishow(false);
    //     // alert(error.message);
    //     console.log('-er--->', error.message);
    //     return;
    //   });
  };

  const Listitems = react.memo(({itemsss}) => {
    return (
      <View>
        <Main item={itemsss}></Main>
      </View>
    );
  });

  //console.log(dt);
  // dt.map(item => {
  //   console.log(item.idbantin);
  // });
  // reset
  const onRefresh = () => {
    Loadingdata();
    console.log('het');
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      {isload && (
        <ActivityIndicator
          style={{position: 'absolute', alignSelf: 'center'}}
          size="large"
          color={COLORS.boxOrinal}
        />
      )}
      {isshow && (
        <View
          style={{
            flex: 1,
          }}>
          <Menu></Menu>
          <FlatList
            onRefresh={onRefresh}
            refreshing={isload1}
            ListHeaderComponent={() => {
              return (
                <View>
                  <Main_Top_rotare></Main_Top_rotare>
                </View>
              );
            }}
            style={{
              flex: 1,
            }}
            data={dt}
            renderItem={({item}) => <Listitems itemsss={item} />}
            keyExtractor={item => item.idbantin}
          />
        </View>
      )}
    </View>
  );
};

export default HomeMain;

const styles = StyleSheet.create({});
