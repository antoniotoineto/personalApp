import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  Alert,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons'; // Ícones nativos do Expo

export default function SettingsScreen() {
  // Estados para armazenar os valores carregados
  const [salario, setSalario] = useState<string>('');
  const [beneficio, setBeneficio] = useState<string>('');

  // Estados para controle do Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [editingField, setEditingField] = useState<'salario' | 'beneficio' | null>(null);
  const [tempValue, setTempValue] = useState<string>('');

  // Carrega os dados do AsyncStorage ao abrir a tela
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedSalario = await AsyncStorage.getItem('@salario');
      const savedBeneficio = await AsyncStorage.getItem('@beneficio');
      if (savedSalario) setSalario(savedSalario);
      if (savedBeneficio) setBeneficio(savedBeneficio);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível carregar os dados.');
    }
  };

  // Salva o valor no AsyncStorage e atualiza o estado
  const handleSave = async () => {
    try {
      if (editingField === 'salario') {
        await AsyncStorage.setItem('@salario', tempValue);
        setSalario(tempValue);
      } else if (editingField === 'beneficio') {
        await AsyncStorage.setItem('@beneficio', tempValue);
        setBeneficio(tempValue);
      }
      setModalVisible(false);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
    }
  };

  // Abre o modal configurado para o campo correto
  const openModal = (field: 'salario' | 'beneficio', currentValue: string) => {
    setEditingField(field);
    setTempValue(currentValue);
    setModalVisible(true);
  };

  // Função simples para formatar exibição (Pode ser melhorada com máscaras reais depois)
  const formatDisplayValue = (val: string) => val ? `R$ ${val}` : 'R$ 0,00';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>RECEITAS</Text>
        </View>

        {/* Bloco: Salário */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Salário</Text>
            <TouchableOpacity onPress={() => openModal('salario', salario)}>
              <Feather name="edit-2" size={18} color="#757575" />
            </TouchableOpacity>
          </View>
          <View style={styles.valueBox}>
            <Text style={styles.valueText}>{formatDisplayValue(salario)}</Text>
          </View>
        </View>

        {/* Bloco: Benefício */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Benefício</Text>
            <TouchableOpacity onPress={() => openModal('beneficio', beneficio)}>
              <Feather name="edit-2" size={18} color="#757575" />
            </TouchableOpacity>
          </View>
          <View style={styles.valueBox}>
            <Text style={styles.valueText}>{formatDisplayValue(beneficio)}</Text>
          </View>
        </View>

        {/* Bloco: Receita Avulsa (Placeholder para Atividade 4) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Receita avulsa</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Adicionar +</Text>
          </TouchableOpacity>
        </View>

        {/* Bloco: Extrato */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Extrato</Text>
          <View style={styles.extratoBox}>
            <Text style={styles.extratoItem}>Adiantamento - R$ XX - 15/05/26 ⏳</Text>
            <Text style={styles.extratoItem}>Salário + Benefício - R$ XX - 29/04/26 ✅</Text>
            <Text style={styles.extratoItem}>Entrada avulsa - R$ XX - 20/04/26 ✅</Text>
          </View>
        </View>

      </ScrollView>

      {/* MODAL DE EDIÇÃO */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <Text style={styles.modalTitle}>
              {editingField === 'salario' ? 'Salário' : 'Benefício'}
            </Text>
            
            <Text style={styles.modalSubtitle}>
              Valor do {editingField === 'salario' ? 'Salário' : 'Benefício'} <Text style={styles.highlightText}>Líquido:</Text>
            </Text>

            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              value={tempValue}
              onChangeText={setTempValue}
              placeholder="Ex: 3500.00"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]} 
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

// Estilos baseados no protótipo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 15,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginRight: 10,
  },
  valueBox: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BDBDBD',
  },
  valueText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#424242',
  },
  addButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#BDBDBD',
  },
  addButtonText: {
    fontSize: 14,
    color: '#424242',
    fontWeight: '500',
  },
  extratoBox: {
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 12,
  },
  extratoItem: {
    fontSize: 12,
    color: '#424242',
    marginBottom: 8,
  },

  // Estilos do Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
  },
  highlightText: {
    color: '#D32F2F', // Vermelho para destacar a palavra "Líquido" como no protótipo
    fontWeight: 'bold',
  },
  modalInput: {
    width: '100%',
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 8,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#BDBDBD',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#BDBDBD',
  },
  saveButton: {
    backgroundColor: '#2196F3', // Azul do protótipo
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
});