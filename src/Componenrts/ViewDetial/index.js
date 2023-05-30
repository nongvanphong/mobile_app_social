import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Profile from '../Profile/profile';
import {SEVER} from '../../Severs';

const ViewDetial = ({route}) => {
  const {item = {}} = route.params;
  console.log(item.avatar);
  return (
    <View style={{flex: 1}}>
      <Profile
        itemuri={SEVER.link_get_satus}
        itemname={item.name}
        itemid={item.id}
        itemavt={item.avt}></Profile>
    </View>
  );
};

export default ViewDetial;

const styles = StyleSheet.create({});
