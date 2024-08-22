import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Button, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useCustoDeVida } from '../context/CustoDeVidaContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface HistoricoItem {
  valor: number;
  descricao: string;
}

interface FinancialScreenProps {
  title: string;
  debitContext: string;
  getValue: () => number;
  setValue: (value: number) => void;
  historyKey: string;
  titleColor: string;
  buttonColor: string;
}

export default function FinancialScreen({
  title,
  debitContext,
  getValue,
  setValue,
  historyKey,
  titleColor,
  buttonColor,
}: FinancialScreenProps) {

  const [history, setHistory] = useState<HistoricoItem[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(getValue().toString());

  const calculateTotal = () => {
    return history.reduce((total, item) => total + item.valor, 0);
  };

  useFocusEffect(
    React.useCallback(() => {
    const loadHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem(historyKey);
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory));
        }
      } catch (e) {
        console.error('Erro ao carregar o histórico:', e);
      }
    };
    setInputValue(getValue().toString());
    loadHistory();
  }, []));

  const handleSave = () => {
    Alert.alert("Editar item", `Tem certeza que deseja editar o ${title}?`, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => {
          const inputValueWithDot = inputValue.replace(',', '.');
          const value = parseFloat(inputValueWithDot);
          if (!isNaN(value)) {
            setValue(value);
            setIsEditing(false);
          }
      },
      },
    ]);
  };

  const handleDeleteItem = (index: number) => {
    Alert.alert(
      "Excluir item",
      "Tem certeza que deseja excluir este item do histórico?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: () => {
            const itemToDelete = history[index];
            if(itemToDelete){
              const newValue = getValue() + itemToDelete.valor;
              setValue(newValue);
              setInputValue(newValue.toString());
            }
            
            const updatedHistory = history.filter((_, i) => i !== index);
            setHistory(updatedHistory);

            AsyncStorage.setItem(historyKey, JSON.stringify(updatedHistory));
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}></View>
      <View style={[styles.titleContainer, {backgroundColor: titleColor}]}>
        <Link href="/(tabs)/explore" style={styles.chevronLeft}>
          <Icon name="chevron-left" size={30} color="#000" />
        </Link>
        <Text style={styles.text}>{title}</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.valueContainer}>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType="numeric"
            />
          ) : (
            <Text style={styles.value}>{getValue().toFixed(2)}</Text>
          )}

          {!isEditing && (
            <TouchableOpacity 
            onPress={() => setIsEditing(!isEditing)} 
            style={styles.editButton}
            >
            <Icon name={"pencil"} size={20} color="#000" />
          </TouchableOpacity>
          )}
          
        </View>

        {isEditing && (
          <View style={styles.confirmButtonsContainer}>
            <TouchableOpacity 
              onPress={() => handleSave()} 
              style={styles.confirmOrCancelButton}
            >
              <Icon name="check" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setIsEditing(false)} 
              style={styles.confirmOrCancelButton}
            >
              <MaterialIcons name="cancel" size={20} color="black" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={[styles.addDebit, {backgroundColor: buttonColor}]}>
        <Link href={{ pathname: "/screens/DebitoScreen", params: { context: debitContext} }}>
          <Text style={styles.debitText}>Adicionar débito</Text>
        </Link>
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.titleHistory}>Histórico</Text>
        <Text style={styles.totalSum}>Total: R$ {calculateTotal()}</Text>
      </View>
      <View style={styles.history}>
        <ScrollView>
          {history.slice().reverse().map((entry: any, index) => (
            <View key={index} style={styles.historyItem}>
              <Text style={styles.historyDescription}>{entry.description}</Text>
              <Text 
                style={[styles.historyValue,  
                      { color: debitContext === 'investimentos' ? 'green' : '#d9534f' }]}
                >{debitContext === 'investimentos' ? "+" : "-"} R${entry.valor.toFixed(2)}</Text>
              <TouchableOpacity onPress={() => handleDeleteItem(index)} style={styles.deleteButton}>
                <Icon name="trash" size={20} color="#979c98" />
              </TouchableOpacity>
            </View>
          ))}

        </ScrollView>
      </View>
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
  topBar: {
    position: 'absolute',
    top: '0%',
    height: 52,
    backgroundColor: 'black',
    width: '100%',
  },
  titleContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    top: '6%',
    padding: 30,
    paddingBottom: 10,
    width: '100%'
  },
  text: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: '20%'
  },
  value: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  chevronLeft: {
    position: 'absolute',
    left: 30, 
  },
  input: {
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    width: '60%',
    paddingHorizontal: 10,
    fontSize: 40,
  },
  editButton: {
    marginLeft: 30,
    backgroundColor: '#dedede',
    padding: 8,
    borderRadius: 50,
  },
  contentContainer: {
    position: 'absolute',
    top: '24%',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'center',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8, 
  },
  confirmOrCancelButton: {
    marginLeft: 30,
    backgroundColor: '#dedede',
    padding: 8,
    borderRadius: 50,
  },
  confirmButtonsContainer: {
    flexDirection: 'row',
    marginRight: 30
  },
  addDebit: {
    position: 'absolute',
    top: '31.5%',
    padding: 25,
    borderRadius: 30,
    marginTop: 60,
    borderWidth: 1.2,
  },
  debitText:{
    fontSize: 18,
    fontWeight: 'bold',
  },
  middleContainer:{
    flexDirection: 'row',
    width: '100%',
  },
  titleHistory: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingStart: 50,
    paddingTop: 50
  },
  totalSum: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    paddingTop: 50,
    marginLeft: '24%'
  },
  history: {
    position: 'absolute',
    top: '55%',
    backgroundColor: '#dbdbdb',
    width: '80%',
    height: 300,
    borderRadius: 15,
    padding: 15
  },
  historyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyDescription: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  historyValue: {
    fontSize: 16,
    color: '#d9534f', 
    fontWeight: 'bold',
  },
  deleteButton: {
    marginLeft: 10,
  },

});
