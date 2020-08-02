//Utility Functions
function topEdge(obj) {
	return obj.y;
}
function bottomEdge(obj) {
	return obj.y + obj.height;
}
function leftEdge(obj) {
	return obj.x;
}
function rightEdge(obj) {
	return obj.x + obj.width;
}


//Dinosaur
class Dinosaur {
	constructor(x, groundY) {
		this.width = 40
		this.height = 70
		this.x = x
		this.y = groundY - this.height

		this.vy = 0
		this.uy = -20
	}

	draw(pencil) {
		let oldFill = pencil.fillStyle
		pencil.fillStyle = "purple"
		pencil.fillRect(this.x, this.y, this.width,  this.height)
		pencil.fillStyle = oldFill
	}

	jump() {
		this.vy = this.uy
	}

	update(ground, gravity) {
		this.y += this.vy
		this.vy += gravity

		if(bottomEdge(this) > topEdge(ground) && this.vy > 0) {
			this.y = ground.y - this.height
			this.vy = 0
			return;
		}
	}
}

//Draw Ground
class DrawGround {
	constructor(gameWidth, gameHeight) {
		this.width = gameWidth
		this.height = 4
		this.thickness = Math.floor(0.2 * gameHeight)
		this.x = 0 
		this.y = gameHeight - this.height -this.thickness
	}

	draw(pencil) {
		pencil.fillRect(this.x, this.y, this.width, this.height)
	}
}

//Draw Cactus
class Cactus {
	constructor(gameWidth, groundY) {
		this.width = (Math.random()<0.6)?16:20
		this.height = Math.floor((Math.random()*(5)+1)) * 10
		this.x = gameWidth
		this.y = groundY - this.height 
	}

	draw(pencil) {
		let oldFill = pencil.fillStyle
		pencil.fillStyle = "lightgreen"
		pencil.fillRect(this.x, this.y, this.width,  this.height)
		pencil.fillStyle = oldFill
	}
}


//Game
function Game() {
	let canvas = document.getElementById('game');
	this.width = canvas.width
	this.height = canvas.height
	this.pencil = canvas.getContext('2d')
	this.pencil.fillStyle = "brown"

	this.gravity = 1.5
	this.offset = 150
	this.noOfFrames = 0
	this.mileStone = 1000
	this.darkMode = true
	this.highScore = 0
	this.stop = false	

	this.ground = new DrawGround(this.width, this.height);
	this.dino = new Dinosaur(Math.floor(0.1*this.width), this.ground.y)
	
	this.cacti = []
	this.runSpeed = -10

	document.spacePressed = false
	document.enterPressed = false
	document.addEventListener("keydown", function(e){
		if(e.key === " ")
			this.spacePressed = true
		if(e.key === "Enter")
			this.enterPressed = true
	})
	document.addEventListener("keyup", function(e){
		if(e.key === " ")
			this.spacePressed = false
		if(e.key === "Enter")
			this.enterPressed = false
	})
}
Game.prototype.spawnCactus = function(probability) {
	if(Math.random() <= probability) {
		this.cacti.push(new Cactus(this.width, this.ground.y))
	}
}
Game.prototype.draw = function() {
	//clear canvas
	this.pencil.clearRect(0, 0, this.width, this.height)
	//draw ground
	this.ground.draw(this.pencil)
	//draw dinosaur
	this.dino.draw(this.pencil)
	//draw cacti
	for(let i=0; i<this.cacti.length; i++) {
		this.cacti[i].draw(this.pencil)
	}
	//draw score
	var oldFill = this.pencil.fillStyle
	this.pencil.fillStyle = "red"
	this.pencil.font = "20px Verdana";
	this.pencil.fillText("Score: "+this.score, this.width-180, 30)
	this.pencil.fillText("HighScore: "+localStorage.getItem('highScore'), this.width-380, 30)
	this.pencil.fillStyle = oldFill
}
Game.prototype.update = function() {

	if(this.stop && document.enterPressed == true) {
		if(localStorage.getItem('highScore') < this.score)
			localStorage.setItem('highScore',this.score)

		clearInterval(startGame)
		init()
	}
	if(this.stop) {

		var oldFill = this.pencil.fillStyle
		this.pencil.fillStyle = "red"
		this.pencil.font = "20px Verdana"
		this.pencil.fillText("Press Enter to restart", (this.width/2)-80, (this.height/2)-20)
		this.pencil.fillStyle = oldFill
		return;
	}

	if(document.spacePressed == true && bottomEdge(this.dino)>=topEdge(this.ground)) {
		this.dino.jump();
	}
	this.dino.update(this.ground, this.gravity)

	//generate cactus objects
	if(this.cacti.length>0 && rightEdge(this.cacti[0])<0) {
		this.cacti.shift()
	}

	if(this.cacti.length == 0) {
		this.spawnCactus(0.6)
	}
	else if(this.cacti.length > 0 && this.width-leftEdge(this.cacti[this.cacti.length-1])>this.jumpDistamce+this.offset) {
		this.spawnCactus(0.05)
	}
	this.spawnCactus(0.01)
	for(i=0; i<this.cacti.length; i++) {
		this.cacti[i].x += this.runSpeed
	}

	//collision detection
	for(i=0; i<this.cacti.length; i++) {
		if(rightEdge(this.dino) >= leftEdge(this.cacti[i]) &&
			leftEdge(this.dino) <= rightEdge(this.cacti[i]) && 
			bottomEdge(this.dino) >= topEdge(this.cacti[i])) {
			this.stop = true
		}
	}
	
	this.jumpDistance = Math.floor(this.runSpeed * (2*this.dino.uy)/this.gravity) //min-distance = speedAtWhichCactusIsMoving * timeTakenToFallBack

	//update score
	this.noOfFrames++
	this.score = Math.floor(this.noOfFrames/10)

	
	if(this.noOfFrames == this.mileStone) {
		this.runSpeed -= 0.5
		this.mileStone *= 2
		if(this.darkMode) {
			document.getElementById("game").setAttribute("style", "background-color: white;border: solid")
			this.darkMode = !this.darkMode
		}
		else {
			document.getElementById("game").setAttribute("style", "background-color: black;border: none")
			this.darkMode = !this.darkMode
		}
		
	}
}

//start Game
var startGame;
function init() {
	document.getElementById("game").setAttribute("style", "background-color: black;border: none")
	var game = new Game()
	startGame = setInterval(main, 20)

	function main() {
		game.draw()
		game.update()
	}
}
init();
localStorage.setItem('highScore',0)
