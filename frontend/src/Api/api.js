import axios from "axios"
import {jwtDecode} from 'jwt-decode';

const link = "http://127.0.0.1:8000/api/"

const api = axios.create({
    baseURL: link
})

api.interceptors.request.use (
    (config) => {
        token = localStorage.getItem ("access")
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