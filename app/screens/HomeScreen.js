import React from 'react';
import { AuthContext } from '../../App';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { StyleSheet, Text, TouchableOpacity, View, Platform, StatusBar, Image } from 'react-native';

const HomeScreen = () => {
  const [user, setUser] = React.useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email: {user?.email}</Text>
      <Text>ID: {user?.uid}</Text>
      <Image style={styles.tinyLogo} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}></Image>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
