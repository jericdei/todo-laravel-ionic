import { Preferences } from "@capacitor/preferences"
import Axios from "axios"

const axios = Axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
})

axios.interceptors.request.use(
    async (config) => {
        const token = (await Preferences.get({ key: "token" })).value

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axios
