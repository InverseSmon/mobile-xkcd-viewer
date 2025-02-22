import React, { useRef } from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { ThemedText } from "./ThemedText";
import { Comic } from "@/state/comicSlice";
import { ComicPanel } from "./ComicPanel";
import { Button } from "./Button";
import { ComicButtons } from "./ComicButtons";

import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { RootState } from "@/state/store";
import { addComic } from "@/state/comicSlice";

export function ComicContainer() {
    const comic = useAppSelector((state: RootState) => state.comic.comic);
    const dispatch = useAppDispatch();

    return (
        <>
            {comic ? (
                <View style={styles.container}>
                    <Text style={styles.subtitle}>
                        #{comic.num} {comic.title}
                    </Text>
                    <ComicPanel comic={comic} />
                    <ComicButtons />
                </View>
            ) : null}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        height: "0%",
        width: "100%",
    },
    subtitle: {
        fontFamily: "Lucida",
        fontVariant: ["small-caps"],
        fontWeight: "bold",
        fontSize: 25,
        margin: 5,
    },
    link: {
        fontFamily: "Lucida",
        fontVariant: ["small-caps"],
        fontWeight: "bold",
        fontSize: 20,
        color: "blue",
        textDecorationLine: "underline",
    },
});
