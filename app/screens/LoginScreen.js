import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native';
import { TextInput as T } from 'react-native-paper';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const navigation = useNavigation();

  const handleRedirect = () => {
    navigation.replace('Signup');
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.code);
      if (error.code == 'auth/invalid-email') {
        setEmailError(true);
      } else if (error.code == 'auth/wrong-password') {
        setPasswordError(true);
      } else if (error.code == 'auth/user-not-found') {
        setEmailError(true);
        setPasswordError(true);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <View style={styles.inputContainer}>
        <T
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
        <T
          mode='outlined'
          label='Password *'
          activeOutlineColor='#0782F9'
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          error={passwordError}
          onFocus={() => setPasswordError(false)}
          textContentType='password'
          autoComplete='password'
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRedirect}>
          <Text style={styles.buttonOutlineText}>Don't have an account? Sign up!</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;

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
    height: 55,
    // paddingHorizontal: 15,
    // paddingVertical: 10,
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
  errorMsg: {
    color: '#FF0000',
    fontWeight: '700',
  },
});
