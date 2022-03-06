import Ghost from "./ghost.js";

class Inky extends Ghost {

    constructor(ctx, tileMap) {
        super(ctx, tileMap, "cyan");
        super.dx = 0;
        super.x = 11 * 8
        super.y = 11 * 8
    }

    update(pacman, blinky) {
        this.findtarget(pacman, blinky);
        super.update();
    }

    findtarget(target, blinky) {
        // Targets current index
        this.xTarget = target.x / 8;
        this.yTarget = target.y / 8;

        // Blinky's current index
        let xBlinky = blinky.x / 8;
        let yBlinky = blinky.y / 8;

        // // Inkys own index
        // this.xIndex = target.x / 8;
        // this.yIndex = target.y / 8;

        if (target.dx == 1) {
            super.xTarget = this.xTarget + 2;
        }
        else if (target.dx == -1) {
            this.xTarget = this.xTarget - 2;
        }
        else if (target.dy == 1) {
            this.yTarget = this.yTarget + 2;
        }
        else {
            this.yTarget = this.yTarget - 2;
            this.xTarget = this.xTarget - 2;
        }
        let xPivot = xBlinky - this.xTarget;
        let yPivot = yBlinky - this.yTarget;

        let xnew = xPivot * Math.cos(Math.PI) - yPivot * Math.sin(Math.PI);
        let ynew = xPivot * Math.sin(Math.PI) + yPivot * Math.cos(Math.PI);

        this.xTarget += xnew;
        this.yTarget += ynew;

    }
} export default Inky
