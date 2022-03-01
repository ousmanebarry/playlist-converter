import React from 'react';
import { auth } from '../config/firebase';
import Navbar from '../components/Navbar';
import { StyleSheet, Text, View, Platform, StatusBar, Image, SafeAreaView } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const user = auth.currentUser;

  return (
    <View style={styles.main}>
      <SafeAreaView style={styles.container}>
        <Navbar navigation={navigation} />
        <View style={styles.secondContainer}>
          <Text>Email: {user?.email}</Text>
          <Text>ID: {user?.uid}</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
  },
  secondContainer: {
    margin: 15,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
