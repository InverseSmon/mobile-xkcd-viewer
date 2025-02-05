import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { addName } from "@/state/recipesSlice";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function TitleForm() {
    const dispatch = useAppDispatch();
    const name = useAppSelector((state) => state.recipes.name);

    return (
        <>
            <ThemedText type="title">Add Recipe</ThemedText>
            <ThemedText type="subtitle">Name:</ThemedText>
            <View style={styles.nameView}>
                <TextInput
                    onChangeText={(text) => dispatch(addName(text))}
                    style={styles.nameInput}
                    value={name}
                    placeholder="Recipe name"
                    placeholderTextColor="#666"
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    nameView: {
        // margin: 20,
        display: "flex",
        flexDirection: "row",
    },
    nameInput: {
        height: 40,
        width: "70%",
        margin: 2,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "lightgrey",
        padding: 10,
    },
});
