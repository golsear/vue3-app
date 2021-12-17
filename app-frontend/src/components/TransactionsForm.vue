<template>
  <div>
    <h2 class="text-start mb-3">Submit new transaction</h2>
    <form @submit.prevent="onSubmit"
          ref="form"
          class="row mb-3">
      <div class="col-12 text-start mb-3">
        <label for="accountId" 
               class="form-label">Account ID:</label>
        <input id="accountId"
               :class="[!accountIdIsValid ? 'is-invalid' : '', 'form-control']"
               data-type="account-id" 
               v-model="accountId" 
               type="text">
      </div>    
      <div class="col-12 text-start mb-3">
        <label for="amount" 
               class="form-label">Amount:</label>
        <input id="amount"
               :class="[!amountIsValid ? 'is-invalid' : '', 'form-control']" 
               data-type="amount" 
               v-model.number="amount" 
               type="text">
        <div v-if="!amountIsValid" class="invalid-feedback">Please choose a username.</div>    
      </div>
      <div class="col-12 text-start mb-3">
        <input :class="[!formIsValid ? 'disabled' : '', 'btn btn-primary']" 
               data-type="transaction-submit" 
               type="submit" />
      </div>
      <div class="col-12 text-start mb-3">
        <div class="form-check">
          <input class="form-check-input" 
                 type="radio" 
                 id="status-200" 
                 value="200" 
                 v-model="responseStatusCode" />
          <label class="form-check-label" 
                 for="status-200">Status 200</label>    
        </div>
        <div class="form-check">
          <input class="form-check-input" 
                 type="radio" 
                 id="status-400" 
                 value="400" 
                 v-model="responseStatusCode" />
          <label class="form-check-label"
                 for="status-400">Status 400</label>    
        </div>
      </div>
      <div v-if="responseErrorMessage" 
           class="col-12 text-start mb-3">
        <div class="text-danger">
          {{ responseErrorMessage }}
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      accountId: '',
      amount: null,
      responseErrorMessage: '',
      responseStatusCode: '200',
    }
  },
  computed: {
    amountIsValid: function () {
      const pattern = /^[0-9]+$/;
      return typeof this.amount == 'number' && !isNaN(this.amount);
    },
    accountIdIsValid: function () {
      const pattern = /^[A-Za-z0-9-]*$/;
      return pattern.test(this.accountId) && this.accountId.length > 9;
    },
    formIsValid: function () {
      return this.amountIsValid && this.accountIdIsValid ? true : false;
    },
    ...mapGetters([
      'accountBalance',
      'transactions'
    ])
  },
  methods: {
    ...mapActions([
      'addTransaction'
    ]),
    onSubmit() {
      if (this.formIsValid) {
        this.postData();  
      }
    },
    clearData() {
      this.accountId = '';
      this.amount = null;    
    },
    postData: function () {
      const accountBalance = this.transactions.length ? (Number(this.transactions[0].accountBalance) + Number(this.amount)) : Number(this.amount); 
      const transaction = {
        id: this.accountId,
        amount: Number(this.amount.toFixed(2)),
        accountBalance: Number(accountBalance.toFixed(2))
      };
      const self = this;
      
      axios({
        method: 'post',
        url: 'https://httpbin.org/status/' + self.responseStatusCode,
        data: transaction
      })
      .then(
        () => {
          self.addTransaction(transaction);
          self.clearData();
          self.responseErrorMessage = '';
        }
      )
      .catch(
        (error) => {
          self.responseErrorMessage = 'Something was wrong: ' + error.message;
        }
      );
    }
  }
}
</script>
