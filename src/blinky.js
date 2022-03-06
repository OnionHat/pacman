import Ghost from "./ghost.js";

class Blinky extends Ghost {

    constructor(ctx, tileMap) {
        super(ctx, tileMap, "red");
        super.dx = 0;
        super.x = 13 * 8
        super.y = 11 * 8
    }

    update(target) {
        this.findtarget(target);
        super.update();
    }

    findtarget(target) {
        this.xTarget = target.x / 8;
        this.yTarget = target.y / 8;
    }
} export default Blinky
