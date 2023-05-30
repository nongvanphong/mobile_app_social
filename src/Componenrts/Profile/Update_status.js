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
import Loading from '../Loading/Loading';

const Update_status = ({route}) => {
  const {params = {}} = route.params;

  const [bs64, setbs64] = useState(params.img);
  const [txt1, settxt] = useState(params.text);
  const [uri1, seturi] = useState('');
  const [isl, setisl] = useState(false);

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
        // console.log('type => ', response.assets[0].type);
        //console.log('fileName => ', response.assets[0].fileName);

        let source2 = response.assets[0].base64;
        // console.log('base64 => ', source2);
        setbs64(source2);
        seturi(source2);
        console.log(response.assets[0].uri);
      }
    });
  };
  const dangbai = async () => {
    if (uri1 === '' && txt1 === '' && bs64 === '') {
      console.log('không duocj đăng');
    } else {
      setisl(true);
      if (uri1 === '') {
        let config = {
          method: 'POST',
          url: SEVER.link_update_satus,
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            idbantin: params.idbantin,
            txt: txt1,
            img: '',
          },
        };
        setisl(false);
        alert('Đăng bài thành công');
        await axios(config)
          .then(function (response) {
            setisl(false);
            alert('Đăng bài thành công');
          })
          .catch(function (error) {
            setisl(false);
            alert('Lỗi đăng bài');
            console.log('-er--->', error.message);
          });
      } else {
        let config = {
          method: 'POST',
          url: SEVER.link_update_satus,
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            idbantin: params.idbantin,
            txt: txt1,
            img: bs64,
          },
        };
        await axios(config)
          .then(function (response) {
            setisl(false);

            alert('Đăng bài thành công');
          })
          .catch(function (error) {
            setisl(false);
            alert('Lỗi đăng bài');
            console.log('-er--->', error.message);
          });
      }
    }
  };
  return (
    <ScrollView>
      <View style={{paddingLeft: 10, paddingRight: 10}}>
        <Loading load={isl}></Loading>
        <View style={styles.top}>
          <Image
            style={styles.image}
            source={{uri: SEVER.link_img_main + SEVER.AVT_USER}}></Image>
          <Text style={styles.text}>{SEVER.NAME_USER}</Text>
        </View>
        <View style={styles.center_tastus}>
          <TextInput
            defaultValue={txt1}
            onChangeText={settxt}
            style={styles.center_text}
            multiline
            numberOfLines={1}
            maxLength={300}></TextInput>

          {uri1 !== '' ? (
            <Image
              style={styles.center_image}
              source={{
                uri: 'data:image/jpeg;base64,' + uri1,
                // uri: bs64,
              }}></Image>
          ) : (
            <Image
              style={styles.center_image}
              source={{
                //uri: 'data:image/jpg;base64,' + bs64,
                uri: SEVER.link_img_main + bs64,
              }}></Image>
          )}
        </View>
        <TouchableOpacity onPress={() => pickimg()} style={styles.choosimg}>
          <Image
            style={styles.imgicon}
            source={require('../../img/icon/camera.png')}></Image>

          <Text style={styles.txt}>Ảnh</Text>
        </TouchableOpacity>
        <View style={styles.choosimg}>
          <Image
            style={styles.imgicon}
            source={require('../../img/icon/tag.png')}></Image>

          <Text style={styles.txt}>Gắn thẻ</Text>
        </View>
        <View style={styles.choosimg}>
          <Image
            style={styles.imgicon}
            source={require('../../img/icon/location.png')}></Image>

          <Text style={styles.txt}>Thêm vị trí</Text>
        </View>
        <View style={styles.choosimg}>
          <Image
            style={styles.imgicon}
            source={require('../../img/icon/feeling.png')}></Image>

          <Text style={styles.txt}>Cảm xúc</Text>
        </View>
        <View style={styles.choosimg}>
          <Image
            style={styles.imgicon}
            source={require('../../img/icon/video.png')}></Image>

          <Text style={styles.txt}>Phát trực tiếp</Text>
        </View>

        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => dangbai()}>
            <Text style={styles.textpush}>Cập nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Update_status;

const styles = StyleSheet.create({
  top: {
    width: '100%',
    height: 70,

    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,

    borderRadius: 50,
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
