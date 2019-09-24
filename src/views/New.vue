<template>
  <section>
    <h2>Hire from the best Cyber Security candidates</h2>
    <div class="flexbox">
      <div class="tab" v-if="step === 0">
        <h4>Step 1</h4>
        <h3>Company Info</h3>
      </div>
      <div class="tab" v-if="step === 1">
        <h4>Step 2</h4>
        <h3>Position Info</h3>
      </div>
      <div class="tab" v-if="step === 2">
        <h4>Step 3</h4>
        <h3>Purchase Job Ad</h3>
      </div>
    </div>
    <hr />
    <div>
      <div class="form-container">
        <form @submit.prevent>
          <div class="form-container" v-if="step === 0">
            <div class="flex-full">
              <p>Company</p>
              <input type="text" v-model="company" />
            </div>
            <div class="flex-full">
              <div class="flex-row">
                <div class="flex-half">
                  <p>Company Website</p>
                  <input type="text" v-model="companyUrl" />
                </div>
                <div class="flex-half">
                  <p>Company Logo URL</p>
                  <input type="text" id="input-greater" v-model="companyImage" />
                </div>
              </div>
            </div>
            <div>
              <p>Company Description</p>
              <textarea v-model="companyDescription"></textarea>
              <hr id="hr-top-margin" />
            </div>
            <div>
              <h3>Review Company Card</h3>
              <div class="company-card">
                <h2>{{company}}</h2>
                <h3>
                  {{companyUrl}}
                  <span v-if="location != '' && locationType != ''">-&#160;</span>
                  <span id="onsite-special" v-if="locationType == 'Onsite'">{{locationType}}</span>
                  <span id="remote-special" v-if="locationType == 'Remote'">{{locationType}}</span>
                </h3>
                <h3>{{positionType}}</h3>
                <p class="review">{{companyDescription}}</p>
              </div>
            </div>
          </div>
          <div class="form-container" v-if="step === 1">
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
          </div>
          <div class="form-container" v-if="step === 2">
            <div>
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
            <div class="company-card">
              <h2>{{company}}</h2>
              <h3>
                {{companyUrl}}
                <span v-if="location != '' && locationType != ''">-&#160;</span>
                <span id="onsite-special" v-if="locationType == 'Onsite'">{{locationType}}</span>
                <span id="remote-special" v-if="locationType == 'Remote'">{{locationType}}</span>
              </h3>
              <h3>{{positionType}}</h3>
              <p class="review">{{companyDescription}}</p>
            </div>
            <div ref="card"></div>
          </div>
          <div class="flex-center">
            <button class="post-btn new-btn" v-if="step > 0" @click="step--">Back</button>
            <input class="post-btn new-btn" v-if="step == 2" type="submit" @click="purchase" />
            <button class="post-btn new-btn" v-if="step < 2" @click="step++">Next</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import Editor from "../components/Editor";
import { EventBus } from "../event-bus.js";
// eslint-disable-next-line
import firebase from "firebase";
import { db } from "../main";
import VueMoment from "vue-moment";
import axios from "axios";

let stripe = Stripe(`pk_test_2bQCHjLC9ayiIBuTycUQOjkc006EL3oHwL`),
  elements = stripe.elements(),
  card = undefined;

export default {
  name: "new",
  data() {
    return {
      globalCount: [],
      step: 2,
      title: "",
      location: "",
      locationType: "",
      positionType: "",
      description: this.exportedHTML(),
      company: "",
      companyUrl: "",
      companyImage: "",
      companyDescription: "",
      date: this.$moment().format("MMMM, Do"),
      featured: false
    };
  },
  mounted: function() {
    var style = {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    };

    card = elements.create("card", { style: style });
    card.mount(this.$refs.card);
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
          companyImage: this.companyImage,
          companyDescription: this.companyDescription,
          date: this.date,
          featured: this.featured,
          active: false,
          count: this.globalCount.count
        })
        .then(() => {
          alert("added");
          let updatedCount = this.globalCount.count + 1;
          db.collection("global")
            .doc("global_count")
            .set({
              count: updatedCount
            });
        });
    },
    purchase: function() {
      let self = this;

      stripe.createToken(card).then(function(result) {
        var purchase = firebase.functions().httpsCallable("Purchase");

        if (result.error) {
          self.hasCardErrors = true;
          self.$forceUpdate(); // Forcing the DOM to update so the Stripe Element can update.
          return;
        } else {
          purchase({ token: result.token }).then(function(res) {
            console.log(res.data);
          });
        }
      });
    }
  },
  firestore() {
    return {
      globalCount: db.collection("global").doc("global_count")
    };
  },
  components: {
    Editor,
    // eslint-disable-next-line
    VueMoment
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

.flex-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
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

    #input-greater {
      width: 100%;
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

textarea {
  height: 200px;
  width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  text-align: left;
  outline: none;
  background: #f3f3f3;
  padding: 15px 15px;
  overflow-y: scroll;
  border: none;
  resize: none;
  font-size: 1.2rem;
  font-weight: 300;
  color: #2c3e50;
}

.company-card {
  background: #c7c3fa;
}
</style>
