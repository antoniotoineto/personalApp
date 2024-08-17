import React, {useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Button } from 'react-native';
import { useNavigation  } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RootStackParamList } from '../App';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import App from '../App';

type ExploreScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Explore'>;

export default function ExploreScreen({navigation}: any) {
  const [custoDeVida, setCustoDeVida] = useState(0);
  const [valorInvestimento, setValorInvestimento] = useState(0);

  const valorLivre = 3355 - custoDeVida - valorInvestimento;

  //const navigation = useNavigation<ExploreScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.component}>
        <Text style={styles.title}>Custo de Vida Mensal</Text>
        {/* <TouchableOpacity style={styles.chevronRight} onPress={() => navigation.navigate('CustoDeVida')}>
          <Icon name="chevron-right" size={30} color="#000" />
        </TouchableOpacity> */}
        <Button title = 'Ver mais' onPress={() => navigation.navigate("CustoDeVida")}/>
      </View>
      <View style={styles.component}>
        <Text style={styles.title}>Valores para Investimentos</Text>
        <TouchableOpacity style={styles.chevronRight} onPress={() => navigation.navigate("Investimento")}>
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
  chevronRight: {
    marginTop: 50,
    alignItems: 'flex-end',
    padding: 10,

  },
});
