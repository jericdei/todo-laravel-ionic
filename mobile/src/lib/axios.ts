import { Preferences } from "@capacitor/preferences"
import Axios from "axios"

const token = Preferences.get({ key: "token" }).then((res) => res.value)

const axios = Axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
    },
    withCredentials: true,
    withXSRFToken: true,
})

export default axios
