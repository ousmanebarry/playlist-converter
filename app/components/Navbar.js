import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';

function Navbar({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name='navicon' size={35} color='#0782F9' />
        </TouchableOpacity>
        <Text style={styles.text}>Playlist Converter</Text>
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
  text: {
    fontSize: 25,
    fontWeight: '700',
  },
});
