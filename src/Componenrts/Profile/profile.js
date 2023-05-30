import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Top_profile from './Top_profile';
import Profile_number_friends from './Profile_number_friends';
import Post_preson from './Post_preson';
import {SEVER} from '../../Severs/index';
import {COLORS} from '../../color/color';

const Profile = ({itemuri, itemname, itemid, itemavt}) => {
  const [dt, setdt] = useState([]);
  const [isload, setisload] = useState(false);
  const [isload1, setisload1] = useState(false);
  const [isshow, setshow] = useState(false);
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

      url: itemuri,
      // url: 'https://61a5e3c48395690017be8ed2.mockapi.io/blogs/products',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        id: itemid,
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

  const Listitems = React.memo(({itemsss}) => {
    return (
      <View>
        <Post_preson item={itemsss}></Post_preson>
      </View>
    );
  });

  // reset
  const onRefresh = () => {
    Loadingdata();
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
        <FlatList
          onRefresh={onRefresh}
          refreshing={isload1}
          ListHeaderComponent={() => {
            return (
              <View>
                <Top_profile
                  itemname={itemname}
                  itemid={itemid}
                  itemavt={itemavt}></Top_profile>
                <Profile_number_friends></Profile_number_friends>

                <Text
                  style={{paddingLeft: 10, fontSize: 18, fontWeight: 'bold'}}>
                  Post
                </Text>
              </View>
            );
          }}
          style={{
            flex: 1,
          }}
          data={dt}
          renderItem={({item}) => (
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
                      source={require('../../img/img/avtxxx.jpg')}></Image>
                  )}
                </View>
                <View style={styles.topmenuheder_text}>
                  <Text style={styles.topmenuheder_textname}>
                    {item.nameuser}
                  </Text>
                  <Text style={styles.topmenuheder_texttime}>
                    {item.thoigiandang}
                  </Text>
                </View>
                <View style={styles.topmenuheder_right}>
                  <TouchableOpacity
                    onPress={() => {
                      click_menu(item);
                    }}>
                    <Image
                      style={[
                        styles.topmenuheder_rotate,
                        {width: 25, height: 25},
                      ]}
                      source={require('../../img/icon/menu.png')}></Image>
                  </TouchableOpacity>
                </View>
              </View>
              <Listitems itemsss={item} />
            </View>
          )}
          keyExtractor={item => item.idbantin}
        />
      )}
    </View>
  );
};

export default Profile;

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
});
