import React, { useState } from "react";
import { View, TextInput, ActivityIndicator, Text, StyleSheet } from "react-native"
import { useAuth } from "./AuthProvider"

export function Registration() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const { login } = useAuth();

    const handleRegistration = async () => {
        setLoading(true);
        if (username && password) {
            const userData = { username, password }
            await login(userData);
        } else {
            alert("Пожалуйста, заполните все поля.")
        }
        setLoading(false);
    };

    return (
        <View style={styles.registrationForm}>
            <TextInput
                style={styles.input}
                placeholder="Имя пользователя"
                placeholderTextColor="#8b949e"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry
                placeholderTextColor="#8b949e"
                value={password}
                onChangeText={setPassword}
            />
            <View style={styles.button} onTouchEnd={handleRegistration}>
                <Text style={styles.buttonText}>
                    Зарегистрироваться
                </Text>
            </View>
            {loading && <ActivityIndicator size="large" color="#58a6ff" />}
        </View>
    );
}

const styles = StyleSheet.create({
    registrationForm: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#0d1117",
    },
    input: {
        width: "80%",
        height: 50,
        borderColor: "#161b22",
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 15,
        borderRadius: 8,
        backgroundColor: "#161b22",
        color: "#f0f6fc",
        fontSize: 16,
    },
    button: {
        marginTop: 20,
        backgroundColor: "#161b22",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#f0f6fc",
        fontSize: 16,
        fontWeight: "bold",
    },
    loading: {
        marginTop: 20,
    },
});
