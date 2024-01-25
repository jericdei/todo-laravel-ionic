import { Preferences } from "@capacitor/preferences"
import Axios from "axios"
import { isPlatform } from "@ionic/vue"

const axios = Axios.create({
    baseURL: isPlatform("mobile")
        ? import.meta.env.VITE_API_MOBILE_BASE_URL
        : import.meta.env.VITE_API_DESKTOP_BASE_URL,
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
