import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* 1. Seção de Indicação do Mês */}
        <View style={styles.monthSection}>
          <View style={styles.monthBadge}>
            {/* Você pode deixar estático por enquanto ou trazer a data real via JS depois */}
            <Text style={styles.monthText}>Maio</Text>
          </View>
        </View>

        {/* 2. Seção do Dashboard (Gráfico) */}
        <View style={styles.dashboardSection}>
          <View style={styles.chartPlaceholder}>
            {/* Aqui entrará o componente de gráfico real depois */}
            <Text style={styles.placeholderText}>[ Gráfico de Pizza ]</Text>
          </View>
        </View>

        {/* 3. Seção de Ações Rápidas (3 Botões) */}
        <View style={styles.actionsSection}>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Receitas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.actionButtonCenter]}>
            <Text style={styles.actionButtonText}>Aportes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Despesas</Text>
          </TouchableOpacity>

        </View>

        {/* 4. Seção de Histórico de Valores Livres/Despesas */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Histórico Recente</Text>
          <View style={styles.historyListPlaceholder}>
            <Text style={styles.placeholderText}>Nenhuma transação recente para exibir.</Text>
            <Text style={styles.placeholderSubText}>(A área de histórico ficará aqui)</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  // Estilos da Seção do Mês Atual
  monthSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  monthBadge: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  monthText: {
    fontSize: 16,
    color: '#424242',
    fontWeight: '600',
    textTransform: 'capitalize',
  },

  // Estilos da Seção do Dashboard
  dashboardSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  chartPlaceholder: {
    width: '100%',
    height: 220,
    backgroundColor: '#FFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  // Estilos das Ações Rápidas (3 botões em linha)
  actionsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  actionButton: {
    flex: 1,
    height: 80,
    backgroundColor: '#FFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 2,
  },
  actionButtonCenter: {
    // Estilo opcional para destacar o botão central se quiser
    // backgroundColor: '#E0F7FA', // Exemplo: azul claro
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 5,
  },

  // Estilos do Histórico
  historySection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  historyListPlaceholder: {
    width: '100%',
    minHeight: 200,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  placeholderText: {
    color: '#757575',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  placeholderSubText: {
    color: '#9E9E9E',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
});