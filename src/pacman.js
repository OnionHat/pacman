import Entity from './entity.js'

class Pacman extends Entity {
    constructor(ctx, tileMap) {
        super(ctx, tileMap);
        super.color = "yellow";
        this.score = 0;
        this.lives = 3;

    }

    update(pellets, score) {
        let xIndex = this.x / 8;
        let yIndex = this.y / 8;


        // teleports if pacman goes trough the tunnel
        if ((xIndex == 27 && this.dx == 1) || (xIndex == 0 && this.dx == -1)) {
            this.isTeleporting = true;
        }

        if (!this.isTeleporting) {
            if (!pellets[yIndex][xIndex].isEaten) {
                this.score++;
                score.innerText = "Score: " + this.score;
                pellets[yIndex][xIndex].isEaten = true;
            }
            this.getAdjecentTiles(this.tileMap, xIndex, yIndex);

            // changes to desired direction if there is no wall
            if ((this.desireDy == -1 && this.adjacentTile.n != 0) ||
                (this.desireDy == 1 && this.adjacentTile.s != 0) ||
                (this.desireDx == 1 && this.adjacentTile.e != 0) ||
                (this.desireDx == -1 && this.adjacentTile.w != 0)) {
                this.dy = this.desireDy;
                this.dx = this.desireDx;
            }

            // keep moving in current direction if there is no wall
            if ((this.dy == -1 && this.adjacentTile.n != 0) ||
                (this.dy == 1 && this.adjacentTile.s != 0) ||
                (this.dx == 1 && this.adjacentTile.e != 0) ||
                (this.dx == -1 && this.adjacentTile.w != 0)) {
                this.x += this.dx * 8;
                this.y += this.dy * 8;
            }

        }
        else {
            super.teleport(xIndex)
        }
    }

    cheackIfDied(blinky, pinky, inky, clyde, lives) {
        //pacman's index
        let xIndex = this.x / 8;
        let yIndex = this.y / 8;

        // ghosts indexes
        let xBlinky = blinky.x / 8;
        let yBlinky = blinky.y / 8;
        let xPinky = pinky.x / 8;
        let yPinky = pinky.y / 8;
        let xInky = inky.x / 8;
        let yInky = inky.y / 8;
        let xClyde = clyde.x / 8;
        let yClyde = clyde.y / 8;

        if (xIndex == xBlinky && yIndex == yBlinky ||
            xIndex == xPinky && yIndex == yPinky ||
            xIndex == xInky && yIndex == yInky ||
            xIndex == xClyde && yIndex == yClyde
        ) {
            this.lives--;
            lives.innerText = "Lives: " + this.lives;
        }

        if (this.lives <= 0) {
            return true;
        }
        return false;
    }

} export default Pacman
