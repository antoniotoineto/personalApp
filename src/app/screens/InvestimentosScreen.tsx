import React from 'react';
import FinancialScreen from './FinancialScreen';
import { useInvestimentos } from '../context/InvestimentosContext';

const CustoDeVidaScreen = () => {
  const { investimentos, setInvestimentos } = useInvestimentos();

  return (
    <FinancialScreen
      title="Investimentos"
      debitContext="investimentos"
      getValue={() => investimentos}
      setValue={setInvestimentos}
      historyKey='@investimentosHistory'
      titleColor='#f9fcb6'
      buttonColor='#f9fcb6'
    />
  );
};

export default CustoDeVidaScreen;
