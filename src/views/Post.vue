<template>
  <section>
    <div class="container" v-if="post.title != null">
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
        </h4>
      </div>
    </div>
    <div v-else class="container">
      <ContentLoader primaryColor="#f5f5f5" secondaryColor="#ecebff">
        <rect x="0" y="0" rx="3" ry="3" width="95" height="6" />
        <rect x="0" y="16" rx="5" ry="5" width="160" height="10" />
        <rect x="0" y="36" rx="4" ry="4" width="120" height="8" />
        <rect x="0" y="54" rx="4" ry="4" width="170" height="8" />
        <rect x="0" y="72" rx="15" ry="15" width="140" height="30" />
        <rect x="0" y="112" rx="4" ry="4" width="170" height="8" />
        <rect x="0" y="130" rx="4" ry="4" width="250" height="6" />
      </ContentLoader>
      <ContentLoader primaryColor="#f5f5f5" secondaryColor="#ecebff">
        <rect x="0" y="0" rx="4" ry="4" width="250" height="6" />
        <rect x="0" y="16" rx="4" ry="4" width="300" height="6" />
        <rect x="0" y="32" rx="4" ry="4" width="263" height="6" />
        <rect x="0" y="48" rx="4" ry="4" width="276" height="6" />
        <rect x="0" y="64" rx="4" ry="4" width="145" height="6" />
      </ContentLoader>
    </div>
  </section>
</template>

<script>
import firebase from "firebase";
import { ContentLoader } from "vue-content-loader";

export default {
  name: "post",
  data() {
    return {
      key: "",
      post: {}
    };
  },
  beforeCreate() {
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
    ContentLoader
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
