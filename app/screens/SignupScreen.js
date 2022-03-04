import React from 'react';
import { auth, db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import palette from '../../palette.json';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { TextInput as T } from 'react-native-paper';

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
      if (password == cPassword && firstName && lastName) {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;
        const userRef = doc(db, 'users', user.uid);

        await setDoc(userRef, {
          firstName,
          lastName,
          emailAddress: email,
          colourPalette: palette[Math.floor(Math.random() * palette.length)],
        });
      } else if (!firstName || !lastName) {
        throw 'Please fill in your first and last name';
      } else {
        throw 'Passwords do not match';
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <View style={styles.inputContainer}>
        <T
          mode='outlined'
          label='First Name *'
          activeOutlineColor='#0782F9'
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={styles.input}
          // textContentType='emailAddress'
          // autoComplete='email'
          // keyboardType='email-address'
        />
        <T
          mode='outlined'
          label='Last Name *'
          activeOutlineColor='#0782F9'
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          style={styles.input}
          // textContentType='emailAddress'
          // autoComplete='email'
          // keyboardType='email-address'
        />

        <T
          mode='outlined'
          label='Email address *'
          activeOutlineColor='#0782F9'
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          // error={emailError}
          // onFocus={() => setEmailError(false)}
          textContentType='emailAddress'
          autoComplete='email'
          keyboardType='email-address'
        />

        <T
          mode='outlined'
          label='Password *'
          activeOutlineColor='#0782F9'
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          // error={passwordError}
          clearTextOnFocus={true}
          onFocus={() => {
            // setPasswordError(false);
            Platform.OS == 'android' ? setPassword('') : null;
          }}
          textContentType='password'
          autoComplete='password'
          secureTextEntry
        />

        <T
          mode='outlined'
          label='Confirm Password *'
          activeOutlineColor='#0782F9'
          value={cPassword}
          onChangeText={(text) => setCPassword(text)}
          style={styles.input}
          // error={passwordError}
          clearTextOnFocus={true}
          onFocus={() => {
            // setPasswordError(false);
            Platform.OS == 'android' ? setCPassword('') : null;
          }}
          textContentType='password'
          autoComplete='password'
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
    // backgroundColor: 'white',
    // paddingHorizontal: 15,
    // paddingVertical: 10,
    // borderRadius: 10,
    // marginTop: 5,
    backgroundColor: 'white',
    height: 55,
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
