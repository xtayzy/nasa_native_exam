
import { Text, View, ActivityIndicator, TextInput, FlatList, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import {ImageCard} from "../components/ImageCard";


export default function ImagesByDate() {
    const API_URL = "https://api.nasa.gov/planetary/apod";
    const API_KEY = "BOfnec8fE0INns1y1YOmq4QemXIcdXzCJLza93Ty";

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [secondInputValue, setSecondInputValue] = useState("");

    const getImageByDate = async (start_date, end_date) => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL, {
                params: {
                    api_key: API_KEY,
                    start_date,
                    end_date,
                    thumbs: true,
                },
            });
            setData(response.data);
        } catch (error) {
            console.error(error);
            setData([]);
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

    const inputSecondChange = (text) => {
        const dateRegex = /^\d{0,4}-?\d{0,2}-?\d{0,2}$/;
        if (dateRegex.test(text)) {
            setSecondInputValue(text);
        }
    };

    useEffect(() => {
        if (inputValue.length === 10 && secondInputValue.length === 10) {
            getImageByDate(inputValue, secondInputValue);
        }
    }, [inputValue, secondInputValue]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.formWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="Start Date (YYYY-MM-DD)"
                    value={inputValue}
                    onChangeText={inputChange}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="End Date (YYYY-MM-DD)"
                    value={secondInputValue}
                    onChangeText={inputSecondChange}
                    keyboardType="numeric"
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : data.length > 0 ? (
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <ImageCard image={item} />}
                />
            ) : (
                <Text style={styles.errorText}>No data</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#0d1117",
    },
    formWrapper: {
        marginBottom: 30,
        alignItems: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 10,
        width: 250,
        textAlign: "center",
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: "#161b22",
        color: "#ffffff",
    },
    errorText: {
        fontSize: 16,
        color: "#ff7b72",
        textAlign: "center",
        marginTop: 20,
    },
});
