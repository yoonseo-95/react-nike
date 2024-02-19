import { Outlet, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "./App.css";
import React, { useState } from "react";
import Header from "./pages/Header/Header";
import { AuthContextProvider } from "./components/context/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import Chat from "./pages/Chat/Chat";

function App() {
  const queryClient = new QueryClient();
  const [user, setUser] = useState();


  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ScrollToTop />
        <Chat />
        <Header user={user} setUser={setUser} />
        <Outlet />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
