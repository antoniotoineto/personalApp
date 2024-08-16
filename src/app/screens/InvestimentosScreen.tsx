import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function InvestimentosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Investimentos: a fazer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
