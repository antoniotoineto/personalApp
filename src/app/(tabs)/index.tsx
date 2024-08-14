import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import LottieView from 'lottie-react-native';

export default function HomeScreen() {
  // Obtém a data atual formatada
  const currentDate = format(new Date(), 'dd/MM/yyyy');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle Financeiro</Text>
      <Text style={styles.title}>Antônio Neto</Text>
      <Text style={styles.date}>{currentDate}</Text>
      <LottieView
        source={require('../../assets/gifs/LottieLego.json')} // Certifique-se de ter o arquivo JSON do Lottie no caminho correto
        autoPlay
        loop
        style={styles.animation}
      />
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  date: {
    fontSize: 18,
    marginBottom: 20,
  },
  animation: {
    width: 300,
    height: 300,
  },
});
