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
        this.rollLimit = 3

        this.scored = [false, false, false, false, false, false, false, false, false, false, false, false, false]

        this.totalScore = 0
    }

    reset() {
        this.rollCount = 0
        this.rollLimit = 3;

        this.scored = [false, false, false, false, false, false, false, false, false, false, false, false, false]
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
        this.button.update(this.rollLimit - this.rollCount, this.isRolling());
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

    isRolling() {
        let states = new Array(5)
        for(let i = 0; i < 5; i++) {
            states[i] = this.dice[i].getState()
            if(states[i] == 0) {
                return true
            }
        }
        return false
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

    hasScored(category) {
        return this.scored[category - 1]
    }

    score(category) {
        if(this.rollCount == 0) {
            return 0
        }

        let states = this.read()
        let score = 0

        console.log(states)
        switch(category) {
            case 1:
            case "aces":
                states.forEach((element) => {if(element == 1) {score += 1}})
                break;
            case 2:
            case "twos":
                states.forEach((element) => {if(element == 2) {score += 2}})
                break;
            case 3:
            case "threes":
                states.forEach((element) => {if(element == 3) {score += 3}})
                break;
            case 4:
            case "fours":
                states.forEach((element) => {if(element == 4) {score += 4}})
                break;
            case 5:
            case "fives":
                states.forEach((element) => {if(element == 5) {score += 5}})
                break;
            case 6:
            case "sixes":
                states.forEach((element) => {if(element == 6) {score += 6}})
                break;
            case 7:
            case "threeOfAKind":
                var count = 0;
                for(let i = 0; i < 5; i++){if(states[i] == states[2]) {count++;}}
                if(count >= 3) {states.forEach((element) => {score += element})}
                break;
            case 8:
            case "fourOfAKind":
                var count = 0;
                for(let i = 0; i < 5; i++){if(states[i] == states[2]) {count++;}}
                if(count >= 4) {states.forEach((element) => {score += element})}
                break;
            case 9:
            case "fullHouse":
                var count = 0;
                for(let i = 0; i < 5; i++){if(states[i] == states[2]) {count++;}}
                if(count == 3) {
                    if((states[0] != states[2] && states[0] == states[1]) || (states[4] != states[2] && states[3] == states[4])) {
                        score += 25;
                    }
                }
                break;
            case 10:
            case "smallStraight":
                if(this.hasSubArray(states, [1, 2, 3, 4]) || this.hasSubArray(states, [2, 3, 4, 5]) || this.hasSubArray(states, [3, 4, 5, 6])) {score += 30}
                break;
            case 11:
            case "largeStraight":
                if(this.hasSubArray(states, [1, 2, 3, 4, 5]) || this.hasSubArray(states, [2, 3, 4, 5, 6])) {score += 40}
                break;
            case 12:
            case "yahtzee":
                var count = 0;
                for(let i = 0; i < 5; i++){if(states[i] == states[2]) {count++;}}
                if(count >= 5) {score += 50}
                break;
            case 13:
            case "chance":
                states.forEach((element) => {score += element})
                break;
        }

        this.scored[category - 1] = true
        this.rollCount = 0
        for(let i = 0; i < 5; i++) {
            this.dice[i].reset();
        }

        this.totalScore += score
        return score;
    }

    getScore() {
        return this.totalScore
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