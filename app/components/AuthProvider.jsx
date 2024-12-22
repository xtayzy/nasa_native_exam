import React, { useState, useEffect, createContext, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Registration} from "./Registration";  // Импортируем компонент регистрации
import { ActivityIndicator } from "react-native";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [isRegistered, setIsRegistered] = useState(null);

    useEffect(() => {
        const checkRegistrationStatus = async () => {
            const user = await AsyncStorage.getItem("user")
            if (user) {
                setIsRegistered(true)
            } else {
                setIsRegistered(false)
            }
        };
        checkRegistrationStatus();
    }, [])

    const login = async (userData) => {
        await AsyncStorage.setItem("user", JSON.stringify(userData));
        setIsRegistered(true);
    }

    const logout = async () => {
        await AsyncStorage.removeItem("user");
        setIsRegistered(false);
    }

    if (isRegistered === null) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <AuthContext.Provider value={{ isRegistered, login, logout }}>
            {isRegistered ? children : <Registration />}
        </AuthContext.Provider>
    )
}
