import 'react-native-gesture-handler';
import React from 'react';
import { LogBox, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from './app/config/firebase';
import HomeScreen from './app/screens/HomeScreen';
import { onAuthStateChanged } from 'firebase/auth';
import LoginScreen from './app/screens/LoginScreen';
import SignupScreen from './app/screens/SignupScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

LogBox.ignoreLogs(['Setting a timer', 'AsyncStorage has been extracted from react-native']);

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const handleSignOut = () => {
    Alert.alert('Confirm Sign Out', 'Are you sure you want to sign out? You will be returned to the sign in screen.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'OK',
        onPress: async () => {
          try {
            await signOut(auth);
            setUser(null);
          } catch (error) {
            alert(error.message);
          }
        },
      },
    ]);
  };

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
        <NavigationContainer independent>
          <Drawer.Navigator
            initialRouteName='Home'
            drawerContent={(props) => {
              return (
                <DrawerContentScrollView {...props}>
                  <DrawerItemList {...props} />
                  <DrawerItem
                    label='Sign out'
                    inactiveBackgroundColor='#0782F9'
                    labelStyle={{
                      fontWeight: '700',
                      color: '#FFF',
                    }}
                    onPress={handleSignOut}
                  />
                </DrawerContentScrollView>
              );
            }}
          >
            <Drawer.Screen name='Home' component={HomeScreen} />
            <Drawer.Screen name='Profile' component={ProfileScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      )}
    </NavigationContainer>
  );
}

export default App;
