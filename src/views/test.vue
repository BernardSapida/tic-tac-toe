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
            <table class="container-board">
                <tr class="board">
                    <td><div id="tile1" @click="tile1"></div></td>
                    <td><div id="tile2" @click="tile2"></div></td>
                    <td><div id="tile3" @click="tile3"></div></td>
                </tr>
                <tr class="board">
                    <td><div id="tile4" @click="tile4"></div></td>
                    <td><div id="tile5" @click="tile5"></div></td>
                    <td><div id="tile6" @click="tile6"></div></td>
                </tr>
                <tr class="board">
                    <td><div id="tile7" @click="tile7"></div></td>
                    <td><div id="tile8" @click="tile8"></div></td>
                    <td><div id="tile9" @click="tile9"></div></td>
                </tr>
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
                    haveResult: null,
                    numberOfMark: 0,
                    markPositions: [],
                    board: null,
                    boardRecord: [[[null, null, nul l],[null, null, null],[null, null, null]]],
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
            goBack() {
                this.$router.go(-2);
            },
            confetti() {
                let confettiSettings = { target: 'my-canvas', size: 1.5, rotate: true, clock: 15, colors: [[255, 0, 0], [174, 0, 255], [0, 255, 89], [0, 162, 255]] };
                let confetti = new ConfettiGenerator(confettiSettings);
                confetti.render();
            },
            analyzeBoard() {
                let div = document.createElement("div");
                let span = document.createElement("span");

                span.classList.add('dot');
                div.appendChild(span);

                this.gameInfo.boardRecord.push(JSON.parse(JSON.stringify(this.gameInfo.board)));
                if (this.gameInfo.numberOfMark >= 5) {
                    this.gameInfo.board.forEach((current, i, arr) => {
                        if(this.gameInfo.haveResult == null) {
                            // VERTICAL
                            if (((new Set([arr[0][i], arr[1][i], arr[2][i]]).size) == 1 && Array.from(new Set([arr[0][i], arr[1][i], arr[1][i]]))[0] != null)) {
                                if(i == 0) {
                                    document.getElementById('tile1').classList.add('active');
                                    document.getElementById('tile4').classList.add('active');
                                    document.getElementById('tile7').classList.add('active');
                                }
                                if(i == 1) {
                                    document.getElementById('tile2').classList.add('active');
                                    document.getElementById('tile5').classList.add('active');
                                    document.getElementById('tile8').classList.add('active');
                                }
                                if(i == 2) {
                                    document.getElementById('tile3').classList.add('active');
                                    document.getElementById('tile6').classList.add('active');
                                    document.getElementById('tile9').classList.add('active');
                                }
                                this.gameInfo.haveResult = Array.from(new Set([arr[0][i], arr[1][i], arr[2][i]]))[0];
                                return 0;
                            }

                            // HORIZONTAL
                            if ((new Set(current)).size == 1 && Array.from(new Set(current))[0] != null) {
                                if(i == 0) {
                                    document.getElementById('tile1').classList.add('active');
                                    document.getElementById('tile2').classList.add('active');
                                    document.getElementById('tile3').classList.add('active');
                                }
                                if(i == 1) {
                                    document.getElementById('tile4').classList.add('active');
                                    document.getElementById('tile5').classList.add('active');
                                    document.getElementById('tile6').classList.add('active');
                                }
                                if(i == 2) {
                                    document.getElementById('tile7').classList.add('active');
                                    document.getElementById('tile8').classList.add('active');
                                    document.getElementById('tile9').classList.add('active');
                                }
                                this.gameInfo.haveResult = Array.from(new Set(current))[0];
                                return 0;
                            }

                            // RIGHT DIAGONAL
                            if (((new Set([arr[0][0], arr[1][1], arr[2][2]]).size) == 1 && Array.from(new Set([arr[0][0], arr[1][1], arr[2][2]]))[0] != null)) {
                                document.getElementById('tile1').classList.add('active');
                                document.getElementById('tile5').classList.add('active');
                                document.getElementById('tile9').classList.add('active');
                                this.gameInfo.haveResult = Array.from(new Set([arr[0][0], arr[1][1], arr[2][2]]))[0];
                                return 0;
                            }
                            
                            // LEFT DIAGONAL
                            if (((new Set([arr[0][2], arr[1][1], arr[2][0]]).size) == 1 && Array.from(new Set([arr[0][2], arr[1][1], arr[1][0]]))[0] != null)) {
                                document.getElementById('tile3').classList.add('active');
                                document.getElementById('tile5').classList.add('active');
                                document.getElementById('tile7').classList.add('active');
                                this.gameInfo.haveResult = Array.from(new Set([arr[0][2], arr[1][1], arr[2][0]]))[0];
                                return 0;
                            }
                        }
                    });
                }
            },
            undo() {
                if(this.gameInfo.markPositions.length != 0 && this.gameInfo.haveResult == null) {
                    let removedMarkPosition = this.gameInfo.markPositions.pop();

                    this.gameInfo.boardRecord.pop();
                    this.gameInfo.board = JSON.parse(JSON.stringify(this.gameInfo.boardRecord[this.gameInfo.boardRecord.length - 1]));
                    
                    document.getElementById(`${removedMarkPosition}-mark`).remove();
                    this.gameInfo.isOccupied[removedMarkPosition] = false;
                    this.gameInfo.numberOfMark--;
                }
            },
            tile1() {
                if(!this.gameInfo.isOccupied.tile1 && this.gameInfo.haveResult == null) {
                    let span = document.createElement('span');
                    let tile1 = document.getElementById('tile1');
                    
                    if(this.gameInfo.numberOfMark % 2 == 0) {
                        span.classList.add('mark-x');
                        this.gameInfo.board[0][0] = 'x';
                    } else {
                        span.classList.add('mark-o');
                        this.gameInfo.board[0][0] = 'o';
                    }
                    span.setAttribute('id', 'tile1-mark');
                    tile1.appendChild(span);
                    
                    this.gameInfo.markPositions.push('tile1');
                    this.gameInfo.numberOfMark++;
                    this.gameInfo.isOccupied.tile1 = true;
                    this.analyzeBoard();
                }
            },
            tile2() {
                if(!this.gameInfo.isOccupied.tile2 && this.gameInfo.haveResult == null) {
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

                    span.setAttribute('id', 'tile2-mark');
                    tile2.appendChild(span);

                    this.gameInfo.markPositions.push('tile2');
                    this.gameInfo.numberOfMark++;
                    this.gameInfo.isOccupied.tile2 = true;
                    this.analyzeBoard();
                }
            },
            tile3() {
                if(!this.gameInfo.isOccupied.tile3 && this.gameInfo.haveResult == null) {
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

                    span.setAttribute('id', 'tile3-mark');
                    tile3.appendChild(span);

                    this.gameInfo.markPositions.push('tile3');
                    this.gameInfo.numberOfMark++;
                    this.gameInfo.isOccupied.tile3 = true;
                    this.analyzeBoard();
                }
            },
            tile4() {
                if(!this.gameInfo.isOccupied.tile4 && this.gameInfo.haveResult == null) {
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
                    
                    span.setAttribute('id', 'tile4-mark');
                    tile4.appendChild(span);

                    this.gameInfo.markPositions.push('tile4');
                    this.gameInfo.numberOfMark++;
                    this.gameInfo.isOccupied.tile4 = true;
                    this.analyzeBoard();
                }
            },
            tile5() {
                if(!this.gameInfo.isOccupied.tile5 && this.gameInfo.haveResult == null) {
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

                    span.setAttribute('id', 'tile5-mark');
                    tile5.appendChild(span);

                    this.gameInfo.markPositions.push('tile5');
                    this.gameInfo.numberOfMark++;
                    this.gameInfo.isOccupied.tile5 = true;
                    this.analyzeBoard();
                }
            },
            tile6() {
                if(!this.gameInfo.isOccupied.tile6 && this.gameInfo.haveResult == null) {
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

                    span.setAttribute('id', 'tile6-mark');
                    tile6.appendChild(span);

                    this.gameInfo.markPositions.push('tile6');
                    this.gameInfo.numberOfMark++;
                    this.gameInfo.isOccupied.tile6 = true;
                    this.analyzeBoard();
                }
            },
            tile7() {
                if(!this.gameInfo.isOccupied.tile7 && this.gameInfo.haveResult == null) {
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
                    
                    span.setAttribute('id', 'tile7-mark');
                    tile7.appendChild(span);

                    this.gameInfo.markPositions.push('tile7');
                    this.gameInfo.numberOfMark++;
                    this.gameInfo.isOccupied.tile7 = true;
                    this.analyzeBoard();
                }
            },
            tile8() {
                if(!this.gameInfo.isOccupied.tile8 && this.gameInfo.haveResult == null) {
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


                    span.setAttribute('id', 'tile8-mark');
                    tile8.appendChild(span);

                    this.gameInfo.markPositions.push('tile8');
                    this.gameInfo.numberOfMark++;
                    this.gameInfo.isOccupied.tile8 = true;
                    this.analyzeBoard();
                }
            },
            tile9() {
                if(!this.gameInfo.isOccupied.tile9 && this.gameInfo.haveResult == null) {
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

                    span.setAttribute('id', 'tile9-mark');
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