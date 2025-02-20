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

    // const toggleZoomButton = () => {
    //     dispatch(toggleZoom());
    // };

    const fetchLatest = () => {
        const url = "https://xkcd.com/info.0.json";
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

    const fetchFirstComic = () => {
        fetchSpecificComic(1);
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

    const fetchLatestComic = () => {
        fetchLatest();
    };

    const fetchRandomComic = () => {
        const number = Math.floor(Math.random() * latestComic) + 1;
        fetchSpecificComic(number);
    };

    return (
        <View style={styles.container}>
            <Button
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
                title="|<"
                onPress={fetchFirstComic}
            />
            <Button
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
                title="< Prev"
                onPress={fetchPreviousComic}
            />
            <Button
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
                title="Random"
                onPress={fetchRandomComic}
            />
            <Button
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
                title="Next >"
                onPress={fetchNextComic}
            />
            <Button
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
                title=">|"
                onPress={fetchLatestComic}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "10%",
    },
    button: {
        // width: "25%",
        paddingLeft: 7,
        paddingRight: 7,
        height: 35,
        backgroundColor: "#6B7089",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "black",
    },
    buttonText: {
        fontFamily: "Lucida",
        fontVariant: ["small-caps"],
        fontWeight: "bold",
        fontSize: 25,
        textAlign: "center",
        color: "white",
    },
});
