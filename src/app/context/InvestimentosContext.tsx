import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface InvestimentosContextProps {
  investimentos: number;
  setInvestimentos: (valor: number) => void;
}

const InvestimentosContext = createContext<InvestimentosContextProps | undefined>(undefined);

export const InvestimentosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [investimentos, setInvestimentosState] = useState<number>(0);

  useEffect(() => {
    const loadInvestimentos = async () => {
      try {
        const storedInvestimentos = await AsyncStorage.getItem('@investimentos');
        if (storedInvestimentos !== null) {
          setInvestimentosState(parseFloat(storedInvestimentos));
        }
      } catch (e) {
        console.error("Erro ao carregar 'investimentos' do Armazenamento em Cache", e);
      }
    };

    loadInvestimentos();
  }, []);

  const saveInvestimentos = async (value: number) => {
    try {
      await AsyncStorage.setItem('@investimentos', value.toString());
      setInvestimentosState(value);
      console.log("'Investimentos' salvo em memória cache!")
;    } catch (e) {
      console.error("Erro ao salvar 'investimentos' no Armazenamento em Cache", e);
    }
  };

  return (
    <InvestimentosContext.Provider value={{ investimentos, setInvestimentos: saveInvestimentos }}>
      {children}
    </InvestimentosContext.Provider>
  );
};

export const useInvestimentos = (): InvestimentosContextProps => {
  const context = useContext(InvestimentosContext);
  if (!context) {
    throw new Error('useInvestimentos must be used within a InvestimentosProvider');
  }
  return context;
};
