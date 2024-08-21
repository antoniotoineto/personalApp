import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useInvestimentos } from '../context/InvestimentosContext';

export default function InvestimentosScreen() {

  const { investimentos, setInvestimentos } = useInvestimentos();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(investimentos.toString());

  const handleSave = () => {
    Alert.alert("Tem certeza que deseja editar o 'Investimentos'?", "", [
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
            setInvestimentos(value);
            setIsEditing(false);
          }
      },
      },
    ]);

    
  };

  return (
    <View style={styles.container}>
      <View style={styles.chevronLeftContainer}>
        <Link href='/(tabs)/explore'>
          <Icon name="chevron-left" size={30} color="#000" />
        </Link>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.text}>Investimentos</Text>
      </View>
      <View style={styles.contentContainer}>
        {isEditing ? (
          <>
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType="numeric"
            />
            <View style={styles.confirmButtonsContainer}>
              <TouchableOpacity onPress={() => handleSave()} style={styles.confirmOrCancelButton}>
                <Icon name="check" size={20} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsEditing(false)} style={styles.confirmOrCancelButton}>
                <MaterialIcons name="cancel" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.displayContainer}>
            <Text style={styles.value}>{investimentos.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
              <Icon name="pencil" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        )}
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
  titleContainer: {
    position: 'absolute',
    top: '18%',
    backgroundColor: '#f9fcb6',
    padding: 30,
    paddingBottom: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  text: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  displayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '50%',
  },
  value: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  chevronLeftContainer: {
    position: 'absolute',
    top: 70, 
    left: 30, 
  },
  input: {
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    width: '60%',
    marginBottom: 20,
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
    alignItems: 'center',
    width: '90%',
  },
  confirmOrCancelButton: {
    marginLeft: 30,
    backgroundColor: '#dedede',
    padding: 8,
    borderRadius: 50,
  },
  confirmButtonsContainer: {
    flexDirection: 'row',
  },
});
