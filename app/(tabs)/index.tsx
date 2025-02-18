import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/Button";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { RootState, AppDispatch } from "@/state/store";
import { addComic, setLatestComic } from "@/state/comicSlice";
import { ComicPanel } from "@/components/ComicPanel";
import { ComicContainer } from "@/components/ComicContainer";

export default function HomeScreen() {
    const comic = useAppSelector((state: RootState) => state.comic.comic);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchComic = async () => {
            try {
                const response = await fetch("https://xkcd.com/info.0.json");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                dispatch(addComic(data));
                dispatch(setLatestComic(data.num));
            } catch (error) {
                console.error("Fetching comic failed:", error);
            }
        };

        fetchComic();
    }, [dispatch]);

    return (
        <View style={styles.main}>
            <ThemedText type="title">XKCD</ThemedText>
            <ComicContainer />
        </View>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: "100%",
        width: "100%",
        bottom: 0,
        left: 0,
        position: "absolute",
    },
    main: {
        paddingTop: 85,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
    },
});
