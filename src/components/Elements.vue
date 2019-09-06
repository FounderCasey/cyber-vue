<template>
  <div>
    <vue-stripe-elements ref="elementsRef" @token="tokenCreated" @loading="loading = $event"></vue-stripe-elements>
    <button @click="submit">Pay ${{amount / 100}}</button>
  </div>
</template>
 
<script>
import axios from "axios";

const cors = require("cors")({
  origin: true
});

const stripe = require("stripe")("sk_test_6Tb9b7fn7kR3c9vcKoYOW1kp00vvWV2cKg");

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
      axios
        .get(
          `https://us-central1-cyber-board.cloudfunctions.net/PurchaseAd?token=${token.id}`
        )
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      sendTokenToServer(this.token);
    },
    sendTokenToServer(charge) {
      //send charge to server
    }
  }
};
</script> 