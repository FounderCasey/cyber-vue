<template>
  <div>
    <vue-stripe-elements ref="elementsRef" @token="tokenCreated" @loading="loading = $event"></vue-stripe-elements>
  </div>
</template>
 
<script>
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
    }
  }
};
</script> 