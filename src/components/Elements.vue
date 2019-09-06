<template>
  <div>
    <vue-stripe-elements ref="elementsRef" @token="tokenCreated" @loading="loading = $event"></vue-stripe-elements>
    <button @click="submit">Pay ${{amount / 100}}</button>
  </div>
</template>
 
<script>
import axios from "axios";

export default {
  data: () => ({
    loading: false,
    amount: 10000,
    token: null,
    charge: null
  }),
  methods: {
    submit() {
      this.$refs.elementsRef.submit();
    },
    tokenCreated(token) {
      this.token = token;
      // for additional charge objects go to https://stripe.com/docs/api/charges/object
      this.charge = {
        source: token.card,
        amount: this.amount,
        description: this.description
      };
      console.log();
      axios
        .get(
          `https://us-central1-cyber-board.cloudfunctions.net/PurchaseAd?stripeToken=${this.token.id}`
        )
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script> 