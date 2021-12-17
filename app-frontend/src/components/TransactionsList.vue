<template>
  <div>
    <h2 class="text-start mb-3">Transaction history</h2>
    <div v-for="(transaction, index) in transactions"
         class="border border-primary text-start mb-3 p-3" 
         :key="transaction.id" 
         data-type="transaction"
         :data-account-id="transaction.id"
         :data-amount="transaction.amount"
         :data-balance="accountBalance">
      <div class="">Transferred {{ transaction.amount }}$ from account {{ transaction.id }} </div>
      <div class="" v-if="index == 0">The current account balance is {{ accountBalance }}$</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'transactions',
      'accountBalance'
    ])
  }
}
</script>