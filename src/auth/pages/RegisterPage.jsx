import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"
import { EmailIcon, PasswordIcon, UserIcon } from "../components"
import { useAuthStore } from "../../hooks/useAuthStore"



export const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate() // hook para la redirección
  const { startRegister } = useAuthStore()


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    if (password !== newPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await startRegister({ name, email, password });
      navigate('/');
    } catch (error) {
      setError('Error al registrarse. Por favor, intenta nuevamente.');
      console.error('Error en el registro:', error);
    }
  };

  return (
    <AuthLayout
      title={'Crear cuenta'}
    >
      <form onSubmit={handleSubmit} className="font-inter w-full mb-6 mt-4">
        <div className="flex flex-col items-center w-full gap-4">
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="name" className="font-semibold">Nombre completo</label>
            <div className="relative">
              <span className='absolute left-2 top-2'>
                <UserIcon />
              </span>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                className="text-sm border border-black h-9 pl-10 rounded-md w-full"
                placeholder="Jhon Doe"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

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
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="newPassword" className="font-semibold">Repetir contraseña</label>
            <div className="relative">
              <span className="absolute left-2 top-1.5">
                <PasswordIcon />
              </span>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="*************"
                value={newPassword}
                className="text-sm border border-black h-9 rounded-md pl-10 w-full"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          <button className="w-full border border-black h-10 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 font-bold my-3 rounded-lg" type="submit">Crear cuenta</button>
        </div>
        <Link className="text-xs flex gap-2 items-end" to={'/auth/login'}>Ya tienes cuenta? <span className="bg-indigo-700 bg-clip-text text-transparent">Ingresar.</span></Link>
      </form>
    </AuthLayout>
  )
}
