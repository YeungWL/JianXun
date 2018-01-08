<template>
  <div id="app" :class="$store.state.isOpen ? 'nav-sm' : 'nav-md'" >
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'app'
}
</script>
<style>
@import './assets/font/css/font-awesome.min.css';
@import './assets/css/custom.min.css';
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
