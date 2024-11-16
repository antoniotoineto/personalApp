import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useCustoDeVida } from '../context/CustoDeVidaContext';
import { useInvestimentos } from '../context/InvestimentosContext';
import { useValorLivre } from '../context/ValorLivreContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

export default function DebitoScreen() {
  const [debit, setDebit] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { custoDeVida, setCustoDeVida } = useCustoDeVida();
  const {investimentos, setInvestimentos} = useInvestimentos();
  const {valorLivre, setValorLivre} = useValorLivre();
  const [isLoading, setIsLoading] = useState(false); 
  const [isAdding, setIsAdding] = useState(false);

  const router = useRouter();
  const { context } = useLocalSearchParams();

  const saveHistory = async (key: string, debitValue: number) => {

    const newDebitEntry = { valor: debitValue, description: description};
    console.log(newDebitEntry);
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
    let debitValue = parseFloat(debitValueWithDot);

    if (!isAdding) {
      debitValue = -debitValue;
    }
    
    if (!isNaN(debitValue) && description !== '') {
      switch (context) {
        case 'custoDeVida':
          setCustoDeVida(custoDeVida + debitValue);
          saveHistory("@custoDeVidaHistory", debitValue);
          break;

        case 'investimentos':
          setInvestimentos(investimentos + debitValue);
          saveHistory("@investimentosHistory", debitValue);
          break;

        case 'valorLivre':
          setValorLivre(valorLivre + debitValue);
          saveHistory("@valorLivreHistory", debitValue);
          break;

        default:
          alert("Contexto desconhecido");
      }
      
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        router.push('/(tabs)/explore');
      }, 1500);  
    } else {
      Alert.alert("Por favor, preencha os campos.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.chevronLeft} onPress={() => router.back()}>
        <Icon name="chevron-left" size={30} color="#000" />
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="fade"
        visible={isLoading}
        onRequestClose={() => setIsLoading(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <LottieView
            source={require('../../assets/gifs/Check.json')} // Certifique-se de ter o arquivo JSON do Lottie no caminho correto
            autoPlay
            loop
            style={styles.animation}
          />
          </View>
        </View>
      </Modal>

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
      <View style={styles.checkboxContainer}>
        <TouchableOpacity 
          style={styles.checkboxItem}
          onPress={() => setIsAdding(true)}
        >
          <Ionicons
            name={isAdding ? "checkbox" : "square-outline"}
            size={24}
            color={isAdding ? "#4CAF50" : "gray"}
          />
          <Text style={styles.checkboxLabel}>Adicionar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.checkboxItem}
          onPress={() => setIsAdding(false)}
        >
          <Ionicons
            name={!isAdding ? "checkbox" : "square-outline"}
            size={24}
            color={!isAdding ? "#d9534f" : "gray"}
          />
          <Text style={styles.checkboxLabel}>Retirar</Text>
        </TouchableOpacity>
      </View>
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
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 18,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',  // Fundo translúcido
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 150,
    height: 150,
  },
});
