import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PagerView from 'react-native-pager-view';

const Tapviewfriends = () => {
  return (
    <View style={{flex: 1}}>
      <Text>fhdghfhgh</Text>
      <PagerView style={styles.pagerView} initialPage={0}>
        <View key="1">
          <Text>djfhhjfdj</Text>
        </View>
        <View key="2">
          <Text>cài đặt</Text>
        </View>
      </PagerView>
    </View>
  );
};

export default Tapviewfriends;

const styles = StyleSheet.create({
  pagerView: {flex: 1},
});
