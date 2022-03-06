import Ghost from "./ghost.js";

class Pinky extends Ghost {

    constructor(ctx, tileMap) {
        super(ctx, tileMap, "pink");
        super.dx = 0;
        super.x = 15 * 8
        super.y = 11 * 8
    }

    update(pacman) {
        this.findtarget(pacman);
        super.update();
    }
    draw() {
        super.draw()
    }

    findtarget(pacman) {
        this.xTarget = pacman.x / 8;
        this.yTarget = pacman.y / 8;

        if (pacman.dx == 1) {
            super.xTarget = this.xTarget + 4;
        }
        else if (pacman.dx == -1) {
            this.xTarget = this.xTarget - 4;
        }
        else if (pacman.dy == 1) {
            this.yTarget = this.yTarget + 4;
        }
        else {
            this.yTarget = this.yTarget - 4;
            this.xTarget = this.xTarget - 4;
        }
    }
} export default Pinky
