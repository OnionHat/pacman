import Pacman from './pacman.js'
import Tile from './tile.js'
import Blinky from './blinky.js';
import Pinky from './pinky.js';
import Inky from './inky.js';
import Vek2D from './vek2d.js';
import Clyde from './clyde.js';


class Spill {
    constructor() {
        this.canvas = document.getElementById('spillCanvas');
        /** @type {CanvasRenderingContext2D} */
        this.ctx = this.canvas.getContext('2d');
        this.scale = 2
        this.sprite = document.getElementById('sprite');

        this.brett = {
            sx: 0, sy: 0,
            sw: 8 * 28, sh: 8 * 31,
            dx: 0, dy: 0,
            dw: 8 * 28, dh: 8 * 31
        }

        this.pacman;

        this.blinky = null;
        this.pinky = null;
        this.inky = null;
        this.clyde = null;


        // laget ved hjelp av programmet tiled fra https://thorbjorn.itch.io/tiled
        // (-1) -> tomrom, 0 -> vegg, 1 -> små prikk (10 poeng), 2 -> stor prikk (50 poeng), 3 -> pacman, 
        // 4 -> blinky, 5 -> pinky, 6 -> inky, 7 -> clyde, 10 -> teleport, 12 -> port
        this.tileKart = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, -1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, -1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 12, 12, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],

            // [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 5, -1, -1, -1, -1, -1, -1, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 5, -1, 6, -1, 7, -1, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],

            [10, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, 10],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, -1, -1, -1, -1, -1, -1, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 2, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, -1, 3, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]

        this.tiles = [];
        this.poeng = document.getElementById('spillerPoeng');

        this.harSpilletStartet = false;
        this.startTid = null;
    }

    startSpillet() {
        this.harSpilletStartet = true;
        this.startTid = new Date();
    }

    oppsett() {
        this.ctx.canvas.width = 8 * 28 * this.scale
        this.ctx.canvas.height = 8 * 31 * this.scale
        this.ctx.scale(this.scale, this.scale)

        this.canvas.style.border = 'green solid 2px'



        // tilekart er har blitt vrid på med x og y, så y er rad
        for (let i = 0; i < this.tileKart.length; i++) {
            this.tiles.push([]);
            for (let j = 0; j < this.tileKart[i].length; j++) {
                this.tiles[i].push(new Tile(j, i))

                switch (this.tileKart[i][j]) {
                    case 0:
                        this.tiles[i][j].type.vegg = true
                        break;
                    case 1:
                        this.tiles[i][j].type.smaaDot = true
                        break;
                    case 2:
                        this.tiles[i][j].type.storDot = true
                        break;
                    case 3:
                        this.tiles[i][j].tomrom = true;
                        this.pacman = new Pacman(j, i);
                        break;
                    case 4:
                        this.tiles[i][j].tomrom = true;
                        this.blinky = new Blinky(j, i);
                        break;
                    case 5:
                        this.tiles[i][j].tomrom = true;
                        this.pinky = new Pinky(j, i);
                        break;
                    case 6:
                        this.tiles[i][j].tomrom = true;
                        this.inky = new Inky(j, i);
                        break;
                    case 7:
                        this.tiles[i][j].tomrom = true;
                        this.clyde = new Clyde(j, i);
                        break;
                    case 10:
                        this.tiles[i][j].type.teleportering = true
                        this.tiles[i][j].tomrom = true;
                        break;
                    case 12:
                        this.tiles[i][j].type.port = true
                        this.tiles[i][j].type.vegg = true
                        break;
                    default:
                        this.tiles[i][j].tomrom = true;
                        break;
                }
            }
        }
        this.poeng.innerHTML = 0;

        this.blinky.oppsett(this.tiles);
        this.pinky.oppsett(this.tiles);
        this.inky.oppsett(this.tiles);
        this.clyde.oppsett(this.tiles);
    }

    // kjør
    kjor() {
        let d = new Date();
        let deltaTid = (d - this.startTid) / 1000;
        this.startTid = d;

        this.pacman.oppdater(this.tiles);
        this.poeng.innerHTML = Number(this.poeng.innerHTML) + this.pacman.poengTeller(this.tiles);

        this.oppdaterSpokelsene(deltaTid);

        this.pacman.spistStorDot = true ? false : true;

        // console.log(this.blinky)

        this.ctx.drawImage(this.sprite, this.brett.sx, this.brett.sy, this.brett.sw, this.brett.sh, this.brett.dx, this.brett.dy, this.brett.dw, this.brett.dh);
        // funksjon for å lettere se cellenet
        // this.lagRuter();
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                this.tiles[i][j].tegn();
            }
        }




        this.pacman.tegn();
        this.tegnSpokelsene();



        // this.spokelser.blinky.velgRettning();
    }

    lagRuter() {
        // this.ctx.lineWidth = 1
        for (let i = 0; i < this.brett.dw; i += 8) {
            this.ctx.beginPath();
            this.ctx.moveTo(i, 0)
            this.ctx.lineTo(i, this.brett.dh)
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
            this.ctx.stroke();          // Render the path
            this.ctx.closePath();
        }
        for (let i = 0; i < this.brett.dh; i += 8) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i)
            this.ctx.lineTo(this.brett.dw, i)
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
            this.ctx.stroke();          // Render the path
            this.ctx.closePath();
        }
    }

    oppdaterSpokelsene(deltaTid) {


        let blinkyOgClydeSinBlink = new Vek2D(this.pacman.pos.x, this.pacman.pos.y)

        this.blinky.oppdater(this.pacman, blinkyOgClydeSinBlink, this.harSpilletStartet, deltaTid)

        let pinkySinBlink = new Vek2D(
            this.pacman.pos.x + (this.pacman.rettning.x * 4 * 8),
            this.pacman.pos.y + (this.pacman.rettning.y * 4 * 8)
        );
        this.pinky.oppdater(this.pacman, pinkySinBlink, this.harSpilletStartet, deltaTid)

        let inkyPacmanBlink = new Vek2D(
            this.pacman.pos.x + (this.pacman.rettning.x * 4 * 8),
            this.pacman.pos.y + (this.pacman.rettning.y * 4 * 8)
        );

        // ser to retur opp fra pacman og rotere linjen mellom blinky og 2 ruter for pacman 180 grader og definerer det som BLINKEN
        let inkySinBlink = new Vek2D(
            (inkyPacmanBlink.x - this.blinky.pos.x) * Math.cos(Math.PI) - (inkyPacmanBlink.y - this.blinky.pos.y) * Math.sin(Math.PI) + this.blinky.pos.x,
            (inkyPacmanBlink.y - this.blinky.pos.y) * Math.sin(Math.PI) + (inkyPacmanBlink.x - this.blinky.pos.x) * Math.cos(Math.PI) + this.blinky.pos.y
        );
        this.inky.oppdater(this.pacman, inkySinBlink, this.harSpilletStartet, deltaTid)
        // console.log('main', this.pacman.pos.x, this.pacman.pos.y)
        this.clyde.oppdater(this.pacman, blinkyOgClydeSinBlink, this.harSpilletStartet, deltaTid);
    }

    tegnSpokelsene() {
        // this.blinky.tegn()
        // this.pinky.tegn()
        // this.inky.tegn()
        // this.clyde.tegn(this.pacman)
    }

    spillerInputTast(e) {
        if (e.defaultPrevented) {
            return; // Should do nothing if the default action has been cancelled
        }

        let handled = false;
        switch (e.code) {
            case "Enter":
            case "Escape":
                this.startSpillet();
                handled = true
                break;
            case "ArrowRight":
            case "KeyD":
                this.startSpillet();
                this.pacman.beveg(1, 0);
                handled = true
                break;

            case "ArrowLeft":
            case "KeyA":
                this.startSpillet();
                this.pacman.beveg(-1, 0);
                handled = true
                break;

            case "ArrowDown":
            case "KeyS":
                this.startSpillet();
                this.pacman.beveg(0, 1);
                handled = true
                break;

            case "ArrowUp":
            case "KeyW":
                this.startSpillet();
                this.pacman.beveg(0, -1);
                handled = true
                break;

            default:
                break;
        }

        if (handled) {
            // Suppress "double action" if event handled
            e.preventDefault();
        }
    }

    spokelserModusJage() {
        let spokelser = {
            blinky: this.blinky,
            pinky: this.pinky,
            inky: this.inky,
            clyde: this.clyde
        }
        for (const spokelse in spokelser) {
            if (spokelser[spokelse].modus !== 'jage') {
                spokelser[spokelse].modus = 'jage';
                console.log(spokelse, spokelser[spokelse].aktivModus)
            }

        }

    }
    spokelserModusRedd() {
        let spokelser = {
            blinky: this.blinky,
            pinky: this.pinky,
            inky: this.inky,
            clyde: this.clyde
        }
        for (const spokelse in spokelser) {
            if (spokelser[spokelse].modus !== 'redd') {
                spokelser[spokelse].modus = 'redd';

                console.log(spokelse, spokelser[spokelse].aktivModus)
            }

        }
    }
    spokelserModusSpre() {
        let spokelser = {
            blinky: this.blinky,
            pinky: this.pinky,
            inky: this.inky,
            clyde: this.clyde
        }
        for (const spokelse in spokelser) {
            if (spokelser[spokelse].modus !== 'spre') {
                spokelser[spokelse].modus = 'spre';

                console.log(spokelse, spokelser[spokelse].aktivModus)
            }
        }
    }
    spokelserModusSpist() {
        let spokelser = {
            blinky: this.blinky,
            pinky: this.pinky,
            inky: this.inky,
            clyde: this.clyde
        }
        for (const spokelse in spokelser) {
            if (spokelser[spokelse].modus !== 'spist') {
                spokelser[spokelse].modus = 'spist';

                console.log(spokelse, spokelser[spokelse].aktivModus)
            }
        }
    }

} export default Spill


// let pos = new Vek2D({ x=10, y=4, ...args} = {})

// console.log({ pos });

