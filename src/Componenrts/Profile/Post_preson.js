import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BottomSheet} from 'react-native-btr';
import {SEVER} from '../../Severs/index';
import Loading from '../Loading/Loading';

const Post_preson = ({item}) => {
  const nav = useNavigation();
  const [visible, setVisible] = useState(false);
  const [idnuber, setidnuber] = useState();
  const [txt, settxt] = useState('');
  const [img, setimg] = useState('');
  const [isl, setisl] = useState(false);
  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };
  //=========================================
  click_menu = item => {
    setidnuber(item.idbantin);
    settxt(item.noidungdang);
    setimg(item.hinhanh);
    toggleBottomNavigationView();
  };
  menu1 = () => {
    toggleBottomNavigationView();
    nav.navigate('Sửa bài viết', {
      params: {idbantin: idnuber, text: txt, img: img},
    });
  };
  menu2 = () => {
    console.log('ttt->', idnuber);
    Alert.alert('Xóa', 'Bạn có muốn xóa bài này không', [
      {
        text: 'Không',
      },
      {
        text: 'Có',
        onPress: () => {
          setisl(true);
          toggleBottomNavigationView();
          deletepost(idnuber);
        },
      },
    ]);
  };
  menu3 = () => {
    console.log(idnuber);
    toggleBottomNavigationView();
  };

  const deletepost = async idbaiviet => {
    let config = {
      method: 'post',

      url: SEVER.link_delete_satus,
      // url: 'https://61a5e3c48395690017be8ed2.mockapi.io/blogs/products',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        idbantin: idbaiviet,
      },
    };

    await axios(config)
      .then(function (response) {
        setisl(false);
        alert('Xóa thành công');
      })
      .catch(function (error) {
        // alert(error.message);
        console.log('-er--->', error.message);
        setisl(false);

        return;
      });
  };

  return (
    <View>
      <Loading load={isl}></Loading>
      <View style={styles.center_tastus}>
        <Text style={styles.center_text}>{item.noidungdang}</Text>
        {item.hinhanh === null
          ? false
          : true && (
              <Image
                style={styles.center_image}
                source={{uri: SEVER.link_img_main + item.hinhanh}}></Image>
            )}
      </View>
      <View style={styles.bottom}>
        <View style={styles.bottom_boxicon}>
          <Image
            style={styles.bottom_boxicon_icon}
            source={require('../../img/icon/heart.png')}></Image>
          <Text style={{paddingLeft: 5}}>6.3k</Text>
        </View>
        <View style={styles.bottom_boxicon}>
          <Image
            style={styles.bottom_boxicon_icon}
            source={require('../../img/icon/comment1.png')}></Image>
          <Text style={{paddingLeft: 5}}>5.3k</Text>
        </View>
        <View style={styles.bottom_boxicon}>
          <Image
            style={styles.bottom_boxicon_icon}
            source={require('../../img/icon/share1.png')}></Image>
          <Text style={{paddingLeft: 5}}>2.3k</Text>
        </View>
        {item.iduser === SEVER.ID_USER ? (
          <BottomSheet
            visible={visible}
            onBackButtonPress={toggleBottomNavigationView}
            onBackdropPress={toggleBottomNavigationView}>
            <View style={styles.bottomNavigationView}>
              <View style={styles.boxline}>
                <View style={styles.line}></View>
              </View>
              <View
                style={{
                  flex: 3,
                }}>
                <TouchableOpacity onPress={() => menu1()}>
                  <View style={styles.boxmenu1}>
                    <Text style={styles.text}>Sửa</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => menu2()}>
                  <View style={styles.boxmenu1}>
                    <Text style={styles.text}>Xóa</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => menu3()}>
                  <View style={styles.boxmenu1}>
                    <Text style={styles.text}>Spam</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheet>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
};

export default Post_preson;

const styles = StyleSheet.create({
  bottom: {
    width: '100%',
    height: 40,

    flexDirection: 'row',
  },
  bottom_boxicon: {
    width: '20%',
    height: '100%',

    alignItems: 'center',
    flexDirection: 'row',
  },
  bottom_boxicon_icon: {
    width: 25,
    height: 25,
  },
  center_image: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
  center_tastus: {
    width: '100%',
  },
  center_text: {
    width: '100%',
    maxHeight: 70,
    paddingBottom: 10,
  },
  bottomNavigationView: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: '100%',
    height: 250,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  boxline: {
    flex: 1,
    alignItems: 'center',
  },
  line: {
    marginTop: 15,
    width: 70,
    height: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  boxmenu1: {
    width: '100%',
    height: 50,

    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
});
