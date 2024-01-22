import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { acceptHMRUpdate, defineStore } from "pinia";
import { Ref } from "vue";
import router from "@/router";
import { RemovableRef, useLocalStorage } from "@vueuse/core";

const csrf = async () => await axios.get("/sanctum/csrf-cookie");

export const useAuth = defineStore("auth", {
    state: (): {
        userData: RemovableRef<Record<string, any>>;
        authStatus: RemovableRef<number>;
    } => ({
        userData: useLocalStorage("userData", {}),
        authStatus: useLocalStorage("authStatus", 0),
    }),

    getters: {
        isAuthenticated: (state) => [200, 204].includes(state.authStatus),
        hasUserData: (state) => Object.keys(state.userData).length > 0,
    },

    actions: {
        async getUserData() {
            try {
                const response = await axios.get("/api/user");

                this.userData = response.data;
            } catch (error) {
                if (!(error instanceof AxiosError)) throw error;
                if (error.response?.status !== axios.prototype) throw error;
            }
        },

        async login(credentials: Record<string, any>, processing: Ref<boolean>, errors: Ref<Record<string, any>>) {
            await csrf();

            processing.value = true;

            try {
                const response = await axios.post("/login", credentials);

                this.authStatus = response.status;

                processing.value = false;

                await this.getUserData();

                router.push({ name: "home" });
            } catch (error) {
                if (!(error instanceof AxiosError)) throw error;
                if (error.response?.status !== 422) throw error;

                errors.value = Object.values(error.response.data.errors).flat();
                processing.value = false;
            }
        },

        async logout() {
            try {
                await axios.post("/logout");

                this.$reset();
                this.userData = {};
                this.authStatus = 0;

                router.push({ name: "login" });
            } catch (error) {
                if (!(error instanceof AxiosError)) throw error;
                if (error.response?.status !== 422) throw error;
            }
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot));
}
