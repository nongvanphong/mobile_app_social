import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../color/color';

const Loading = ({load}) => {
  return (
    <View style={{zIndex: 3}}>
      {load && (
        <ActivityIndicator
          style={{position: 'absolute', alignSelf: 'center'}}
          size="large"
          color={COLORS.boxOrinal}
        />
      )}
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
