import React, { createContext, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  loader: false,
  setLoader: () => {},
  user: {},
  setUser: () => {}
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({});

  const contextValues = {
    isAuthenticated,
    setIsAuthenticated,
    loader,
    setLoader,
    user,
    setUser
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
