import {createRouter, createWebHashHistory} from 'vue-router'

import home from '../components/index.vue'
import berry from '../components/berry/index.vue'

const routes = [
    {path: '/', component: home, name:'home'},
    {path: '/berry', component: berry, name: 'berry', },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
