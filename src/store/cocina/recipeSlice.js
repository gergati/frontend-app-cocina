import { createSlice } from "@reduxjs/toolkit";


export const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [],
        errorMessage: undefined
    },
    reducers: {
        onAddNewRecipe: (state, { payload }) => {
            state.recipes = [...state.recipes, payload]
            state.errorMessage = undefined;
        },
        onUpdateRecipe: (state, { payload }) => {
            state.recipes = state.recipes.map(recipe => {
                if (recipe.id === payload.id) {
                    return payload
                }
                return recipe
            })
        },
        onDeleteRecipe: (state, { payload }) => {
            state.recipes = state.recipes.filter(recipe => recipe.id !== payload.id)
        }
    }
})

export const {
    onAddNewRecipe,
    onDeleteRecipe,
    onUpdateRecipe
} = recipesSlice.actions;