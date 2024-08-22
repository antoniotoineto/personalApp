import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router'; // useSearchParams para pegar o contexto passado
import { useCustoDeVida } from '../context/CustoDeVidaContext';
import { useInvestimentos } from '../context/InvestimentosContext';
import { useValorLivre } from '../context/ValorLivreContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DebitoScreen() {
  const [debit, setDebit] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { custoDeVida, setCustoDeVida } = useCustoDeVida();
  const {investimentos, setInvestimentos} = useInvestimentos();
  const {valorLivre, setValorLivre} = useValorLivre();

  const router = useRouter();
  const { context } = useLocalSearchParams();

  const saveHistory = async (key: string, debitValue: number) => {

    const newDebitEntry = { valor: debitValue, description };
    try {
      const storedHistory = await AsyncStorage.getItem(key);
      const history = storedHistory ? JSON.parse(storedHistory) : [];
      history.push(newDebitEntry);
      await AsyncStorage.setItem(key, JSON.stringify(history));
      console.log("Dados do débito salvos em cache.");
    } catch (e) {
      console.error('Erro ao salvar no histórico:', e);
    }

  } 

  const handleConfirm = async () => {
    const debitValueWithDot = debit.replace(',', '.');
    const debitValue = parseFloat(debitValueWithDot);
    
    if (!isNaN(debitValue) && debitValue > 0) {
      switch (context) {
        case 'custoDeVida':
          setCustoDeVida(custoDeVida - debitValue);
          saveHistory("@custoDeVidaHistory", debitValue);
          break;

        case 'investimentos':
          setInvestimentos(investimentos - debitValue);
          saveHistory("@investimentosHistory", debitValue);
          break;

        case 'valorLivre':
          setValorLivre(valorLivre - debitValue);
          saveHistory("@valorLivreHistory", debitValue);
          break;

        default:
          alert("Contexto desconhecido");
      }
      
      router.push('/(tabs)/explore');  // Volta para a tela anterior
    } else {
      Alert.alert("Por favor, insira um valor válido.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.chevronLeft} onPress={() => router.back()}>
        <Icon name="chevron-left" size={30} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Registrar Débito</Text>
      <TextInput
        placeholder="Valor a ser debitado"
        placeholderTextColor="#999999"
        keyboardType="numeric"
        value={debit}
        onChangeText={setDebit}
        style={styles.input}
      />
      <TextInput
        placeholder="Descrição do débito"
        placeholderTextColor="#999999"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: 100
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chevronLeft: {
    position: 'absolute',
    left: 30, 
    top: 80
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    width: '80%',
    padding: 10,
    fontSize: 18,
    marginBottom: 20,
    backgroundColor: '#dbdbdb'
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
