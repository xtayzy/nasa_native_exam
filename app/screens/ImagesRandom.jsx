import { Text, View, Image, ActivityIndicator, TextInput, FlatList, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import {ImageCard} from "../components/ImageCard";

export default function ImagesRandom() {
    const API_URL = "https://api.nasa.gov/planetary/apod";
    const API_KEY = "BOfnec8fE0INns1y1YOmq4QemXIcdXzCJLza93Ty";

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const getImageByDate = async (count) => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL, {
                params: {
                    api_key: API_KEY,
                    count: parseInt(count, 10),
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

    const OnSubmit = () => {
        if (inputValue) {
            getImageByDate(inputValue);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter number of images"
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.button} onPress={OnSubmit}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
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
                <Text style={styles.errorText}>No data (max data: 100)</Text>
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
    searchForm: {
        marginBottom: 30,
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 10,
        width: 200,
        textAlign: "center",
        marginRight: 10,
        borderRadius: 10,
        backgroundColor: "#161b22",
        color: "#ffffff",
    },
    button: {
        backgroundColor: "#1e2a47",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        height: 40,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
    },
    errorText: {
        fontSize: 16,
        color: "#ff7b72",
        textAlign: "center",
        marginTop: 20,
    },
});
