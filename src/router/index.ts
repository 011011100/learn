import {createRouter, createWebHashHistory} from 'vue-router'

import home from '../components/index.vue'
import berry from '../components/berry/index.vue'
import berryInfo from '../components/berry/berryInfo.vue'
import generationInfo from '../components/generation/generationInfo.vue'

const routes = [
    {path: '/', component: home, name: 'home'},
    {path: '/berry', component: berry, name: 'berry',},
    {path: '/berryInfo/:item', component: berryInfo, name: 'berryInfo', props: true},
    {
        path: '/generationInfo/:index',
        component: generationInfo,
        name: 'generationInfo',
        props: (route: any) => ({index: Number(route.params.index)})
    },
    {
        path: '/pokemonInfo/:id',
        component: () => import('../components/pokemon/pokemonInfo.vue'),
        name: 'pokemonInfo',
        props: (route: any) => ({id: route.params.id})
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
