import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";
import { useNotification } from "../../notification/notification.context";



export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context
    const { showNotification } = useNotification()


    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            setUser(data?.user || null)
            showNotification({ message: data?.message || "User logged in successfully", type: "success" })
            return true
        } catch (err) {
            setUser(null)
            showNotification({ message: err.message || "Login failed", type: "error" })
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data?.user || null)
            showNotification({ message: data?.message || "User registered successfully", type: "success" })
            return true
        } catch (err) {
            setUser(null)
            showNotification({ message: err.message || "Registration failed", type: "error" })
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
            showNotification({ message: data?.message || "User logged out successfully", type: "success" })
            return true
        } catch (err) {
            showNotification({ message: err.message || "Logout failed", type: "error" })
            return false
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        const getAndSetUser = async () => {
            try {

                const data = await getMe()
                setUser(data?.user || null)
            } catch (err) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        getAndSetUser()

    }, [])

    return { user, loading, handleRegister, handleLogin, handleLogout }
}
