import React from 'react';
import { useValorLivre } from '../context/ValorLivreContext';
import { View, StyleSheet } from 'react-native';
import { useCustoDeVida } from '../context/CustoDeVidaContext';
import { useInvestimentos } from '../context/InvestimentosContext';
import MainValuesScreen from '@/components/MainValues';


const ValoresScreen = () => {
  const { valorLivre, setValorLivre } = useValorLivre();
  const {custoDeVida, setCustoDeVida} = useCustoDeVida();
  const {investimentos, setInvestimentos} = useInvestimentos();

  return (
    <View style={styles.container}>
        <MainValuesScreen
            title='Custo de Vida'
            getValue={() => custoDeVida}
            setValue={setCustoDeVida}
            titleColor='#b6fce8'
        />

        <MainValuesScreen
            title='Investimentos'
            getValue={() => investimentos}
            setValue={setInvestimentos}
            titleColor='#f9fcb6'
        />

        <MainValuesScreen
            title='Valor Livre'
            getValue={() => valorLivre}
            setValue={setValorLivre}
            titleColor='#fccdb6'
        />
    </View>
  );
};

export default ValoresScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
  });
  