import React from 'react';
import FinancialScreen from './FinancialScreen';
import { useValorLivre } from '../context/ValorLivreContext';

const ValorLivreScreen = () => {
  const { valorLivre, setValorLivre } = useValorLivre();

  return (
    <FinancialScreen
      title="    Valor Livre"
      debitContext="valorLivre"
      getValue={() => valorLivre}
      setValue={setValorLivre}
      historyKey='@valorLivreHistory'
      titleColor='#fccdb6'
      buttonColor='#fccdb6'
    />
  );
};

export default ValorLivreScreen;
