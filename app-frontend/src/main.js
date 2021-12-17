import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// Create a new store instance.
const store = createStore({
    state: {
        transactions: [],
        accountBalance: 0
    },
    mutations: {
        addTransaction (state, transaction) {
            state.transactions.unshift(transaction)
        },
        updateAccountBalance (state, transactionAmount) {
            const accountBalance = state.accountBalance;
            const sum = Number(accountBalance) + Number(transactionAmount);
            state.accountBalance = Number(sum.toFixed(2));
        }
    },
    actions: {
        addTransaction ({ dispatch, commit }, transaction) {
            commit('addTransaction', transaction)
            dispatch('updateAccountBalance', transaction.amount)
        },
        updateAccountBalance (context, transactionAmount) {
            context.commit('updateAccountBalance', transactionAmount)
        }
    },
    getters: {
        transactions (state) {
          return state.transactions
        },
        accountBalance (state) {
            return state.accountBalance
        }
    }
})

const app = createApp(App)

// Install the store instance as a plugin
app.use(store).mount('#app')
