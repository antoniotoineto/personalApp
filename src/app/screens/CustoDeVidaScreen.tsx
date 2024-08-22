import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Button, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useCustoDeVida } from '../context/CustoDeVidaContext';

export default function CustoDeVidaScreen() {

  const { custoDeVida, setCustoDeVida } = useCustoDeVida();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(custoDeVida.toString());

  const handleSave = () => {
    Alert.alert("Tem certeza que deseja editar o 'Custo de Vida'?", "", [
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
            setCustoDeVida(value);
            setIsEditing(false);
          }
      },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Link href="/(tabs)/explore" style={styles.chevronLeft}>
          <Icon name="chevron-left" size={30} color="#000" />
        </Link>
        <Text style={styles.text}>Custo de Vida</Text>
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
            <Text style={styles.value}>{custoDeVida.toFixed(2)}</Text>
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
      <View style={styles.addDebit}>
        <Link href={{ pathname: "/screens/DebitoScreen", params: { context: 'custoDeVida' } }}>
          <Text style={styles.debitText}>Adicionar débito</Text>
        </Link>
      </View>
      <Text style={styles.titleHistory}>Histórico</Text>
      <View style={styles.history}>
        <ScrollView>

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
  titleContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    top: '8%',
    backgroundColor: '#b6fce8',
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
    top: '25%',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'center',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',  // Isso ajuda a manter o alinhamento no centro
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
    backgroundColor: '#dcfaf8',
    padding: 25,
    borderRadius: 30,
    marginTop: 60,
    borderWidth: 1.2,
  },
  debitText:{
    fontSize: 18,
    fontWeight: 'bold',
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
  titleHistory: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingStart: 50,
    paddingTop: 50
  },

});
