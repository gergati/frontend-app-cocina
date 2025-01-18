import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CocinaLayout } from "../layout/CocinaLayout";
import { deleteRecipeById, getRecipes } from "../../services/recipes";
import Swal from "sweetalert2";

export const DetailsCardPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await getRecipes();
                const selectedRecipe = response.recipes.find((r) => r.id === parseInt(id));
                setRecipe(selectedRecipe);
            } catch (error) {
                console.error("Error al obtener los detalles de la receta:", error);
            }
        };

        fetchRecipe();
    }, [id]);

    if (!recipe) {
        return (
            <div className="flex items-center justify-center m-auto font-inter">
                <p>Cargando receta...</p>
            </div>
        );
    }

    if (!recipe.ingredients) {
        return (
            <div className="flex items-center justify-center m-auto font-inter">
                <p>La receta no contiene ingredientes.</p>
            </div>
        );
    }

    const handleGoBack = () => {
        navigate(-1);
    };

    const deletedReciteById = async () => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás deshacer esta acción!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
        });

        if (result.isConfirmed) {
            try {
                await deleteRecipeById(recipe.id);
                Swal.fire("¡Eliminada!", "La receta ha sido eliminada.", "success");
                navigate("/perfil");
            } catch (error) {
                console.error("Error al eliminar la receta:", error);
                Swal.fire("Error", "No se pudo eliminar la receta.", "error");
            }
        }
    };


    return (
        <CocinaLayout>
            <div className="my-3 flex justify-between">
                <button
                    onClick={handleGoBack}
                    className="flex items-center justify-center bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 text-white font-epilogue h-8 w-[100px] rounded-lg hover:scale-105 hover:transition-all"
                >
                    <span className="flex text-center mt-1">Volver</span>
                </button>
                <button
                    onClick={deletedReciteById}
                    className="flex items-center justify-center bg-gradient-to-r from-red-500 to-red-800 text-white font-epilogue h-8 w-[180px] rounded-lg hover:scale-105 hover:transition-all"
                >
                    <span className="flex text-center mt-1">Eliminar receta</span>
                </button>
            </div>
            <div className="font-inter w-full min-h-screen border border-gray-200 p-2">
                <h1 className="font-epilogue text-3xl my-3">{recipe.title}</h1>
                <h2 className="font-epilogue text-xl">Preparación</h2>
                <p className="font-inter text-black/75">{recipe.description}</p>
                <h2 className="font-epilogue text-xl">Ingredientes:</h2>
                <ul className="list-disc pl-4 font-inter text-black/75">
                    {recipe.ingredients.map((ingredient, idx) => (
                        <li key={idx}>
                            {ingredient.name} - {ingredient.quantity}
                        </li>
                    ))}
                </ul>
            </div>
        </CocinaLayout>
    );
};
