import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Main_Top_rotare = () => {
  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.top}>
          <View style={styles.box_avtar}>
            <Image
              style={styles.avater_rotare}
              source={require('../../../img/img/aaa.jpg')}></Image>
            <Text style={{alignSelf: 'center'}}>Nguyên </Text>
          </View>
          <View style={styles.box_avtar}>
            <Image
              style={styles.avater_rotare}
              source={require('../../../img/img/aaa.jpg')}></Image>
            <Text style={{alignSelf: 'center'}}>Thái </Text>
          </View>
          <View style={styles.box_avtar}>
            <Image
              style={styles.avater_rotare}
              source={require('../../../img/img/aaa.jpg')}></Image>
            <Text style={{alignSelf: 'center'}}>NHung </Text>
          </View>
          <View style={styles.box_avtar}>
            <Image
              style={styles.avater_rotare}
              source={require('../../../img/img/aaa.jpg')}></Image>
            <Text style={{alignSelf: 'center'}}>Thảo ly </Text>
          </View>
          <View style={styles.box_avtar}>
            <Image
              style={styles.avater_rotare}
              source={require('../../../img/img/aaa.jpg')}></Image>
            <Text style={{alignSelf: 'center'}}>phong phong </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Main_Top_rotare;

const styles = StyleSheet.create({
  top: {
    width: '100%',
    height: 100,

    flexDirection: 'row',
  },
  box_avtar: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avater_rotare: {
    width: 60,
    height: 60,
    backgroundColor: 'pink',
    borderRadius: 50,
  },
});
