import { ReactNode, useEffect } from "react";
import { useGlobalState } from "../utils/GlobalState";
import { secureFetch } from "../../infrastructure/api/secureFetch";
import { API_URL } from "../../config/anx.config.breadriuss";

export default function ProtectedRoutes({ children }: { children: ReactNode }) {
    const { setIsAuthenticated, loadingData, setLoadingData, isAuthenticated, setInfoUser } = useGlobalState()

    const verifyToken = async () => {
        const { data, error } = await secureFetch(`${API_URL}/auth/verify`, { method: 'GET', body: null }, setLoadingData)

        if (error) {
            console.error(error)
            setIsAuthenticated(false)
        }

        if (data) {
            setIsAuthenticated(true)
            setInfoUser(data)  
        }
    }

    useEffect(() => {
        verifyToken()
    }, [])

    if (loadingData === null || isAuthenticated === null) {
        return <div>Loading...</div>
    }

    if (loadingData) {
        return <div>Loading...</div>
    }

    return <>{children}</>
}