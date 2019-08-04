<template>
  <section class="home">
    <header class="flexbox">
      <div class="flex-item">
        <h1>Cyber Security Jobs</h1>
        <h3>Cyber Security Jobs is the number one place to find current openings in Cyber Security at top companies.</h3>
        <button @click="toPost" class="post-btn">Post a Job</button>
      </div>
    </header>
    <section class="flexbox column">
      <article class="flexbox posting" v-for="(item, index) in postings" :key="index">
        <div class="flex-item-posting">
          <div class="image-div">
            <img class="image" v-if="item.image_url" :src="`${item.image_url}`" alt />
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
      </article>
    </section>
  </section>
</template>

<script>
import { db } from "../main";

export default {
  name: "home",
  data() {
    return {
      postings: []
    };
  },
  methods: {
    toPost: function() {
      this.$router.replace("post");
    }
  },
  firestore() {
    return {
      postings: db.collection("postings")
    };
  }
};
</script>


<style lang="scss" scoped>
.flexbox {
  display: flex;
  justify-content: center;
}

.column {
  flex-direction: column;
  align-items: center;
}

.post-btn {
  border: none;
  outline: none;

  padding: 15px 35px;
  background: #6558f5;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  border-bottom: solid 8px #dfe7ed;
  transition: 300ms;
}

.post-btn:hover {
  cursor: pointer;
  border-bottom: solid 5px #fced68;
  margin-bottom: 3px;
}

article {
  background: #c7c3fa;
  margin: 10px;
}

.featured {
  background: #fced68;
  padding: 5px;
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
