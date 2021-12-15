<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
//import HelloWorld from './components/HelloWorld.vue'
import TransactionsForm from './components/TransactionsForm.vue'
import TransactionsList from './components/TransactionsList.vue'
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-4">
        <TransactionsForm />    
      </div>
      <div class="col-12 col-md-8">
        <TransactionsList />
      </div>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
