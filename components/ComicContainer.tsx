import React, { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
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

    const link = !comic ? null : "https://xkcd.com/" + comic.num + "/";

    return (
        <>
            {comic ? (
                <View style={styles.container}>
                    <ThemedText type="default">#{comic.num}</ThemedText>
                    <ThemedText type="default">{comic.title}</ThemedText>
                    <ComicPanel comic={comic} />
                    <ThemedText type="default">
                        Permanent link to this comic: {link}
                    </ThemedText>
                </View>
            ) : null}
            <ComicButtons />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        height: "80%",
    },
});
