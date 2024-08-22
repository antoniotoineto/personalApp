import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router'; // useSearchParams para pegar o contexto passado
import { useCustoDeVida } from '../context/CustoDeVidaContext';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function DebitoScreen() {
  const [debit, setDebit] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');

  const router = useRouter();
  const { context } = useLocalSearchParams(); // Pegando o parâmetro de contexto
  const { custoDeVida, setCustoDeVida } = useCustoDeVida();  // Acessa o contexto do custo de vida

  const handleConfirm = () => {
    const debitValueWithDot = debit.replace(',', '.');
    const valorDebitado = parseFloat(debitValueWithDot);
    
    if (!isNaN(valorDebitado) && valorDebitado > 0) {
      switch (context) {
        case 'custoDeVida':
          setCustoDeVida(custoDeVida - valorDebitado);
          break;
        // Adicione aqui casos para outros contextos como 'investimentos' ou 'valorLivre'
        // case 'investimentos':
        //   setInvestimentos(investimentos - valorDebitado);
        //   break;
        // case 'valorLivre':
        //   setValorLivre(valorLivre - valorDebitado);
        //   break;
        default:
          alert("Contexto desconhecido");
      }
      
      router.back();  // Volta para a tela anterior
    } else {
      alert("Por favor, insira um valor válido.");
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
        value={descricao}
        onChangeText={setDescricao}
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
