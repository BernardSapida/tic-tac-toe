<template>
    <header class="header-multiplayer">
        <nav>
            <button type="button" @click="goBack"><fa icon="arrow-left"/></button>
        </nav>
    </header>
    <section class="section-multiplayer-form">
        <form>
            <h1 class="title-multiplayer">Player <span>Name</span></h1>
            <label for="player1">
                <p>Player 1:</p>
                <input type="text" id="player1" name="player1" placeholder="Type player name">
            </label>
            <label for="player2">
                <p>Player 2:</p>
                <input type="text" id="player2" name="player2" placeholder="Type player name">
            </label>
            <div class="container-mark">
                <p>CHOOSE PLAYER 1 MARK</p>
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
    export default {
        name: 'Multiplayer',
        methods: {
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="css" scoped>
  @import '../../css/Purple_Theme/Small_Screen/multiplayer.css';
</style>