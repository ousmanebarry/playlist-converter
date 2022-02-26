import React from 'react';
import { LogBox } from 'react-native';
import { auth } from './app/config/firebase';
import HomeScreen from './app/screens/HomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import SignupScreen from './app/screens/SignupScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

LogBox.ignoreLogs(['Setting a timer', 'AsyncStorage has been extracted from react-native']);

const Stack = createNativeStackNavigator();

function App() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser(user);
      }
    });
    return unsubscribe;
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      {!user ? (
        <Stack.Navigator>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Signup' component={SignupScreen} />
        </Stack.Navigator>
      ) : (
        <AuthContext.Provider value={[user, setUser]}>
          <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen} />
          </Stack.Navigator>
        </AuthContext.Provider>
      )}
    </NavigationContainer>
  );
}

export const AuthContext = React.createContext();
export default App;
