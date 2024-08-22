import React from 'react';
import FinancialScreen from './FinancialScreen';
import { useCustoDeVida } from '../context/CustoDeVidaContext';

const CustoDeVidaScreen = () => {
  const { custoDeVida, setCustoDeVida } = useCustoDeVida();

  return (
    <FinancialScreen
      title="Custo de Vida"
      debitContext="custoDeVida"
      getValue={() => custoDeVida}
      setValue={setCustoDeVida}
      historyKey='@custoDeVidaHistory'
      titleColor='#b6fce8'
      buttonColor='#dcfaf8'
    />
  );
};

export default CustoDeVidaScreen;
