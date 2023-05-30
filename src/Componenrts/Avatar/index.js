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
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import {SEVER} from '../../Severs/index';
import {COLORS} from '../../color/color';
import {useNavigation} from '@react-navigation/native';

const Avatar = () => {
  const navigator = useNavigation();
  const [bs64, setbs64] = useState();
  const [avt, setavt] = useState(SEVER.AVT_USER);
  const [uri1, seturi] = useState('');

  pickimg = () => {
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
        let source2 = response.assets[0].base64;
        // console.log('base64 => ', source2);
        setbs64(source2);
        seturi(source2);
      }
    });
  };
  const dangbai = async () => {
    if (uri1 === '') {
      let config = {
        method: 'POST',
        url: SEVER.link_update_avatar,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          iduser: SEVER.ID_USER,
          img: '',
        },
      };

      await axios(config).then(function (response) {
        if (response.data.data == null) {
          alert('Thay avatar thành công');
          navigator.navigate('Profile');
        }
      });
    } else {
      let config = {
        method: 'POST',
        url: SEVER.link_update_avatar,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          iduser: SEVER.ID_USER,
          img: uri1,
        },
      };

      await axios(config).then(function (response) {
        if (response.data.data == null) {
          alert('Thay avatar thành công');
          navigator.navigate('Profile');
        }
      });
    }
  };
  return (
    <ScrollView>
      <View style={{paddingLeft: 10, paddingRight: 10}}>
        <View style={styles.top}>
          {uri1 !== '' ? (
            <Image
              style={styles.image}
              source={{
                uri: 'data:image/jpeg;base64,' + uri1,
                // uri: bs64,
              }}></Image>
          ) : avt != null ? (
            <Image
              style={styles.image}
              source={{
                uri: SEVER.link_img_main + avt,
              }}></Image>
          ) : (
            <Image
              style={styles.image}
              source={
                //uri: 'data:image/jpg;base64,' + bs64,
                require('../../img/icon/camera.png')
              }></Image>
          )}
        </View>

        <TouchableOpacity onPress={() => pickimg()} style={styles.choosimg}>
          <Image
            style={styles.imgicon}
            source={require('../../img/icon/camera.png')}></Image>

          <Text style={styles.txt}>Chọn Ảnh</Text>
        </TouchableOpacity>

        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => dangbai()}>
            <Text style={styles.textpush}>Cập nhập avatar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  top: {
    width: '100%',
    height: 250,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,

    borderRadius: 200,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  center_image: {
    top: 10,
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
  center_tastus: {
    width: '100%',
  },
  center_text: {
    width: '100%',
    Maxheight: 200,
    paddingBottom: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'gray',
  },
  touchableOpacity: {
    width: '50%',
    backgroundColor: '#FBB05E',
    alignItems: 'center',
    borderRadius: 10,
  },
  textpush: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
  },
  bottom: {
    paddingTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  choosimg: {
    top: 10,
    width: '100%',
    height: 50,

    flexDirection: 'row',
    alignItems: 'center',
  },
  imgicon: {
    height: 30,
    width: 30,
  },
  txt: {
    marginLeft: 10,
  },
});
