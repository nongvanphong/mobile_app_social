import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import {SEVER} from '../../Severs';
import {useNavigation} from '@react-navigation/native';

const Otp = ({onFinish, route}) => {
  const navigation = useNavigation();
  const [isl, setisl] = useState(false);
  const {gmail} = route.params;
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [isstyle, setisstyle] = useState(false);
  const [text, settex] = useState({
    text1: '',
    text2: '',
    text3: '',
    text4: '',
  });
  const borderColorValue = isstyle ? '#F5F6FA' : 'red';
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(secondsLeft => secondsLeft - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) {
    }
  }, [secondsLeft, onFinish]);

  const displayMinutes = Math.floor(secondsLeft / 60);
  const displaySeconds = secondsLeft % 60; // sử dụng const để khai báo biến displaySeconds
  const formattedTime = `${displayMinutes < 10 ? '0' : ''}${displayMinutes}:${
    displaySeconds < 10 ? '0' : ''
  }${displaySeconds}`;

  const checkcode = async () => {
    if (
      text.text1 === '' ||
      text.text2 === '' ||
      text.text3 === '' ||
      text.text4 === ''
    ) {
      setisstyle(true);
    } else {
      let code =
        text.text1 + '' + text.text2 + '' + text.text3 + '' + text.text4;
      setisl(true);
      let config = {
        method: 'post',

        url: SEVER.link_checkcode,
        // url: 'https://61a5e3c48395690017be8ed2.mockapi.io/blogs/products',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          gmail: gmail,
          code: code,
        },
      };

      await axios(config)
        .then(response => {
          if (response.data.data !== null) {
            setisl(false);
            setisstyle(false);

            navigation.navigate('Change password', {
              id: response.data.data.iduser,
            });
          } else {
            setisl(false);
            setisstyle(true);
            alert('code không đúng');
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <View style={{backgroundColor: '#ffffff', flex: 1}}>
      <Loading load={isl}></Loading>
      <ScrollView style={{paddingLeft: 10, paddingRight: 10}}>
        <View style={styles.boximg}>
          <Image
            style={styles.img}
            source={require('../../img/img/otp1.gif')}></Image>
        </View>
        <View style={styles.boxtext}>
          <Text style={styles.text}> We send you a code to</Text>
          <Text style={styles.text}>veryfy your number</Text>
        </View>
        <View style={styles.boxcode}>
          <View
            style={[
              styles.item_code,
              {borderColor: isstyle ? 'red' : '#F5F6FA'},
            ]}>
            <TextInput
              onChangeText={valun => {
                settex({...text, text1: valun});
              }}
              keyboardType="numeric"
              maxLength={1}
              style={styles.text_input}></TextInput>
          </View>
          <View
            style={[
              styles.item_code,
              {borderColor: isstyle ? 'red' : '#F5F6FA'},
            ]}>
            <TextInput
              onChangeText={valun => {
                settex({...text, text2: valun});
              }}
              keyboardType="numeric"
              maxLength={1}
              style={styles.text_input}></TextInput>
          </View>
          <View
            style={[
              styles.item_code,
              {borderColor: isstyle ? 'red' : '#F5F6FA'},
            ]}>
            <TextInput
              onChangeText={valun => {
                settex({...text, text3: valun});
              }}
              keyboardType="numeric"
              maxLength={1}
              style={styles.text_input}></TextInput>
          </View>
          <View
            style={[
              styles.item_code,
              {borderColor: isstyle ? 'red' : '#F5F6FA'},
            ]}>
            <TextInput
              onChangeText={valun => {
                settex({...text, text4: valun});
              }}
              keyboardType="numeric"
              maxLength={1}
              style={styles.text_input}></TextInput>
          </View>
        </View>
        <View style={styles.box_text_time}>
          <Text>gửi lại mã trong</Text>
          {secondsLeft <= 0 ? <Text>00:00</Text> : <Text>{formattedTime}</Text>}
        </View>
        <View style={styles.box_bnt}>
          <TouchableOpacity
            onPress={() => {
              checkcode();
            }}
            style={styles.bnt}>
            <Text style={{fontSize: 20, color: 'white'}}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({
  boximg: {
    width: '100%',
    height: 160,

    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 170,
    height: 130,
  },
  boxtext: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxcode: {
    alignSelf: 'center',
    width: '70%',
    height: 100,

    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  item_code: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderColor: '#F5F6FA',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
  },
  text_input: {
    width: '50%',
    height: '100%',
    fontSize: 25,
    fontWeight: '900',
  },
  box_text_time: {
    alignItems: 'center',
  },
  box_bnt: {
    width: '100%',
    height: 200,
    justifyContent: 'center',

    alignItems: 'center',
  },
  bnt: {
    width: '50%',
    height: 50,
    backgroundColor: '#815FDE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: '900',
  },
});
