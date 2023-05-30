import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {SEVER} from '../../Severs';
import Listfriend from '../Friends/SuggestFriends/Listfriend';
import {useNavigation} from '@react-navigation/native';

const Seach = () => {
  const navigation = useNavigation();
  const [dt, setdt] = useState([]);
  const [txtsearch, settxtsearch] = useState('');
  search = async () => {
    let config = {
      method: 'post',

      url: SEVER.link_seacrh,
      // url: 'https://61a5e3c48395690017be8ed2.mockapi.io/blogs/products',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        iduser: SEVER.ID_USER,
        txtsearch: txtsearch,
      },
    };

    await axios(config)
      .then(function (response) {
        setdt(response.data.data);
        console.log(response.data.data);
      })
      .catch(function (error) {
        // alert(error.message);
        console.log('-er--->', error.message);

        return;
      });
  };
  return (
    <View style={{paddingLeft: 10, paddingRight: 10, flex: 1}}>
      <View style={styles.inputseach}>
        <View style={styles.txtsearch}>
          <TextInput
            style={{paddingLeft: 10, paddingRight: 10}}
            onChangeText={settxtsearch}
            placeholder="Nhập nội dung cần tìm..."></TextInput>
        </View>
        <View style={styles.iconsearch}>
          <TouchableOpacity
            onPress={() => {
              search();
            }}>
            <Image
              style={styles.imgiconsearch}
              source={require('../../img/icon/search.png')}></Image>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={{
          flex: 1,
        }}
        data={dt}
        renderItem={({item}) => <Listfriend item={item}></Listfriend>}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Seach;

const styles = StyleSheet.create({
  inputseach: {
    width: '100%',
    height: 40,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imgiconsearch: {
    width: 35,
    height: 35,
  },
  txtsearch: {
    width: '85%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 50,
  },
  iconsearch: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
