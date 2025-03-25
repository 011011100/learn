import {createRouter, createWebHashHistory} from 'vue-router'

import nine_nine_new from '../components/nine_nine_new.vue'
import nine_eight_new from '../components/nine_eight_new.vue'

const routes = [
    {path: '/', component: nine_nine_new, name:'99new'},
    {path: '/98new', component: nine_eight_new, name: '98new', },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
