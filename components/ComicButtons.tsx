import React from "react";
import { Text, Linking, View, StyleSheet, TextInput } from "react-native";
import { Button } from "./Button";

import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { RootState } from "@/state/store";
import { addComic, setComicNumberInput } from "@/state/comicSlice";

export function ComicButtons() {
    const dispatch = useAppDispatch();
    const comic = useAppSelector((state: RootState) => state.comic.comic);
    const latestComic = useAppSelector(
        (state: RootState) => state.comic.latestComic
    );

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
        <View style={styles.bundle}>
            {comic ? (
                <Text
                    style={styles.link}
                    onPress={() =>
                        Linking.openURL("https://xkcd.com/" + comic.num + "/")
                    }
                >
                    Link to Comic
                </Text>
            ) : null}
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
            <NumberInput />
        </View>
    );
}

export function NumberInput() {
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

    const number = useAppSelector(
        (state: RootState) => state.comic.comicNumberInput
    );
    const dispatch = useAppDispatch();

    const handleNumberChange = (text: string) => {
        const cleanedValue = text.replace(/[^0-9]/g, "");

        dispatch(setComicNumberInput(cleanedValue));
        console.log(number);
    };

    return (
        <View style={styles.specificComic}>
            <Text style={styles.pickComicText}>Pick Comic by number:</Text>
            <TextInput
                keyboardType="numeric"
                style={styles.numberInput}
                onChangeText={handleNumberChange}
                value={number}
                onSubmitEditing={() => {
                    fetchSpecificComic(parseInt(number));
                }}
            />
            <Button
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
                title="Find"
                onPress={() => {
                    fetchSpecificComic(parseInt(number));
                }}
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
        marginBottom: "5%",
    },
    bundle: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
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
        fontSize: 20,
        textAlign: "center",
        color: "white",
    },
    link: {
        fontFamily: "Lucida",
        fontVariant: ["small-caps"],
        fontWeight: "bold",
        fontSize: 20,
        color: "blue",
        textDecorationLine: "underline",
        marginBottom: "5%",
    },
    specificComic: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // marginBottom: "10%",
    },
    pickComicText: {
        fontFamily: "Lucida",
        fontVariant: ["small-caps"],
        fontWeight: "bold",
        fontSize: 20,
        width: 120,
    },
    numberInput: {
        height: 40,
        width: 50,
        borderColor: "gray",
        borderWidth: 1,
        margin: 5,
        marginBottom: 0,
    },
});
