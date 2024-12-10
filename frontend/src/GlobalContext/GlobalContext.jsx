import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../Api/api";

export const GlobalContext = createContext ()

export const GlobalProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const checkAuth = () => {
        const token = localStorage.getItem("access")
        if (!token) {
            setIsAuthenticated (false)
            return
        }

        try {
            const decoded = jwtDecode(token)
            const expiry_date = decoded.exp
            const current_time = Date.now ()/1000
            if (expiry_date > current_time) {
                setIsAuthenticated(true)
            } else {
                setIsAuthenticated(false)
                localStorage.removeItem("access")
            }
        } catch (error) {
            console.log (error)
        }

    }

    useEffect(() => {
      checkAuth();
    }, []);


    return <GlobalContext.Provider 
        value={{
            isAuthenticated,
            setIsModalOpen,
            isModalOpen,
        }}
    >
        {children}
    </GlobalContext.Provider>

}
