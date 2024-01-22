<script setup lang="ts">
import axios from "@/lib/axios";
import { useAuth } from "@/stores/auth";
import { IonButton, IonContent, IonPage } from "@ionic/vue";
import { onMounted, ref } from "vue";

const auth = useAuth();

const todos = ref([]);

onMounted(async () => {
    try {
        const response = await axios.get("api/todos");

        todos.value = response.data.todos;
    } catch (error) {
        console.error(error);
    }
});

async function handleLogout() {
    await auth.logout();
}
</script>

<template>
    <IonPage>
        <IonContent fullscreen>
            <div class="grid place-items-center h-screen bg-slate-900">
                <div class="border-2 border-slate-400 rounded-xl p-4 w-3/4">
                    <p>Hi, {{ auth.userData?.name }}</p>

                    <IonButton @click="handleLogout">Logout</IonButton>

                    <div class="mt-8">
                        <pre></pre>
                    </div>
                </div>
            </div>
        </IonContent>
    </IonPage>
</template>
