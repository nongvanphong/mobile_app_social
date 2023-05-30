import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Settings,
} from 'react-native';
import React from 'react';
import PagerView from 'react-native-pager-view';
import Profile from './profile';
import Presonsetting from './Presensetting';
import {SEVER} from '../../Severs';

const Profiletapview = () => {
  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      <View key="1">
        <Profile
          itemuri={SEVER.link_get_satus}
          itemname={SEVER.NAME_USER}
          itemid={SEVER.ID_USER}
          itemavt={SEVER.AVT_USER}></Profile>
      </View>
      <View key="2">
        <Presonsetting></Presonsetting>
      </View>
    </PagerView>
  );
};

export default Profiletapview;

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
});
