import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import MyFriends from './MyFriends/index.';
import SuggestFriends from './SuggestFriends';
import AddFriends from './AddFriends';
import PagerView from 'react-native-pager-view';

const Friends = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{paddingLeft: 10, paddingRight: 10}}>
        <View style={styles.box}>
          <View style={styles.box_left}>
            <Image
              style={styles.img}
              source={require('../../img/icon/arrow.png')}></Image>
          </View>
          <View style={styles.text_center}>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>Bạn bè</Text>
          </View>
          <View style={styles.box_right}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Tìm kiếm');
              }}>
              <Image
                style={styles.img}
                source={require('../../img/icon/search.png')}></Image>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <PagerView style={styles.pagerView} initialPage={0}>
        <View key="1">
          <View style={styles.box_menu}>
            <View style={styles.box_text}>
              <Text style={styles.text_menu}>Lời mời</Text>
            </View>
          </View>
          <AddFriends></AddFriends>
        </View>
        <View key="2">
          <View style={styles.box_menu}>
            <View style={styles.box_text}>
              <Text style={styles.text_menu}>Thêm bạn</Text>
            </View>
          </View>
          <SuggestFriends></SuggestFriends>
        </View>
        <View key="3">
          <View style={styles.box_menu}>
            <View style={styles.box_text}>
              <Text style={styles.text_menu}>Bạn bè</Text>
            </View>
          </View>
          <MyFriends></MyFriends>
        </View>
      </PagerView>
    </View>
  );
};

export default Friends;

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
  },
  box_left: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
  },
  img: {width: 30, height: 30},
  text_center: {
    width: '60%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box_right: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  box_menu: {flexDirection: 'row', justifyContent: 'space-between'},

  box_text: {
    width: '30%',
    height: 50,

    justifyContent: 'center',
    alignItems: 'center',
  },
  text_menu: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pagerView: {flex: 1},
});
