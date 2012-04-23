/**
 * @author Bu
 */

/**
 * Creating the almighty CANVAS
 */
$(document).ready(function(){
	
   	// Your code here
   	
	var CANVAS_WIDTH = 800;
	var CANVAS_HEIGHT = 600;
	
	var canvasElement = $("<canvas width='" + CANVAS_WIDTH + 
	                      "' height='" + CANVAS_HEIGHT + "'></canvas>");
	var canvas = canvasElement.get(0).getContext("2d");
	canvasElement.appendTo('body');
	
	/*
	 * Creating Game loop
	 */
	createGameLoop = function () {
		var FPS = 30;
		setInterval(function() {
			handleInput();
		  update();
		  draw();
		}, 1000/FPS);
	}
	
	createGameLoop();
	
	
	/*
	 * Owner
	 */
	myPlayer = null;
	spawnMyPlayer = function(name) {
		myPlayer = new pacman(name);
	}
	
	/*
	 * List of player
	 */
	players = [];
	
	/*
	 * function create new player
	 */
	spawnPlayer = function(name) {
		var newBie = new pacman(name);
		players.push(newBie);
	}
	
	function pacman(name) {
		this.x = 20;
		this.y = 20;
		this.color = "#FFFF00";
		this.width = 32;
		this.height = 32;
		this.speed = 5;
		this.name = name;
		this.setName = function(value) {
			this.name = value;
		},
		this.draw = function() {
			canvas.fillStyle = this.color;
			canvas.fillRect(this.x, this.y, this.width, this.height);
			canvas.fillStyle = "#000";
			canvas.fillText(this.name, this.x + this.width/2 - canvas.measureText(this.name).width/2,  this.y - 10);
		}
		this.direction = "right";
		this.setDirection = function(value) {
			this.direction = value;
		}
		this.move = function() {
			if(this.direction == "left") {
				this.x-=this.speed;
			}
			else if(this.direction == "right") {
				this.x+=this.speed;
			}
			else if(this.direction == "up") {
				this.y-=this.speed;
			}
			else if(this.direction == "down") {
				this.y+=this.speed;
			}
		}
	}
	
	function update() {
		if(myPlayer != null) myPlayer.move();
		//update all player position
		for(var i=0; i<players.length; i++) {
			players[i].move();
		}
	}
	
	function handleInput() {
		if(keydown.left) {
			myPlayer.setDirection("left");
		}
		
		if(keydown.right) {
			myPlayer.setDirection("right");
		}
		
		if(keydown.up) {
			myPlayer.setDirection("up");
		}
		
		if(keydown.down) {
			myPlayer.setDirection("down");
		}
	}
	
	
	
	function draw() {
		canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		//player.draw();
		if(myPlayer != null) myPlayer.draw();
		//Draw all player from list
		for(var i=0; i<players.length; i++) {
			players[i].draw();
		}
	}

});

