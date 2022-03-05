import React from 'react';
import { auth, db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import palette from '../../palette.json';
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

function SignupScreen() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [cPassword, setCPassword] = React.useState('');

  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [lastNameError, setLastNameError] = React.useState(false);

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
        throw { code: 'auth/invalid-first-last-name' };
      } else {
        throw { code: 'auth/password-do-not-match' };
      }
    } catch (error) {
      if (error.code == 'auth/invalid-first-last-name') {
        setFirstNameError(true);
        setLastNameError(true);
      } else if (error.code == 'auth/invalid-email') {
        setEmailError(true);
      } else if (error.code == 'auth/password-do-not-match') {
        setPasswordError(true);
      } else {
        setEmailError(true);
        setPasswordError(true);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <View style={styles.inputContainer}>
        <TextInput
          mode='outlined'
          label='First Name *'
          activeOutlineColor='#0782F9'
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={styles.input}
          textContentType='givenName'
          autoComplete='name-given'
          error={firstNameError}
          onFocus={() => setFirstNameError(false)}
        />
        <TextInput
          mode='outlined'
          label='Last Name *'
          activeOutlineColor='#0782F9'
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          style={styles.input}
          textContentType='familyName'
          autoComplete='name-family'
          error={lastNameError}
          onFocus={() => setLastNameError(false)}
        />

        <TextInput
          mode='outlined'
          label='Email address *'
          activeOutlineColor='#0782F9'
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          error={emailError}
          onFocus={() => setEmailError(false)}
          textContentType='emailAddress'
          autoComplete='email'
          keyboardType='email-address'
        />

        <TextInput
          mode='outlined'
          label='Password *'
          activeOutlineColor='#0782F9'
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          error={passwordError}
          clearTextOnFocus={true}
          onFocus={() => {
            setPasswordError(false);
            Platform.OS == 'android' ? setPassword('') : null;
          }}
          textContentType='password'
          autoComplete='password'
          secureTextEntry
        />

        <TextInput
          mode='outlined'
          label='Confirm Password *'
          activeOutlineColor='#0782F9'
          value={cPassword}
          onChangeText={(text) => setCPassword(text)}
          style={styles.input}
          error={passwordError}
          clearTextOnFocus={true}
          onFocus={() => {
            setPasswordError(false);
            Platform.OS == 'android' ? setCPassword('') : null;
          }}
          textContentType='password'
          autoComplete='password'
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode='contained'
          onPress={handleSignUp}
          contentStyle={styles.logoutBtnStyle}
          disabled={password && cPassword && firstName && lastName && email ? false : true}
          style={
            password && cPassword && firstName && lastName && email
              ? { backgroundColor: '#0782F9' }
              : { backgroundColor: '#D8D4D4' }
          }
        >
          Sign Up
        </Button>
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
    height: 45,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  buttonOutlineText: {
    paddingTop: 30,
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  logoutBtnStyle: {
    width: 200,
    height: 50,
  },
});
