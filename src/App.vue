<template>
  <div class="container">
    <nav class="nav">
      <a class="navbar-brand" href="#">Weather</a>    
      <div class="links">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked @click="setMetric(!metric)">
            <label class="form-check-label" for="flexSwitchCheckDefault">Metric</label>
          </div>
          <router-link to="/" style="margin: 10px">Home</router-link> |
          <router-link to="/favourites" style="margin: 10px">Favourites</router-link>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default ({
  name: 'App',
  computed: {...mapGetters({metric: 'isMetric'})},
  methods:{...mapActions(['setMetric'])}, 


})
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-left: 100px;
  padding-right: 100px;
}

.links {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

nav {
  padding: 30px;
  justify-content: space-between;
  overflow:hidden;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
