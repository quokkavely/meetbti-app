import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [state, setState] = useState({
        isAuthenticated: false,
        email: null,
        token: null,
        memberId: null
    });

    const login = (token, email, memberId) => {
        console.log('login 함수 호출')
        setState({
            isAuthenticated: true,
            email,
            token,
            memberId,
        });
    };

    const logout = () => {
        setState({
            isAuthenticated: false,
            email: null,
            token: null,
            memberId: null,
        });
    };

    return (
        <AuthContext.Provider value={{ state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
