import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { auth, db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

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
    <View style={styles.profile}>
      <View style={styles.singleBox}>
        <Text style={styles.title}>First name</Text>
        <Text style={styles.singleText}>{firstName}</Text>
      </View>
      <View style={styles.singleBox}>
        <Text style={styles.title}>Last name</Text>
        <Text style={styles.singleText}>{lastName}</Text>
      </View>
      <View style={styles.singleBox}>
        <Text style={styles.title}>Email address</Text>
        <Text style={styles.singleText}>{emailAddress}</Text>
      </View>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    backgroundColor: '#fff',
    fontSize: 25,
    padding: 10,
  },
  profile: {
    justifyContent: 'space-between',
  },
  singleBox: {
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  singleText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
  },
});
