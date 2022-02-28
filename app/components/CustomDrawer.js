import React from 'react';
import { StyleSheet, Image, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

function CustomDrawer({ props, hso, fn, ln, purl }) {
  return (
    <DrawerContentScrollView {...props}>
      <Text>
        {fn} {ln}
      </Text>
      <Image source={purl ? { uri: purl } : null} style={styles.tinyLogo} />
      <Text>{}</Text>
      <DrawerItemList {...props} />
      <DrawerItem
        label='Sign out'
        inactiveBackgroundColor='#0782F9'
        labelStyle={{
          fontWeight: '700',
          color: '#FFF',
        }}
        onPress={hso}
      />
    </DrawerContentScrollView>
  );
}

export default CustomDrawer;

const styles = StyleSheet.create({
  tinyLogo: {
    width: 40,
    height: 40,
  },
});
