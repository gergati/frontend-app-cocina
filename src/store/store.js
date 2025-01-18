import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { recipesSlice } from "./cocina/recipeSlice";




export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        recipes: recipesSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})