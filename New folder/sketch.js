var minion;
var enemies = [];
var bananas = [];
var enemyEvil, enemyBad, badBanana;
var minionsLeft, minionsRight, minionsStatic;
var banana;
var heart;
var life, scores;
var state = 0;
var startCenterX;
var startCenterY;
var startButtonSize = 130;
var hello, bananaSound, hahaha, dead, bad;

function preload() {
  	// load enemis images
    enemyEvil = loadImage('image/enemy_evil.png');
    //enemyBad = loadImage('image/enemy_bad.png');
    //badBanana = loadImage('image/badBanana.jpg');
    bomb = loadImage('image/bomb.png');

  	// load minion images
    minionsLeft = loadImage('image/minions-left.png');
    minionsRight = loadImage('image/minions-right.png')
    minionsStatic = loadImage('image/minions-static.png');

    //load the banana
    banana = loadImage('image/banana.png');

    // load in heart image
    heart = loadImage('image/heart.png');

    //load the background images
    introBack = loadImage('image/introback.jpg');
  	end = loadImage('image/end.jpg');

  	//load the sound
  	soundFormats('mp3', 'ogg');
	hello = loadSound('voice/hello.mp3');
	bananaSound = loadSound('voice/banana.mp3');
	hahaha = loadSound('voice/hahaha.mp3');
	bad = loadSound('voice/bad.mp3');
	dead = loadSound('voice/dead.mp3');
}

function setup() { 
    createCanvas(800, 600);
	startCenterX = width/2;
	startCenterY = 470;

    minion = new Minion();
    life = 3;
    scores = 0;

    textFont("Helvetica");
    textSize(50);
    textAlign(CENTER);
} 

function draw() { 
    background(0);
    image(introBack, 0, 0, 1600, 1200);

    if (state == 0) {
    	//hello.play();
    	drawIntro();

    } else if (state == 1) {

	    scoreDisplay();
	    heartDisplay();

	    minion.render();

	  //random enemy dropping
	    var enemies_rnd = Math.ceil(random(40));
	    if(enemies_rnd == 1) {
		  enemies.push(new Enemy());
	    }

	  // random banana dropping
	    var bananas_rnd = Math.ceil(random(16));
	    if(bananas_rnd == 1) {
	      bananas.push(new Banana());
	    }
	  
	    for (var i = 0; i < enemies.length; i++) {
	      enemies[i].render();
	    
	      // check if ememy reaches bottom of the screen
	      if(enemies[i].positionY > 600) {
	        enemies.splice(i, 1);
	      } else {
	        // check if minion is touching enermy
	        var d1 = dist(enemies[i].positionX, enemies[i].positionY, minion.positionX, minion.positionY);
	        if(d1 < 50) {
	        	if (enemies[i].type == 1) {
	        		life = life - 3;         
	        	} else {
	        		life--;
	        		bad.play();
	        	}
	            enemies.splice(i, 1);        
	            
	        }
	      }
	    }

	    for (var j = 0; j < bananas.length; j++) {
	      bananas[j].render();
	    
	      // check if banana reaches bottom of screen
	      if(bananas[j].positionY > 600) {
	        bananas.splice(j, 1);
	      } else {
	        // check if minion is touching banana
	        var d2 = dist(bananas[j].positionX, bananas[j].positionY, minion.positionX, minion.positionY);
	        if(d2 < 25) {
	          bananas.splice(j, 1);
	          scores++;
	          bananaSound.play();
	        }
	      }
	    }
	  
	    if (life <= 0) {
	    	gameOver();
	    	dead.play();
	    }

	} else {
    	drawEnd();
    }
}

//***********************************************Transitions***********************************
function drawIntro() {
	fill(255, 120, 0);
	image(introBack, 0, 0, 800, 600);
	var centerX = width/2;
	var centerY = 470;
	ellipse(startCenterX, startCenterY, startButtonSize, startButtonSize);

	fill(255);
	noStroke();
	text("WOULD YOU LIKE TO \n PLAY THE GAME?", 0, 80, width, height-100);
	text("YES", 6, 450, width, 50);
}

function drawEnd() {
	textSize(50);
	textAlign(CENTER, CENTER);

	fill(255, 0, 0);
	image(end, 600, 600, 2400, 1800);
	ellipse(startCenterX, startCenterY, startButtonSize, startButtonSize);

	fill(255);
	noStroke();
	text(scores, 0, 300, width, 55);
	text("PLAY AGAIN?", 0, 80, width, 100);
	text("YES", 6, 450, width, 50);
}

function mousePressed() {
	if (state != 1) {
		var d = dist(mouseX, mouseY, startCenterX, startCenterY);
		if (d < startButtonSize/2) {
			startGame();
		}
	}
}

function startGame() {
	//hello.play();
	life = 3;
	scores = 0;
	  
	minion.positionX = 400;
	minion.direction = "stopped";

	enemies = [];
	bananas = [];

	state = 1;
}

function gameOver() {
	state = 2;
	// reset lives and score
	// play gameover sound
	//gameoverSound.play();
}


function scoreDisplay() {
    fill(200);
    noStroke();
    textSize(24);
    textAlign(LEFT);
    text("Score: " + scores, 30, 50);
}

function heartDisplay() {
	 // display number of lives
	if (life == 3) {
		image(heart, 650, 30, 30, 45);
        image(heart, 690, 30, 30, 45);
        image(heart, 730, 30, 30, 45);
	} else if (life == 2) {
		image(heart, 690, 30, 30, 45);
        image(heart, 730, 30, 30, 45);
	} else if (life == 1) {
		image(heart, 730, 30, 30, 45);
	}
}

function keyPressed() {
  // if the right arrow was pressed
  if(keyCode == RIGHT_ARROW) {
    minion.direction = 'right';
  }
  
  // if the left arrow was pressed
  if(keyCode == LEFT_ARROW) {
    minion.direction = 'left';
  }
}

function scaleImage(img) {
	var aspect = img.height / img.width;
	var imgWidth = 20;
	var imgHeight = imgWidth * aspect;
}

//**************************Banana*********************************************************
function Banana() {
  // set default properties
  this.positionX = random(0, 800);
  this.positionY = 0;
  this.speed = random(1, 8);

  this.render = function() {
	  ellipseMode(CENTER);
	  fill(200);
	  noStroke();
	  image(banana, this.positionX, this.positionY, 42, 44);
	  this.positionY += this.speed;
	}
}

//**************************Enermy*********************************************************
function Enemy() {
  // set default properties
  this.positionX = random(0, width);
  this.positionY = 0;
  this.speed = random(1, 4);
  this.type = Math.ceil(random(8));

  this.render = function() {
	  imageMode(CENTER);
	  
	  if (this.type == 1) {
	      image(enemyEvil, this.positionX, this.positionY, 100, 100);
	  } else {
		  image(bomb, this.positionX, this.positionY, 50, 53);
	  }

	  this.positionY += this.speed;
	}
}

//**************************Minion*********************************************************
function Minion() {
  // set default properties
  this.positionX = 400;
  this.positionY = 550;
  this.speed = 4;
  this.direction = "stopped";

  this.render = function() {
	  imageMode(CENTER);	  
	  // if Minion is facing right
	  if(this.direction == 'right') {
	  	image(minionsRight, this.positionX, this.positionY, 67, 70); 
	    this.positionX += this.speed;
	    if (this.positionX + 30 > width) {
	    	this.positionX = width - 30;
	    }
	  }
	  // if Minion is facing right
	  if(this.direction == 'left') {
	  	image(minionsLeft, this.positionX, this.positionY, 90, 70); 
	    this.positionX -= this.speed;
	    if (this.positionX < 35) {
	    	this.positionX = 35;
	    }
	  }
	  // if Minion is just start
	  if(this.direction == 'stopped') {
	    image(minionsStatic, this.positionX, this.positionY, 43, 70);
	  }
	}

}
