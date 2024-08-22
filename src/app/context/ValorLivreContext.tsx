import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ValorLivreContextProps {
  valorLivre: number;
  setValorLivre: (valor: number) => void;
}

const ValorLivreContext = createContext<ValorLivreContextProps | undefined>(undefined);

export const ValorLivreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [valorLivre, setValorLivreState] = useState<number>(0);

  useEffect(() => {
    const loadValorLivre = async () => {
      try {
        const storedValorLivre = await AsyncStorage.getItem('@valorLivre');
        if (storedValorLivre !== null) {
          setValorLivreState(parseFloat(storedValorLivre));
        }
      } catch (e) {
        console.error("Erro ao carregar 'valor livre' do Armazenamento em Cache", e);
      }
    };

    loadValorLivre();
  }, []);

  const saveValorLivre = async (value: number) => {
    try {
      await AsyncStorage.setItem('@valorLivre', value.toString());
      setValorLivreState(value);
      console.log("'ValorLivre' salvo em memória cache!")
;    } catch (e) {
      console.error("Erro ao salvar investimentos no Armazenamento em Cache", e);
    }
  };

  return (
    <ValorLivreContext.Provider value={{ valorLivre, setValorLivre: saveValorLivre }}>
      {children}
    </ValorLivreContext.Provider>
  );
};

export const useValorLivre = (): ValorLivreContextProps => {
  const context = useContext(ValorLivreContext);
  if (!context) {
    throw new Error('useValorLivre must be used within a ValorLivreProvider');
  }
  return context;
};
