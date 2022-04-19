<template>
    <header class="header-volume">
        <nav>
            <button type="button" @click="goBack"><fa icon="arrow-left"/></button>
        </nav>
    </header>
    <section class="section-volume-form" @mousemove="startMusic">
        <form>
            <h1 class="title-volume">Volume</h1>
            <label for="mainVolume">
                <p>Main Volume:</p>
                <input type="range" v-model="formData.mainVolumeSlider" :style="{background: 'linear-gradient(to right, hsl(327, 98%, 62%) '+formData.mainVolumeSlider+'%, #fff 0%, #fff 100%)'}" id="mainVolume" name="mainVolumeSlider" min="0" max="100" @input="mainVolumeSlider">
                <div id="mainVolumeValue">{{formData.mainVolumeSlider}}%</div>
            </label>
            <label for="markSound">
                <p>Mark Sound:</p>
                <input type="range" v-model="formData.markSoundSlider" :style="{background: 'linear-gradient(to right, hsl(327, 98%, 62%) '+formData.markSoundSlider+'%, #fff 0%, #fff 100%)'}" id="markSound" name="markSoundSlider" min="0" max="100" @input="markSoundSlider">
                <div id="markSoundValue">{{formData.markSoundSlider}}%</div>
            </label>
            <button type="button" @click="updateVolume">Save Changes</button>
        </form>
    </section>
</template>

<script>
    import { Howler } from 'howler';

    export default {
        name: 'Volume',
        data() {
            return {
                formData: {
                    mainVolumeSlider: JSON.parse(localStorage.getItem('mainVolumeValue')) || 100,
                    markSoundSlider: JSON.parse(localStorage.getItem('markSoundValue')) || 100,
                    isSoundStart: false
                }
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            mainVolumeSlider() {
                let progress = document.getElementById('mainVolume');
                let value = document.getElementById('mainVolumeValue');

                value.innerHTML = this.formData.mainVolumeSlider + "%";
                progress.style.background = "linear-gradient(to right, hsl(327, 98%, 62%) "+this.formData.mainVolumeSlider+"%, #fff 0%, #fff 100%)";
                this.formData.volume = this.formData.mainVolumeSlider * .01;

                localStorage.setItem('mainVolumeValue', this.formData.mainVolumeSlider);
                this.formData.mainVolumeSlider = JSON.parse(localStorage.getItem('mainVolumeValue'));

                this.updateVolume(this.formData.volume);
            },
            markSoundSlider() {
                let progress = document.getElementById('markSound');
                let value = document.getElementById('markSoundValue');

                value.innerHTML = this.formData.markSoundSlider + "%";
                progress.style.background = "linear-gradient(to right, hsl(327, 98%, 62%) "+this.formData.markSoundSlider+"%, #fff 0%, #fff 100%)";

                localStorage.setItem('markSoundValue', this.formData.markSoundSlider);
                this.formData.markSoundSlider = JSON.parse(localStorage.getItem('markSoundValue'));
            },
            updateVolume(newVolume) {
                Howler.volume(newVolume);
            }
        }
    }
</script>

<style lang="css" scoped>
  @import '../../css/Purple_Theme/Small_Screen/volume.css';
</style>