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
            <input type="text" />
          </div>
          <div class="flex-half">
            <p>Job Title</p>
            <p>Location Type</p>
            <input type="text" />

            <input type="radio" name="location" /> Remote
            <input type="radio" name="location" /> Onsite
          </div>
          <div>
            <Editor></Editor>
          </div>
        </form>
      </div>
      <div class="form-container" v-if="step === 1">
        <p>Step 2</p>
      </div>
      <div class="form-container" v-if="step === 2">
        <p>Step 3</p>
        <input type="submit" />
      </div>
    </div>
  </section>
</template>

<script>
import Editor from "../components/Editor";

export default {
  name: "new",
  data() {
    return {
      step: 0
    };
  },
  methods: {
    prev: function() {
      this.step--;
    },
    next: function() {
      this.step++;
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

  .flex-half {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;

    p {
      flex-basis: 50%;
      text-align: left;
    }

    input[type="text"] {
      outline: none;
      border: none;
      background: #e9e9e9;
      padding: 10px;
      font-size: 1.4rem;
      width: 50%;
    }

    input[type="radio"] {
      margin-right: 10px;
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

  input[type="radio"]:first-of-type {
    margin-right: 10px;
  }

  input[type="radio"]:last-of-type {
    margin: 0 10px 0 35px;
  }
}
</style>
