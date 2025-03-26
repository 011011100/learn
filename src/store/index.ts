export const myStore = defineStore('counter', {
    state: () => (
        {
            count: 0,
            name: 'Eduardo'
        }
    ),
    getters: {
        doubleCount: (state) => state.count * 2,
        count: (state) => state.count
    },
    actions: {
        increment() {
            this.count++
        },
    },
})
