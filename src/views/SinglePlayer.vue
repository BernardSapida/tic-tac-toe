<template>
    <header class="header-singleplayer">
        <button type="button" @click="goBack"><fa icon="arrow-left"/></button>
        <div>
            <p><span><fa icon="trophy"/></span>EASY</p>
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
                    <p class="turn">TURN</p>
                </div>
                <div class="profile-time">
                    <div class="profile-time-primary">
                        <div>
                            <p><span><fa icon="hourglass"/></span><br>15 SECS</p>
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
                    <p class="turn">TURN</p>
                </div>
            </div>
            <div class="board-score">
                <div class="board">
                    <div id="tile1" @click="tile1">
                        <div class="vertical-line"><span class="dot"></span></div>
                        <div class="horizontal-line"><span class="dot"></span></div>
                        <div class="right-diagonal-line"><span class="dot"></span></div>
                    </div>
                    <div id="tile2" @click="tile2">
                        <div class="vertical-line"><span class="dot"></span></div>
                    </div>
                    <div id="tile3" @click="tile3">
                        <div class="vertical-line"><span class="dot"></span></div>
                        <div class="left-diagonal-line"><span class="dot"></span></div>
                    </div>
                    <div id="tile4" @click="tile4">
                        <div class="horizontal-line"><span class="dot"></span></div>
                    </div>
                    <div id="tile5" @click="tile5">
                    </div>
                    <div id="tile6" @click="tile6">
                    </div>
                    <div id="tile7" @click="tile7">
                        <div class="horizontal-line"><span class="dot"></span></div>
                    </div>
                    <div id="tile8" @click="tile8">
                    </div>
                    <div id="tile9" @click="tile9">
                    </div>
                </div>
                <div class="result-score">
                    <div class="player-score">
                        <p>YOUR SCORE</p>
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
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'SinglePlayer',
        data() {
            return {
                gameInfo: {
                    numberOfMark: 0,
                    markPositions: [],
                    board: [[null, null, null],[null, null, null],[null, null, null]],
                    boardRecord: [[[null, null, null],[null, null, null],[null, null, null]]],
                    isOccupied: {
                        tile1: false,
                        tile2: false,
                        tile3: false,
                        tile4: false,
                        tile5: false,
                        tile6: false,
                        tile7: false,
                        tile8: false,
                        tile9: false,
                    }
                }
            }
        },
        methods: {
            analyzeBoard() {
                let markPositions  = this.gameInfo.markPositions;

                this.gameInfo.boardRecord.push(JSON.parse(JSON.stringify(this.gameInfo.board)));
                // if (this.gameInfo.numberOfMark >= 5) {
                    this.gameInfo.board.forEach((current, i, arr) => {
                        if ((new Set(current)).size == 1 && Array.from(new Set(current))[0] != null) console.log(`Player ${Array.from(new Set(current))[0]} Win!`);
                        // if (current[i][arr.length-i-1] == playerMark) console.log("Player Win!");
                        // if (current[i][0] == playerMark) console.log("Player Win!");
                        // if (current[i][1] == playerMark) console.log("Player Win!");
                        // if (current[i][2] == playerMark) console.log("Player Win!");
                        // if (current[0][i] == playerMark) console.log("Player Win!");
                        // if (current[1][i] == playerMark) console.log("Player Win!");
                        // if (current[2][i] == playerMark) console.log("Player Win!");
                    });
                // }
                    
            },
            goBack() {
                this.$router.go(-2);
            },
            undo() {
                if(this.gameInfo.markPositions.length != 0) {
                    let removedMarkPosition = this.gameInfo.markPositions.pop();
                    let previousElement = document.getElementById(removedMarkPosition);

                    this.gameInfo.boardRecord.pop();
                    this.gameInfo.board = this.gameInfo.boardRecord[this.gameInfo.boardRecord.length - 1];

                    console.log(this.gameInfo.board);

                    previousElement.removeChild(previousElement.lastChild);
                    this.gameInfo.isOccupied[removedMarkPosition] = false;
                    this.numberOfMark--;
                }
            },
            tile1() {
                if(!this.gameInfo.isOccupied.tile1) {
                    var span = document.createElement('span');
                    var tile1 = document.getElementById('tile1');
                    
                    if(this.gameInfo.numberOfMark % 2 == 0) {
                        span.classList.add('mark-x');
                        this.gameInfo.board[0][0] = 'x';
                    } else {
                        span.classList.add('mark-o');
                        this.gameInfo.board[0][0] = 'o';
                    }

                    tile1.appendChild(span);
                    
                    this.gameInfo.markPositions.push('tile1');
                    this.gameInfo.numberOfMark++;
                    this.gameInfo.isOccupied.tile1 = true;
                    this.analyzeBoard();
                }
            },
            tile2() {
                if(!this.gameInfo.isOccupied.tile2) {
                    var span = document.createElement('span');
                    var tile2 = document.getElementById('tile2');

                    if(this.gameInfo.numberOfMark % 2 == 0) {
                        span.classList.add('mark-x');
                        this.gameInfo.board[0][1] = 'x';
                    }
                    

                    if(this.gameInfo.numberOfMark % 2 != 0) {
                        span.classList.add('mark-o');
                        this.gameInfo.board[0][1] = 'o';
                    }

                    tile2.appendChild(span);

                    this.gameInfo.markPositions.push('tile2');
                    this.gameInfo.numberOfMark++;
                    this.gameInfo.isOccupied.tile2 = true;
                    this.analyzeBoard();
                }
            },
            tile3() {
                if(!this.gameInfo.isOccupied.tile3) {
                    var span = document.createElement('span');
                    var tile3 = document.getElementById('tile3');

                    if(this.gameInfo.numberOfMark % 2 == 0) {
                        span.classList.add('mark-x');
                        this.gameInfo.board[0][2] = 'x';
                    }

                    if(this.gameInfo.numberOfMark % 2 != 0) {
                        span.classList.add('mark-o');
                        this.gameInfo.board[0][2] = 'o';
                    }

                    tile3.appendChild(span);

                    this.gameInfo.markPositions.push('tile3');
                    this.gameInfo.numberOfMark++;
                    this.gameInfo.isOccupied.tile3 = true;
                    this.analyzeBoard();
                }
            },
            tile4() {
                if(!this.gameInfo.isOccupied.tile4) {
                    var span = document.createElement('span');
                    var tile4 = document.getElementById('tile4');

                    if(this.gameInfo.numberOfMark % 2 == 0) {
                        span.classList.add('mark-x');
                        this.gameInfo.board[1][0] = 'x';
                    }

                    if(this.gameInfo.numberOfMark % 2 != 0) {
                        span.classList.add('mark-o');
                        this.gameInfo.board[1][0] = 'o';
                    }
                    


                    tile4.appendChild(span);

                    this.gameInfo.markPositions.push('tile4');
                    this.gameInfo.numberOfMark++;
                    this.gameInfo.isOccupied.tile4 = true;
                    this.analyzeBoard();
                }
            },
            tile5() {
                if(!this.gameInfo.isOccupied.tile5) {
                    var span = document.createElement('span');
                    var tile5 = document.getElementById('tile5');

                    if(this.gameInfo.numberOfMark % 2 == 0) {
                        span.classList.add('mark-x');
                        this.gameInfo.board[1][1] = 'x';
                    }
                    if(this.gameInfo.numberOfMark % 2 != 0) {
                        span.classList.add('mark-o');
                        this.gameInfo.board[1][1] = 'o';
                    }
                    tile5.appendChild(span);

                    this.gameInfo.markPositions.push('tile5');
                    this.gameInfo.numberOfMark++;
                    this.gameInfo.isOccupied.tile5 = true;
                    this.analyzeBoard();
                }
            },
            tile6() {
                if(!this.gameInfo.isOccupied.tile6) {
                    var span = document.createElement('span');
                    var tile6 = document.getElementById('tile6');

                    if(this.gameInfo.numberOfMark % 2 == 0) {
                        span.classList.add('mark-x');
                        this.gameInfo.board[1][2] = 'x';
                    }

                    if(this.gameInfo.numberOfMark % 2 != 0) {
                        span.classList.add('mark-o');
                        this.gameInfo.board[1][2] = 'o';
                    }

                    tile6.appendChild(span);

                    this.gameInfo.markPositions.push('tile6');
                    this.gameInfo.numberOfMark++;
                    this.gameInfo.isOccupied.tile6 = true;
                    this.analyzeBoard();
                }
            },
            tile7() {
                if(!this.gameInfo.isOccupied.tile7) {
                    var span = document.createElement('span');
                    var tile7 = document.getElementById('tile7');

                    if(this.gameInfo.numberOfMark % 2 == 0) {
                        span.classList.add('mark-x');
                        this.gameInfo.board[2][0] = 'x';
                    }
                    

                    if(this.gameInfo.numberOfMark % 2 != 0) {
                        span.classList.add('mark-o');
                        this.gameInfo.board[2][0] = 'o';
                    }
                    


                    tile7.appendChild(span);

                    this.gameInfo.markPositions.push('tile7');
                    this.gameInfo.numberOfMark++;
                    this.gameInfo.isOccupied.tile7 = true;
                    this.analyzeBoard();
                }
            },
            tile8() {
                if(!this.gameInfo.isOccupied.tile8) {
                    var span = document.createElement('span');
                    var tile8 = document.getElementById('tile8');

                    if(this.gameInfo.numberOfMark % 2 == 0) {
                        span.classList.add('mark-x');
                        this.gameInfo.board[2][1] = 'x';
                    }

                    if(this.gameInfo.numberOfMark % 2 != 0) {
                        span.classList.add('mark-o');
                        this.gameInfo.board[2][1] = 'o';
                    }


                    tile8.appendChild(span);

                    this.gameInfo.markPositions.push('tile8');
                    this.gameInfo.numberOfMark++;
                    this.gameInfo.isOccupied.tile8 = true;
                    this.analyzeBoard();
                }
            },
            tile9() {
                if(!this.gameInfo.isOccupied.tile9) {
                    var span = document.createElement('span');
                    var tile9 = document.getElementById('tile9');

                    if(this.gameInfo.numberOfMark % 2 == 0) {
                        span.classList.add('mark-x');
                        this.gameInfo.board[2][2] = 'x';
                    }

                    if(this.gameInfo.numberOfMark % 2 != 0) {
                        span.classList.add('mark-o');
                        this.gameInfo.board[2][2] = 'o';
                    }


                    tile9.appendChild(span);

                    this.gameInfo.markPositions.push('tile9');
                    this.gameInfo.numberOfMark++;
                    this.gameInfo.isOccupied.tile9 = true;
                    this.analyzeBoard();
                }
            },
        }
    }
</script>

<style lang="css" scoped>
  @import '../../css/Purple_Theme/Small_Screen/singleplayer.css';
</style>