// recipesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Recipe = {
    name: String;
    ingredients: String[];
    method: String;
};

interface RecipesState {
    recipes: Recipe[];
    name: string;
    ingredients: string[];
    method: string;
}

const initialState: RecipesState = {
    recipes: [],
    name: "",
    ingredients: [],
    method: "",
};

export const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        addRecipe: (state, action: PayloadAction<Recipe>) => {
            state.recipes.push(action.payload);
        },
        addName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        addIngredient: (state, action: PayloadAction<string>) => {
            state.ingredients.push(action.payload);
        },
        removeIngredient: (state, action: PayloadAction<string>) => {
            state.ingredients = state.ingredients.filter(
                (ingredient) => ingredient !== action.payload
            );
        },
        clearIngredients: (state) => {
            state.ingredients = [];
        },
        addMethod: (state, action: PayloadAction<string>) => {
            state.method = action.payload;
        },
    },
});

export const {
    addRecipe,
    addName,
    addIngredient,
    removeIngredient,
    clearIngredients,
    addMethod,
} = recipesSlice.actions;

export default recipesSlice.reducer;
