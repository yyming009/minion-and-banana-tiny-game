var minion;
var enemies = [];
var bananas = [];
var enemyEvil, enemyBad, badBanana;
var minionsLeft, minionsRight, minionsStatic;
var banana;
var heart;
var life, scores;

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
  
}

function setup() { 
    createCanvas(800, 600);

    minion = new Minion();
    life = 3;
    scores = 0;
} 

function draw() { 
    background(0);
    scoreDisplay();
    heartDisplay();

    //minion.display();
    minion.render();

  //random enemy getting
    var enemies_rnd = Math.ceil(random(30));
    if(enemies_rnd == 1) {
    enemies.push(new Enemy());
    }

  // random banana hatching
    var bananas_rnd = Math.ceil(random(30));
    if(bananas_rnd == 1) {
      bananas.push(new Banana());
    }
  
    // loop through each enemies
    for (var i = 0; i < enemies.length; i++) {
      // display ghost
      enemies[i].display();
    
      // check if ghost reaches bottom of the screen
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
          }
          enemies.splice(i, 1);        
          // play siren sound
          //sirenSound.play();
        }
      }
    }

    // loop through each dot
    for (var j = 0; j < bananas.length; j++) {
      // display dots
      bananas[j].display();
    
      // check if dot reaches bottom of screen
      if(bananas[j].positionY > 600) {
        bananas.splice(j, 1);
      } else {
        // check if pacman is touching dot
        var d2 = dist(bananas[j].positionX, bananas[j].positionY, minion.positionX, minion.positionY);
        if(d2 < 25) {
          bananas.splice(j, 1);
          scores++;
          // play score sound
          //scoreSound.play();
        }
      }
    }
  
    isOver();
}


function isOver() {
  // check for game over
    if(life <= 0) {

      alert("GAME OVER");

      // reset lives and score
      life = 3;
      scores = 0;
      
      minion.positionX = 400;
      minion.direction = "stopped";

      enemies = [];
      bananas = [];
      
      // play gameover sound
      //gameoverSound.play();
    }
}


function scoreDisplay() {

    fill(200);
    noStroke();
    textSize(24);
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

// function drawIntro() {
//  fill(255, 0, 0);
//  var centerX = width/2;
//  var centerY = 470;
//  ellipse(centerX, centerY, 130, 130);

//  fill(255);
//  noStroke();
//  text("WOULD YOU LIKE TO \n PLAY THE GAME?", 0, 0, width, height);
//  text("YES", 0, 450, width, 50);
// }

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
}

Banana.prototype.display = function() {
  ellipseMode(CENTER);
  fill(200);
  noStroke();
  image(banana, this.positionX, this.positionY, 42, 44);
  this.positionY += this.speed;
}


//**************************Enermy*********************************************************
function Enemy() {
  // set default properties
  this.positionX = random(0, width);
  this.positionY = 0;
  this.speed = random(1, 4);
  this.type = Math.ceil(random(8));
}

Enemy.prototype.display = function() {
  imageMode(CENTER);
  
  if (this.type == 1) {
      image(enemyEvil, this.positionX, this.positionY, 100, 100);
  } else {
    image(bomb, this.positionX, this.positionY, 50, 53);
  }

  this.positionY += this.speed;
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

// Minion.prototype.display = function() {
  
//   imageMode(CENTER);
  
//   // if Minion is facing right
//   if(this.direction == 'right') {
//    image(minionsRight, this.positionX, this.positionY, 67, 70); 
//     this.positionX += this.speed;
//     if (this.positionX + 30 > width) {
//      this.positionX = width - 30;
//     }
//   }
//   // if Minion is facing right
//   if(this.direction == 'left') {
//    image(minionsLeft, this.positionX, this.positionY, 90, 70); 
//     this.positionX -= this.speed;
//     if (this.positionX < 35) {
//      this.positionX = 35;
//     }
//   }
//   // if Minion is just start
//   if(this.direction == 'stopped') {
//     image(minionsStatic, this.positionX, this.positionY, 43, 70);
//   }
  
// }
