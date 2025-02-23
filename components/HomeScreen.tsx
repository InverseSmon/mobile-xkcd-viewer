import { StyleSheet } from "react-native";

import React, { useEffect } from "react";
import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { RootState } from "@/state/store";
import { addComic, setLatestComic } from "@/state/comicSlice";
import { Banner } from "@/components/Banner";
import { ComicContainer } from "@/components/ComicContainer";

export default function HomeScreen() {
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
            <Banner />
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
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        marginTop: 24,
    },
    title: {
        fontFamily: "XkcdScript",
        fontSize: 42,
    },
});
