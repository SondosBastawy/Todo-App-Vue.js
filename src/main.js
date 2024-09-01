import "./assets/main.css";
import "./assets/style.css";
import "./assets/style.scss";

import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

createApp(App).use(createPinia()).mount("#app");
