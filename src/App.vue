<template>
  <section class="section-app-purple-theme">
    <div class="x1">X</div>
    <div class="x2">X</div>
    <div class="x3">X</div>
    <div class="o1">O</div>
    <div class="o2">O</div>
    <div class="o3">O</div>
    <div class="o4">O</div>
    <div class="display-router">
      <router-view/>
    </div>
  </section>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="css" scoped>
  @import '../css/Purple_Theme/Small_Screen/background.css';
</style>