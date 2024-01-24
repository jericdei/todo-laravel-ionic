<script setup lang="ts">
import useAlert from "@/composables/alert"
import useAuth from "@/composables/auth"
import { IonContent, IonPage, IonInput, IonButton } from "@ionic/vue"
import { reactive } from "vue"

const auth = useAuth()
const alert = useAlert()

const form = reactive({
    email: "",
    password: "",
})

async function handleSubmit() {
    await auth.login(form)

    if (auth.errors.value.length > 0) {
        alert.error(auth.errors.value[0])
        auth.errors.value = {}
    }
}
</script>

<template>
    <IonPage>
        <IonContent fullscreen>
            <div class="grid place-items-center h-screen bg-slate-900">
                <div class="w-3/4 border-2 border-slate-400 p-4 rounded-xl">
                    <div class="flex flex-col gap-4">
                        <IonInput
                            v-model="form.email"
                            type="email"
                            label="Email"
                            label-placement="floating"
                            fill="outline"
                            class="text-white"
                        />

                        <IonInput
                            v-model="form.password"
                            type="password"
                            label="Password"
                            label-placement="floating"
                            fill="outline"
                            class="text-white"
                        />

                        <IonButton @click="handleSubmit" :disabled="auth.processing.value">Login</IonButton>
                    </div>
                </div>
            </div>
        </IonContent>
    </IonPage>
</template>
