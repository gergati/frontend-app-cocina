import { useState } from "react"
import { AuthLayout } from "../layout/AuthLayout"
import { EmailIcon, PasswordIcon } from "../components"
import { Link } from "react-router-dom"
import { useAuthStore } from "../../hooks/useAuthStore"



export const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { startLogin } = useAuthStore()

    const handleSubmit = async (e) => {
        e.preventDefault()
        startLogin({ email: email, password })
    }


    return (
        <AuthLayout
            title={'Iniciar sesion'}
        >
            <form onSubmit={handleSubmit} className="font-inter w-full mb-6 mt-4">
                <div className="flex flex-col items-center w-full gap-4">
                    <div className="flex flex-col w-full gap-2">
                        <label htmlFor="email" className="font-semibold">Correo electronico</label>
                        <div className="relative">
                            <span className='absolute left-2 top-2'>
                                <EmailIcon />
                            </span>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                className="text-sm border border-black h-9 pl-10 rounded-md w-full"
                                placeholder="johndoe@email.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <label htmlFor="password" className="font-semibold">Contraseña</label>
                        <div className="relative">
                            <span className="absolute left-2 top-1.5">
                                <PasswordIcon />
                            </span>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="*************"
                                value={password}
                                className="text-sm border border-black h-9 rounded-md pl-10 w-full"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className="w-full border border-black h-10 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 font-bold my-3 rounded-lg" type="submit">Ingresar</button>
                </div>
                <Link className="text-xs flex gap-2 items-end" to={'/auth/register'}>No tienes cuenta? <span className="bg-indigo-700 bg-clip-text text-transparent">Crear una.</span></Link>

            </form>
        </AuthLayout>
    )
}
