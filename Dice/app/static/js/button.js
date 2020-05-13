class Button {
    constructor(ctx) {
        this.ctx = ctx;
        this.locked = false;
        this.rollsLeft = null;
    }

    update(rollsLeft, rolling) {
        this.rollsLeft = rollsLeft;
        if(this.rollsLeft <= 0 || rolling) {
            this.locked = true;
        } else {
            this.locked = false;
        }
    }

    draw() {
        this.ctx.fillStyle = "#209020";
        if(this.locked) {
            this.ctx.fillStyle = "#60C060";
        }
        this.ctx.beginPath();
        this.ctx.roundedRectangle(10, 600, 180, 60, 10);
        this.ctx.fill();
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.fillText(`ROLL (${this.rollsLeft})`, 100, 640); 
    }
}