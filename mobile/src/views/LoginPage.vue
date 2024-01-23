<script setup lang="ts">
import useAlert from "@/composables/alert"
import { useAuth } from "@/stores/auth"
import { IonContent, IonPage, IonInput, IonButton } from "@ionic/vue"
import { reactive, ref } from "vue"

const auth = useAuth()
const alert = useAlert()

const form = reactive({
    email: "",
    password: "",
})

const processing = ref(false)
const errors = ref<Record<string, any>>({})

async function handleSubmit() {
    await auth.login(form, processing, errors)

    if (errors.value.length > 0) {
        alert.error(errors.value[0])
        errors.value = {}
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

                        <IonButton @click="handleSubmit" :disabled="processing">Login</IonButton>
                    </div>
                </div>
            </div>
        </IonContent>
    </IonPage>
</template>
