import React from "react";
import { StyleSheet } from "react-native";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { ThemedView } from "@/components/ThemedView";
import IngredientsForm from "@/components/FormElements/Ingredients";
import TitleForm from "@/components/FormElements/Title";
import MethodForm from "@/components/FormElements/Method";
import { Button } from "@/components/Button";
import {
    Recipe,
    addRecipe,
    addName,
    addMethod,
    clearIngredients,
} from "@/state/recipesSlice";

export default function RecipeForm() {
    const dispatch = useAppDispatch();
    const title = useAppSelector((state) => state.recipes.name);
    const ingredients = useAppSelector((state) => state.recipes.ingredients);
    const method = useAppSelector((state) => state.recipes.method);

    const onSubmit = () => {
        const recipe: Recipe = {
            name: title,
            ingredients,
            method,
        };
        dispatch(addRecipe(recipe));
        dispatch(addName(""));
        dispatch(clearIngredients());
        dispatch(addMethod(""));
    };

    return (
        <ThemedView>
            <TitleForm />
            <IngredientsForm />
            <MethodForm />
            <Button
                title="Add Recipe"
                buttonStyle={styles.button}
                onPress={() => {
                    onSubmit();
                }}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    button: {
        width: "60%",
        alignSelf: "center",
        backgroundColor: "lightgrey",
        margin: 10,
        borderWidth: 5,
        borderColor: "lightgrey",
        borderRadius: 5,
    },
});
