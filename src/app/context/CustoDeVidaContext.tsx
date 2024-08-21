import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CustoDeVidaContextProps {
  custoDeVida: number;
  setCustoDeVida: (valor: number) => void;
}

const CustoDeVidaContext = createContext<CustoDeVidaContextProps | undefined>(undefined);

export const CustoDeVidaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [custoDeVida, setCustoDeVidaState] = useState<number>(0);

  useEffect(() => {
    const loadCustoDeVida = async () => {
      try {
        const storedCustoDeVida = await AsyncStorage.getItem('@custoDeVida');
        if (storedCustoDeVida !== null) {
          setCustoDeVidaState(parseFloat(storedCustoDeVida));
        }
      } catch (e) {
        console.error("Erro ao carregar 'custo de vida' do Armazenamento em Cache", e);
      }
    };

    loadCustoDeVida();
  }, []);

  const saveCustoDeVida = async (value: number) => {
    try {
      await AsyncStorage.setItem('@custoDeVida', value.toString());
      setCustoDeVidaState(value);
      console.log("'CustoDeVida' salvo em memória cache!")
;    } catch (e) {
      console.error("Erro ao salvar investimentos no Armazenamento em Cache", e);
    }
  };

  return (
    <CustoDeVidaContext.Provider value={{ custoDeVida, setCustoDeVida: saveCustoDeVida }}>
      {children}
    </CustoDeVidaContext.Provider>
  );
};

export const useCustoDeVida = (): CustoDeVidaContextProps => {
  const context = useContext(CustoDeVidaContext);
  if (!context) {
    throw new Error('useCustoDeVida must be used within a CustoDeVidaProvider');
  }
  return context;
};
