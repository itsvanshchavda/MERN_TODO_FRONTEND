import { createContext, useState } from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: false,
    loader: false,
    setLoader: false,
    user: false,
    setUser: false
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loader, setLoader] = useState(false);
    const [user, setUser] = useState({});

    const values = {
        isAuthenticated,
        setIsAuthenticated,
        loader,
        setLoader,
        user,
        setUser
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
