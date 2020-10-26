var context;
var shape = new Object();
var score;
var pac_color;
var interval;
var timeInterval;
var mouth_pacman;
var food_remain;
var monsters = [{ x: 1, y: 1, img: "./images/pink.ico", xPrev: 1, yPrev: 1 }, { x: 21, y: 15, img: "./images/red.png", xPrev: 21, yPrev: 15 }, { x: 1, y: 15, img: "./images/blue.ico", xPrev: 1, yPrev: 15 }, { x: 21, y: 1, img: "./images/orn.png", xPrev: 21, yPrev: 1 }];
var startMonsters = [{ x: 1, y: 1, img: "./images/pink.ico", xPrev: 1, yPrev: 1 }, { x: 21, y: 15, img: "./images/red.png", xPrev: 21, yPrev: 15 }, { x: 1, y: 15, img: "./images/blue.ico", xPrev: 1, yPrev: 15 }, { x: 21, y: 1, img: "./images/orn.png", xPrev: 21, yPrev: 1 }];
var board;
var numOfBall;
var gameKeys = [];
var keys =[];
var colorBalls = ["#F996B8", "#CE96F9", "#87F7F5"];
var timeOfGame;
var limitTime;
var numOfMonsters;
var ball5;
var ball15;
var ball25;
var loseGame;
var BallsAte;
var lives;
var gameInterval;
var pizza = { x: 21, y: 1, img: "./images/piz.png", xPrev: 21, yPrev: 1, active: true };
var playMusic= false;
var playMusicGameOver = false;
var startMusic;
var musicGameOver;
var timeOut;
var stop=false;

$(document).ready(function () {
	context = canvas.getContext("2d");
	//Start();
});

function game() {
	$("#welcomeDiv").hide();
	$("#loginDiv").hide();
	$("#registerDiv").hide();
	$("#settingDiv").hide();
	$("#canvesDiv").show();
	$("#welcome_user").text("Welcome" + "\u00A0" + user.username + "!");
}

function Start() {
	game();
	board = new Array();
	score = 0;
	lives = 5;
	BallsAte = 0;
	loseGame = false;
	timeOut = false;
	stop = false;
	pac_color = "red";
	keys = gameKeys;
	food_remain = numOfBall;
	limitTime = timeOfGame;
	ball5 = 0.6 * food_remain;
	ball15 = 0.3 * food_remain;
	ball25 = 0.1 * food_remain;
	board = [
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		[4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4],
		[4, 0, 4, 4, 4, 0, 4, 4, 4, 4, 0, 4, 0, 4, 4, 0, 4],
		[4, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 4, 0, 0, 4],
		[4, 0, 4, 0, 4, 0, 4, 0, 4, 4, 0, 4, 0, 4, 0, 0, 4],
		[4, 4, 4, 4, 4, 0, 4, 0, 4, 4, 4, 4, 4, 4, 4, 0, 4],
		[4, 0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4],
		[4, 0, 4, 4, 4, 0, 4, 4, 4, 4, 0, 4, 0, 4, 4, 0, 4],
		[4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4],
		[4, 0, 4, 4, 4, 0, 4, 0, 4, 4, 0, 4, 0, 0, 4, 0, 4],
		[4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4],
		[4, 4, 4, 4, 4, 0, 4, 0, 4, 4, 4, 0, 4, 4, 4, 4, 4],
		[4, 0, 0, 0, 0, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4],
		[4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4],
		[4, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
		[4, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4],
		[4, 0, 0, 0, 4, 0, 4, 4, 4, 4, 0, 4, 0, 4, 4, 4, 4],
		[4, 0, 4, 0, 4, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 4],
		[4, 0, 4, 0, 4, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 4],
		[4, 0, 4, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 4, 4, 4],
		[4, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4],
		[4, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4],
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]

	];

	initPacmen();
	initPizza();
	initMonsters();
	initClockAndDrugs();
	while (food_remain > 0) {
		emptyCell = findRandomEmptyCell(board);
		if (ball5 > 0) {
			board[emptyCell[0]][emptyCell[1]] = 5; //food
			ball5--;
		}
		else if (ball15 > 0) {
			board[emptyCell[0]][emptyCell[1]] = 15; //food
			ball15--;
		}
		else if (ball25 > 0) {
			board[emptyCell[0]][emptyCell[1]] = 25; //food
			ball25--;
		}
		food_remain--;

	}

	//drugs
	for(var i=0;i<lives;i++){
		var img=document.createElement("img");
		img.src="./images/drug.png";
		img.setAttribute("height", "30");
		img.setAttribute("width", "30");
		var imglives=document.getElementById("lblLives");
		imglives.appendChild(img);
	}

	keysDown = {};
	addEventListener(
		"keydown",
		function (e) {
			keysDown[e.code] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function (e) {
			keysDown[e.code] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 150);
	//intervalTime =  setTimeout(startTimer, 1000);
	timeInterval = setInterval(startTimer, 1000);
	gameInterval = setInterval(movingMonsters, 600);
}

function initPacmen() {
	var emptyCell = findRandomEmptyCell(board);
	shape.i = emptyCell[0];
	shape.j = emptyCell[1];
	board[emptyCell[0]][emptyCell[1]] = 2; //pacmen
}
 function initPizza(){
	 pizza.active=true;
	 if( numOfMonsters==4){
		var emptyCell = findRandomEmptyCell(board);
		pizza.x=emptyCell[0];
		pizza.y=emptyCell[1];
		pizza.xPrev=emptyCell[0];
		pizza.yPrev=emptyCell[1];
	 }
	 else{
		 pizza.x=21;
		 pizza.y=1;
		 pizza.xPrev=21;
		 pizza.yPrev=1;
	 }

 }

function initClockAndDrugs(){
	var emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] = 9; //clock
	emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] =10; //drug 
	emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] =10; //drug 
}

function findRandomEmptyCell(board) {
	var i = Math.floor((Math.random() * 22) + 1);
	var j = Math.floor((Math.random() * 16) + 1);
	while (board[i][j] != 0) {
		i = Math.floor((Math.random() * 22) + 1);
		j = Math.floor((Math.random() * 16) + 1);
	}
	return [i, j];
}

window.addEventListener("keydown", function (e) {
	if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
		e.preventDefault();
	}
}, false);

function GetKeyPressed() {
	if (keysDown[keys[0]]) {
		return 1;
	}
	if (keysDown[keys[1]]) {
		return 2;
	}
	if (keysDown[keys[2]]) {
		return 3;
	}
	if (keysDown[keys[3]]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = limitTime;
	showSettings();
	for (var i = 0; i < 23; i++) {
		for (var j = 0; j < 17; j++) {
			var center = new Object();
			center.x = i * 35 + 20;
			center.y = j * 35 + 20;
			if (board[i][j] == 2) {//pacman
				if (mouth_pacman == 2) { //down
					context.beginPath();
					context.arc(center.x, center.y, 15, 0.65 * Math.PI, 0.35 * Math.PI); // half circle
					context.stroke();
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color 
					context.fill();
					context.beginPath();
					context.arc(center.x + 6, center.y + 4, 2.5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color 
					context.fill();
				}
				else if (mouth_pacman == 3) { //left
					context.beginPath();
					context.arc(center.x, center.y, 15, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
					context.stroke();
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color 
					context.fill();
					context.beginPath();
					context.arc(center.x - 2, center.y - 7, 2.5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color 
					context.fill();
				}
				else if (mouth_pacman == 1) {//up
					context.beginPath();
					context.arc(center.x, center.y, 15, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
					context.stroke();
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color 
					context.fill();
					context.beginPath();
					context.arc(center.x + 6, center.y - 4, 2.5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color 
					context.fill();
				}
				else if (mouth_pacman == 4) {//right
					context.beginPath();
					context.arc(center.x, center.y, 15, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
					context.stroke();
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 2, center.y -7, 2.5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				else {
					context.beginPath();
					context.arc(center.x, center.y, 15, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
					context.stroke();
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 2, center.y -7, 2.5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
			} else if (board[i][j] == 5) {//food- 5ball
				context.beginPath();
				context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = colorBalls[0]; //color
				context.fill();
				context.stroke();

			}
			else if (board[i][j] == 15) {//food- 15ball
				context.beginPath();
				context.arc(center.x, center.y, 7, 0, 2 * Math.PI); // circle
				context.fillStyle = colorBalls[1]; //color
				context.fill();
				context.stroke();

			}
			else if (board[i][j] == 25) {//food- 25ball
				context.beginPath();
				context.arc(center.x, center.y, 9, 0, 2 * Math.PI); // circle
				context.fillStyle = colorBalls[2]; //color
				context.fill();
				context.stroke();

			}
			else if (board[i][j] == 4) {//walls
				var wall = new Image();
				wall.src = "./images/wall.png";
				context.drawImage(wall, center.x - 20, center.y - 20, 35, 35);
				
			}
			else if(board[i][j] == 9){//clock
				var clock = new Image();
				clock.src ="./images/clock.png";
				context.drawImage(clock, center.x - 18, center.y - 18, 30, 30);
			}
			else if(board[i][j] == 10){//drug
				var drug = new Image();
				drug.src ="./images/drug.png";
				context.drawImage(drug, center.x - 20, center.y - 20, 35, 35);
			}
		}
	}
	DrawMonsters();
	DrawPizza();
}

function DrawPizza() {
	if (pizza.active == true) {
		var center = new Object();
		center.x = pizza.x * 35 + 20;
		center.y = pizza.y * 35 + 20;
		var pizza_img = new Image();
		pizza_img.width = "30px";
		pizza_img.height = "30px";
		pizza_img.src = pizza.img;
		context.drawImage(pizza_img, center.x - 20, center.y - 20, 35, 35);
		if (pizza.x == shape.i && pizza.y == shape.j) {
			score = score + 50;
			pizza.active = false;
		}
	}
}
function bestMoveForPizza() {
	var optionalStepsPizza = new Array();
	var min = Number.MIN_SAFE_INTEGER;
	var bestMovePizza;
	var stepPizza;
	var distance;
	optionalStepsPizza.push([pizza.x - 1, pizza.y]);
	optionalStepsPizza.push([pizza.x + 1, pizza.y]);
	optionalStepsPizza.push([pizza.x, pizza.y + 1]);
	optionalStepsPizza.push([pizza.x, pizza.y - 1]);
	for (var i = 0; i < optionalStepsPizza.length; i++) {
		stepPizza = optionalStepsPizza[i];
		if (board[stepPizza[0]][stepPizza[1]] != 4) {
			distance = Math.sqrt(Math.pow(stepPizza[0] - shape.i, 2) + Math.pow(stepPizza[1] - shape.j, 2));
			if (distance > min && (pizza.xPrev != stepPizza[0] || pizza.yPrev != stepPizza[1])) {
				min = distance;
				bestMovePizza = { x: stepPizza[0], y: stepPizza[1] };
			}
		}
	}
	return bestMovePizza;

}

function movingPizza(){
	var bestPizza = bestMoveForPizza();
	pizza.xPrev=pizza.x;
	pizza.yPrev=pizza.y;
	pizza.x=bestPizza.x;
	pizza.y=bestPizza.y;
}

function bestMoveForMonster(monster) {
	var optionalSteps = new Array();
	var max = Number.MAX_SAFE_INTEGER;
	var bestMove;
	var step;
	var dis;
	optionalSteps.push([monster.x - 1, monster.y]);
	optionalSteps.push([monster.x + 1, monster.y]);
	optionalSteps.push([monster.x, monster.y + 1]);
	optionalSteps.push([monster.x, monster.y - 1]);
	for (var i = 0; i < optionalSteps.length; i++) {
		step = optionalSteps[i];
		if (board[step[0]][step[1]] != 4) {
			dis = Math.sqrt(Math.pow(step[0] - shape.i, 2) + Math.pow(step[1] - shape.j, 2));
			if (dis < max && (monster.xPrev != step[0] || monster.yPrev != step[1])) {
				max = dis;
				bestMove = { x: step[0], y: step[1] };
			}
		}
	}
	return bestMove;
}

function movingMonsters() {
	for (var i = 0; i < numOfMonsters; i++) {
		var best = bestMoveForMonster(monsters[i]);
		monsters[i].xPrev = monsters[i].x;
		monsters[i].yPrev = monsters[i].y;
		monsters[i].x = best.x;
		monsters[i].y = best.y;
	}
	movingPizza();
}

function DrawMonsters() {
	for (var i = 0; i < numOfMonsters; i++) {
		var center = new Object();
		var monster = monsters[i];
		center.x = monster.x * 35 + 20;
		center.y = monster.y * 35 + 20;
		var monster_img = new Image();
		monster_img.width = "30px";
		monster_img.height = "30px";
		monster_img.src = monster.img;
		context.drawImage(monster_img, center.x - 20, center.y - 20, 30, 30);
		if (monster.x == shape.i && monster.y == shape.j) {
			monsterHitPacmen();
		}
	}
}

function pacmanMeetMonster(){
	for(var i=0; i<numOfMonsters; i++){
		var monster = monsters[i];
		if (monster.x == shape.i && monster.y == shape.j) {
			monsterHitPacmen();
		}
	}
}

function monsterHitPacmen() {
	var drugs = document.getElementById("lblLives");
         drugs.removeChild(drugs.lastChild);
	if (lives > 1) {
		lives--;
		score = score - 10;
		lblScore.value = score
		initGameAfterHit();
	}
	else {
		lives--;
		score = score - 10;
		lblScore.value = score
		loseGame = true;
		gameOver();
	}
	
}

function initGameAfterHit() {
	board[shape.i][shape.j] = 0;
	initPacmen();
	initMonsters();

}

function initMonsters() {
	for (var i = 0; i < numOfMonsters; i++) {
		monsters[i].x = startMonsters[i].x;
		monsters[i].xPrev = startMonsters[i].xPrev;
		monsters[i].y = startMonsters[i].y;
		monsters[i].yPrev = startMonsters[i].yPrev;
	}
}

function UpdatePosition() {
	$("#lblScore").text(score);
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {//up
			shape.j--;
			mouth_pacman = 1;
		}
	}
	if (x == 2) {
		if (shape.j < 17 && board[shape.i][shape.j + 1] != 4) {//down
			shape.j++;
			mouth_pacman = 2;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {//left
			shape.i--;
			mouth_pacman = 3;
		}
	}
	if (x == 4) {
		if (shape.i < 22 && board[shape.i + 1][shape.j] != 4) {//right
			shape.i++;
			mouth_pacman = 4;
		}
	}
	if (board[shape.i][shape.j] == 5) {//food- ball 5 points
		score = score + 5;
		BallsAte++;
	}
	else if (board[shape.i][shape.j] == 15) {//food- ball 15 points
		score = score + 15;
		BallsAte++;
	}
	else if (board[shape.i][shape.j] == 25) {//food- ball 25 points
		score = score + 25;
		BallsAte++;
	}
	else if(board[shape.i][shape.j] == 9){ //clock
		limitTime = limitTime + 30;
	}
	else if(board[shape.i][shape.j] == 10){
		lives++;
		var img = document.createElement("img");
		img.src = "./images/drug.png";
		img.setAttribute("height", "30");
		img.setAttribute("width", "30");
		var livesImg = document.getElementById("lblLives");
		livesImg.appendChild(img);
	}
	board[shape.i][shape.j] = 2;
	pacmanMeetMonster();
	if (pizza.x == shape.i && pizza.y == shape.j) {
		score = score + 50;
		pizza.active = false;
	}

	if (BallsAte == numOfBall) {
		timeOut = true;
		gameOver();
	} else {
		Draw();
	}
}

function showSettings() {
	lblUp.value = gameKeys[0];
	lblDown.value = gameKeys[1];
	lblLeft.value = gameKeys[2];
	lblRight.value = gameKeys[3];
	lblBalls.value = numOfBall;
	lblBall5.value = colorBalls[0];
	lblBall5.style["background-color"] = colorBalls[0];
	lblBall15.value = colorBalls[1];
	lblBall15.style["background-color"] = colorBalls[1];
	lblBall25.value = colorBalls[2];
	lblBall25.style["background-color"] = colorBalls[2];
	lblMonsters.value = numOfMonsters;
}
/*timer of game*/
function startTimer() {
	limitTime--;
	if (limitTime == 0 && !loseGame) {
		timeOut= true;
		gameOver();
	}
}
function gameOver() {
	startMusic.pause();
	playMusic = false;
	var message;
	var messageWidth;
	var imageOver=new Image();
	if(!stop){
		if (loseGame) {
			message = "Loser!";
			musicGameOver = new Audio('./music/gameOver1.mp3');
			imageOver.src ="./images/loser.png";
			messageWidth =260;
		}
		else if (timeOut && score < 100) {
			message = "You are better than " + score + " points!";
			musicGameOver = new Audio('./music/gameOver2.mp3');
			imageOver.src ="./images/scoreLose.png";
			messageWidth =20;
		}
		else if (timeOut) {
			message = "Winner!!!";
			musicGameOver=new Audio('./music/winner.mp3');
			imageOver.src ="./images/winner.png";
			messageWidth =220;
		}
		musicGameOver.play();
		playMusicGameOver = true;
		//alert(message);
		clearAll();
		//show image
		context.clearRect(0,0,canvas.width,canvas.height);
		context=canvas.getContext("2d");
		
		imageOver.onload=function(){
		  	context.drawImage(imageOver,100,100,400,400);
			context.font = "50px Verdana";
			// Create gradient
			var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
			gradient.addColorStop("0"," black");
			gradient.addColorStop("0.5", "red");
			gradient.addColorStop("1", "black");
			// Fill with gradient
			context.fillStyle = gradient;
			context.fillText(message, messageWidth, 540);
	}
}

}

function newGame() {
	clearAll();
	if(playMusicGameOver)
	  musicGameOver.pause();
	if(!playMusic){
		startMusic = new Audio('./music/startGame.mp3');
		startMusic.play();
		playMusic=true;
	}else{
		startMusic.pause();
		startMusic = new Audio('./music/startGame.mp3');
		startMusic.play();

	}

	initMonsters();
	limitTime = timeOfGame;
	keys = gameKeys;
	for(var i=0;i<lives;i++){
		var drugs = document.getElementById("lblLives");
         drugs.removeChild(drugs.lastChild);
	}
	Start();
}

function clearAll(){
	window.clearInterval(interval);
	window.clearInterval(timeInterval);
	window.clearInterval(gameInterval);
	limitTime = 0;
	stop= true;
	keys = undefined;
	
}

function stopGame(){
	clearAll();
	if(playMusicGameOver)
	  musicGameOver.pause();
	if(playMusic){
	  startMusic.pause();
	  playMusic = false;
	}
}
