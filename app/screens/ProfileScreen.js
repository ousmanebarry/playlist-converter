import React from 'react';
import { View, Text } from 'react-native';
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
        console.log('No such document!');
      }
    } catch (error) {
      alert(error);
    }
  });

  return (
    <View>
      <Text>First name : {firstName}</Text>
      <Text>Last name : {lastName}</Text>
      <Text>Email address : {emailAddress}</Text>
    </View>
  );
}

export default ProfileScreen;
