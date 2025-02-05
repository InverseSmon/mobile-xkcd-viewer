import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { addIngredient, removeIngredient } from "@/state/recipesSlice";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { Dropdown } from "react-native-element-dropdown";

export function DisplayIngredients({ ingredients }: { ingredients: string[] }) {
    const dispatch = useAppDispatch();

    return (
        <View>
            {ingredients.map((ingredient: string, index: number) => (
                <View style={styles.ingredientListView} key={index}>
                    <Text style={styles.ingredientListItem}>{ingredient}</Text>
                    <Button
                        title="-"
                        onPress={() => dispatch(removeIngredient(ingredient))}
                        buttonStyle={styles.add}
                        textStyle={styles.addText}
                    />
                </View>
            ))}
        </View>
    );
}

export default function IngredientsForm() {
    const dispatch = useAppDispatch();
    const ingredients = useAppSelector((state) => state.recipes.ingredients);

    const [ingredientName, setIngredientName] = useState("");
    const [ingredientQuantity, setIngredientQuantity] = useState("");
    const [ingredientMeasurement, setIngredientMeasurement] = useState("");

    const renderLabel = () => {
        return <Text style={[styles.label, { color: "blue" }]}>Unit</Text>;
    };

    const measurements = [
        { label: "-", value: "-" },
        { label: "g", value: "g" },
        { label: "kg", value: "kg" },
        { label: "ml", value: "ml" },
        { label: "l", value: "l" },
        { label: "tsp", value: "tsp" },
        { label: "tbsp", value: "tbsp" },
        { label: "cup", value: "cup" },
        { label: "pint", value: "pint" },
        { label: "quart", value: "quart" },
        { label: "oz", value: "oz" },
        { label: "lb", value: "lb" },
        { label: "mg", value: "mg" },
    ];

    const saveIngredient = () => {
        ingredientMeasurement === "-"
            ? dispatch(addIngredient(`${ingredientName} ${ingredientQuantity}`))
            : dispatch(
                  addIngredient(
                      `${ingredientName} ${ingredientQuantity}${ingredientMeasurement}`
                  )
              );

        setIngredientName("");
        setIngredientQuantity("");
        setIngredientMeasurement("");
    };

    return (
        <>
            <ThemedText type="subtitle">Ingredients:</ThemedText>
            <DisplayIngredients ingredients={ingredients} />
            <View style={styles.nameView}>
                <TextInput
                    style={styles.ingredientInput}
                    value={ingredientName}
                    placeholderTextColor="#666"
                    onChangeText={(text) => setIngredientName(text)}
                />
                <TextInput
                    style={styles.ingredientQuantityInput}
                    value={ingredientQuantity}
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                    onChangeText={(text) => setIngredientQuantity(text)}
                />
                {renderLabel()}
                <Dropdown
                    style={styles.ingredientQuantityDropdown}
                    data={measurements}
                    labelField="label"
                    valueField="value"
                    placeholder="-"
                    value={ingredientMeasurement}
                    onChange={(item) => {
                        console.log(item.value);
                        setIngredientMeasurement(item.value);
                    }}
                />
                <Button
                    title="+"
                    onPress={saveIngredient}
                    buttonStyle={styles.add}
                    textStyle={styles.addText}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    nameView: {
        display: "flex",
        flexDirection: "row",
    },
    ingredientListView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 5,
        width: "50%",
        height: 42,
    },
    ingredientListItem: {
        alignSelf: "center",
        fontSize: 16,
        width: "70%",
        margin: 5,
    },
    ingredientInput: {
        height: 42,
        width: "40%",
        margin: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "lightgrey",
        padding: 10,
    },
    ingredientQuantityInput: {
        height: 42,
        width: "14%",
        margin: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "lightgrey",
        padding: 10,
    },
    ingredientQuantityDropdown: {
        height: 42,
        width: "24%",
        margin: 5,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "white",
        borderColor: "lightgrey",
        padding: 10,
    },
    label: {
        position: "absolute",
        backgroundColor: "white",
        left: 220,
        top: -3,
        zIndex: 999,
        paddingHorizontal: 5,
        fontSize: 12,
    },
    add: {
        height: 42,
        width: 42,
        borderRadius: 50,
        backgroundColor: "lightgrey",
        alignSelf: "center",
        alignContent: "space-around",
    },
    addText: {
        color: "white",
        textAlign: "center",
        fontSize: 30,
    },
});
