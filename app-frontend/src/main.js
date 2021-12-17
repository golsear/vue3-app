import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// Create a new store instance.
const store = createStore({
    state: {
        transactions: []
    },
    mutations: {
        addTransaction (state, transaction) {
            state.transactions.push(transaction)
        }
    },
    actions: {
        addTransaction (context, transaction) {
            context.commit('addTransaction', transaction)
        }
    },
    getters: {
        transactions (state) {
          return state.transactions
        }
    }
})

const app = createApp(App)

// Install the store instance as a plugin
app.use(store).mount('#app')
