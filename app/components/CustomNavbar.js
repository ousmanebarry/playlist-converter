import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from 'react-native-paper';
import { StyleSheet, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';

function Navbar({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name='navicon' size={35} color='#0782F9' />
        </TouchableOpacity>
        <Text style={styles.text}>PlaylisTIFY</Text>
      </View>
    </SafeAreaView>
  );
}

export default Navbar;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    borderBottomColor: '#D8D4D4',
    borderBottomWidth: 1,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontSize: 50,
  },
  text: {
    marginLeft: 20,
    fontSize: 25,
    fontWeight: '700',
    justifyContent: 'center',
  },
});
