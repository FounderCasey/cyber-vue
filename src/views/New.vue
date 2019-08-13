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
        <h3>Review Job Ad</h3>
      </div>
      <div class="tab" v-if="step === 2">
        <h4>Step 3</h4>
        <h3>Purchase Job Ad</h3>
      </div>
    </div>
    <div>
      <div class="form-container" v-if="step === 0">
        <form @submit.prevent cl>
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
                <button
                  v-bind:class="[remote ? 'selected' : 'not-selected']"
                  v-on:click="toggleRemote"
                >Remote</button>
                <button
                  v-bind:class="[onsite ? 'selected' : 'not-selected']"
                  v-on:click="toggleOnsite"
                >Onsite</button>
              </div>
            </div>
          </div>
          <div>
            <Editor></Editor>
          </div>
        </form>
      </div>
      <div class="form-container" v-if="step === 1">
        <p v-html="description"></p>
      </div>
      <div class="form-container" v-if="step === 2">
        <p>Step 3</p>
        <input type="submit" />
      </div>
    </div>
    <button v-if="step > 0" @click="step--">Back</button>
    <button v-if="step < 3" @click="step++">Next</button>
  </section>
</template>

<script>
import Editor from "../components/Editor";
import { EventBus } from "../event-bus.js";

export default {
  name: "new",
  data() {
    return {
      step: 0,
      title: "",
      location: "",
      remote: false,
      onsite: false,
      description: this.test()
    };
  },
  methods: {
    prev: function() {
      this.step--;
    },
    next: function() {
      this.step++;
    },
    test: function() {
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
    }
  },
  components: {
    Editor
  }
};
</script>

<style lang="scss" scoped>
.flexbox {
  width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: center;

  .tab {
    border-bottom: solid #6558f5;
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

    .selected {
      border: solid 3px #6558f5;
      background: #6558f5;
      color: #fff;
      padding: 11.5px 25px;
      width: 49%;
      font-size: 1rem;
      font-weight: 300;
      outline: none;
      transition: 300ms;
    }

    .not-selected {
      border: solid 3px #6558f5;
      padding: 11.5px 25px;
      width: 49%;
      font-size: 1rem;
      font-weight: 300;
      outline: none;
      transition: 300ms;
    }

    .selected:hover,
    .not-selected:hover {
      border: solid 3px #6558f5;
      background: #6558f5;
      color: #fff;
      cursor: pointer;
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
</style>
