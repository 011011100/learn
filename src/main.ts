import { createApp } from 'vue'
import router from "./router/index.ts";
import './css/style.css'
import App from './App.vue'
import 'virtual:uno.css'
import { useRequest } from "./util/request.ts";

const pinia = createPinia()

createApp(App)
    .provide('axios',useRequest)
    .use(router)
    .use(pinia)
    .mount('#app')
