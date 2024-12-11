import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../Api/api";
import axios from "axios";

export const GlobalContext = createContext ()

export const GlobalProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [journals, setJournals] = useState([])
    const [pagination, setPagination] = useState({next:null, previous:null})
    const link = "http://127.0.0.1:8000/api/"
    const render = "https://archive-backend-g7fi.onrender.com/api/";

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


    const fetchJournals = async(url= `${render}journals`) => {
        try {
            const response = await axios.get(url);
            if (response) {
                setJournals(response.data.results);
                setPagination({
                next: response.data.next,
                previous: response.data.previous,
                });
            } else {
                console.error("Error: No response data");
            }
        } catch (err) {
            console.error("Error fetching product data:", err.message);
        }
        
    }

    useEffect(()=> {
        fetchJournals()
    }, [])


    return <GlobalContext.Provider 
        value={{
            isAuthenticated,
            setIsModalOpen,
            isModalOpen,
            journals,
            pagination,
            checkAuth,
            fetchJournals,
        }}
    >
        {children}
    </GlobalContext.Provider>

}
