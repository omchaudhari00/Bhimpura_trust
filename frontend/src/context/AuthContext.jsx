import { createContext, useContext, useMemo, useState } from "react";
import { api, isAdminLoggedIn, setToken } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(isAdminLoggedIn());

  const login = async (email, password) => {
    const data = await api.login(email, password);
    setToken(data.access);
    setLoggedIn(true);
  };

  const logout = () => {
    setToken(null);
    setLoggedIn(false);
  };

  const value = useMemo(
    () => ({ loggedIn, login, logout }),
    [loggedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
