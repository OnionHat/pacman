class Tile {
    constructor(x, y) {
        /** @type {CanvasRenderingContext2D} */
        this.ctx = document.getElementById('spillCanvas').getContext('2d');
        this.TileStorrelse = 8
        this.x = x * this.TileStorrelse - 16;
        this.y = y * this.TileStorrelse;

        this.type = {
            vegg: false,
            smaaDot: false,
            storDot: false,
            teleportering: false,
            port: false
        }
        this.tomrom = false

        this.skalTegneVegg = false;


    }

    tegn() {
        if (!this.tomrom) {
            this.ctx.beginPath();
            if (this.type.smaaDot) {
                this.ctx.fillStyle = 'orange';
                this.ctx.fillRect(this.x, this.y, 4, 4);
            }
            else if (this.type.storDot) {
                this.ctx.fillStyle = 'purple';
                this.ctx.fillRect(this.x + 1, this.y + 1, 6, 6);
            }
            // else if (this.type.vegg){
            //     this.ctx.fillStyle = 'blue';
            //     this.ctx.fillRect(this.x, this.y, 8, 8);
            // }
            this.ctx.closePath();
        }

    }

    tegnVegg() {
        if (this.type.vegg) {
            this.ctx.beginPath();
            this.ctx.fillStyle = 'rgba(180, 30, 100, 0.5)';
            this.ctx.fillRect(this.x, this.y, 8, 8);
            this.ctx.closePath();
        }

    }


} export default Tile