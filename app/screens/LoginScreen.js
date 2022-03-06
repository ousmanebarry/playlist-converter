import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
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
      if (error.code == 'auth/invalid-email') {
        setEmailError(true);
      } else if (error.code == 'auth/wrong-password') {
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
        <HelperText type='error' visible={emailError}>
          This email is invalid or the user does not exist
        </HelperText>
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
        <HelperText type='error' visible={passwordError}>
          Wrong password, try again!
        </HelperText>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode='contained'
          onPress={handleLogin}
          contentStyle={styles.loginBtnStyle}
          disabled={email && password ? false : true}
          style={email && password ? { backgroundColor: '#0782F9' } : { backgroundColor: '#D8D4D4' }}
        >
          Sign In
        </Button>

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
    height: 45,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonOutlineText: {
    paddingTop: 30,
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  loginBtnStyle: {
    width: 200,
    height: 50,
  },
});
