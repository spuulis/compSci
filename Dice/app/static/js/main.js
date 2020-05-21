var lCtx, rCtx, lPlayer, rPlayer, game

function init() {
    lCtx = document.getElementById("leftDice").getContext("2d")
    rCtx = document.getElementById("rightDice").getContext("2d")

    game = new Game()
    game.init()

    window.requestAnimationFrame(loop)
}

function update(progress) {
    lPlayer.update(progress)
    rPlayer.update(progress)

    document.getElementById("p1s").innerText = `Score: ${lPlayer.getScore()}`
    document.getElementById("p2s").innerText = `Score: ${rPlayer.getScore()}`
}
  
function draw() {
    lPlayer.draw()
    rPlayer.draw()
}
  
function loop(timestamp) {
    var progress = timestamp - lastRender;
  
    update(progress)
    draw()
  
    lastRender = timestamp
    window.requestAnimationFrame(loop)
}
var lastRender = 0