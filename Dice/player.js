class Player {
    constructor(ctx, id) {
        this.ctx = ctx
        this.id = id

        this.dice = new Array(5)
        for(let i = 0; i < 5; i++) {
            this.dice[i] = new Die(this.ctx, i)
        }

        this.button = new Button(this.ctx)

        this.rollCount = 0
        this.rollLimit = Infinity;
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
        if(this.rollCount >= this.rollLimit) {
            throw "Roll limit reached"
        }
        let n = 0
        for(let i = 0; i < 5; i++){
            n += this.dice[i].roll(1000 + n * 500)
        }
        this.rollCount++
    }

    resetRollCount() {
        this.rollCount = 0
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

    hasSubArray(master, sub) {
        return sub.every((i => v => i = master.indexOf(v, i) + 1)(0));
    }

    score(category) {
        let states = this.read()
        let score = 0
        switch(category) {
            case "aces":
                states.forEach((element) => {if(element == 1) {score += 1}})
                break;
            case "twos":
                states.forEach((element) => {if(element == 2) {score += 2}})
                break;
            case "threes":
                states.forEach((element) => {if(element == 3) {score += 3}})
                break;
            case "fours":
                states.forEach((element) => {if(element == 4) {score += 4}})
                break;
            case "fives":
                states.forEach((element) => {if(element == 5) {score += 5}})
                break;
            case "sixes":
                states.forEach((element) => {if(element == 6) {score += 6}})
                break;
            case "threeOfAKind":
                var count = 0;
                for(let i = 0; i < 5; i++){if(states[i] == states[2]) {count++;}}
                if(count >= 3) {states.forEach((element) => {score += element})}
                break;
            case "fourOfAKind":
                var count = 0;
                for(let i = 0; i < 5; i++){if(states[i] == states[2]) {count++;}}
                if(count >= 4) {states.forEach((element) => {score += element})}
                break;
            case "fullHouse":
                var count = 0;
                for(let i = 0; i < 5; i++){if(states[i] == states[2]) {count++;}}
                if(count == 3) {
                    if((states[0] != states[2] && states[0] == states[1]) || (states[4] != states[2] && states[3] == states[4])) {
                        score += 25;
                    }
                }
                break;
            case "smallStraight":
                if(this.hasSubArray(states, [1, 2, 3, 4] || this.hasSubArray(states, [2, 3, 4, 5] || this.hasSubArray(states, [3, 4, 5, 6])))) {score += 30}
                break;
            case "largeStraight":
                if(this.hasSubArray(states, [1, 2, 3, 4, 5] || this.hasSubArray(states, [2, 3, 4, 5, 6]))) {score += 40}
                break;
            case "yahtzee":
                var count = 0;
                for(let i = 0; i < 5; i++){if(states[i] == states[2]) {count++;}}
                if(count >= 5) {score += 50}
                break;
            case "chance":
                states.forEach((element) => {score += element})
                break;
        }
        return score;
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