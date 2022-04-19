<template>
    <header class="header-newgame">
        <nav>
            <button type="button" @click="goBack"><fa icon="arrow-left"/></button>
        </nav>
    </header>
    <section class="section-newgame-form">
        <form>
            <h1 class="title-newgame">Select <span>Difficulty</span></h1>
            <label for="easy">
                <input type="radio" id="easy" name="difficulty-level">
                <div class="difficulty-selection">Easy</div>
            </label>
            <label for="medium">
                <input type="radio" id="medium" name="difficulty-level">
                <div class="difficulty-selection">Medium</div>
            </label>
            <label for="difficult">
                <input type="radio" id="difficult" name="difficulty-level">
                <div class="difficulty-selection">Difficult</div>
            </label>
            <div class="container-mark">
                <p>CHOOSE YOUR MARK</p>
                <div>
                    <label for="mark-x">
                        <input type="radio" id="mark-x" name="playerMark" checked="checked">
                        <div class="playerMark">X</div>
                    </label>
                    <label for="mark-o">
                        <input type="radio" id="mark-o" name="playerMark">
                        <div class="playerMark">O</div>
                    </label>
                </div>
                <p>REMEMBER: X GOES FIRST</p>
            </div>
            <button type="button" @click="start">Start Game</button>
        </form>
    </section>
</template>

<script>
    import SinglePlayer from './SinglePlayer.vue';

    export default {
        name: 'NewGame',
        components: {
            SinglePlayer
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            start() {
                this.$router.push({ name: 'singleplayer' });
            }
        }
    }
</script>

<style lang="css" scoped>
  @import '../../css/Purple_Theme/Small_Screen/newgame.css';
</style>