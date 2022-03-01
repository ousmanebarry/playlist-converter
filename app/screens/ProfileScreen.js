import React from 'react';
import { View, Text, Image, StyleSheet, Platform, StatusBar, SafeAreaView } from 'react-native';
import { auth, db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { TextInput } from 'react-native-paper';

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
      <View style={styles.singleBox}>
        <TextInput label='First name' value={firstName} style={styles.inputBox} disabled />
      </View>
      <View style={styles.singleBox}>
        <TextInput label='Last name' value={lastName} style={styles.inputBox} disabled />
      </View>
      <View style={styles.singleBox}>
        <TextInput label='Email address' value={emailAddress} style={styles.inputBox} disabled />
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginTop: Platform.OS == 'android' ? StatusBar.currentHeight + 10 : 0,
  },
  inputBox: {
    backgroundColor: '#f2f2f2',
    fontSize: 20,
  },
  singleBox: {
    paddingBottom: 15,
  },
});
