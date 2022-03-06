
class Entity {
    constructor(ctx, tileMap) {
        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx;
        this.tileMap = tileMap;

        // posistion
        this.x = 8;
        this.y = 8;

        // direction
        this.dx = 1;
        this.dy = 0;

        this.desireDx = 0;
        this.desireDy = 0;
        this.isTeleporting = 0;

        this.color = "";

        this.adjacentTile = {
            n: null, e: null,
            s: null, w: null,
        }
    }

    draw() {
        let centerX = this.x + 4;
        let centerY = this.y + 4;
        let radius = 5;

        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.lineWidth = 2;
        this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        this.ctx.fill();
    }

    update() { }

    teleport(xIndex) {
        // duration of teleportation in tiles
        let totalTeleStage = 3;
        if (this.dx == 1 && xIndex <= 27 + totalTeleStage) {
            this.x += 8;
        } else if (this.dx == 1) {
            this.x = 0;
            this.isTeleporting = 0;
        }

        else if (this.dx == -1 && xIndex >= 0 - totalTeleStage) {
            this.x += -1 * 8;
        } else if (this.dx == -1) {
            this.x = 27 * 8;
            this.isTeleporting = 0;
        }
    }

    getAdjecentTiles(arr, x, y) {
        // if entity is
        this.adjacentTile.n = arr[y - 1][x];
        this.adjacentTile.s = arr[y + 1][x];
        this.adjacentTile.e = arr[y][x + 1];
        this.adjacentTile.w = arr[y][x - 1];
        // try { }
        // catch (ArrayIndexOutOfBoundsException) { }
    }


    newDirection(newDx, newDy) {
        this.desireDx = newDx;
        this.desireDy = newDy;
    }
} export default Entity
