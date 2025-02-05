import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useAppSelector } from "@/state/hooks";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function RecipesScreen() {
    const recipes = useAppSelector((state) => state.recipes.recipes);

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
            headerImage={
                <Image
                    source={require("@/assets/images/recipeBook.png")}
                    style={styles.reactLogo}
                />
            }
        >
            <ThemedView style={styles.titleContainer}>
                {recipes && recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <>
                            <ThemedText type="title">{recipe.name}</ThemedText>

                            {recipe.ingredients.map((ingredient) => (
                                <Text>{ingredient}</Text>
                            ))}

                            <ThemedText type="subtitle">Method:</ThemedText>
                            <Text>{recipe.method}</Text>
                        </>
                    ))
                ) : (
                    <ThemedText type="title">No Recipes here!</ThemedText>
                )}
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    reactLogo: {
        height: "100%",
        width: "100%",
        bottom: 0,
        left: 0,
        position: "absolute",
    },
    titleContainer: {
        flexDirection: "column",
        gap: 8,
    },
});
