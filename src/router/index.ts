import {createRouter, createWebHashHistory} from 'vue-router'

import home from '../components/index.vue'
import berry from '../components/berry/index.vue'
import berryInfo from '../components/berry/berryInfo.vue'

const routes = [
    {path: '/', component: home, name:'home'},
    {path: '/berry', component: berry, name: 'berry', },
    {path: '/berryInfo/:item', component: berryInfo, name: 'berryInfo', props:true},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
