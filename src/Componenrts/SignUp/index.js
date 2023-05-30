import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {COLORS} from '../../color/color';
import {SEVER} from '../../Severs/index';

// valudate
const schema = yup
  .object({
    firstName: yup.string().min(3).max(15).required(),
    gmail: yup
      .string()
      .min(1)
      .max(30)
      .matches(/(\W|^)[\w.+\-]*@gmail\.com(\W|$)/)
      .required(),
    password1: yup
      .number()

      .integer()
      .min(0)
      .max(9999999999)
      .required(),
    password2: yup.number().integer().min(0).max(9999999999).required(),
  })
  .required();

const SingUp = ({navigation}) => {
  const [type, settype] = useState('password');
  const [imgeye, setimgeye] = useState(require('../../img/icon/view.png'));
  const [showpass, setshowpass] = useState(true);
  //nhận giá trị từ phím

  // valudate
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: '',
      gmail: '',
      password1: '',
      password2: '',
    },
    resolver: yupResolver(schema),
  });

  // hàm hiển thịp mật khẩu
  const _ShowPass = () => {
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

  const _Singup = async () => {
    if (txtname === '' || txtname.length > 15) {
      settxtnamerr(true);
    } else {
      settxtnamerr(false);
    }
    if (txtgmail === '' || txtgmail.length > 30) {
      settxtgmaierrl(true);
    } else {
      settxtgmaierrl(false);
    }
    if (txtpass1 === '' || txtpass1.length > 10) {
      settxtpass1err(true);
    } else {
      settxtpass1err(false);
    }
    if (txtpass2 === '' || txtpass2.length > 10) {
      settxtpass2err(true);
    } else if (txtpass2 != txtpass1) {
      settxtpass2err(true);
    } else {
      settxtpass2err(false);
    }

    if (
      txtnameerr == false &&
      txtgmailerr == false &&
      txtpass2err == false &&
      txtpass1err == false
    ) {
      axios
        .get(
          `http://192.168.1.16:3000/post_data_user/${txtname}/${txtgmail}/${txtpass1}`,
          {
            // params: {
            // gmail: txtgmail,
            //   gmail: txtgmail,
            //   pass: txtpass1,
            // },
          },
        )
        .then(response => {
          if (response.data.data !== null) {
            settxtgmaierrl(true);
          } else {
            alert('Đăng kí thành công');
            settxtgmaierrl(false);
            navigation.navigate('Login');
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };
  const changescreenlogin = () => {
    navigation.navigate('Login');
  };
  const onSubmit = async data => {
    if (data.password1 === data.password2) {
      let config = {
        method: 'post',

        url: SEVER.link_post_user,
        // url: 'https://61a5e3c48395690017be8ed2.mockapi.io/blogs/products',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          name: data.firstName,
          gmail: data.gmail,
          pass: data.password1,
        },
      };

      await axios(config)
        .then(response => {
          if (response.data.data !== null) {
            alert('Gamil đã tồn tại');
          } else {
            alert('Đăng kí thành công');

            navigation.navigate('Login');
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      alert('Mật khẩu không khớp');
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{flex: 1}}>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Image
            style={{
              height: 100,
              width: '30%',
              resizeMode: 'stretch',
              alignItems: 'flex-end',
            }}
            source={require('../../img/img/hinhloginandsiing.png')}
          />
        </View>
        <View style={{flex: 5, justifyContent: 'center'}}>
          <View style={{width: '90%', alignSelf: 'center', marginBottom: 20}}>
            <Text style={{fontSize: 32, fontWeight: 'bold', color: 'black'}}>
              Create Account
            </Text>
          </View>

          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <View
                style={[
                  styles.box_input,
                  {borderColor: errors.firstName ? 'red' : 'gray'},
                ]}>
                <Image
                  source={require('../../img/icon/user.png')}
                  style={{
                    width: 30,
                    height: 30,
                    alignSelf: 'center',
                  }}></Image>
                <TextInput
                  onChangeText={onChange}
                  style={styles.input}
                  placeholder="Tên của bạn"></TextInput>
              </View>
            )}
            name="firstName"
          />

          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <View
                style={[
                  styles.box_input,
                  {borderColor: errors.gmail ? 'red' : 'gray'},
                ]}>
                <Image
                  source={require('../../img/icon/gmail.png')}
                  style={{
                    width: 30,
                    height: 30,
                    alignSelf: 'center',
                  }}></Image>
                <TextInput
                  onChangeText={onChange}
                  style={styles.input}
                  placeholder="Địa chỉ gmail của bạn"></TextInput>
              </View>
            )}
            name="gmail"
          />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <View
                style={[
                  styles.box_input,
                  {borderColor: errors.password1 ? 'red' : 'gray'},
                ]}>
                <Image
                  source={require('../../img/icon/passwork1.png')}
                  style={{
                    width: 30,
                    height: 30,
                    alignSelf: 'center',
                  }}></Image>
                <TextInput
                  onChangeText={onChange}
                  style={styles.input}
                  placeholder="Mật khẩu"></TextInput>
              </View>
            )}
            name="password1"
          />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <View
                style={[
                  styles.box_input,
                  {paddingLeft: 15, paddingRight: 50},
                  {borderColor: errors.password2 ? 'red' : 'gray'},
                ]}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',

                    paddingRight: 30,
                  }}>
                  <Image
                    source={require('../../img/icon/passwork1.png')}
                    style={{
                      width: 30,
                      height: 30,
                      alignSelf: 'center',
                    }}></Image>
                  <TextInput
                    style={[styles.input, {width: '100%'}]}
                    type="password"
                    secureTextEntry={showpass}
                    onChangeText={onChange}
                    placeholder="Nhập mật khẩu"></TextInput>

                  <View
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                      alignSelf: 'center',
                      alignItems: 'flex-end',
                    }}>
                    <Pressable onPress={() => _ShowPass()}>
                      <Image
                        style={{width: 30, height: 30}}
                        source={imgeye}></Image>
                    </Pressable>
                  </View>
                </View>
              </View>
            )}
            name="password2"
          />

          <View style={{width: '95%'}}>
            <TouchableOpacity
              style={styles.bnt_login}
              onPress={handleSubmit(onSubmit)}>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', color: COLORS.white}}>
                SIGN UP
              </Text>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  marginLeft: 20,
                }}
                source={require('../../img/icon/rightarrows.png')}></Image>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: 150,

            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 18}}>
            Already have a account?{' '}
            <TouchableOpacity onPress={() => changescreenlogin()}>
              <Text
                style={{
                  color: COLORS.textOrinal,
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                Sign in
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SingUp;

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
