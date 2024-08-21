import React, { createContext, useState, useContext, ReactNode } from 'react';

interface InvestimentosContextProps {
  investimentos: number;
  setInvestimentos: (valor: number) => void;
}

const InvestimentosContext = createContext<InvestimentosContextProps | undefined>(undefined);

export const InvestimentosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [investimentos, setInvestimentos] = useState<number>(0);

  return (
    <InvestimentosContext.Provider value={{ investimentos, setInvestimentos }}>
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
