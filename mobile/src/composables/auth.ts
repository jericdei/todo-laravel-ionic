import axios from "@/lib/axios"
import router from "@/router"
import { Preferences } from "@capacitor/preferences"
import { AxiosError } from "axios"
import { ref } from "vue"

export type Credentials = {
    email: string
    password: string
}

export default function useAuth() {
    const processing = ref(false)
    const errors = ref<Record<string, any>>({})

    async function login(credentials: Credentials) {
        processing.value = true

        try {
            const response = await axios.post("login", credentials)

            Preferences.set({
                key: "token",
                value: response.data.token,
            })

            Preferences.set({
                key: "authStatus",
                value: response.status.toString(),
            })
        } catch (error) {
            if (!(error instanceof AxiosError)) {
                console.error(error)
            } else {
                if (error.response?.status === 422) {
                    errors.value = Object.values(error.response.data.errors).flat()
                }
            }
        } finally {
            processing.value = false

            router.push({ name: "home" })
        }
    }

    async function logout() {
        try {
            await axios.post("logout")

            Preferences.clear()

            router.push({ name: "login" })
        } catch (error) {
            if (!(error instanceof AxiosError)) throw error
            if (error.response?.status !== 422) throw error

            errors.value = Object.values(error.response.data.errors).flat()
        }
    }

    return { processing, errors, login, logout }
}
