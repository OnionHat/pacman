import Ghost from "./ghost.js";

class Clyde extends Ghost {

    constructor(ctx, tileMap) {
        super(ctx, tileMap, "orange");
        super.dx = 0;
        super.x = 17 * 8
        super.y = 11 * 8
        super.xScatter = 1 * 8;
        super.yScatter = 33 * 8;
    }
    draw(target) {
        if (Ghost.showTarget) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = this.color;
            this.ctx.lineWidth = 1;
            this.ctx.arc(target.x, target.y, 8 * 8, 0, 2 * Math.PI, false);
            this.ctx.stroke();
        }
        super.draw();
    }

    update(target) {
        this.findtarget(target);
        super.update();
    }

    findtarget(target) {
        this.xTarget = target.x / 8;
        this.yTarget = target.y / 8;

        let xDistance = Math.abs(this.x / 8 - this.xTarget);
        let yDistance = Math.abs(this.y / 8 - this.yTarget);

        if (xDistance < 8 && yDistance < 8) {
            this.xTarget = this.xScatter;
            this.yTarget = this.yScatter;

        }
    }
} export default Clyde
