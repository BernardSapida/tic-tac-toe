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
                <input type="radio" v-model="gameInfo.difficulty" id="easy" name="difficulty-level" value="easy" checked="checked">
                <div class="difficulty-selection">Easy</div>
            </label>
            <label for="medium">
                <input type="radio" v-model="gameInfo.difficulty" id="medium" name="difficulty-level" value="medium">
                <div class="difficulty-selection">Medium</div>
            </label>
            <label for="difficult">
                <input type="radio" v-model="gameInfo.difficulty" id="difficult" name="difficulty-level" value="difficult">
                <div class="difficulty-selection">Difficult</div>
            </label>
            <div class="container-mark">
                <p>CHOOSE YOUR MARK</p>
                <div>
                    <label for="mark-x">
                        <input type="radio" v-model="gameInfo.humanMark" id="mark-x" name="playerMark" value="X" checked="checked">
                        <div class="playerMark">X</div>
                    </label>
                    <label for="mark-o">
                        <input type="radio" v-model="gameInfo.humanMark" id="mark-o" name="playerMark" value="O">
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
        name: 'NewGame',
        data() {
            return {
                gameInfo: {
                    difficulty: "easy",
                    humanMark: 'X',
                    aiMark: null
                }
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            start() {
                let { difficulty, humanMark, aiMark } = this.gameInfo
                aiMark = (humanMark == 'X' ? 'O' : 'X');
                this.$router.push({
                    name: 'singleplayer',
                    params: { 
                        difficulty: difficulty,
                        humanMark: humanMark,
                        aiMark: aiMark
                    }
                });
            }
        }
    }
</script>

<style lang="css" scoped>
  @import '../../css/Purple_Theme/Small_Screen/newgame.css';
</style>