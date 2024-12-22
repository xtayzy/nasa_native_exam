import {Text, View, Image, ActivityIndicator, StyleSheet, TextInput, ScrollView, Animated} from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import {ImageCard} from "../components/ImageCard";

export default function ImageByDate() {
    const API_URL = "https://api.nasa.gov/planetary/apod";
    const API_KEY = "BOfnec8fE0INns1y1YOmq4QemXIcdXzCJLza93Ty";

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const getImageByDate = async (date) => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL, {
                params: {
                    api_key: API_KEY,
                    date,
                    thumbs: true,
                },
            });
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching image by date:", error);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    const inputChange = (text) => {
        const dateRegex = /^\d{0,4}-?\d{0,2}-?\d{0,2}$/;

        if (dateRegex.test(text)) {
            setInputValue(text);
        }
    };

    useEffect(() => {
        if (inputValue.length === 10) {
            getImageByDate(inputValue);
        }
    }, [inputValue]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={inputValue}
                onChangeText={inputChange}
                keyboardType="numeric"
            />

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : data ? (
                <Animated.ScrollView>
                    <ImageCard image={data} />
                </Animated.ScrollView>
            ) : (
                <Text style={styles.errorText}>No data</Text>
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
    input: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 10,
        width: 200,
        textAlign: "center",
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: "#161b22",
        color: "#ffffff",
    },
    image: {
        width: "100%",
        height: 300,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#58a6ff",
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "#f0f6fc",
        marginBottom: 10,
    },
    explanation: {
        fontSize: 16,
        textAlign: "center",
        lineHeight: 24,
        color: "#8b949e",
    },
    errorText: {
        fontSize: 16,
        textAlign: "center",
        color: "#ff7b72",
        marginTop: 20,
    },
});
