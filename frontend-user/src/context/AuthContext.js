import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  return (
    <AuthContext.Provider
      value={{
        credentials,
        setCredentials,
        user,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}