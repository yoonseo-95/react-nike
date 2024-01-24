import React, { createContext, useContext, useMemo, useState } from 'react';

export const BestSellersContext = createContext({
  bestSellers: [],
  setBestSellers: () => { },
})

export const BestSellersProvider = ({ children }) => {
  const [bestSellers, setBestSellers] = useState([]);

  const contextValue = useMemo(() => ({
    bestSellers,
    setBestSellers
  }), [bestSellers]);

  return (
    <BestSellersContext.Provider value={contextValue}>
      {children}
    </BestSellersContext.Provider>
  )
}

export const useBestSellers = () => {
  return useContext(BestSellersContext);
}
export default BestSellersContext;