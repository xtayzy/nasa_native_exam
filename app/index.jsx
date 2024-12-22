import { View, ActivityIndicator, StyleSheet, Animated, Text } from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import {ImageCard} from "./components/ImageCard";

export default function Index() {
    const API_URL = "https://api.nasa.gov/planetary/apod";
    const API_KEY = "BOfnec8fE0INns1y1YOmq4QemXIcdXzCJLza93Ty";

    const [todayData, setTodayData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getTodayImage = async () => {
        try {
            const response = await axios.get(API_URL, {
                params: {
                    api_key: API_KEY,
                },
            });
            console.log(response.data);
            setTodayData(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getTodayImage();
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#58a6ff" />
            ) : todayData ? (
                <Animated.ScrollView>
                    <ImageCard image={todayData} />
                </Animated.ScrollView>
            ) : (
                <Text style={styles.errorText}>Failed to load data.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#0d1117",
    },
    errorText: {
        fontSize: 16,
        textAlign: "center",
        color: "#ff7b72",
        marginTop: 20,
    },
});
