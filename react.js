var shape = document.querySelector(".shape"),
	gameArea = document.getElementById("game-area"), 
	easy = document.querySelector(".easy"),
	normal = document.querySelector(".normal"),
	difficult = document.querySelector(".difficult"),
	starterSquare = document.querySelector(".starter-square"),
	start = document.querySelector("#begin"),
	replay = document.querySelector("#replay"),
	timerCount = document.querySelector("#count-up"),
	timerDisplay = document.querySelector("#time"),
	scoreDisplay = document.querySelector("#score"),
	instructions = document.getElementById("instructions"),
	bestScore = document.getElementById("high-score"),
	newHigh = document.querySelector(".new-high"),
	levels = [easy, normal, difficult],
	highScores = [0, 0, 0],
	size = 0,
	mode = 0,
	score = 0,
	mil = 100,
	// sec = 10,
	timer = 0,
	score = 0;

// ============Select Game=================
startListen(levels);
// ===============Start Game=================
start.addEventListener("click", startGame);
shape.addEventListener("click", playGame)

// // ===========Shape Generator==============
function easySize() {
	var max = 300,
		min = 250;
	size = Math.floor(Math.random() * (max - min) + min);
	shape.style.height = size+"px";
	shape.style.width = size+"px";
	return size
}

function normalSize() {
	var max = 200;
	var min = 150;
	size = Math.floor(Math.random() * (max - min) + min);
	shape.style.height = size+"px";
	shape.style.width = size+"px";
	return size
}

function hardSize() {
	var max = 125;
	var min = 75;
	size = Math.floor(Math.random() * (max - min) + min);
	shape.style.height = size+"px";
	shape.style.width = size+"px";
	return size
}

function Color() {
	var red = Math.floor(Math.random() * 256),
		green = Math.floor(Math.random() * 256),
		blue = Math.floor(Math.random() * 256),
	    color = "rgb("+red+","+green+","+blue+")";
	    shape.style.backgroundColor = color;
}

function Shape() {
	var shapeShape = Math.round(Math.random());
	if (shapeShape === 0) {
		shape.style.borderRadius = "50%";
	} else {
		shape.style.borderRadius = "1em";
	}
}

function Position() {
	var top = Math.floor(Math.random() * (700 - size)),
		left = Math.floor(Math.random() * (gameArea.clientWidth - size));
	shape.style.top = top+"px";
	shape.style.left = left+"px";
}

function genShape() {
	if (mode === 2) {
		hardSize();
	} else if (mode === 1) {
		normalSize();
	} else {
		easySize();
	}
	Shape();
	Color();
	Position();
}
// ============Selector Functions ==============
function selector(event){
	var target = event.target;
	start.classList.remove("high-hidden");
	if (target === easy) {
		Easy();
	} else if (target === normal) {
		Normal();
	} else if (target === difficult) {
		Difficult();
	}
	bestScore.innerHTML = highScores[mode];
}

function Easy(){
	easy.classList.add("selected");
	normal.classList.remove("selected");
	difficult.classList.remove("selected");
	mode= 0;
}

function Normal() {
	normal.classList.add("selected");
	easy.classList.remove("selected");
	difficult.classList.remove("selected");
	mode = 1;
}

function Difficult() {
	difficult.classList.add("selected");
	easy.classList.remove("selected");
	normal.classList.remove("selected");
	mode = 2;
}


// =============Timer==================
function counter() {
	var time = mil / 10;
	if(mil===0) {
		clearInterval(timer);
		endGame();
	} else {
		mil -= 1;
	}
	timerDisplay.innerHTML = time.toFixed(1);
}

function startTimer() {
	mil = 100;
	timer= setInterval(counter, 100);
}

// ============Game Play=============

function startGame() {
	Reset();
	stopListen(levels);
	startTimer();
	genShape();
}

function playGame() {
	score += 1
	genShape()
	// scoreDisplay.innerHTML = score;	
}

function endGame() {
	starterSquare.classList.remove("hidden");
	keepScore();
	setTimeout (function(){
		replay.addEventListener("click", startGame);
	}, 700);
	shape.classList.add("hidden");
	startListen(levels);
}

function keepScore() {
	if (score>highScores[mode]) {
		highScores[mode] = score;
		newHigh.classList.remove("high-hidden");
		bestScore.innerHTML = highScores[mode];
	}
	scoreDisplay.innerHTML = score;
}

function Reset() {
	newHigh.classList.add("high-hidden");
	starterSquare.classList.add("hidden");
	instructions.classList.add("hidden");
	shape.classList.remove("hidden");
	replay.removeEventListener("click", startGame);
	score = 0;
}

function startListen(levels) {
	levels.forEach(function(level){
		level.addEventListener("click", selector);
	});
}

function stopListen(levels) {
	levels.forEach(function(level) {
		level.removeEventListener("click", selector);
	});
}

