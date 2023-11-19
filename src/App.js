import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "./App.css";
import Header from "./pages/Header/Header";
import { useEffect, useState } from "react";
import { login, logout, onUserStateChange } from "../src/api/firebase";
import { AuthContextProvider } from "./components/context/AuthContext";


function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  }, []);

  const handleLogin = () => {
    login();
  };
  const handleLogout = () => {
    logout();
  };

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Header user={user} handleLogout={handleLogout} />
        <Outlet context={{ handleLogin }} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
