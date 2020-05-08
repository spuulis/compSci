class Button {
    constructor(ctx) {
        this.ctx = ctx;
        this.locked = false;
    }

    update(rolling) {

    }

    draw() {
        this.ctx.fillStyle = "#209020";
        this.ctx.beginPath();
        this.ctx.roundedRectangle(10, 600, 180, 60, 10);
        this.ctx.fill();
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.fillText("ROLL", 100, 640); 
    }
}