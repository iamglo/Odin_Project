const Display = (() => {
	var table = document.getElementById("board")

	function generateBoard(){
		for (i = 0; i < 3; i++){
			var tr = document.createElement("tr")
			for (j = 0; j < 3; j++){
				var td = document.createElement("td")
				var button = document.createElement("button")
				button.setAttribute('onclick', 'Game.turn(this.id)')
				button.className += "boardButton"
				button.id = i*3 + j 
				td.appendChild(button)
				tr.appendChild(td)
			}
			table.appendChild(tr)
		}
	}

	function getPieceInput(){
		var shape = document.getElementsByName("shape")
		for(i=0; i < shape.length; i++){
			if (shape[i].checked){
				return shape[i].value
			}
		}
	}

	function resetDisplay(){
		var winnerText = document.getElementById("turn") 
		winnerText.innerHTML = ""

		var tableCells = document.getElementsByClassName("boardButton")
		for (var i = 0; i<tableCells.length ; i++){
			tableCells[i].innerHTML = ""
		}
	}

	function closeForm() {
		document.getElementById("myForm").style.display = "none";
	}

	function openForm() {
		document.getElementById("myForm").style.display = "block";
	}

	return{
		generateBoard,
		getPieceInput,
		resetDisplay,
		closeForm,
		openForm
	}

})()


const Player = (token) => {
	return token 
}

const Board = (() => {
	let board = [-1,-1,-1,-1,-1,-1,-1,-1,-1]

	const isEmpty = function(i){
		if (board[i] == -1){
			return true
		}
		else{
			return false
		}
	}

	const flipPoint = function(i, playerIndex){
		board[i] = playerIndex
	}

	const getBoard = function(){
		return board
	}

	const resetBoard = function(){
		board = [-1,-1,-1,-1,-1,-1,-1,-1,-1]
	}

	return{
		isEmpty,
		flipPoint,
		getBoard,
		resetBoard
	}
})()


const Game = (() => {
	let win = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6], [0,4,8]]
	var players = []
	var curTurn = 0
	var inGame = true
	var result = 0
	let curPlayer = players[curTurn]

	const start = function(){
		players.length = 0
		let pieceMap = {"X":"O", "O":"X"}
		playerPiece = Display.getPieceInput()
		this.players.push(Player(playerPiece))
		this.players.push(Player(pieceMap[playerPiece]))
	}

	const generateResultText = function(){
		// Change text to show winner
		var winner = {'-1': "You both tied!", 
			'0': "Player 1 is the winner!", 
			'1': "Player 2 is the winner!"}
		var winnerText = document.getElementById("turn")
		winnerText.innerHTML = winner[result.toString()]
	}

	const generateTurnText = function(){
		// Change text to show turn
		var player = {0: "It's Player 1's turn", 1: "It's Player 2's turn"}
		var playerText = document.getElementById("turn")
		playerText.innerHTML = player[this.curTurn]
	}

	const turn = function(location){
		// Activates on click in HTML; assumes button id is associated with board location
		if (Board.isEmpty(location) && this.inGame){
			this.flipPoint(location, this.curTurn)
			if (this.isinGame()) {
				this.curTurn = (this.curTurn + 1) % 2
				this.generateTurnText()
			}
			else {
				this.generateResultText()
			}
		}
	}

	const flipPoint = function(location, playerIndex){
		// Helper function that flips board and changes text
		Board.flipPoint(location, playerIndex)
		document.getElementById(location).innerHTML = players[playerIndex]
	}

	
	const isinGame = function() {
		curBoard = Board.getBoard()
		if (!curBoard.includes(-1)){
			result = -1 
			this.inGame = false
			return false // Tie
		}

		for (i = 0; i < this.win.length; i++){
			if ((curBoard[this.win[i][0]] == curBoard[this.win[i][1]] && curBoard[this.win[i][1]] == curBoard[win[i][2]]) && [0, 1].includes(curBoard[win[i][1]])) 
			{
				result = this.curTurn // 0 for player 1 ; 1 for player 2
				this.inGame = false
				return false
			}
		}
		return true
	}

	const resetGame = function(){
		Board.resetBoard()
		Display.resetDisplay()
		this.curTurn = 0 
		this.result = 0
		this.inGame = true
	}

	return {
		start,
		players,
		curTurn,
		turn,
		result,
		flipPoint,
		resetGame,
		isinGame,
		win,
		inGame,
		generateTurnText,
		generateResultText
	}

})();


Display.generateBoard()
