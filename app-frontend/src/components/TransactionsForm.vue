<template>
  <div>
    <form @submit.prevent="onSubmit"
          ref="form"
          class="row">
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
               v-model="amount" 
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
import { mapActions } from 'vuex';
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
      const pattern = /^\d+$/;
      return pattern.test(this.amount);
    },
    accountIdIsValid: function () {
      const pattern = /^[A-Za-z][-A-Za-z0-9]*$/;
      return pattern.test(this.accountId);
    },
    formIsValid: function () {
      return this.amountIsValid && this.accountIdIsValid ? true : false;
    },
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
      const transaction = {
        id: this.accountId,
        amount: this.amount
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
