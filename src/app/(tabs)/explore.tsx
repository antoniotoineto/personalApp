import React, {useState} from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function ExploreScreen() {
  const [custoDeVida, setCustoDeVida] = useState(0);
  const [valorInvestimento, setValorInvestimento] = useState(0);

  const valorLivre = 3355 - custoDeVida - valorInvestimento;

  return (
    <View style={styles.container}>
      <View style={styles.component}>
        <Text style={styles.title}>Custo de Vida Mensal</Text>
      </View>
      <View style={styles.component}>
        <Text style={styles.title}>Valores para Investimentos</Text>
      </View>
      <View style={styles.component}>
        <Text style={styles.title}>Valor livre</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
    margin: 20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
  },
  component: {
    width: '90%',
    height: '30%',
    backgroundColor: '#ddd',
    borderRadius: 10,
  },
});
