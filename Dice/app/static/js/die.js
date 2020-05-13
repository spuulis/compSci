class Die {
    constructor(ctx, nr) {
        this.ctx = ctx;
        this.nr = nr;

        this.state = Math.floor(Math.random() * 6 + 1);
        this.locked = false;

        this.centerY = 70 + this.nr * 115;
        this.centerX = 100;

        this.offset = 25;
        this.radius = 10;

        this.gX = this.centerX;
        this.gY = this.centerY;
        this.gState = this.state;

        this.targetX = 0;
        this.targetY = 0;
        this.wobble = 20;
        this.velocity = 0.15;
        this.timer = 0;
        this.changeSpeed = 20;
        this.lastChange = 0;
    }

    update(progress) {
        if(this.state == 0) {
            if(Math.abs(this.targetX) < progress * this.velocity) {
                this.gX += this.targetX;
                this.targetX = this.centerX + Math.random() * this.wobble - this.wobble / 2 - this.gX;
            } else {
                this.gX += (this.targetX / Math.abs(this.targetX)) * progress * this.velocity;
                this.targetX -= (this.targetX / Math.abs(this.targetX)) * progress * this.velocity;
            }

            if(Math.abs(this.targetY) < progress * this.velocity) {
                this.gY += this.targetY;
                this.targetY = this.centerY + Math.random() * this.wobble - this.wobble / 2 - this.gY;
            } else {
                this.gY += (this.targetY / Math.abs(this.targetY)) * progress * this.velocity;
                this.targetY -= (this.targetY / Math.abs(this.targetY)) * progress * this.velocity;
            }
            
            this.timer -= progress;
            if(this.lastChange - this.timer > this.changeSpeed) {
                this.lastChange = this.timer;
                this.gState = Math.floor(Math.random() * 6 + 1);
            } 

            if(this.timer < 0) {
                this.timer = 0;
                this.stop();
            }
        } else {
            this.gX = this.centerX;
            this.gY = this.centerY;
            this.gState = this.state;
        }
    }

    roll(timer) {
        if(!this.locked) {
            this.timer = timer;
            this.lastChange = timer;
            this.state = 0;
            return true;
        }
        return false;
    }

    stop() {
        this.state = this.gState;
    }

    lock() {
        if(this.timer == 0) {
            this.locked = !this.locked;
        }
    }

    getState() {
        return this.state;
    }

    draw() {
        this.ctx.fillStyle = "#999999";
        if(this.state == 0) {
            this.ctx.fillStyle = "#BBBBBB";
        }
        this.ctx.beginPath();
        this.ctx.roundedRectangle(this.gX - 45, this.gY - 45, 90, 90, 20);
        this.ctx.fill();
        if(this.locked) {
            this.ctx.strokeStyle = "#222222";
            this.ctx.lineWidth = 5;
            this.ctx.beginPath();
            this.ctx.roundedRectangle(this.gX - 45, this.gY - 45, 90, 90, 20);
            this.ctx.stroke();
        }

        let eyes = new Array(9);
        switch(this.gState) {
            case 1:
                eyes = [0, 0, 0, 0, 1, 0, 0, 0, 0];
                break;
            case 2:
                eyes = [1, 0, 0, 0, 0, 0, 0, 0, 1];
                break;
            case 3:
                eyes = [1, 0, 0, 0, 1, 0, 0, 0, 1];
                break;
            case 4:
                eyes = [1, 0, 1, 0, 0, 0, 1, 0, 1];
                break;
            case 5:
                eyes = [1, 0, 1, 0, 1, 0, 1, 0, 1];
                break;
            case 6:
                eyes = [1, 0, 1, 1, 0, 1, 1, 0, 1];
                break;
            case 7:
                eyes = [1, 0, 1, 1, 1, 1, 1, 0, 1];
                break;
            case 8:
                eyes = [1, 1, 1, 1, 0, 1, 1, 1, 1];
                break;
            case 9:
                eyes = [1, 1, 1, 1, 1, 1, 1, 1, 1];
                break;
        }

        this.ctx.fillStyle = "#222222";
        if(this.state == 0) {
            this.ctx.fillStyle = "#555555";
        }
        let i = 0;
        for(let y = -this.offset; y <= this.offset; y += this.offset) {
            for(let x = -this.offset; x <= this.offset; x += this.offset) {
                if(eyes[i] == 1) {
                    this.ctx.beginPath();
                    this.ctx.arc(this.gX + x, this.gY + y, this.radius, 0, 2 * Math.PI);
                    this.ctx.fill();
                }
                i++;
            }
        }        
    }
}