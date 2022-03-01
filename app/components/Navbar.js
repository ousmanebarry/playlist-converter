import { StyleSheet, Text, SafeAreaView, Image } from 'react-native';
import React from 'react';

function Navbar() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Navbar</Text>
    </SafeAreaView>
  );
}

export default Navbar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 15,
  },
});
