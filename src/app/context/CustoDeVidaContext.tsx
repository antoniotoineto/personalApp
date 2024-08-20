import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CustoDeVidaContextProps {
  custoDeVida: number;
  setCustoDeVida: (valor: number) => void;
}

const CustoDeVidaContext = createContext<CustoDeVidaContextProps | undefined>(undefined);

export const CustoDeVidaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [custoDeVida, setCustoDeVida] = useState<number>(0);

  return (
    <CustoDeVidaContext.Provider value={{ custoDeVida, setCustoDeVida }}>
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
