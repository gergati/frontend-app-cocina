import { useNavigate, useParams } from "react-router-dom"
import { CocinaLayout } from "../layout/CocinaLayout"
import { getRecipes } from "../../services/recipes"
import { useEffect, useState } from "react"
import { RatingRecipe } from "../components/RatingRecipe"

export const RecipesPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await getRecipes()
                const selectedRecipe = response.recipes.find(r => r.id === parseInt(id))
                setRecipe(selectedRecipe)
            } catch (error) {
                console.error("Error al obtener los detalles de la receta:", error)
            }
        }

        fetchRecipe()
    }, [id])

    if (!recipe) {
        return <p>Cargando receta...</p>
    }

    const handleGoBack = () => {
        navigate(-1)
    }


    return (
        <CocinaLayout>
            <div className="my-3">
                <div className="flex gap-2">
                    <button onClick={handleGoBack} className="flex items-center justify-center bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 text-white font-epilogue h-8  w-[100px] rounded-lg hover:scale-105 hover:transition-all">
                        <span className="flex text-center mt-1">Volver</span>
                    </button>
                    <RatingRecipe />
                </div>
            </div>
            <div className="font-inter w-full min-h-screen border border-gray-200 p-2">
                <div className="w-full h-[100px]">
                    <img src="../../src/assets/food-1.jpg" alt="" className="h-[100px] w-full object-cover" />
                </div>
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
    )
}
