<template>
    <nav class="app-navigation">
      <h1 id="app-name">T<span>I</span>C<br><span>T</span>A<span>C</span><br>T<span>O</span>E</h1>
      <button type="button" class="btn-newgame" @click="redirectToNewGame"><img src="../../images/TIC-TAC-TOE-ICON.png" alt="tic-tac-toe-icon"> NEW GAME</button><br>
      <button type="button" class="btn-multiplayer" @click="redirectToMultiplayer"><fa class="icon" icon='user-group'/>MULTIPLAYER</button><br>
      <button type="button" class="btn-volume" @click="redirectToVolume"><fa class="icon" icon='volume-high'/>VOLUME</button><br>
      <button type="button" class="btn-theme" @click="redirectToTheme"><fa class="icon" icon='palette'/>THEME</button>
    </nav>
</template>

<script>
import NewGame from './../views/NewGame.vue';
import Multiplayer from './../views/Multiplayer.vue';
import Volume from './../views/Volume.vue';
import Theme from './../views/Theme.vue';

export default {
  name: 'Home',
  components: {
    Multiplayer,
    NewGame,
    Theme,
    Volume
  },
  methods: {
    redirectToNewGame() {
      this.$router.push({ name: 'newgame' });
    },
    redirectToMultiplayer() {
      this.$router.push({ name: 'multiplayer' });
    },
    redirectToVolume() {
      this.$router.push({ name: 'volume' });
    },
    redirectToTheme() {
      this.$router.push({ name: 'theme' });
    }, 
  }
}
</script>

<style lang="css" scoped>
  @import '../../css/Purple_Theme/Small_Screen/home.css';
</style>