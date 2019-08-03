<template>
  <section>
    <h2>Hire from the best Cyber Security candidates</h2>
    <div class="flexbox">
      <div class="tab">
        <h4>Step 1</h4>
        <h3>Create Job Ad</h3>
      </div>
      <div class="tab">
        <h4>Step 2</h4>
        <h3>Review Job Ad</h3>
      </div>
      <div class="tab">
        <h4>Step 3</h4>
        <h3>Post Job Ad</h3>
      </div>
    </div>
    <div>
      <div class="form-container" v-if="step === 0">
        <p>Step 1</p>
        <form>
          <p>Job Title</p>
          <input type="text" />
          <div>
            <div>
              <p>Location</p>

              <input type="radio" /> Remote
              <input type="radio" /> Onsite
            </div>
          </div>
        </form>
      </div>
      <div class="form-container" v-if="step === 1">
        <p>Step 2</p>
      </div>
      <div class="form-container" v-if="step === 2">
        <p>Step 3</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "post",
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
