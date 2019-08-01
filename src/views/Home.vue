<template>
  <section class="home">
    <header class="flexbox">
      <div class="flex-item">
        <h1>Cyber Security Jobs</h1>
        <h4>Cyber Security Jobs is the number one place to find current openings in Cyber Security at top companies.</h4>
        <button>Post a Job</button>
      </div>
    </header>
    <section class="flexbox column">
      <article class="flexbox posting">
        <div class="flex-item-posting">
          <div class="image"></div>
          <div class="flex-item-posting">
            <h3 class="flex-b-100">Job Title</h3>
            <h4>Company</h4>
            <p id="dash">-</p>
            <p>Location</p>
          </div>
        </div>
        <div class="flex-item-posting flex-end">
          <p class="featured">Featured</p>
        </div>
      </article>
      <br />
      <article class="flexbox posting">
        <h3>Job Title</h3>
        <h4>Company</h4>
        <p>Location</p>
        <p>August, 1</p>
      </article>
    </section>
  </section>
</template>

<script>
export default {
  name: "home"
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

article {
  background: #c7c3fa;
  border-bottom: solid 8px #dfe7ed;
  min-width: 675px;
}

.featured {
  background: #fced68;
  padding: 5px;
}

.posting {
  justify-content: space-around;
  align-items: center;

  .flex-item-posting {
    flex: 1 0 20%;
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

    .image {
      width: 50px;
      height: 50px;
      background-color: #9e98f0;
      align-self: center;
      margin: 0 25px;
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
