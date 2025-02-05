import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { ThemedText } from "@/components/ThemedText";
import { addMethod } from "@/state/recipesSlice";

export default function MethodForm() {
    const dispatch = useAppDispatch();
    const method = useAppSelector((state) => state.recipes.method);

    return (
        <>
            <ThemedText type="subtitle">Method:</ThemedText>
            <TextInput
                style={styles.methodInput}
                placeholderTextColor="#666"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                value={method}
                onChangeText={(text) => dispatch(addMethod(text))}
            />
        </>
    );
}

const styles = StyleSheet.create({
    methodInput: {
        height: 200,
        width: "90%",
        margin: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "lightgrey",
        padding: 10,
    },
});
