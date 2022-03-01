import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, SafeAreaView, Image } from 'react-native';

function Navbar({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Icon.Button
        name='navicon'
        size={35}
        color='#fff'
        borderRadius={0}
        iconStyle={{ marginHorizontal: 5 }}
        onPress={() => navigation.toggleDrawer()}
      />
    </SafeAreaView>
  );
}

export default Navbar;

const styles = StyleSheet.create({});
