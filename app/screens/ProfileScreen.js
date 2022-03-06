import React from 'react';
import { View, Image, StyleSheet, Platform, StatusBar, SafeAreaView, TextInput } from 'react-native';
import { auth, db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import CustomNavbar from '../components/CustomNavbar';
import { Text } from 'react-native-paper';

function ProfileScreen({ navigation }) {
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
    <View style={styles.main}>
      <SafeAreaView style={styles.container}>
        <CustomNavbar navigation={navigation} />
        <View style={styles.secondContainer}>
          <View style={styles.singleBox}>
            <Text style={styles.inputBox}>{firstName}</Text>
          </View>
          <View style={styles.singleBox}>
            <Text style={styles.inputBox}>{lastName}</Text>
          </View>
          <View style={styles.singleBox}>
            <Text style={styles.inputBox}>{emailAddress}</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: '#fff',
    marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
  },
  secondContainer: {
    margin: 15,
  },
  inputBox: {
    color: '#000',
    fontSize: 20,
  },
  singleBox: {
    paddingBottom: 15,
  },
});
