import { Link, useNavigate } from "react-router-dom"
import { CocinaLayout } from "../layout/CocinaLayout"
import { useAuthStore } from "../../hooks/useAuthStore"

export const HomePage = () => {
    const { status } = useAuthStore()
    const navigate = useNavigate()

    if (!status) return navigate('/auth/login')

    return (
        <CocinaLayout>
            <div className="my-10">
                <div className="mx-5">
                    <h1 className="font-epilogue text-3xl -rotate-2 font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 w-[186px] hover:scale-105 cursor-pointer">AppCocking</h1>
                    <p className="font-inter my-2">Comparte tus recetas y ayuda a otros a inspirarse.</p>
                </div>
                <div className="flex gap-2 my-8 items-center justify-center">
                    <Link to='/recipes'>
                        <button className="w-[150px] h-10 border-2 border-black p-1 rounded-md font-inter flex justify-center items-center">Ver recetas</button>
                    </Link>
                    {
                        status === 'not-authenticated' && (
                            <Link to={'/auth/register'}>
                                <button className="w-[150px] h-10 border-2 border-black p-1 rounded-md font-inter flex justify-center items-center">Crear cuenta</button>
                            </Link>
                        )
                    }
                </div>
                <div className="flex flex-col gap-2 justify-center items-center m-auto">
                    <div className="flex gap-2">
                        <div className="w-[200px] h-[100px] hover:rotate-12 transition-all">
                            <img src="./src/assets/food-1.jpg" className="rounded-xl " alt="imagen de un plato de comida" />
                        </div>
                        <div className="w-[200px] h-[300px] hover:-rotate-12 transition-all">
                            <img src="./src/assets/food-2.jpg" className="rounded-xl" alt="imagen de un plato de comida" />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="w-[200px] h-[300px] hover:rotate-12 transition-all">
                            <img src="./src/assets/food-4.jpg" className="rounded-xl" alt="imagen de un plato de comida" />
                        </div>
                        <div className="w-[200px] h-[300px] hover:-rotate-12 transition-all">
                            <img src="./src/assets/food-3.jpg" className="rounded-xl" alt="imagen de un plato de comida" />
                        </div>
                    </div>
                </div>
            </div>
        </CocinaLayout>
    )
}
