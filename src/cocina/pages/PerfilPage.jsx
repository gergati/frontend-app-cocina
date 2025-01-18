import { useEffect, useState } from "react"
import { useAuthStore } from "../../hooks/useAuthStore"
import { getRecipesById } from "../../services/recipes"
import { CocinaLayout } from "../layout/CocinaLayout"
import { CardDetailRecipe } from "../components/CardDetailRecipe"
import { Link, useNavigate } from "react-router-dom"

export const PerfilPage = () => {
  const [recipes, setRecipes] = useState([])
  const { user } = useAuthStore(state => state.auth)
  const navigate = useNavigate()
  const handleGoBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await getRecipesById(user.id)

        if (response.ok && response.recipes) {
          setRecipes(response.recipes)
        } else {
          setRecipes([])
        }
      } catch (error) {
        console.error("Error al obtener las recetas:", error)
        setRecipes([])
      }
    }

    if (user.id) {
      fetchRecipes()
    }
  }, [user.id])

  return (
    <CocinaLayout>
      <div className="flex gap-2 items-center">
        <button onClick={handleGoBack} className="flex items-center justify-center bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 text-white font-epilogue h-8  w-[100px] rounded-lg hover:scale-105 hover:transition-all">
          <span className="flex text-center mt-1">Volver</span>
        </button>
        <Link to='/newRecipes'>
          <button className=' bg-gradient-to-r from-green-500 to-green-700 w-[200px] m-2 text-center flex items-center justify-center text-white  font-epilogue h-8  rounded-lg hover:scale-105 hover:transition-all'>
            Cargar mi receta
          </button>
        </Link>
      </div>

      <div className="w-full min-h-screen font-epilogue">
        <h3 className="text-2xl">Tus datos</h3>
        <div className="flex w-[90%] m-auto border border-black">
          <div className="flex flex-col gap-2 w-full text-center">
            <span className="h-8 w-full bg-gray-400 flex items-center justify-center m-auto">Nombre completo:</span>
            <span className="font-inter">{user.name}</span>
          </div>
          <span className="border border-black"></span>
          <div className="flex gap-2 flex-col w-full text-center justify-center">
            <span className="h-8 w-full bg-gray-400 flex items-center justify-center m-auto">Correo electronico:</span>
            <span className="font-inter flex items-center justify-center m-auto">{user.email}</span>
          </div>
        </div>
        <div>
          <div>
            <h2 className="text-2xl">Mis recetas</h2>
            <div>
              {
                recipes.length > 0 ? (
                  recipes.map((rep) => (
                    <CardDetailRecipe userId={user.id} id={rep.id} key={rep.id} title={rep.title} />

                  ))
                ) : (
                  <p>No tienes recetas.</p>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </CocinaLayout>
  )
}
