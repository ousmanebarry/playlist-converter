import 'react-native-gesture-handler';
import React from 'react';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './app/config/firebase';
import HomeScreen from './app/screens/HomeScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { LogBox, Alert } from 'react-native';
import LoginScreen from './app/screens/LoginScreen';
import SignupScreen from './app/screens/SignupScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import CustomDrawer from './app/components/CustomDrawer';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

LogBox.ignoreLogs(['Setting a timer', 'AsyncStorage has been extracted from react-native']);

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [colourPalette, setColourPalette] = React.useState('');

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

  React.useEffect(async () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser(user);
        const setInfo = async () => {
          try {
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              setFirstName(docSnap.data().firstName);
              setLastName(docSnap.data().lastName);
              setColourPalette(docSnap.data().colourPalette);
            }
          } catch (error) {
            console.log(error);
          }
        };
        setInfo();
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
            screenOptions={{ headerShown: false }}
            drawerContent={(props) => (
              <CustomDrawer props={props} hso={handleSignOut} fn={firstName} ln={lastName} cp={colourPalette} />
            )}
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
