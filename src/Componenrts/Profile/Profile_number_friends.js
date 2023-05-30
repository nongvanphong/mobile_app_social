import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Profile_number_friends = () => {
  return (
    <View style={{paddingLeft: 10, paddingRight: 10}}>
      <View style={styles.boxtxt}>
        <View style={styles.boxtximg}>
          <Text style={styles.txt}>8.809 </Text>
          <Image
            style={styles.img}
            source={require('../../img/icon/friend2.png')}></Image>
        </View>
        <View style={styles.boxtximg}>
          <Text style={styles.txt}>1.809 </Text>
          <Image
            style={styles.img}
            source={require('../../img/icon/friernd1.png')}></Image>
        </View>
      </View>

      <View style={styles.line}></View>
    </View>
  );
};

export default Profile_number_friends;

const styles = StyleSheet.create({
  boxtxt: {
    width: '100%',
    height: 70,

    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  boxtximg: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  txt: {
    paddingRight: 10,
    fontSize: 22,
    color: 'black',
  },
  line: {
    width: '70%',
    height: 3,
    borderRadius: 10,
    backgroundColor: 'gray',
    alignSelf: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
});
