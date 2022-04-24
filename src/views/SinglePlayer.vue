<template>
    <header class="header-singleplayer">
        <button type="button" @click="goBack"><fa icon="arrow-left"/></button>
        <div>
            <p><span><fa icon="trophy"/></span>DIFFICULT</p>
        </div>
        <button type="button" @click="undo"><fa icon="repeat"/></button>
    </header>
    <section class="section-singleplayer">
        <div class="section-singleplayer-container">
            <div class="profile">
                <div id='human-player'>
                    <p>YOU</p>
                    <div>
                        <div><fa icon="user-astronaut"/></div>
                    </div>
                    <p class="turn" v-if="gameInfo.playerTurn == 'HUMAN'">TURN</p>
                </div>
                <div class="profile-time">
                    <div class="profile-time-primary">
                        <div>
                            <p><span><fa icon="hourglass"/></span><br>{{gameInfo.time}} {{gameInfo.time > 1 ? 'SECS' : 'SEC'}}</p>
                        </div>
                    </div>
                    <div class="profile-time-label">
                        <p>TIME</p>
                    </div>
                </div>
                <div id='ai-player'>
                    <p>BOT</p>
                    <div>
                        <div><fa icon="robot"/></div>
                    </div>
                    <p class="turn" v-if="gameInfo.playerTurn == 'AI'">TURN</p>
                </div>
            </div>
            <table class="container-board">
                <tbody>
                    <tr class="board">
                        <td><div id="tile0" class="tiles"></div></td>
                        <td><div id="tile1" class="tiles"></div></td>
                        <td><div id="tile2" class="tiles"></div></td>
                    </tr>
                    <tr class="board">
                        <td><div id="tile3" class="tiles"></div></td>
                        <td><div id="tile4" class="tiles"></div></td>
                        <td><div id="tile5" class="tiles"></div></td>
                    </tr>
                    <tr class="board">
                        <td><div id="tile6" class="tiles"></div></td>
                        <td><div id="tile7" class="tiles"></div></td>
                        <td><div id="tile8" class="tiles"></div></td>
                    </tr>
                </tbody>
                <tfoot class="result-score">
                    <tr>
                        <td class="player-score">
                            <p>YOUR SCORE</p>
                            <p>{{ gameInfo.humanScore }}</p>
                        </td>
                        <td class="ties">
                            <p>TIES</p>
                            <p>{{ gameInfo.tieScore }}</p>
                        </td>
                        <td class="bot-score">
                            <p>BOT SCORE</p>
                            <p>{{ gameInfo.aiScore }}</p>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </section>
    <section id="section-singleplayer-modal" v-if="gameInfo.playerWinner">
        <div class="container-winners-modal">
            <canvas id="confetti"></canvas>
            <div class="icon-star" v-if="gameInfo.playerWinner == 'HUMAN'"><fa icon="star"/></div>
            <div class="icon-star-tie" v-if="gameInfo.playerWinner == 'TIE'">
                <div class="star-half"><fa class='test' icon="star-half"/></div>
                <div class="star-full"><fa class='test' icon="star"/></div>
            </div>
            <div class="modal-text">
                <p class="text-congratulation" v-if="gameInfo.playerWinner == 'HUMAN'">CONGRATULATION</p>
                <p class="text-result" v-if="gameInfo.playerWinner == 'HUMAN'">YOU WON!</p>
                <p class="text-congratulation" v-if="gameInfo.playerWinner == 'TIE'">NICE TRY</p>
                <p class="text-result" v-if="gameInfo.playerWinner == 'TIE'">TIE GAME!</p>
                <p class="text-congratulation" v-if="gameInfo.playerWinner == 'AI'">BETTER LUCK NEXT TIME</p>
                <p class="text-result" v-if="gameInfo.playerWinner == 'AI'">YOU LOSE!</p>
            </div>
            <div class="container-btn">
                <button type="button" @click="goHome"><fa class="btn-leave" icon="right-from-bracket" /></button>
                <button type="button" @click="playAgain"><fa class="btn-play-again" icon="arrow-rotate-left"/></button>
            </div>
        </div>
    </section>
</template>

<script>
    import ConfettiGenerator from "confetti-js";

    export default {
        name: 'SinglePlayer',
        props: {
            humanMark: String
        },
        data() {
            return {
                gameInfo: {
                    difficulty: '',
                    humanMark: '',
                    aiMark: '',
                    humanScore: 0,
                    aiScore: 0,
                    tieScore: 0,
                    numberOfMark: 0,
                    playerTurn: '',
                    playerWinner: '',
                    board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                    markRecord: [],
                    time: 15,
                    runTime: null,
                    boardRecord: [[]],
                    winCombinations: [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[6, 4, 2]],
                }
            }
        },
        mounted() {
            let tiles = document.querySelectorAll('.tiles');
            // Disable events for entire tiles
            for(let i = 0; i < tiles.length; i++) tiles[i].addEventListener('click', this.clickedTile, false);
            if(this.$route.params.humanMark != 'X') {
                this.gameInfo.playerTurn == 'AI';
                this.gameInfo.humanMark = 'O';
                this.gameInfo.aiMark = 'X';
                this.turn(Math.ceil(Math.random()*9), this.gameInfo.aiMark);
                document.getElementById('human-player').classList.add('profile-human-o');
                document.getElementById('ai-player').classList.add('profile-human-x');
            } else {
                this.gameInfo.playerTurn = 'HUMAN';
                this.gameInfo.humanMark = 'X';
                this.gameInfo.aiMark = 'O';
                document.getElementById('human-player').classList.add('profile-human-x');
                document.getElementById('ai-player').classList.add('profile-human-o');
            }

            this.gameInfo.difficulty = this.$route.params.difficulty;
            this.gameInfo.runTime = setInterval(() => this.gameInfo.time -= 1, 1000);
            // if(this.gameInfo.playerWinner) this.confetti();
        },
        methods: {
            goBack() {
                this.$router.go(-2);
            },
            goHome() {
                clearInterval(this.gameInfo.runTime);
                this.gameInfo.playerTurn = 'HUMAN';
                this.gameInfo.playerWinner = '';
                this.gameInfo.humanScore = 0;
                this.gameInfo.aiScore = 0;
                this.gameInfo.tieScore = 0;
                this.gameInfo.numberOfMark = 0;
                this.gameInfo.markRecord = [];
                this.gameInfo.time = 15;
                this.gameInfo.boardRecord = [[]];
                this.$router.push({ name: 'home' });
            },
            playAgain() {
                let tiles = document.querySelectorAll('.tiles');
                let board = this.gameInfo.board.reduce((total, currentValue, currentIndex) => (typeof currentValue !== 'number') ? total.concat(currentIndex) : total, []);

                for(let index of board) {
                    document.getElementById(`tile${index}`).removeChild(document.getElementById(`tile${index}`).lastChild);
                    document.getElementById(`tile${index}`).classList.remove('active');
                }

                this.gameInfo.board = Array.from(Array(9).keys());
                for(let index = 0; index < this.gameInfo.board.length; index++) {
                    tiles[index].addEventListener('click', this.clickedTile, false);
                }

                this.gameInfo.playerTurn = (this.gameInfo.aiMark == 'X') ? 'HUMAN' : 'AI';
                [this.gameInfo.humanMark, this.gameInfo.aiMark] = [this.gameInfo.aiMark, this.gameInfo.humanMark];  
                this.gameInfo.playerWinner = '';
                this.gameInfo.numberOfMark = 0;
                this.gameInfo.markRecord = [];
                this.gameInfo.time = 15;
                this.gameInfo.boardRecord = [[]];

                document.getElementById('human-player').removeAttribute('class');
                document.getElementById('ai-player').removeAttribute('class');
                
                if(this.gameInfo.aiMark == 'X') {
                    this.gameInfo.playerTurn == 'AI';
                    this.gameInfo.humanMark = 'O';
                    this.turn(4, this.gameInfo.aiMark);
                    document.getElementById('human-player').classList.add('profile-human-o');
                    document.getElementById('ai-player').classList.add('profile-human-x');
                } else {
                    document.getElementById('human-player').classList.add('profile-human-x');
                    document.getElementById('ai-player').classList.add('profile-human-o');
                }
            },
            confetti() {
                let confettiSettings = { target: 'confetti', size: 1.5, rotate: true, respawn: false, clock: 10, colors: [[255, 0, 0], [174, 0, 255], [0, 255, 89], [0, 162, 255]] };
                let confetti = new ConfettiGenerator(confettiSettings);
                confetti.render();
            },
            undo() {
                if(this.gameInfo.markRecord.length != 0) {
                    let markRecord = this.gameInfo.markRecord.splice(-2, 2);
                    markRecord.forEach(index => {
                        document.getElementById(`tile${index}`).removeChild(document.getElementById(`tile${index}`).lastChild);
                        this.gameInfo.board[index] = index;
                    });

                    // let tile = document.getElementById(`tile${markRecord}`);

                    // this.gameInfo.boardRecord.pop();
                    // this.gameInfo.board = JSON.parse(JSON.stringify(this.gameInfo.boardRecord[this.gameInfo.boardRecord.length - 1]));
                    // tile.removeChild(tile.lastChild);
                    // document.getElementById(`tile{markRecord}`).removeChild(span);
                }
            },
            enableEvents() {
                let tiles = document.querySelectorAll('.tiles');
                // Disable events for entire tiles
                for(let i = 0; i < tiles.length; i++) {
                    tiles[i].addEventListener('click', this.clickedTile, false);
                }
            },
            disableEvents() {
                let tiles = document.querySelectorAll('.tiles');
                // Disable events for entire tiles
                for(let i = 0; i < tiles.length; i++) {
                    tiles[i].removeEventListener('click', this.clickedTile, false);
                }
            },
            clickedTile(tile) {
                let tileId = Number(tile.target.id.slice(-1));
                
                // Check if the value of board array's index based on id of the cell is a number.
                // If it contains a type of number, then it means that it's already taken.
                if(typeof this.gameInfo.board[tileId] == 'number') {
                    let { humanMark, aiMark } = this.gameInfo;

                    // checkTie function will return true if it's a tie, else false.
                    // bestSpot function will return the first empty spot in array.
                    this.gameInfo.runTime = setInterval(() => this.gameInfo.time -= 1, 1000);
                    setTimeout(() => (!this.checkTie()) ? this.turn(this.bestSpot(), aiMark) : "", Math.ceil((Math.random()*3)+1)*1000); 
                    clearInterval(this.gameInfo.runTime);
                    
                    // Disable events for entire cells
                    this.gameInfo.runTime = setInterval(() => this.gameInfo.time -= 1, 1000);
                    if(!this.checkTie()) {
                        if(this.turn(tileId, humanMark) !== undefined) return;
                    }
                    clearInterval(this.gameInfo.runTime);
                    this.disableEvents();
                }
            },
            gameOver(gameWon) {
                let cells = document.querySelectorAll('.cells');
                let { winCombinations, humanMark } = this.gameInfo;

                clearInterval(this.gameInfo.runTime);

                // Obtaining 3 index of winning combinations and loop based on length (which is 3)
                for(let index of winCombinations[gameWon.index]) {
                    // Having blue background color if mark is human, else red
                    document.getElementById(`tile${index}`).classList.add('active');
                }

                // Disable events for entire cells
                for(let i = 0; i < cells.length; i++) {
                    cells[i].removeEventListener('click', this.clickedTile, false);
                }

                if(gameWon.mark == humanMark) {
                    this.gameInfo.playerWinner = 'HUMAN';
                    this.gameInfo.humanScore++;
                }
                if(gameWon.mark != humanMark) {
                    this.gameInfo.playerWinner = 'AI';
                    this.gameInfo.aiScore++;
                }
            },
            emptySquares() {
                let { board } = this.gameInfo;
                let availableTiles = board.filter(e => typeof e == 'number');
                // Filter array that will return the empty spot of the board.
                // Empty spot if it contains numbers
                // Filled spot if it contains either 'X' or 'O'
                return availableTiles;
            },
            checkTie() {
                let cells = document.querySelectorAll('.cells');

                clearInterval(this.gameInfo.runTime);

                if(this.emptySquares().length == 0) {
                    for(let i = 0; i < cells.length; i++) {
                        cells[i].style.backgroundColor = 'green';
                        cells[i].removeEventListener('click', this.clickedTile, false);
                    }
                    this.gameInfo.tieScore++;
                    return true;
                }
                return false;
            },
            declareWinner(winnerPlayer) {
                this.gameInfo.playerWinner = winnerPlayer;
            },
            turn(tileId, playerMark) {
                let span = document.createElement('span');
                let tile = document.getElementById(`tile${tileId}`);
                span.setAttribute('class', `mark-${playerMark}`);

                this.gameInfo.playerTurn = (playerMark == this.gameInfo.humanMark ? 'AI' : 'HUMAN');
                
                let { board } = this.gameInfo;
                // Putting playerMark on array, the position is based on ID
                board[tileId] = playerMark;

                // Putting playerMark on cell, the cell position is based on ID
                tile.appendChild(span);
                // document.getElementById(`tile${tileId}`).textContent = playerMark;

                // gameWon contains an object {} that returned by checkWin function
                let gameWon = this.checkWin(board, playerMark);
                if(gameWon) {
                    this.gameOver(gameWon);
                    (gameWon.mark == this.gameInfo.humanMark) ? this.declareWinner('HUMAN'): this.declareWinner('AI');
                    return gameWon.index;
                }
                
                if(this.emptySquares().length == 0) this.declareWinner('TIE');

                this.gameInfo.boardRecord.push(JSON.parse(JSON.stringify(board)));
                this.gameInfo.markRecord.push(tileId);
                this.gameInfo.time = 15;

                if(playerMark != this.gameInfo.humanMark) this.enableEvents();
            },
            bestSpot() {
                let { board, aiMark, difficulty } = this.gameInfo;
                // getting the index which is property of returned object of minimax function.
                // return this.minimax(board, aiMark).index;
                    // return this.emptySquares()[0];
                try {
                    // return this.emptySquares()[0];
                    if(difficulty == 'easy') return this.emptySquares()[Math.ceil(Math.random()*this.emptySquares().length)];
                    if(difficulty == 'medium') return this.emptySquares()[Math.ceil(Math.random()*this.emptySquares().length)];
                    if(difficulty == 'difficult') return this.minimax(board, aiMark, false).index;
                } catch (error) {
                    console.log(error);
                }
            },
            checkWin(thisBoard) {
                let humanPlays = thisBoard.reduce((total, currentValue, currentIndex) => (currentValue === this.gameInfo.humanMark) ? total.concat(currentIndex) : total, []);
                let aiPlays = thisBoard.reduce((total, currentValue, currentIndex) => (currentValue === this.gameInfo.aiMark) ? total.concat(currentIndex) : total, []);
                let score = null;
                let { winCombinations } = this.gameInfo;

                for(let [index, array] of winCombinations.entries()) {
                    if(array.every(elem => humanPlays.indexOf(elem) > -1)) {
                        return {index: index, mark: this.gameInfo.humanMark, scores: -10};
                    }
                    if(array.every(elem => aiPlays.indexOf(elem) > -1)) {
                        return  {index: index, mark: this.gameInfo.aiMark, scores: 10};
                    }
                }
    
                return score;
            },
            minimax(currentState, player, isMaximizingPlayer) {
                let availableSpots = this.emptySquares(currentState);
                let { humanMark, aiMark } = this.gameInfo;
                if(this.checkWin(currentState)) return this.checkWin(currentState);

                if(availableSpots.length == 0) return {scores: 0};

                let moves = [];

                for(let i = 0; i < availableSpots.length; i++) {
                    let move = {};

                    move.index = currentState[availableSpots[i]];
                    
                    currentState[availableSpots[i]] = player;

                    if(!isMaximizingPlayer) {
                        let result = this.minimax(currentState, humanMark, true);
                        move.scores = result.scores;
                        
                    } else {
                        let result = this.minimax(currentState, aiMark, false);
                        move.scores = result.scores;
                        
                    }

                    currentState[availableSpots[i]] = move.index;

                    moves.push(move);
                }

                let bestMove;

                if(!isMaximizingPlayer) {
                    let bestScore = -Infinity;
                    
                    for(let i = 0; i < moves.length; i++) {
                        if (moves[i].scores > bestScore) {
                            bestScore = moves[i].scores;
                            bestMove = i;
                        }
                    }
                } else {
                    let bestScore = Infinity;
                    for(let i = 0; i < moves.length; i++) {
                        if (moves[i].scores < bestScore) {
                            bestScore = moves[i].scores;
                            bestMove = i;
                        }
                    }
                }

                return moves[bestMove];
            }
        }
    }
</script>

<style lang="css" scoped>
  @import '../../css/Purple_Theme/Small_Screen/singleplayer.css';
</style>