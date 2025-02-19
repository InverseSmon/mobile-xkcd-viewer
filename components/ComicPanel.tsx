import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { Comic } from "@/state/comicSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";

export const ComicPanel: React.FC<{ comic: Comic }> = ({ comic }) => {
    const zoom = useAppSelector((state) => state.comic.zoom);

    return (
        <>
            {zoom ? (
                <ScrollView>
                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        maximumZoomScale={3}
                        minimumZoomScale={1}
                        horizontal={true}
                    >
                        <Image
                            source={{ uri: comic.img }}
                            alt={comic.alt}
                            style={styles.zoomedImage}
                        />
                    </ScrollView>
                </ScrollView>
            ) : (
                <View style={styles.container}>
                    <Image
                        source={{ uri: comic.img }}
                        alt={comic.alt}
                        style={styles.image}
                    />
                </View>
            )}
        </>
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
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    // zoomedImage: {
    //     height: 1000,
    //     overflowX: "scroll",
    //     overflowY: "scroll",
    //     aspectRatio: 1,
    //     resizeMode: "contain",
    // },
    zoomedImage: {
        width: 900,
        height: 900,
        resizeMode: "contain",
    },
});
