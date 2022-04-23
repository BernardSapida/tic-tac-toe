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
                <div class="profile-you">
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
                <div class="profile-bot">
                    <p>BOT</p>
                    <div>
                        <div><fa icon="robot"/></div>
                    </div>
                    <p class="turn" v-if="gameInfo.playerTurn == 'AI'">TURN</p>
                </div>
            </div>
            <table class="container-board">
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
                <div class="result-score">
                    <div class="player-score">
                        <p @click="none">YOUR SCORE</p>
                        <p>3</p>
                    </div>
                    <div class="ties">
                        <p>TIES</p>
                        <p>1</p>
                    </div>
                    <div class="bot-score">
                        <p>BOT SCORE</p>
                        <p>6</p>
                    </div>
                </div>
            </table>
        </div>
    </section>
    <!-- <div class="section-singleplayer-modal" @click="confetti">
        <canvas id="my-canvas" @click="confetti"></canvas>
    </div> -->
</template>

<script>
    import ConfettiGenerator from "confetti-js";

    export default {
        name: 'SinglePlayer',
        data() {
            return {
                gameInfo: {
                    humanMark: 'X',
                    aiMark: 'O',
                    numberOfMark: 0,
                    playerTurn: '',
                    board:[0, 1, 2, 3, 4, 5, 6, 7, 8],
                    markRecord: [],
                    time: 15,
                    boardRecord: [[[null, null, null],[null, null, null],[null, null, null]]],
                    winCombinations: [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[6, 4, 2]],
                }
            }
        },
        mounted() {
            let tiles = document.querySelectorAll('.tiles');
            // Disable events for entire tiles
            for(let i = 0; i < tiles.length; i++) {
                tiles[i].addEventListener('click', this.clickedTile, false);
            }
        },
        methods: {
            goBack() {
                this.$router.go(-2);
            },
            confetti() {
                let confettiSettings = { target: 'my-canvas', size: 1.5, rotate: true, clock: 15, colors: [[255, 0, 0], [174, 0, 255], [0, 255, 89], [0, 162, 255]] };
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
            // stopTime(time) {
            //     console.log('TIME STOPPED!');
            //     clearInterval(time, 15000);
            // },
            gameOver(gameWon) {
                let cells = document.querySelectorAll('.cells');
                let { winCombinations, humanMark } = this.gameInfo;

                // Obtaining 3 index of winning combinations and loop based on length (which is 3)
                for(let index of winCombinations[gameWon.index]) {
                    
                    // Having blue background color if mark is human, else red
                    document.getElementById(`tile${index}`).classList.add('active');
                }

                // Disable events for entire cells
                for(let i = 0; i < cells.length; i++) {
                    cells[i].removeEventListener('click', this.clickedTile, false);
                }
            },
            emptySquares() {
                let { board } = this.gameInfo;

                // Filter array that will return the empty spot of the board.
                // Empty spot if it contains numbers
                // Filled spot if it contains either 'X' or 'O'
                return board.filter(e => typeof e == 'number');
            },
            checkTie() {
                let cells = document.querySelectorAll('.cells');

                if(this.emptySquares().length == 0) {
                    for(let i = 0; i < cells.length; i++) {
                        cells[i].style.backgroundColor = 'green';
                        cells[i].removeEventListener('click', this.clickedTile, false);
                    }
                    // declareWinner('Tie Game!');
                    return true;
                }
                return false;
            },
            clickedTile(tile) {
                let tileId = Number(tile.target.id.slice(-1));
                // Check if the value of board array's index based on id of the cell is a number.
                // If it contains a type of number, then it means that it's already taken.
                if(typeof this.gameInfo.board[tileId] == 'number') {
                    let { humanMark, aiMark } = this.gameInfo;
                    
                    // let time = setInterval(() => this.gameInfo.time -= 1, 1000);
                    
                    // Get the id of cell that have been clicked && humanMark ('O')
                    // setTimeout(() => clearInterval(decreaseTime), this.gameInfo.time*1000);
                    // this.gameInfo.time = 15;
                    // if(this.turn(tileId, humanMark) !== undefined) return 0;
                    
                    // Disable events for entire cells
                    if(this.turn(tileId, humanMark) !== undefined) return;
                    this.disableEvents();

                    // checkTie function will return true if it's a tie, else false.
                    // bestSpot function will return the first empty spot in array.
                    setTimeout(() => (!this.checkTie()) ? this.turn(this.bestSpot(), aiMark) : "", 750);
                }
            },
            turn(tileId, playerMark) {
                let span = document.createElement('span');
                let tile = document.getElementById(`tile${tileId}`);
                span.setAttribute('id', `mark-${playerMark}`);

                this.gameInfo.playerTurn = (playerMark == 'X' ? 'AI' : 'HUMAN');
                
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
                    return gameWon.index;
                }

                this.gameInfo.boardRecord.push(JSON.parse(JSON.stringify(board)));
                this.gameInfo.markRecord.push(tileId);
                this.gameInfo.time = 15;

                if(playerMark != 'X') this.enableEvents();
            },
            bestSpot() {
                let { board, aiMark } = this.gameInfo;
                // getting the index which is property of returned object of minimax function.
                // return this.minimax(board, aiMark).index;
                    // return this.emptySquares()[0];
                try {
                    // return this.emptySquares()[0];
                    return this.minimax(board, aiMark, false).index;
                } catch (error) {
                    console.log(error);
                }
            },
            checkWin(thisBoard) {
                let xPlays = thisBoard.reduce((total, currentValue, currentIndex) => (currentValue === 'X') ? total.concat(currentIndex) : total, []);
                let oPlays = thisBoard.reduce((total, currentValue, currentIndex) => (currentValue === 'O') ? total.concat(currentIndex) : total, []);
                let score = null;
                let { winCombinations } = this.gameInfo;

                for(let [index, array] of winCombinations.entries()) {
                    if(array.every(elem => xPlays.indexOf(elem) > -1)) {
                        return {index: index, mark: 'X', scores: -10};
                    }
                    if(array.every(elem => oPlays.indexOf(elem) > -1)) {
                        return  {index: index, mark: 'O', scores: 10};
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