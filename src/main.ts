import { createApp } from 'vue'
import router from "./router/index.ts";
import './css/style.css'
import App from './App.vue'
import 'virtual:uno.css'

const pinia = createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')
