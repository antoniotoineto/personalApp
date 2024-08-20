import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CustoDeVidaScreen() {

  return (
    <View style={styles.container}>
      <View style={styles.chevronLeftContainer}>
        <Link href='/(tabs)/explore'>
          <Icon name="chevron-left" size={30} color="#000" />
        </Link>
      </View>
      <Text style={styles.text}>Investimentos: a fazer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chevronLeftContainer: {
    position: 'absolute',
    top: 70, // Ajuste a distância do topo conforme necessário
    left: 30, // Ajuste a distância da esquerda conforme necessário

  }
});
