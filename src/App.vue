<template>
  <div id="app">
    <notifications group="notifs" position="bottom right" width="200px" />
    <div id="nav">
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/">Jobs</router-link>
        </li>
        <li>
          <router-link to="/new">Post a Job</router-link>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 1.2rem;
}
#nav {
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  li {
    float: left;
  }

  li a {
    display: block;
    color: #2c3e50;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  /* Change the link color to #111 (black) on hover */
  li a:hover {
    color: #111;
  }
}

.post-btn {
  border: none;
  outline: none;

  padding: 15px 35px;
  background: #6558f5;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
}

.post-btn:hover {
  cursor: pointer;
}

.vue-notification {
  padding: 10px;
  margin: 0 5px 15px !important;

  font-size: 14px !important;

  color: #ffffff;
  background: #6558f5 !important;
  border-left: 5px solid #5145d8 !important;
}
</style>
