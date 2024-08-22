import React, {useState} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useCustoDeVida } from '../context/CustoDeVidaContext';
import { useInvestimentos } from '../context/InvestimentosContext';
import { useValorLivre } from '../context/ValorLivreContext';


export default function ExploreScreen() {
  const { custoDeVida } = useCustoDeVida();
  const { investimentos } = useInvestimentos();
  const { valorLivre } = useValorLivre();

  return (
    <View style={styles.container}>
      <View style={[styles.component, { backgroundColor: '#b6fce8' }]}>
        <Text style={styles.title}>Custo de Vida Mensal</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.componentValue}>R$ {custoDeVida.toFixed(2)}</Text>
          <Link href="/screens/CustoDeVidaScreen" style={styles.chevronRight}>
            <Icon name="chevron-right" size={30} color="#000" />
          </Link>
        </View>
      </View>
      <View style={[styles.component, { backgroundColor: '#f9fcb6' }]}>
        <Text style={styles.title}>Valores para Investimentos</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.componentValue}>R$ {investimentos.toFixed(2)}</Text>
          <Link href="/screens/InvestimentosScreen" style={styles.chevronRight}>
            <Icon name="chevron-right" size={30} color="#000" />
          </Link>
        </View>
      </View>
      <View style={[styles.component, { backgroundColor: '#fccdb6' }]}>
        <Text style={styles.title}>Valor Livre</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.componentValue}>R$ {valorLivre.toFixed(2)}</Text>
          <Link href="/screens/ValorLivreScreen" style={styles.chevronRight}>
            <Icon name="chevron-right" size={30} color="#000" />
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 30,
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
    borderColor: '#3e403f',
    borderWidth: 1.5,
    marginTop: 30,
  },
  componentValue : {
    fontSize: 40,
  },
  contentContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flex: 1,
    marginTop: 50,
  },
  chevronRight: {
    paddingTop: 10,
  },
});
