import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Loading from '../Loading/Loading';
import {SEVER} from '../../Severs';

const Changepass = ({route}) => {
  const navigation = useNavigation();
  const [isl, setisl] = useState(false);
  const [isstyle, setisstyle] = useState(false);
  const {id} = route.params;
  const [showpass, setshowpass] = useState(true);
  const [type, settype] = useState('password');
  const [imgeye, setimgeye] = useState(require('../../img/icon/view.png'));
  const [text, settext] = useState('');
  // hàm hiển thịp mật khẩu
  const _ShowPass = () => {
    const [isl, setisl] = useState(false);
    if (type === 'password') {
      setshowpass(false);
      settype('text');
      setimgeye(require('../../img/icon/hidden.png'));
    } else {
      setshowpass(true);
      settype('password');
      setimgeye(require('../../img/icon/view.png'));
    }
  };
  updatepass = async () => {
    if (text === '') {
      setisstyle(true);
    } else {
      setisstyle(false);

      let config = {
        method: 'post',

        url: SEVER.link_update_pass,
        // url: 'https://61a5e3c48395690017be8ed2.mockapi.io/blogs/products',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          id: id,
          pass: text,
        },
      };

      await axios(config)
        .then(response => {
          if (response.data.data === 'OK') {
            setisl(false);

            navigation.navigate('Login');
          } else {
            setisl(false);

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
      <ScrollView style={{paddingLeft: 10, paddingRight: 10}}>
        <Loading load={isl}></Loading>
        <View style={styles.boximg}>
          <Image
            style={styles.img}
            source={require('../../img/img/changepass.gif')}></Image>
        </View>
        <View style={styles.boxtext}>
          <Text style={styles.text}> Now let's set your</Text>
          <Text style={styles.text}>password</Text>
        </View>
        <View style={[styles.box_text_pass]}>
          <View
            style={[
              styles.box_text_input,
              {borderColor: isstyle ? 'red' : '#EDEFF0'},
            ]}>
            <TextInput
              onChangeText={settext}
              type="password"
              secureTextEntry={showpass}
              style={styles.input}></TextInput>
            <View style={styles.icon_showpass}>
              <Pressable onPress={() => _ShowPass()}>
                <Image style={{width: 30, height: 30}} source={imgeye}></Image>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.box_bnt}>
          <TouchableOpacity onPress={() => updatepass()} style={styles.bnt}>
            <Text style={{fontSize: 20, color: 'white'}}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Changepass;

const styles = StyleSheet.create({
  boximg: {
    width: '100%',
    height: 160,

    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 170,
    height: 140,
  },
  boxtext: {
    justifyContent: 'center',
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
  input: {
    width: '80%',
    paddingLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  box_text_pass: {
    marginTop: 50,
    width: '100%',
    height: 100,

    alignContent: 'center',
    justifyContent: 'center',
  },
  box_text_input: {
    width: '100%',
    height: 50,

    flexDirection: 'row',
    backgroundColor: '#EDEFF0',
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: '#EDEFF0',
  },
  input: {
    width: '90%',
    height: '100%',

    fontSize: 20,
    fontWeight: 'bold',

    paddingRight: 20,
  },
  icon_showpass: {
    width: '10%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
