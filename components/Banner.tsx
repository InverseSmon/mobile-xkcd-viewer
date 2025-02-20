import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function Banner() {
    return (
        <View style={styles.banner}>
            <Text style={styles.logoText}>xkcd</Text>
            <Text style={styles.bannerText}> Viewer</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    banner: {
        width: "100%",
        backgroundColor: "#6B7089",
        paddingLeft: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginBottom: 10,
    },
    logoText: {
        fontSize: 30,
        color: "white",
        fontFamily: "Lucida",
        fontWeight: "bold",
    },
    bannerText: {
        fontSize: 30,
        color: "white",
        fontFamily: "Lucida",
        fontWeight: "bold",
        fontVariant: ["small-caps"],
    },
});
