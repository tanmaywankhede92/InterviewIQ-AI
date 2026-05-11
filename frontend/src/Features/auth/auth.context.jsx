import { createContext, useState } from "react";
export const AuthContext = createContext();

import { UNSAFE_decodeViaTurboStream } from "react-router";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(UNSAFE_decodeViaTurboStream);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
