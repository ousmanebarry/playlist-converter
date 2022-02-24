import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import LoginScreen from './app/screens/LoginScreen';
import HomeScreen from './app/screens/HomeScreen';
import { auth } from './app/config/firebase';

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
