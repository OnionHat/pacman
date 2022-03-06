import Entity from "./entity.js"

class Ghost extends Entity {
    constructor(ctx, tileMap, color, xIndex, yIndex) {
        super(ctx, tileMap);
        this.xTarget = 0;
        this.yTarget = 0;
        this.color = color;
        this.x = xIndex * 8
        this.y = yIndex * 8
        this.dx = -1;
        this.xScatter;
        this.yScatter;
    }

    // variable to show ghost's targets
    static showTarget = false;

    update() {
        let xIndex = this.x / 8;

        if ((xIndex == 27 && this.dx == 1) || (xIndex == 0 && this.dx == -1)) {
            this.isTeleporting = true;
        }

        if (!this.isTeleporting) {
            this.chooseDirection();
            this.dx = this.desireDx;
            this.dy = this.desireDy;
            this.x += this.dx * 8
            this.y += this.dy * 8
        }
        else { super.teleport(xIndex) }
    }
    draw() {
        if (Ghost.showTarget) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.xTarget * 8 + 2, this.yTarget * 8 + 2);
            this.ctx.lineTo(this.xTarget * 8 + 6, this.yTarget * 8 + 6);
            this.ctx.moveTo(this.xTarget * 8 + 6, this.yTarget * 8 + 2);
            this.ctx.lineTo(this.xTarget * 8 + 2, this.yTarget * 8 + 6);
            this.ctx.strokeStyle = this.color;
            this.ctx.stroke();
        }
        super.draw();
    }

    // find the nearest allowed route
    chooseDirection() {
        let xIndex = this.x / 8;
        let yIndex = this.y / 8;
        this.getAdjecentTiles(this.tileMap, xIndex, yIndex);
        let bestDirection = Infinity;

        // Go Up a tile if its the nearest and not a walll
        let tmpDirection = this.distanceToTarget(this.xTarget, this.yTarget, xIndex, yIndex - 1)
        if (this.adjacentTile.n != 0
            && this.dy != 1) {
            bestDirection = tmpDirection;
            this.newDirection(0, -1);
        }

        // Go Right a tile if its the nearest and not a walll
        tmpDirection = this.distanceToTarget(this.xTarget, this.yTarget, xIndex + 1, yIndex)
        if (this.adjacentTile.e != 0 &&
            this.dx != -1 &&
            tmpDirection < bestDirection) {
            bestDirection = tmpDirection;
            this.newDirection(1, 0);
        }

        // Go Down a tile if its the nearest and not a walll
        tmpDirection = this.distanceToTarget(this.xTarget, this.yTarget, xIndex, yIndex + 1)
        if (this.adjacentTile.s != 0 &&
            this.dy != -1 &&
            tmpDirection < bestDirection) {
            bestDirection = tmpDirection;
            this.newDirection(0, 1);
        }

        // Go Left a tile if its the nearest and not a walll
        tmpDirection = this.distanceToTarget(this.xTarget, this.yTarget, xIndex - 1, yIndex)
        if (this.adjacentTile.w != 0 &&
            this.dx != 1 &&
            tmpDirection < bestDirection) {
            this.newDirection(-1, 0);
        }
        // console.log(this.desireDx, this.desireDy);
    }

    distanceToTarget(x2, y2, x1, y1) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    findtarget(targetX, targetY) {
        this.xTarget = targetX / 8;
        this.yTarget = targetY / 8;
    }

} export default Ghost
