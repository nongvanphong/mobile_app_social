import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import * as ImagePicker from 'react-native-image-picker';
import {BottomSheet} from 'react-native-btr';

var testngaysinh = /^(0?[1-9]|[12][0-9]|3[01])[\-](0?[1-9]|1[012])[\-]\d{4}$/gm;

var testgmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var ten = '';
const Test = () => {
  const [bs64, setbs64] = useState('');

  const [preview, setpreview] = useState(true);
  const [sv, setsv] = useState(false);
  const [isname, setisname] = useState(false);

  const [istuoi, setuoi] = useState(false);
  const [isnganh, setisnganh] = useState(false);
  const [isdiemmanh, setdiemamnh] = useState(false);
  const [isdiemyeu, setdiemyeu] = useState(false);
  const [isgmail, setgmail] = useState(false);

  const [errname, setrrname] = useState('');
  const [errnganh, setrrnnganh] = useState('');
  const [errtuoi, setrrtuoi] = useState();
  const [errdiemmanh, setrrdiemmanh] = useState('');
  const [errdiemyeu, setrdiemyeu] = useState('');
  const [errgmail, setrrgamil] = useState('');
  const [txt, settxt] = useState({
    ten: '',
    tuoi: '',
    nganh: '',
    tennganh: '',
    gmail: '',

    diemmanh: '',
    diemyeu: '',
  });

  // kho bị delay
  useEffect(() => {
    kiemtra = (ten, ngaysinh, gmail, diemmanh, diemyeu, nganh) => {
      setsv(false);
      if (!testngaysinh.test(ngaysinh)) {
        // console.log('===============SAI1');
        setuoi(true);
        setrrtuoi({...errtuoi, ten: 'ngày sinh không đúng định dạng'});
      } else {
        // console.log('==============DUNG1');
        setuoi(false);
      }

      if (ten === undefined || ten === '') {
        console.log('===============SAI1');
        setisname(true);
        setrrname({...errname, ten: 'tên không được để chống'});
      } else {
        console.log('==============DUNG1');
        setisname(false);
      }
      //isname;
      // console.log(ten, ' :kiemtr : ' + isname);

      if (gmail === '') {
        setgmail(true);
        setrrgamil({...errdiemyeu, gmail: 'gmail không được để chống'});
      } else if (!testgmail.test(gmail)) {
        setgmail(true);
        setrrgamil({...errdiemyeu, gmail: 'gmail không đúng định dạng'});
      } else {
        setgmail(false);
      }
      if (ngaysinh === '') {
        //setuoi(true);
        //setrrtuoi({...errtuoi, ten: 'ngày sinh không được để chống'});
      } else if (!testngaysinh.test(ngaysinh)) {
        // console.log('===============SAI');
      } else {
        // console.log('==============DUNG');
      }
      if (diemmanh === '' || diemmanh === undefined) {
        setdiemamnh(true);
        setrrdiemmanh({
          ...errdiemmanh,
          ten: 'điểm mạnh không được để chống',
        });
      } else {
        setdiemamnh(false);
      }
      if (diemyeu === '' || diemyeu === undefined) {
        setdiemyeu(true);
        setrdiemyeu({...errdiemyeu, ten: 'điểm yếu không được để chống'});
      } else {
        setdiemyeu(false);
      }
      if (nganh === '') {
        setisnganh(true);
        setrrnnganh({...errnganh, ten: 'bạn chưa chọn ngành'});
      } else {
        setisnganh(false);
      }
    };
  }, [isname, isgmail, istuoi, isdiemmanh, isdiemyeu, isnganh]);
  // console.log(isname, 'm4:', txt.ten);

  const nganh = ['CNTT', 'UDPM', 'Đồ Hoạ', 'Kinh Tế', 'LTMT'];

  const _save = () => {
    kiemtra(txt.ten, txt.tuoi, txt.gmail, txt.diemmanh, txt.diemyeu, txt.nganh);
  };
  const _preview = () => {
    if (
      isname == false &&
      isnganh == false &&
      isdiemmanh == false &&
      isdiemyeu == false &&
      isgmail == false &&
      istuoi == false &&
      sv == false
    ) {
      setpreview(false);
    } else {
      alert('no save');
    }
  };
  pickImage = () => {
    let options = {
      storageOptions: {
        //   skipBackup: true,

        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
      },
      // chyển anhe thành base64
      includeBase64: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};

        console.log('response', JSON.stringify(response));

        console.log('uri => ', response.assets[0].uri);
        console.log('width => ', response.assets[0].width);
        console.log('height => ', response.assets[0].height);
        console.log('fileSize => ', response.assets[0].fileSize);
        console.log('type => ', response.assets[0].type);
        console.log('fileName => ', response.assets[0].fileName);
        let source1 = response.assets[0].uri;
        let source2 = response.assets[0].base64;
        console.log('base64 => ', source2);
        setbs64(source2);
      }
    });
  };
  const _xuat = () => {
    setpreview(true);
  };

  const tinhtuoi = chuoi => {
    let sotuoi = 0;
    //================================
    let d = new Date();

    let ns = chuoi;

    let tuoi = d.getFullYear() - ns.split('-')[2];

    if (ns.split('-')[1] > d.getMonth() + 1) {
      return tuoi - 1;
    } else {
      if (ns.split('-')[0] > d.getDate()) {
        return tuoi - 1;
      } else {
        return tuoi;
      }
    }
  };
  const [visible, setVisible] = useState(false);

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 20,
            textAlign: 'center',
          }}>
          Example of Bottom Sheet in React Native
        </Text>
        <Button
          onPress={toggleBottomNavigationView}
          //on Press of the button bottom sheet will be visible
          title="Show Bottom Sheet"
        />
        <BottomSheet
          visible={visible}
          onBackButtonPress={toggleBottomNavigationView}
          onBackdropPress={toggleBottomNavigationView}
        >
          <View style={styles.bottomNavigationView}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  padding: 20,
                  fontSize: 20,
                }}>
                Share Using
              </Text>
              <View style={{flex: 1, flexDirection: 'row'}}></View>
              <View style={{flex: 1, flexDirection: 'row'}}></View>
            </View>
          </View>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
