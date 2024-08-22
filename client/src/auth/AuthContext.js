import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [state, setState] = useState({
        isAuthenticated: false,
        user: null,
        token: null,
    });

    const login = (token, user) => {
        console.log('login 함수 호출')
        setState({
            isAuthenticated: true,
            user,
            token,
        });
    };

    const logout = () => {
        setState({
            isAuthenticated: false,
            user: null,
            token: null,
        });
    };

    return (
        <AuthContext.Provider value={{ state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
