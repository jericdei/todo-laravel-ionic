import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { IonicVue } from "@ionic/vue";
import { createPinia } from "pinia";

/* Tailwind CSS */
import "@/styles/tailwind.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Theme variables */
import "./theme/variables.css";

const pinia = createPinia();
const app = createApp(App).use(IonicVue).use(router).use(pinia);

router.isReady().then(() => {
    app.mount("#app");
});
