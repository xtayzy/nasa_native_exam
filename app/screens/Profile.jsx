import React, {useState, useEffect} from "react";
import {View, Text, Button, StyleSheet, ActivityIndicator, TouchableOpacity} from "react-native";
import {useAuth} from "../components/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
    const {logout} = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await AsyncStorage.getItem("user");
            if (userData) {
                setUser(JSON.parse(userData));
            }
            setLoading(false);
        };
        fetchUserData();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#58a6ff"/>;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutText}>Выйти</Text>
            </TouchableOpacity>

            <View style={styles.profileContainer}>
                <Text style={styles.title}>Профиль</Text>
                <View style={styles.infoCont}>
                    <Text style={styles.infoTitle}>Имя пользователя:</Text>
                    <Text style={styles.info}>{user.username}</Text>
                </View>
                <View style={styles.infoCont}>
                    <Text style={styles.infoTitle}>Пароль:</Text>
                    <Text style={styles.info}>{user.password}</Text>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0d1117",
        padding: 20,
    },
    logoutButton: {
        position: "absolute",
        top: 20,
        right: 20,
        backgroundColor: "#ff6347",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    logoutText: {
        fontSize: 16,
        color: "#f0f6fc",
    },
    profileContainer: {
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: "#161b22",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "#f0f6fc",
        marginBottom: 20,
    },
    infoCont: {
        width: "100%",
        marginBottom: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 14
    },
    infoTitle: {
        fontSize: 18,
        color: "#8b949e",
        marginBottom: 5,
    },
    info: {
        fontSize: 18,
        color: "#e6e6e6",
        fontWeight: "500",
        textAlign: "center",
    },
    error: {
        fontSize: 18,
        color: "#ff7b72",
        marginTop: 20,
        textAlign: "center",
    },
});
