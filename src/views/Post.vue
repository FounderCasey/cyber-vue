<template>
  <section>
    <div class="container">
      <div class="post-header">
        <p id="date-p">{{ post.date }}</p>
        <h2>{{ post.title }}</h2>
        <h4>{{ post.company }}</h4>
        <h4>{{ post.location }} - {{ post.locationType }}</h4>
        <br />
        <button class="post-btn">Apply Now</button>
      </div>
      <div class="post-body">
        <p v-html="`${post.description}`"></p>
      </div>
      <div class="post-footer">
        <button class="post-btn">Apply Now</button>
        <h4>
          Doesn't seem like a fit?
          <span @click="copy">Share this job</span>!
          <notifications group="foo" />
        </h4>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from "firebase";
import Clipboard from "v-clipboard";
import Notifications from "vue-notification";

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
    },
    copy: function() {
      // TODO: Change link
      let link = `https://cyber-board.firebaseapp.com/${this.key}`;
      this.$clipboard(link);
      this.$notify({
        group: "notifs",
        title: "Copied to clipboad!"
      });
    }
  },
  components: {
    Clipboard,
    Notifications
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 800px;
  margin: auto;
}

.post-header {
  display: flex;
  flex-wrap: wrap;

  #date-p {
    color: rgb(124, 124, 124);
    font-size: 1rem;
    flex-basis: 100%;
    text-align: left;
    margin: 0;
  }

  h2 {
    flex-basis: 100%;
    text-align: left;
    margin: 3px 0;
  }

  h4 {
    flex-basis: 100%;
    text-align: left;
    margin: 0;
    margin-bottom: 15px;
  }

  button {
    align-self: flex-start;
  }
}

.post-body {
  text-align: left;
}

span {
  color: #6558f5;
}

span:hover {
  cursor: pointer;
}
</style>
