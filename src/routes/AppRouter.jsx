import { Navigate, Route, Routes } from "react-router-dom";
import { CocinaRoutes } from "../cocina/routes/CocinaRoutes";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { useEffect } from "react";
import { useAuthStore } from "../hooks/useAuthStore";

export const AppRouter = () => {
    const { status, checkAuthToken } = useAuthStore()

    useEffect(() => {
        checkAuthToken()
    }, [])

    if (status === 'checking') {
        return (
            <h3>Cargando...</h3>
        )
    }


    return (
        <Routes>
            {
                // Si el estado es 'authenticated', mostrar las rutas de Cocina
                status === 'authenticated'
                    ? (
                        <>
                            <Route path="/*" element={<CocinaRoutes />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    )
                    : (
                        // Si el estado es 'not-authenticated', mostrar las rutas de autenticación
                        <>
                            <Route path="/auth/*" element={<AuthRoutes />} />
                            <Route path="*" element={<Navigate to="/auth/login" />} />
                        </>
                    )
            }
        </Routes>
    );
};
