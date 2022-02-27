import 'react-native-gesture-handler';
import React from 'react';
import { LogBox } from 'react-native';
import { auth } from './app/config/firebase';
import HomeScreen from './app/screens/HomeScreen';
import { onAuthStateChanged } from 'firebase/auth';
import LoginScreen from './app/screens/LoginScreen';
import SignupScreen from './app/screens/SignupScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

LogBox.ignoreLogs(['Setting a timer', 'AsyncStorage has been extracted from react-native', 'Require cycle: App.js']);

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

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
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Signup' component={SignupScreen} />
        </Stack.Navigator>
      ) : (
        <AuthContext.Provider value={[user, setUser]}>
          <NavigationContainer independent>
            <Drawer.Navigator initialRouteName='Home'>
              <Drawer.Screen name='Home' component={HomeScreen} />
              <Drawer.Screen name='Profile' component={ProfileScreen} />
            </Drawer.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
      )}
    </NavigationContainer>
  );
}

export const AuthContext = React.createContext();
export default App;
