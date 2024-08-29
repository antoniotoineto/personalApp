import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';

interface MainValuesProps {
    title: string;
    getValue: () => number;
    setValue: (value: number) => void;
    titleColor: string;
  }

export default function MainValuesScreen ({
    title,
    getValue,
    setValue,
    titleColor
}: MainValuesProps)  {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(getValue().toString());
  
  
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
    
    const toggleNegativeSign = () => {
      if (inputValue.startsWith('-')) {
        setInputValue(inputValue.slice(1));
      } else {
        setInputValue('-' + inputValue); 
      }
    };
  
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                
                <View style={[styles.titleContainer, {backgroundColor: titleColor}]}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.componentContainer}>
                    <View style={styles.valueContainer}>
                        {isEditing ? (
                            <View style={styles.inputContainer}>
                                <TouchableOpacity onPress={() => toggleNegativeSign()}>
                                    <Text style={styles.minusButton}>-</Text>
                                </TouchableOpacity>
                                <TextInput
                                style={styles.input}
                                value={inputValue}
                                onChangeText={setInputValue}
                                keyboardType="numeric"
                                />
                            </View>
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
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 70
    },
    titleContainer: {
        padding: 20,
        borderRadius: 20,
        borderWidth: 1
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 50,
        fontWeight: 'bold',
    },
    componentContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    editButton: {
        marginLeft: 30,
        backgroundColor: '#dedede',
        padding: 8,
        borderRadius: 50,
    },
    confirmOrCancelButton: {
        marginLeft: 30,
        backgroundColor: '#dedede',
        padding: 8,
        borderRadius: 50,
    },
    confirmButtonsContainer: {
        flexDirection: 'row',
        marginRight: 30,
        paddingTop: 10
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingStart: 40
    },
    minusButton: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 10,
    },
    input: {
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 1,
        width: '71%',
        paddingHorizontal: 10,
        fontSize: 40,
    },
    
});

  
