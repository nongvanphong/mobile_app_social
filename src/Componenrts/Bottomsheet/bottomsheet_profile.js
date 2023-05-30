import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {BottomSheet} from 'react-native-btr';
const Bottomsheet_profile = () => {
  const [visible, setVisible] = useState(false);

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };
  return (
    <View>
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}>
        <View style={styles.bottomNavigationView}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                textAlign: 'center',
                padding: 20,
                fontSize: 20,
              }}>
              Share Using
            </Text>
            <View style={{flex: 1, flexDirection: 'row'}}></View>
            <View style={{flex: 1, flexDirection: 'row'}}></View>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default Bottomsheet_profile;

const styles = StyleSheet.create({
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
