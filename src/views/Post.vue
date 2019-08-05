<template>
  <section>
    <h2>{{ post.title }}</h2>
    <p>{{ post.company }}</p>
  </section>
</template>

<script>
import firebase from "firebase";

export default {
  name: "post",
  data() {
    return {
      key: "",
      post: {}
    };
  },
  created() {
    const ref = firebase
      .firestore()
      .collection("postings")
      .doc(this.$route.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        this.key = doc.id;
        this.post = doc.data();
      } else {
        this.$router.replace("/");
      }
    });
  },
  methods: {
    prev: function() {
      this.step--;
    },
    next: function() {
      this.step++;
    }
  }
};
</script>

<style lang="scss" scoped>
.flexbox {
  width: 800px;
  margin: 0 auto;
  border: solid;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;

  .tab {
    border-bottom: solid #6558f5;

    h4 {
      margin-bottom: 0;
      text-align: left;
    }

    h3 {
      margin-top: 5px;
    }
  }
}

.form-container {
  border: solid;
  width: 800px;
  margin: auto;
}
</style>
