import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

function SignupScreen() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [cPassword, setCPassword] = React.useState('');
  const navigation = useNavigation();

  const handleRedirect = () => {
    navigation.replace('Login');
  };

  const handleSignUp = async () => {
    try {
      if (password == cPassword) {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;
        const userRef = doc(db, 'users', userCredentials.user.uid);
        await setDoc(userRef, {
          firstName,
          lastName,
          email,
        });
        console.log('Registered with: ' + user.email);
      } else {
        throw 'Passwords do not match';
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='First Name *'
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={styles.input}
          maxLength={30}
        />
        <TextInput
          placeholder='Last Name *'
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          style={styles.input}
          maxLength={30}
        />
        <TextInput
          placeholder='Email *'
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType='email-address'
          style={styles.input}
        />
        <TextInput
          placeholder='Password *'
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder='Confirm Password *'
          value={cPassword}
          onChangeText={(text) => setCPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRedirect}>
          <Text style={styles.buttonOutlineText}>Already have an account? Sign in!</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    paddingTop: 30,
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
