import React, {useState} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function ExploreScreen() {
  const [custoDeVida, setCustoDeVida] = useState(0);
  const [valorInvestimento, setValorInvestimento] = useState(0);

  const valorLivre = 3355 - custoDeVida - valorInvestimento;

  return (
    <View style={styles.container}>
      <View style={styles.component}>
        <Text style={styles.title}>Custo de Vida Mensal</Text>
        <View style={styles.chevronRightContainer}>
          <Link href="/screens/CustoDeVidaScreen" style={styles.chevronRight}>
            <Icon name="chevron-right" size={30} color="#000" />
          </Link>
        </View>
      </View>
      <View style={styles.component}>
        <Text style={styles.title}>Valores para Investimentos</Text>
        <View style={styles.chevronRightContainer}>
          <Link href="/screens/InvestimentosScreen" style={styles.chevronRight}>
            <Icon name="chevron-right" size={30} color="#000" />
          </Link>
        </View>
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
    marginTop: 30,
  },
  chevronRightContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    marginTop: 50,
  },
  chevronRight: {
    padding: 10,
  },
});
