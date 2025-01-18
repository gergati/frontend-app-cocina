import { useDispatch, useSelector } from "react-redux";
import { onAddNewRecipe } from '../store/cocina/recipeSlice'
import { createRecipes, getRecipes, getRecipesById } from "../services/recipes";

export const useRecipeStore = () => {
    const dispatch = useDispatch();
    const { recipes } = useSelector(state => state.recipes);
    const { user } = useSelector(state => state.auth);


    const startAddNewRecipe = async (newRecipeData) => {
        if (!user) {
            console.error("Usuario no autenticado");
            return;
        }

        try {
            const newRecipe = {
                ...newRecipeData,
            };


            const data = await createRecipes(newRecipe)
            dispatch(onAddNewRecipe(data));

            console.log("Receta agregada exitosamente");

        } catch (error) {
            console.error("Error al agregar la receta:", error);
        }
    };

    const getAllRecipes = async () => {
        try {
            if (!user) {
                console.error("Usuario no autenticado");
                return null;
            }

            await getRecipes();

        } catch (error) {
            console.error("Error al traer todas las recetas", error);
        }
        return { recipes, getAllRecipes };
    };

    // const getAllRecipeUser = async () => {
    //     try {
    //         if (!user) {
    //             console.error("Usuario no autenticado");
    //             return null;
    //         }

    //         const data = await getRecipesById(user.id);
    //         console.log(data)

    //     } catch (error) {
    //         console.error("Error al traer recetas por id:", error);
    //     }
    //     return { recipes, getAllRecipes };
    // }



    return {
        recipes,
        startAddNewRecipe,
        getAllRecipes,
        // getAllRecipeUser
    };
};
