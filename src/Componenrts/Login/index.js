import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../../color/color';
import {SEVER} from '../../Severs/index';
import Loading from '../Loading/Loading';

const Login = ({navigation}) => {
  const [inputgmail, setinputgmail] = useState('');
  const [inputpass, setinputpass] = useState('');
  const [isl, setisl] = useState(false);

  const getsavelogin = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('login');

      if (value !== null) {
        const parsedValue = JSON.parse(value);

        setinputgmail(parsedValue.gmail);
        setinputpass(parsedValue.pass);

        setisl(true);
        let config = {
          method: 'post',

          url: SEVER.link_login_user,
          // url: 'https://61a5e3c48395690017be8ed2.mockapi.io/blogs/products',
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            gmail: parsedValue.gmail,
            pass: parsedValue.pass,
          },
        };

        await axios(config)
          .then(response => {
            if (response.data.data !== null) {
              SEVER.ID_USER = response.data.data.iduser;
              SEVER.NAME_USER = response.data.data.nameuser;
              SEVER.AVT_USER = response.data.data.avatar;

              setisl(false);
              navigation.navigate('ScreenHome');
            } else {
              setisl(false);
              alert('Đăng nhập thất bại');
            }
          })
          .catch(error => {
            console.error(error);
          });

        return;
      }
    } catch (e) {
      // error reading value
    }
  }, []);

  useEffect(() => {
    getsavelogin();
  }, [getsavelogin]);

  // hàm đăng nhập
  const _Login = async () => {
    setisl(true);
    let config = {
      method: 'post',

      url: SEVER.link_login_user,
      // url: 'https://61a5e3c48395690017be8ed2.mockapi.io/blogs/products',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        gmail: inputgmail,
        pass: inputpass,
      },
    };

    await axios(config)
      .then(response => {
        if (response.data.data !== null) {
          SEVER.ID_USER = response.data.data.iduser;
          SEVER.NAME_USER = response.data.data.nameuser;
          SEVER.AVT_USER = response.data.data.avatar;

          savelogin();

          setisl(false);
          navigation.navigate('ScreenHome');
        } else {
          setisl(false);
          alert('Đăng nhập thất bại');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  const savelogin = async () => {
    let abc = {
      gmail: inputgmail,
      pass: inputpass,
    };
    try {
      await AsyncStorage.setItem('login', JSON.stringify(abc));
      return;
    } catch (e) {
      // saving error
      return;
    }
  };

  const changescreensingup = () => {
    navigation.navigate('Singup');
  };

  const getpass = async () => {
    if (inputgmail !== '') {
      setisl(true);
      let config = {
        method: 'post',

        url: SEVER.link_sencode,
        // url: 'https://61a5e3c48395690017be8ed2.mockapi.io/blogs/products',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          gmail: inputgmail,
        },
      };

      await axios(config)
        .then(response => {
          console.log('l g : ', response.data.data);
          if (response.data.data !== null) {
            setisl(false);
            navigation.navigate('OTP', {gmail: inputgmail});
          } else {
            setisl(false);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{flex: 1}}>
        <Loading load={isl}></Loading>

        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Image
            style={{
              width: '30%',
              height: 100,

              resizeMode: 'stretch',
              alignItems: 'flex-end',
            }}
            source={require('../../img/img/hinhloginandsiing.png')}
          />
        </View>
        <View style={{flex: 5, justifyContent: 'center'}}>
          <View style={{width: '90%', alignSelf: 'center', marginBottom: 20}}>
            <Text style={{fontSize: 32, fontWeight: 'bold', color: 'black'}}>
              Login
            </Text>
            <Text style={{fontSize: 18, color: 'black'}}>
              Please sign in to continue.
            </Text>
          </View>
          <View style={styles.box_input}>
            <Image
              source={require('../../img/icon/gmail.png')}
              style={{
                width: 30,
                height: 30,
                alignSelf: 'center',
              }}></Image>
            <TextInput
              defaultValue={inputgmail}
              style={styles.input}
              placeholder="Nhập địa gmail"
              onChangeText={setinputgmail}></TextInput>
          </View>
          <View style={[styles.box_input_password]}>
            <Image
              source={require('../../img/icon/passwork1.png')}
              style={{
                width: 30,
                height: 30,
                alignSelf: 'center',
              }}></Image>
            <TextInput
              defaultValue={inputpass}
              style={[styles.input]}
              secureTextEntry={true}
              placeholder="Nhập mật khẩu"
              onChangeText={setinputpass}></TextInput>

            <View
              style={{
                alignSelf: 'center',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => {
                  getpass();
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: COLORS.textOrinal,
                  }}>
                  Forgot
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{width: '95%'}}>
            <TouchableOpacity style={styles.bnt_login} onPress={() => _Login()}>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', color: COLORS.white}}>
                Login
              </Text>
              <Image
                style={{width: 30, height: 30, marginLeft: 20}}
                source={require('../../img/icon/rightarrows.png')}></Image>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: 200,

            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 18}}>
            Don't have an account?{' '}
            <TouchableOpacity onPress={() => changescreensingup()}>
              <Text
                style={{
                  color: COLORS.textOrinal,
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                Sign up
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  box_input: {
    marginTop: 20,
    width: '90%',
    height: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 2,
    paddingLeft: 30,
    paddingRight: 30,
  },
  box_input_password: {
    marginTop: 20,
    width: '90%',
    height: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 2,
    paddingLeft: 54,
    paddingRight: 50,
  },
  input: {
    width: '100%',
    paddingLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  bnt_login: {
    marginTop: 50,
    width: '50%',
    height: 60,
    backgroundColor: '#FDAB42',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});
