class Player {
    constructor(ctx, id) {
        this.ctx = ctx
        this.id = id

        this.dice = new Array(5)
        for(let i = 0; i < 5; i++) {
            this.dice[i] = new Die(this.ctx, i)
        }

        this.button = new Button(this.ctx)
    }

    draw() {
        this.ctx.clearRect(0, 0, 200, 700)
        for(let i = 0; i < 5; i++){
            this.dice[i].draw();
        }
        this.button.draw();
    }

    update(progress) {
        for(let i = 0; i < 5; i++){
            this.dice[i].update(progress);
        }
    }

    roll() {
        let n = 0
        for(let i = 0; i < 5; i++){
            n += this.dice[i].roll(1000 + n * 500);
        }
    }

    read() {
        let states = new Array(5)
        for(let i = 0; i < 5; i++) {
            states[i] = this.dice[i].getState()
            if(states[i] == 0) {
                throw "Rolling not finished"
            }
        }
        states.sort();
        return states;
    }

    mouseClick(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        const die = Math.floor((y - 5) / 115);
        if(die >= 0 && die <= 4) {
            this.dice[die].lock();
        }
        else if(die == 5) {
            this.roll();
        }
    }
}