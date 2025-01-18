import { apiClient } from "./apiClient";


export const createRecipes = async ({ title, description, userId, ingredients }) => {

    try {
        const response = await apiClient.post('users/newRecipes', { title, description, userId, ingredients });
        return response.data;
    } catch (error) {
        console.error('Error creating recipe:', error);
        throw error;
    }

}


export const getRecipes = async () => {
    try {
        const response = await apiClient.get('users/recipes')
        return response.data

    } catch (error) {
        console.error('Error get recipe:', error);
        throw error;
    }
}

export const getRecipesById = async (userId) => {
    try {
        const response = await apiClient.get(`users/recipes/${userId}`)
        return response.data
    } catch (error) {
        console.error('Error get recipe by id:', error);
        throw error;
    }
}


export const deleteRecipeById = async (userId) => {
    try {
        const response = await apiClient.delete(`users/recipes/${userId}`)
        return response.data
    } catch (error) {
        console.error('Error get recipe by id:', error);
        throw error;
    }
}