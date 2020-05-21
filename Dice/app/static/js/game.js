class Game {
    constructor() {
        
    }

    init() {
        lPlayer = new Player(lCtx, 0)
        rPlayer = new Player(rCtx, 1)

        const lCanvas = document.getElementById("leftDice")
        lCanvas.addEventListener('mousedown', function(e) {
            lPlayer.mouseClick(lCanvas, e)
        })
        const rCanvas = document.getElementById("rightDice")
        rCanvas.addEventListener('mousedown', function(e) {
            rPlayer.mouseClick(rCanvas, e)
        })

        var table = document.getElementById("score")
        if (table != null) {
            for (var i = 1; i < table.rows.length; i++) {
                table.rows[i].cells[2].onclick = function (e) {
                    if(!lPlayer.hasScored(e.target.parentNode.rowIndex)) {
                        this.innerText = `${lPlayer.score(e.target.parentNode.rowIndex)}`
                    }
                };
                table.rows[i].cells[3].onclick = function (e) {
                    if(!rPlayer.hasScored(e.target.parentNode.rowIndex)) {
                        this.innerText = `${rPlayer.score(e.target.parentNode.rowIndex)}`
                    }
                };
            }
        }
    }
}