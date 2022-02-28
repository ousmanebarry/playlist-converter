import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

function CustomDrawer({ props, hso, fn, ln, cp }) {
  const fln = encodeURIComponent(`${fn} ${ln}`).replace(/%20/g, '+');
  const purl = `https://ui-avatars.com/api/?name=${fln}&color=fff&background=${cp}&bold=true&rounded=true`;

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userInfo}>
        <Image source={{ uri: purl }} style={styles.profilePicture} />
        <Text style={styles.fullName}>{`${fn} ${ln}`}</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label='Sign out'
        inactiveBackgroundColor='#0782F9'
        onPress={hso}
        labelStyle={{
          fontWeight: '700',
          color: '#FFF',
        }}
      />
    </DrawerContentScrollView>
  );
}

export default CustomDrawer;

const styles = StyleSheet.create({
  profilePicture: {
    width: 40,
    height: 40,
  },
  fullName: {
    fontWeight: '700',
    fontSize: 20,
    paddingLeft: 10,
  },
  userInfo: {
    flexDirection: 'row',
    paddingBottom: 20,
    alignItems: 'center',
    paddingLeft: 10,
  },
});
