import { useDispatch, useSelector } from "react-redux"
import { onChecking, onLogin, onLogout, clearErrorMessage } from "../store/auth/authSlice"
import { login, register, reNewToken } from "../services/auth"
import { useNavigate } from "react-router-dom"



export const useAuthStore = () => {
    const navigate = useNavigate()
    const { user, status, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking())
        try {
            const data = await login(email, password)

            const { message: token, user } = data;

            localStorage.setItem('token', token)

            dispatch(onLogin({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                token
            }))
            navigate('/')
        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No token found, logging out...');
            return dispatch(onLogout());
        }
        try {
            const data = await reNewToken()

            const { message: newToken, user } = data;
            localStorage.setItem('token', newToken);


            dispatch(onLogin({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                token: newToken,
            }));
        } catch (error) {
            console.error('Error during token renewal:', error);
            localStorage.clear();
            dispatch(onLogout());
        }
    };



    const startRegister = async ({ name, email, password }) => {
        dispatch(onChecking())
        try {
            const data = await register(name, email, password);

            localStorage.setItem('token', data.token); 

            const { user, token } = data;

            dispatch(onLogin({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                token
            }));

        } catch (error) {
            dispatch(onLogout())
        }
    }


    const startLogout = () => {
        localStorage.clear()
        dispatch(onLogout())
    }

    return {
        //Propiedades
        user,
        status,
        errorMessage,

        //Metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
    }
}