import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const SportsContext = createContext({
  sports: [],
  setSports: () => { },
})

export const SportsProvider = ({ children }) => {
  const [sports, setSports] = useState([]);

  const SportsContextValue = useMemo(() => ({
    sports,
    setSports
  }), [sports, setSports]);

  useEffect(() => {
    setSports([]);
  }, []);

  return (
    <SportsContext.Provider value={SportsContextValue}>
      {children}
    </SportsContext.Provider>
  )
}
export const useSports = () => {
  return useContext(SportsContext);
}
export default SportsContext;