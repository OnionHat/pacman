class Pellet {
    constructor(ctx, x, y) {
        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.color = "#fab7adcc"
        this.isEaten = false;
    }

    draw() {
        if (!this.isEaten) {
            this.ctx.beginPath();
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(this.x + 3, this.y + 3, 3, 3);
        }
    }
} export default Pellet
