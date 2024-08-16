import React, {useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ExploreScreen() {
  const [custoDeVida, setCustoDeVida] = useState(0);
  const [valorInvestimento, setValorInvestimento] = useState(0);

  const valorLivre = 3355 - custoDeVida - valorInvestimento;

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.component}>
        <Text style={styles.title}>Custo de Vida Mensal</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CustoDeVida')}>
          <Icon name="chevron-right" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.component}>
        <Text style={styles.title}>Valores para Investimentos</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Investimento')}>
          <Icon name="chevron-right" size={30} color="#000" />
        </TouchableOpacity>
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
