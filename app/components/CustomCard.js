import { StyleSheet, Text, View } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import React from 'react';

function CustomCard() {
  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );
}

export default CustomCard;

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
  },
});
