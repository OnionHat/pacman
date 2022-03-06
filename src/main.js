import Pacman from './pacman.js'
import Blinky from './blinky.js'
import Ghost from './ghost.js'
import Pinky from './pinky.js'
import Inky from './inky.js'
import Clyde from './clyde.js'
import Pellet from './pellet.js'

const canvas = document.getElementsByTagName('canvas')[0];
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
const SCALE = 2;
const spriteMap = document.getElementById("sprite");
const tileMap = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 2, 2, 2, 2, 2, 2, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 2, 2, 2, 2, 2, 2, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

// game HUD
let pLives = document.getElementById("lives");
let pScore = document.getElementById("score");

let boardSprite = {
    sx: 0, sy: 0,
    sw: 224, sh: 248,
    dx: 0, dy: 0,
    dw: 224, dh: 248,
}

let pacman = new Pacman(ctx, tileMap);
let blinky = new Blinky(ctx, tileMap);
let pinky = new Pinky(ctx, tileMap);
let inky = new Inky(ctx, tileMap);
let clyde = new Clyde(ctx, tileMap);
let pellets = [];

function drawBoard() {
    ctx.drawImage(spriteMap, boardSprite.sx, boardSprite.sy,
        boardSprite.sw, boardSprite.sh,
        boardSprite.dx, boardSprite.dy,
        boardSprite.dw, boardSprite.dh)
}


function initPellets() {
    for (let y = 0; y < tileMap.length; y++) {
        pellets.push([]);
        for (let x = 0; x < tileMap[y].length; x++) {
            pellets[y].push(new Pellet(ctx, x * 8, y * 8));
            if (tileMap[y][x] != 1) {
                pellets[y][x].isEaten = true;
            }
        }
    }
}

function drawPellets() {
    for (let y = 0; y < pellets.length; y++) {
        for (let x = 0; x < pellets[y].length; x++) {
            pellets[y][x].draw();
        }
    }
}

function drawGameoverScreen() {
    ctx.font = "40px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", (boardSprite.dw) / 2, (boardSprite.dh) / 2);
    ctx.font = "10px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Press r to restart", (boardSprite.dw) / 2, (boardSprite.dh) / 2 + 15);
}

function resetGame() {

    pacman = new Pacman(ctx, tileMap);
    pacman.lives = 3;
    pLives.innerText = "Lives: " + pacman.lives;
    blinky = new Blinky(ctx, tileMap);
    pinky = new Pinky(ctx, tileMap);
    inky = new Inky(ctx, tileMap);
    clyde = new Clyde(ctx, tileMap);
    pellets = [];
    initPellets();
}

ctx.canvas.width = boardSprite.sw * SCALE;
ctx.canvas.height = boardSprite.sh * SCALE;
ctx.scale(SCALE, SCALE);
initPellets();


// https: stackoverflow.com/a/2001955
let isPause = false;
let gameover = false;
let intervall = setInterval(() => {
    if (!isPause && !gameover) {
        drawBoard();

        pacman.update(pellets, pScore);
        blinky.update(pacman);
        pinky.update(pacman);
        inky.update(pacman, blinky);
        clyde.update(pacman);

        drawPellets();
        pacman.draw();
        blinky.draw();
        pinky.draw();
        inky.draw();
        clyde.draw(pacman);

        if (pacman.cheackIfDied(blinky, pinky, inky, clyde, pLives)) {
            gameover = true;
            drawGameoverScreen();
        }
    }
}, 1000 / 10);

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "w":
            pacman.newDirection(0, -1);
            break;
        case "a":
            pacman.newDirection(-1, 0);
            break;
        case "s":
            pacman.newDirection(0, 1);
            break;
        case "d":
            pacman.newDirection(1, 0);
            break;
        case "p":
            if (!gameover)
                isPause = !isPause;
            break;
        case "q":
            gameover = !gameover;
            break;
        case "r":
            if (gameover) {
                gameover = false;
                resetGame();
            }
            break;
        case "t":
            if (!gameover)
                Ghost.showTarget = !Ghost.showTarget;
            break;

    }
}, true)
