<template>
  <section class="home">
    <header class="flexbox">
      <div class="flex-item">
        <h1>Cyber Security Jobs</h1>
        <h3>Cyber Security Jobs is the number one place to find current openings in Cyber Security at top companies.</h3>
        <button @click="toNew" class="post-btn">Post a Job</button>
      </div>
    </header>
    <section class="flexbox column posts">
      <article class="flexbox posting" v-for="(item, index) in featured" :key="index">
        <div class="flexbox posting" @click="details(item)">
          <div class="flex-item-posting">
            <div class="image-div">
              <img class="image" v-if="item.companyImage" :src="`${item.companyImage}`" alt />
            </div>
            <div class="flex-item-posting">
              <h3 class="flex-b-100">{{ item.title }}</h3>
              <h4>{{ item.company }}</h4>
              <p id="dash">-</p>
              <p>{{ item.location }}</p>
            </div>
          </div>
          <div class="flex-item-posting flex-end">
            <p class="featured" v-if="item.featured">Featured</p>
            <p v-else>{{ item.date }}</p>
          </div>
        </div>
      </article>
      <article class="flexbox posting" v-for="(item, index) in postings" :key="index">
        <div class="flexbox posting" @click="details(item)">
          <div class="flex-item-posting">
            <div class="image-div">
              <img class="image" v-if="item.companyImage" :src="`${item.companyImage}`" alt />
            </div>
            <div class="flex-item-posting">
              <h3 class="flex-b-100">{{ item.title }}</h3>
              <h4>{{ item.company }}</h4>
              <p id="dash">-</p>
              <p>{{ item.location }}</p>
            </div>
          </div>
          <div class="flex-item-posting flex-end">
            <p class="featured" v-if="item.featured">Featured</p>
            <p v-else>{{ item.date }}</p>
          </div>
        </div>
      </article>
    </section>
  </section>
</template>

<script>
import firebase from "firebase";

export default {
  name: "home",
  data() {
    return {
      postings: [],
      featured: [],
      ref: firebase.firestore().collection("postings")
    };
  },
  created() {
    this.ref.onSnapshot(querySnapshot => {
      this.postings = [];
      this.featured;
      querySnapshot.forEach(doc => {
        if (doc.data().featured) {
          this.featured.push({
            key: doc.id,
            title: doc.data().title,
            positionType: doc.data().positionType,
            company: doc.data().company,
            date: doc.data().date,
            companyImage: doc.data().companyImage,
            companyUrl: doc.data().companyUrl,
            location: doc.data().location,
            locationType: doc.data().locationType,
            featured: doc.data().featured
          });
        } else {
          this.postings.push({
            key: doc.id,
            title: doc.data().title,
            positionType: doc.data().positionType,
            company: doc.data().company,
            date: doc.data().date,
            companyImage: doc.data().companyImage,
            companyUrl: doc.data().companyUrl,
            location: doc.data().location,
            locationType: doc.data().locationType,
            featured: doc.data().featured
          });
        }
      });
    });
  },
  methods: {
    toNew: function() {
      this.$router.replace("new");
    },
    details(post) {
      this.$router.replace(`/${post.key}`);
    }
  }
};
</script>


<style lang="scss" scoped>
header {
  height: 35vh;
  padding: 20px 0;
  h3 {
    margin: 30px auto;
    width: 75%;
  }
}

.posts {
  padding: 20px 0;
}

.flexbox {
  display: flex;
  justify-content: center;
}

.column {
  flex-direction: column;
  align-items: center;
}

article {
  background: #c7c3fa;
  margin: 10px;
}

.featured {
  background: #fced68;
  padding: 5px;
}

.posting:hover {
  cursor: pointer;
}

.posting {
  justify-content: space-between;
  align-items: center;
  width: 800px;

  .flex-item-posting {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: center;

    h3 {
      text-align: left;
    }

    h4,
    p {
      margin-top: 0;
    }

    #dash {
      margin: 0 5px;
    }

    .flex-b-100 {
      flex: 1 0 100%;
      margin-bottom: 0;
    }

    .image-div {
      align-self: center;
      margin: 0 25px;
      display: flex;
      .image {
        width: 50px;
        height: 50px;
        background-color: #9e98f0;
        align-self: center;
        border: solid;
        border-radius: 100%;
      }
    }
  }

  .flex-end {
    justify-content: flex-end;
    align-content: center;

    margin-right: 25px;

    p {
      margin: 0;
    }
  }
}
</style>
