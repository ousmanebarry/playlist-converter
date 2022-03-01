import React from 'react';
import { View, Text, Image, StyleSheet, Platform, StatusBar, SafeAreaView, TextInput } from 'react-native';
import { auth, db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from '../components/Navbar';

function ProfileScreen() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [emailAddress, setEmailAddress] = React.useState('');

  React.useEffect(async () => {
    try {
      const docRef = doc(db, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFirstName(docSnap.data().firstName);
        setLastName(docSnap.data().lastName);
        setEmailAddress(docSnap.data().emailAddress);
      } else {
        throw 'This user does not exist';
      }
    } catch (error) {
      alert(error);
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <View style={styles.secondContainer}>
        <View style={styles.singleBox}>
          <TextInput value={firstName} style={styles.inputBox} editable={false} />
        </View>
        <View style={styles.singleBox}>
          <TextInput value={lastName} style={styles.inputBox} editable={false} />
        </View>
        <View style={styles.singleBox}>
          <TextInput value={emailAddress} style={styles.inputBox} editable={false} />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
  },
  secondContainer: {
    margin: 10,
  },
  inputBox: {
    backgroundColor: '#f2f2f2',
    color: '#000',
    fontSize: 20,
  },
  singleBox: {
    paddingBottom: 15,
  },
});
