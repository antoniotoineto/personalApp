import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DebitoScreen() {
  return (
    <View style={styles.container}>
      <Text>Debito: A fazer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
  });
  
