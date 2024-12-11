import axios from "axios"
import {jwtDecode} from 'jwt-decode';

const link = "http://127.0.0.1:8000/api/"
const render = "https://archive-backend-g7fi.onrender.com/api/";

const api = axios.create({
    baseURL: render
})

api.interceptors.request.use (
    (config) => {
        const token = localStorage.getItem ("access")
        if (token) {
            const decode = jwtDecode(token)
            const exp_date = decode.exp
            const current_time = Date.now()/1000

            if (exp_date > current_time) {
                config.headers.Authorization = `Bearer ${token}`
            } else {
                console.log ("Token has expired")
            }
        } return config;
    },
    (error) => {
    return Promise.reject(error);
  }
) 

export default api