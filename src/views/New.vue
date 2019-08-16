<template>
  <section>
    <h2>Hire from the best Cyber Security candidates</h2>
    <div class="flexbox">
      <div class="tab" v-if="step === 0">
        <h4>Step 1</h4>
        <h3>Create Job Ad</h3>
      </div>
      <div class="tab" v-if="step === 1">
        <h4>Step 2</h4>
        <h3>Company Info</h3>
      </div>
      <div class="tab" v-if="step === 2">
        <h4>Step 3</h4>
        <h3>Purchase Job Ad</h3>
      </div>
    </div>
    <hr />
    <div>
      <div class="form-container" v-if="step === 0">
        <form @submit.prevent>
          <div class="flex-full">
            <p>Job Title</p>
            <input type="text" v-model="title" />
          </div>
          <div class="flex-full">
            <div class="flex-row">
              <div class="flex-half">
                <p>Location</p>
                <input type="text" v-model="location" />
              </div>
              <div class="flex-half">
                <p>Location Type</p>
                <input
                  type="radio"
                  v-model="locationType"
                  name="locationType"
                  id="remote"
                  value="Remote"
                />
                <label for="remote">Remote</label>
                <input
                  type="radio"
                  v-model="locationType"
                  name="locationType"
                  id="onsite"
                  value="Onsite"
                />
                <label for="onsite">Onsite</label>
              </div>
            </div>
            <div class="position-type">
              <p>Position Type</p>
              <input
                type="radio"
                v-model="positionType"
                name="position-type"
                id="fulltime"
                value="Full-time"
              />
              <label for="fulltime">Fulltime</label>
              <input
                type="radio"
                v-model="positionType"
                name="position-type"
                id="parttime"
                value="Part-time"
              />
              <label for="parttime">Part-time</label>
              <input
                type="radio"
                v-model="positionType"
                name="position-type"
                id="contract"
                value="Contract"
              />
              <label for="contract">Contract</label>
              <input
                type="radio"
                v-model="positionType"
                name="position-type"
                id="intern"
                value="Internship"
              />
              <label for="intern">Internship</label>
            </div>
          </div>
          <div>
            <p>Job Description</p>
            <Editor></Editor>
            <hr id="hr-top-margin" />
            <h3>Review Ad</h3>
            <h2>{{title}}</h2>
            <h3>
              {{location}}
              <span v-if="location != '' && locationType != ''">-&#160;</span>
              <span id="onsite-special" v-if="locationType == 'Onsite'">{{locationType}}</span>
              <span id="remote-special" v-if="locationType == 'Remote'">{{locationType}}</span>
            </h3>
            <h3>{{positionType}}</h3>
            <p class="review" v-html="description"></p>
          </div>
        </form>
      </div>
      <div class="form-container" v-if="step === 1">
        <p class="review" v-html="description"></p>
      </div>
      <div class="form-container" v-if="step === 2">
        <p>Step 3</p>
        <input type="submit" @click="onSubmit" />
      </div>
    </div>
    <button class="post-btn new-btn" v-if="step > 0" @click="step--">Back</button>
    <button class="post-btn new-btn" v-if="step < 3" @click="step++">Next</button>
  </section>
</template>

<script>
import Editor from "../components/Editor";
import { EventBus } from "../event-bus.js";
import firebase from "firebase";
import { db } from "../main";

export default {
  name: "new",
  data() {
    return {
      step: 0,
      title: "",
      location: "",
      locationType: "",
      positionType: "",
      description: this.exportedHTML(),
      company: "",
      companyUrl: "",
      companyImage: ""
    };
  },
  methods: {
    prev: function() {
      this.step--;
    },
    next: function() {
      this.step++;
    },
    exportedHTML: function() {
      EventBus.$on("exportedHTML", html => {
        this.description = html;
        return `${html}`;
      });
    },
    toggleRemote: function() {
      if (!this.remote && this.onsite) {
        this.onsite = !this.onsite;
        this.remote = !this.remote;
      } else {
        this.remote = !this.remote;
      }
    },
    toggleOnsite: function() {
      if (!this.onsite && this.remote) {
        this.remote = !this.remote;
        this.onsite = !this.onsite;
      } else {
        this.onsite = !this.onsite;
      }
    },
    onSubmit: function() {
      db.collection("postings")
        .add({
          title: this.title,
          location: this.location,
          locationType: this.locationType,
          positionType: this.positionType,
          description: this.description,
          company: this.company,
          companyUrl: this.companyUrl,
          companyImage: this.companyImage
        })
        .then(() => {
          alert("added");
        });
    }
  },
  components: {
    Editor
  }
};
</script>

<style lang="scss" scoped>
hr {
  width: 800px;
  padding: 2px 0;
  background: #6558f5;
  outline: none;
  border: none;
}

#hr-top-margin {
  margin-top: 30px;
}

.flexbox {
  width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: center;

  .tab {
    width: 100%;
    text-align: left;
    h4 {
      margin-bottom: 0px;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 5px;
    }
  }
}

.form-container {
  width: 800px;
  margin: auto;

  .flex-full {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;

    p {
      flex-basis: 100%;
      text-align: left;
    }
  }

  .flex-row {
    display: flex;
    width: 100%;
  }

  .flex-half {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50%;
    flex-wrap: wrap;

    label {
      width: 32%;
    }

    p {
      flex-basis: 100%;
      text-align: left;
    }

    input[type="text"] {
      outline: none;
      border: none;
      background: #e9e9e9;
      padding: 10px;
      font-size: 1.4rem;
      width: 90%;
    }
  }

  input[type="text"] {
    outline: none;
    border: none;
    background: #e9e9e9;
    padding: 10px;
    font-size: 1.4rem;
    width: 100%;
  }
}

.position-type {
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;

  p {
    flex-basis: 100%;
    text-align: left;
  }
}

input[type="radio"] {
  display: none;
  height: 0;
  width: 0;
}

label {
  text-align: center;
  cursor: pointer;
  padding: 10px 25px;
  border: solid 3px #6558f5;
  width: 15%;
  font-size: 1rem;
  font-weight: 300;
  transition: 300ms;

  &:hover {
    background-color: #6558f5;
    color: #fff;
  }
}

input[type="radio"]:checked + label {
  background-color: #6558f5;
  color: #fff;
}

div {
  text-align: left;
}

.review {
  text-align: left;
}

.new-btn {
  margin: 10px;
}

#remote-special {
  color: #6558f5;
}

#onsite-special {
  color: #f55858;
}
</style>
