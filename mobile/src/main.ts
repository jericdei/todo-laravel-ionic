import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { IonicVue } from "@ionic/vue";

/* Tailwind CSS */
import "@/styles/tailwind.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Theme variables */
import "./theme/variables.css";

const app = createApp(App).use(IonicVue).use(router);

router.isReady().then(() => {
  app.mount("#app");
});
