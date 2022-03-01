import React from 'react';
import { auth } from '../config/firebase';
import { StyleSheet, Text, View, Platform, StatusBar, Image, SafeAreaView } from 'react-native';

const HomeScreen = () => {
  const user = auth.currentUser;

  return (
    <SafeAreaView style={styles.container}>
      <Text>Email: {user?.email}</Text>
      <Text>ID: {user?.uid}</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginTop: Platform.OS == 'android' ? StatusBar.currentHeight + 10 : 0,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
