import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "./Button";

import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { RootState } from "@/state/store";
import { addComic } from "@/state/comicSlice";

export function ComicButtons() {
    const dispatch = useAppDispatch();
    const comic = useAppSelector((state: RootState) => state.comic.comic);
    const latestComic = useAppSelector(
        (state: RootState) => state.comic.latestComic
    );

    const fetchLatestComic = () => {
        const url = "https://xkcd.com" + "/info.0.json";
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    return;
                }
                return response.json();
            })
            .then((json) => {
                dispatch(addComic(json));
            })
            .catch((error) => console.error(error));
    };

    const fetchSpecificComic = (comicNumber: number) => {
        const url = "https://xkcd.com/" + comicNumber + "/info.0.json";
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    return;
                }
                return response.json();
            })
            .then((json) => {
                dispatch(addComic(json));
            })
            .catch((error) => console.error(error));
    };

    const fetchPreviousComic = () => {
        if (!comic) {
            return;
        }
        fetchSpecificComic(comic.num - 1);
    };

    const fetchNextComic = () => {
        if (
            !comic ||
            (typeof comic.num === "number" && comic.num === latestComic)
        ) {
            return;
        }
        fetchSpecificComic(comic.num + 1);
    };

    return (
        <View style={styles.container}>
            <Button
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
                title="Previous"
                onPress={fetchPreviousComic}
            />
            <Button
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
                title="Latest"
                onPress={fetchLatestComic}
            />
            <Button
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
                title="Next"
                onPress={fetchNextComic}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        height: "30%",
    },
    button: {
        width: "30%",
        height: 50,
        backgroundColor: "cyan",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 20,
        textAlign: "center",
    },
});
