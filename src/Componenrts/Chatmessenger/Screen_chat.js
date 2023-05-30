import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SEVER} from '../../Severs';
import Loading from '../Loading/Loading';

const Screen_chat = () => {
  const [dt, sdt] = useState([]);
  const navigations = useNavigation();

  const [isl, setisl] = useState(false);

  useEffect(() => {
    // gọi hàm get api lần đầu tiên sẽ loading api
    setisl(true);
    getdata_list_chat();
    // tiếp theo là cứ sau 30p || 1800000s thì call api 1 lần
    const intervalId = setInterval(() => {
      getdata_list_chat();
    }, 1800000);
    // sau khi gọi lại xóa
    return () => clearInterval(intervalId);
  }, []);
  click_search = () => {
    navigations.navigate('Search');
  };
  click = item => {
    navigations.navigate('Chatnew', {
      params: {id_user: item.id_user, id_user_chat: item.id_user_chat},
    });
  };

  const getdata_list_chat = () => {
    SEVER.IO.emit('clien:getdat_chat', SEVER.ID_USER);

    SEVER.IO.on('sever:send_getdat_chat', data => {
      if (data == null) {
        setisl(true);
      } else {
        sdt(data);
        setisl(false);
      }
    });
  };

  return (
    <View style={{flex: 1}}>
      <Loading load={isl}></Loading>
      <View style={styles.boxsearch}>
        <TouchableOpacity
          onPress={() => {
            click_search();
          }}
          style={styles.search}>
          <View style={styles.imgiconsearch}>
            <Image
              style={styles.imgiconsearchs}
              source={require('../../img/icon/search.png')}></Image>
          </View>
          <View style={styles.inputsearch}>
            <Text>Nhập nội dung</Text>
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        data={dt}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              click(item);
            }}
            style={styles.messageContainer}>
            <Image
              style={styles.avatar}
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBrnLh8DAyK7pKVZezt7xIZF_LiJI6T6poXwugc-FpRw&s',
              }}
            />
            <View style={styles.messageContent}>
              <Text style={styles.senderName}>{item.nameuser} </Text>
              <Text style={styles.messageText}></Text>
            </View>
            <Text style={styles.messageTime}>Có thể chat</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.idroom}
      />
    </View>
  );
};

export default Screen_chat;

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
