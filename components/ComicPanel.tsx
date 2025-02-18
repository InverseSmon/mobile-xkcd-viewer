import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Comic } from "@/state/comicSlice";

export const ComicPanel: React.FC<{ comic: Comic }> = ({ comic }) => {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: comic.img }}
                alt={comic.alt}
                style={styles.image}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "80%",
    },
    image: {
        width: "95%",
        aspectRatio: 1,
        resizeMode: "contain",
    },
});
