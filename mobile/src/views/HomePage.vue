<script setup lang="ts">
import { IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonPage } from "@ionic/vue"
import { onMounted, ref } from "vue"
import { createOutline, trashOutline } from "ionicons/icons"
import useAuth from "@/composables/auth"
import useAlert from "@/composables/alert"
import axios from "@/lib/axios"

const { logout } = useAuth()
const { confirm } = useAlert()

type Todo = {
    id: number
    title: string
    description: string
    is_completed: boolean
    created_at: string
    updated_at: string
}

const todos = ref<Todo[]>([])

onMounted(async () => {
    try {
        const response = await axios.get("todos")

        todos.value = response?.data.todos
    } catch (error) {
        console.error(error)
    }
})
</script>

<template>
    <IonPage>
        <IonContent fullscreen>
            <div class="grid place-items-center h-screen">
                <div class="border-2 border-slate-400 rounded-xl p-4 w-3/4">
                    <div class="flex justify-between items-center">
                        <h1 class="font-bold text-2xl text-center">Todos</h1>

                        <IonButton @click="logout">Logout</IonButton>
                    </div>

                    <div class="mt-8">
                        <IonList>
                            <IonItem v-for="todo in todos" :key="todo.id">
                                <IonLabel>
                                    <div class="grid grid-cols-4 items-center">
                                        <div class="flex flex-col col-span-2">
                                            <p class="font-bold">{{ todo.title }}</p>
                                            <small class="truncate">{{ todo.description }}</small>
                                        </div>

                                        <div class="flex items-center justify-end col-span-2">
                                            <IonButton fill="clear">
                                                <IonIcon slot="icon-only" :icon="createOutline" />
                                            </IonButton>

                                            <IonButton
                                                fill="clear"
                                                color="danger"
                                                @click="confirm('Are you sure you want to delete this todo?')"
                                            >
                                                <IonIcon slot="icon-only" :icon="trashOutline" />
                                            </IonButton>
                                        </div>
                                    </div>
                                </IonLabel>
                            </IonItem>
                        </IonList>
                    </div>
                </div>
            </div>
        </IonContent>
    </IonPage>
</template>
