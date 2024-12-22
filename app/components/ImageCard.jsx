import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import Animated, {
    FadeIn,
    FadeOut,
} from "react-native-reanimated";

export function ImageCard({image}){
    return (
        <Animated.View style={styles.imageContainer} entering={FadeIn} exiting={FadeOut}>
            <Image source={{ uri: image.url }} style={styles.image} resizeMode="cover" />
            <Text style={styles.title}>{image.title}</Text>
            <Text style={styles.date}>{image.date}</Text>
            <Text style={styles.explanation}>{image.explanation}</Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        marginBottom: 20,
        alignItems: "center",
        padding: 15,
        backgroundColor: "#161b22",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
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
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "#f0f6fc",
        marginBottom: 10,
    },
    explanation: {
        fontSize: 14,
        textAlign: "center",
        color: "#8b949e",
        lineHeight: 20,
    },

    date: {
        fontSize: 14,
        textAlign: "center",
        color: "#58a6ff",
        marginBottom: 10,
    }
});
