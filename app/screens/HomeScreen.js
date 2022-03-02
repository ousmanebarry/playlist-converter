import React from 'react';
import { auth } from '../config/firebase';
import Navbar from '../components/Navbar';
import CustomCard from '../components/CustomCard';
import { Searchbar } from 'react-native-paper';
import { StyleSheet, Text, View, Platform, StatusBar, SafeAreaView, ScrollView } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const user = auth.currentUser;
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style={styles.main}>
      <SafeAreaView style={styles.container}>
        <Navbar navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <View style={styles.secondContainer}>
            <Searchbar placeholder='Search' onChangeText={onChangeSearch} value={searchQuery} />
            <CustomCard user={user} />
            <CustomCard user={user} />
            <CustomCard user={user} />
            <CustomCard user={user} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
  },
  secondContainer: {
    margin: 15,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
