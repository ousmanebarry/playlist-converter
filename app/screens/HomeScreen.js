import React from 'react';
import { auth } from '../config/firebase';
import { StyleSheet, Text, View, Platform, StatusBar, Image } from 'react-native';

const HomeScreen = () => {
  const user = auth.currentUser;

  return (
    <View style={styles.container}>
      <Text>Email: {user?.email}</Text>
      <Text>ID: {user?.uid}</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
