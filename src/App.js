import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "./App.css";
import React, { useState } from "react";
import Header from "./pages/Header/Header";
import { AuthContextProvider, useAuthContext } from "./components/context/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import { useRecoilValue } from "recoil";
import { searchQueryState } from "./recoil/RecoilAtoms";

function App() {
  const queryClient = new QueryClient();
  const [user, setUser] = useState();
  const value = useRecoilValue(searchQueryState)

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ScrollToTop />
        <Header user={user} setUser={setUser} />
        <Outlet state={value} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
