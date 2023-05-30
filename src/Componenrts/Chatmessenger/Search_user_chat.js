import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {SEVER} from '../../Severs';
import {useNavigation} from '@react-navigation/native';

const Search_user_chat = () => {
  const [text, settext] = useState('');
  const [dt, setdt] = useState('');
  const navigations = useNavigation();
  Seach = async () => {
    let config = {
      method: 'post',

      url: SEVER.link_seacrh,
      // url: 'https://61a5e3c48395690017be8ed2.mockapi.io/blogs/products',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        iduser: SEVER.ID_USER,
        txtsearch: text,
      },
    };

    await axios(config)
      .then(function (response) {
        setdt(response.data.data);
      })
      .catch(function (error) {
        // alert(error.message);
        console.log('-er--->', error.message);

        return;
      });
  };
  click = iduser => {
    navigations.navigate('Chatnew', {
      params: {id_user: SEVER.ID_USER, id_user_chat: iduser},
    });
  };
  return (
    <View>
      <View>
        <View style={styles.boxsearch}>
          <View style={styles.search}>
            <View style={styles.imgiconsearch}>
              <TouchableOpacity onPress={() => Seach()}>
                <Image
                  style={styles.imgiconsearchs}
                  source={require('../../img/icon/search.png')}></Image>
              </TouchableOpacity>
            </View>
            <TextInput
              onChangeText={settext}
              placeholder="Tìm kiếm"
              style={styles.inputsearch}></TextInput>
          </View>
        </View>
        <FlatList
          data={dt}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                click(item.iduser);
              }}
              style={styles.messageContainer}>
              {item.avatar != null ? (
                <Image
                  style={styles.avatar}
                  source={{uri: SEVER.link_img_main + item.avatar}}></Image>
              ) : (
                <Image
                  style={styles.avatar}
                  source={require('../../img/img/avtxxx.jpg')}></Image>
              )}
              <View style={styles.messageContent}>
                <Text style={styles.senderName}>{item.nameuser} </Text>
                <Text style={styles.messageText}></Text>
              </View>
              <Text style={styles.messageTime}>Messenger</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.idroom}
        />
      </View>
    </View>
  );
};

export default Search_user_chat;

const styles = StyleSheet.create({
  boxsearch: {
    width: '100%',
    height: 70,

    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },

  search: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    backgroundColor: 'gray',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 30,
  },
  imgiconsearch: {
    width: '10%',
    height: 40,

    justifyContent: 'center',
  },
  inputsearch: {
    width: '90%',
    height: 40,
    justifyContent: 'center',
  },
  imgiconsearchs: {
    width: 20,
    height: 20,
  },

  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageContent: {
    flex: 1,

    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  senderName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    marginLeft: 10,
    color: '#999',
  },
});
