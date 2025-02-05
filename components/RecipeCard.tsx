import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Recipe } from "@/state/recipesSlice";

type RecipeCardProps = {
    recipe: Recipe;
};

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
    return (
        <TouchableOpacity style={styles.card}>
            <Text style={styles.title}>{recipe.name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#88B7B5",
        margin: 10,
        padding: 10,
        borderRadius: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
});
