<template>
  <section class="section-app-purple-theme" @mouseover="startMusic">
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
  import Volume from './views/Volume';
  import audio from '../audio/bgMusic.mp3'
  import { Howl } from 'howler';

  export default {
    name: 'App',
    props: {
      volume: Number
    },
    data() {
      return {
        formData: {
          isSoundStart: false,
        }
      }
    },
    methods: {
      goBack() {
          this.$router.go(-1);
      },
      startMusic() {
        if(!this.formData.isSoundStart) {
          var sound = new Howl({
            src: audio,
            loop: true,
            volume: (Volume.data().formData.mainVolumeSlider * .01)
          });

          sound.once('load', () => sound.play());
        }

        this.formData.isSoundStart = true;
      },
    }
  }
</script>

<style lang="css" scoped>
  @import '../css/Purple_Theme/Small_Screen/background.css';
</style>