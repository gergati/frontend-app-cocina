import { Link } from "react-router-dom"
import { CocinaLayout } from "../layout/CocinaLayout"
import { ClockIcon } from "../components/icons/ClockIcon"
import { UsersIcon } from "../components/icons/UsersIcon"
import { useState, useEffect } from "react"
import { getRecipes } from "../../services/recipes"
import { useDispatch } from "react-redux"
import { onLogout } from "../../store/auth/authSlice"

export const CocinaPage = () => {
    const [recipes, setRecipes] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await getRecipes()
                if (response && response.recipes) {
                    setRecipes(response.recipes)
                } else {
                    console.error('No se encontraron recetas en la respuesta de la API')
                }
            } catch (error) {
                console.error("Error al obtener las recetas:", error)
            }
        }

        fetchRecipes()
    }, [])
    const handleLogout = () => {
        dispatch(onLogout())
    }

    return (
        <CocinaLayout>

            <div className="w-[98%] m-auto  font-epilogue p-2 rounded-lg flex flex-col gap-2">
                <div className='flex gap-2'>
                    <button className="h-8 bg-red-600 w-[100px] rounded-xl flex items-center justify-center m-2 text-center" onClick={handleLogout}>
                        Salir
                    </button>
                    <Link to='/perfil'>
                        <button className='h-8 border border-black w-[120px] rounded-xl flex items-center justify-center m-2 text-center'>
                            Ir a mi perfil
                        </button>
                    </Link>
                    <Link to='/'>
                        <button className='h-8 border border-black w-[200px] rounded-xl flex items-center justify-center m-2 text-center'>
                            Ir al inicio
                        </button>
                    </Link>
                </div>

                {recipes.length > 0 ? (
                    recipes.map((recipe, idx) => (
                        <div className="w-full border border-gray-300 h-[160px] rounded-2xl hover:scale-105 hover:transition-all" key={idx}>
                            <div className="flex" >
                                <div className="w-full flex">
                                    <img
                                        src="src/assets/food-1.jpg"
                                        alt=""
                                        className="w-full h-[160px] object-cover rounded-2xl p-1"
                                    />
                                </div>
                                <div className="w-full h-[160px] p-2">
                                    <div className="h-[80%]">
                                        <h3 className="text-xl font-epilogue">{recipe.title}</h3>
                                        <div className="text-black/75">
                                            <div className="flex gap-2">
                                                <ClockIcon />
                                                <span>2 min. </span>
                                            </div>
                                            <div className="flex gap-2">
                                                <UsersIcon />
                                                <span>Comen 5 pers.</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end items-end">
                                        <Link
                                            to={`details/${recipe.id}`}
                                            className="text-blue-600 font-inter mr-5"
                                        >
                                            Más...
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay recetas disponibles.</p>
                )}

            </div>
        </CocinaLayout>
    )
}
