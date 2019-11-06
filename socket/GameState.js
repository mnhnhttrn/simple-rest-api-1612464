function GameState(){
        this.history = [{ squares: Array(400).fill(null), historyPos: -1 }],
        this.xIsNext = true,
        this.isDone = false,
        this.stepNumber = 0,
        this.winLine = Array(5).fill(null)
}

module.exports = GameState