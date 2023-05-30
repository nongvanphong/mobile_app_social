import {
  BackHandler,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Loading from '../Loading/Loading';
import {SEVER} from '../../Severs';

var IO = SEVER.IO;
const Chat = ({route}) => {
  const {params = {}} = route.params;
  const [datasen, setdatasen] = useState([]);
  const [textr, settexr] = useState('');
  const [text, settex] = useState('');
  const [checkroom, setcheckroom] = useState(false);
  const [isl, setisl] = useState(false);
  const flatListRef = useRef(null); // Step 1
  // kiểm tra người dùng báo vào nút back
  const backHandler = useRef(null);

  const scrollToBottom = () => {
    flatListRef.current.scrollToEnd({animated: true}); // Step 2
  };

  useEffect(() => {
    // gọi hàm get api lần đầu tiên sẽ loading api
    setisl(true);
    // getdata_chat();
    getdata_code_room();

    // tiếp theo là cứ sau 30p || 1800000s thì call api 1 lần
    const intervalId = setInterval(() => {
      // getdata_chat();
      getdata_code_room();
    }, 1800000);
    // lệnh kiểm tra bâm svaof nút back
    backHandler.current = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );

    // sau khi gọi lại xóa
    return () => {
      clearInterval(intervalId);
      backHandler.current.remove();
    };
  }, []);
  // hàm bâm svoaf nút back
  const handleBackButton = () => {
    // Thực hiện các hành động tùy chỉnh của bạn khi người dùng bấm nút "Back" ở đây
    console.log('Back');
  };

  const getdata_code_room = () => {
    IO.emit('clien:getcode_room', {
      id_user: params.id_user,
      id_user_chat: params.id_user_chat,
    });
    IO.on('sever:code_room', data => {
      if (data == 'null') {
        setcheckroom(true);
      } else {
        settexr(data);
        getdata_chat(data);
      }
    });
  };

  const getdata_chat = d => {
    IO.emit('clien:loadata_st1', d);
    IO.on('sever:send_room_chat', data => {
      setcheckroom(false);
      console.log('a');
      data == 'null' ? setdatasen(data) : setdatasen(data.slice().reverse());

      // setdatasen(data);

      setisl(false);
    });
  };

  send_message = () => {
    // SEVER.IO.emit('creat_room', (data = {id_user: '1', id_user_chat: '2'}));

    if (checkroom === true) {
      IO.emit('clien:creat_room', {
        id_user: params.id_user,
        id_user_chat: params.id_user_chat,
      });

      IO.on('sever:code_room', data => {
        if (data == 'null') {
          setcheckroom(true);
        } else {
          setcheckroom(false);
          settexr(data);

          getdata_chat(data);
        }
      });
    } else {
      IO.emit(
        'clien:join_room',
        (data = {id_room: textr, msg: text, id_user_chat: SEVER.ID_USER}),
      );
    }
    // gửi tin nhắn trong room

    settex('');
  };

  return (
    //datasen.slice().reverse()
    <View style={styles.container}>
      <Loading load={isl}></Loading>
      <Text style={styles.title}>Chat</Text>
      <View style={styles.messagesContainer}>
        <FlatList
          data={datasen}
          renderItem={({item}) => (
            <View
              style={{
                width: '100%',

                alignItems:
                  item.id_user_chat === SEVER.ID_USER
                    ? 'flex-end'
                    : 'flex-start',
              }}>
              <View
                style={[
                  styles.boxtext_msg,
                  {
                    backgroundColor:
                      item.id_user_chat === SEVER.ID_USER ? 'blue' : 'gray',
                    alignItems:
                      item.id_user_chat === SEVER.ID_USER
                        ? 'flex-end'
                        : 'flex-start',
                  },
                ]}>
                <Text style={{color: 'white'}}>{item.messenger}</Text>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
          ref={flatListRef} // Step 1
          onContentSizeChange={scrollToBottom} // Step 3
          onLayout={scrollToBottom} // Step 2
        />
      </View>
      <View style={styles.box_item_chat}>
        <TextInput
          style={styles.input_chat}
          onChangeText={settex}
          value={text}
          placeholder="Chat messenger"></TextInput>
        <View style={styles.box_icon_send}>
          <TouchableOpacity
            onPress={() => {
              send_message();
            }}
            style={styles.box_icon_send1}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../../img/icon/send.png')}></Image>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  messagesContainer: {
    flex: 1,
  },
  box_item_chat: {
    flexDirection: 'row',
    width: '100%',

    borderRadius: 50,
    height: 40,

    alignItems: 'center',
  },
  input_chat: {
    width: '85%',
    backgroundColor: 'gray',
    borderRadius: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  box_icon_send: {
    height: 40,
    width: '15%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  box_icon_send1: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxtext_msg: {
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 10,
    width: '80%',
    minHeight: 40,
    maxHeight: 100000,
    justifyContent: 'center',
    borderRadius: 50,
    bottom: 10,
  },
});
