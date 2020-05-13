var lCtx, rCtx, lPlayer, rPlayer

function init() {
    lCtx = document.getElementById("leftDice").getContext("2d")
    rCtx = document.getElementById("rightDice").getContext("2d")

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

    window.requestAnimationFrame(loop)
}

function update(progress) {
    lPlayer.update(progress)
    rPlayer.update(progress)
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