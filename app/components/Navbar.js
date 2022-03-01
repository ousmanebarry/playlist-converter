import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';

function Navbar({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <Icon name='navicon' size={40} color='#0782F9' onPress={() => navigation.toggleDrawer()} />
        <Text>This is a test</Text>
      </View>
    </SafeAreaView>
  );
}

export default Navbar;

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontSize: 50,
  },
});
