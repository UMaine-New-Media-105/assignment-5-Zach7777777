//Click the box on the left to spawn squares, for some reason there is already a square when the script is ran

let bubbleRad = 50;
let squares = [];
let sqauresDrawn = 0;
let healthAmmount = 200;
let hasHealth = true;
let bacDrawn = 20;
function setup() {
  //noLoop();
  createCanvas(960, 540);
  bubbles = [0];
  eaters = [0];
  let bacNum;
  angleMode(DEGREES);
  //this is the code for incrementing the array for the bubbles 
  for (let bubDrawn = 0; bubDrawn < 50; bubDrawn++) {
    let thisX = random(100, 860);
    let thisY = random(128, 410);
    let bubRad = random(40, 60);
    bubbles[bubDrawn] = new bubble(thisX, thisY, bubRad);
  }
  //this for loop creates the bactera class objects but doesnt draw them 
  for (let bacDrawn = 0; bacDrawn < 20; bacDrawn++) {
    let thisX = random(200, 800);
    let thisY = random(150, 400);
    bacteria[bacDrawn] = new bacteria(thisX, thisY, 50);
  }
  //this one does the same thing but for the squares, its a little different since they are spawned with the mouse
  for (let beef = 0; beef < 1; beef++) {
    squares.push(new Square(60, 300, squares.length));
  }
  frameRate(30);
}

function draw() {
  background(100, 200, 250);
  backdrop();

  //This for loops draws the bubbles by incrementing an array
  for (let bubShown = 0; bubShown < 50; bubShown++) {
    bubbles[bubShown].move();
    bubbles[bubShown].show();
  }
  //this is the for loop for the red squares that will be increased when the user clicks in the red box
  for (let i = 0; i < squares.length; i++) {
    squares[i].move();
    squares[i].create();
  }
  //this is the for loop that draws bacteria randomly
  for (let bacNum = 0; bacNum < bacDrawn; bacNum++) {
    bacteria[bacNum].create();
    bacteria[bacNum].move();
  }
  //this is the if statement that makes box that will spawn the red squares in
  if (mouseX > 0 && mouseX < 60 && mouseIsPressed && hasHealth == true) {
    print("lalalal");
    squares.push(new Square(60, 300, squares.length));
    healthAmmount = healthAmmount - 3;
    if (healthAmmount < 0) {
      hasHealth = false;
    }
  }
  healthBar();

  // print(bounceNum)
}
//making the bacteria class
class bacteria {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.speed = 3.4;
    this.directionX = 1;
    this.directionY = 1;
    this.bounceNum = 0;
  }

  create() {
    fill("lime");
    ellipse(this.x, this.y, this.size);
    ellipse(this.x - 20, this.y, this.size);
    ellipse(this.x - 20, this.y - 20, this.size);
    fill("hsl(130,60%,40%)");
    ellipse(this.x, this.y, this.size - 10);
    ellipse(this.x - 20, this.y, this.size - 10);
  }

  move() {
    this.x += this.speed * this.directionX;
    this.y += this.speed * this.directionY;

    if (this.x + this.size > width - 35 || this.x < 100) {
      this.directionX *= -1;
    }
    if (this.y + this.size > height - 73 || this.y < 140) {
      this.directionY *= -1;
    }
  }
}
//been trying to figure out how to make the squares disapear after 3 hits of the wall but I can't figure it out
class Square {
  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.speed = 10;
    this.directionX = 1;
    this.directionY = 1;
    this.bounceNum = 0;
    this.index = index;
  }

  create() {
    fill("tomato");
    rect(this.x, this.y, this.size);
    fill("maroon");
    rect(this.x + 5, this.y + 5, this.size / 1.4);
    fill("tomato");
    rect(this.x + 8, this.y + 8, this.size / 1.8);
  }

  move() {
    this.x += this.speed * this.directionX;
    this.y += this.speed * this.directionY;
    //this code is for making the square bounce within the boundaries 
    let leftWallHit = this.x < 60;
    let rightWallHit = this.x + this.size > width - 60;
    let topWallHit = this.y < 103;
    let bottomWallHit = this.y + this.size > height - 103;
    // this is the code that makes the square bounce 
    if (leftWallHit || rightWallHit) {
      this.directionX *= -1;
    }
    if (topWallHit || bottomWallHit) {
      this.directionY *= -1;
    }
    //this is the if statement that detects wall collisions and increments bounceNum accordingly 
    if (
      (leftWallHit && this.directionX === -1) ||
      (rightWallHit && this.directionX === 1) ||
      (topWallHit && this.directionY === -1) ||
      (bottomWallHit && this.directionY === 1)
    ) {
      this.bounceNum++;
      if (this.bounceNum >= 3) {
        squares.splice(this.index, 1);
      }
    }
  }
}
//Making the bubble class with perameters for x , y , and radius
class bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = "hsl(200, 40%, 60%)";
    this.color2 = "hsl(200, 90%, 60%)";
    this.addX = random(3);
    this.addY = random(2, 5);
  }
  move() {
    this.x = this.x + this.addX;
    this.y = this.y + this.addY;

    //reusing this from the lab it should hopefully make the bubbles stay on the canvass more
    //by reseting the x and y values when a bubble goes off the edge
    let dotIsTooFarLeft = this.x < 85;
    let dotIsTooFarRight = this.x > width - 85;
    let dotIsTooFarUp = this.y < 128;
    let dotIsTooFarDown = this.y > height - 128;
    if (dotIsTooFarLeft || dotIsTooFarRight) {
      this.addX = -this.addX;
    }
    if (dotIsTooFarUp || dotIsTooFarDown) {
      this.addY = -this.addY;
    }
  }
  // decided to make the bubble out of 3 ellipses so it looks more like a bubble and less like a circle
  show() {
    push();
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.r);
    fill(this.color2);
    ellipse(this.x, this.y, this.r - 8);
    fill("white");
    ellipse(this.x - 8, this.y - 11, this.r - 45);
    pop();
  }
}
//Drawing the backround items in a function instead of a class because I wont be changing it with code
function backdrop() {
  push();
  push();
  noFill();
  stroke("grey");
  strokeWeight(30);
  arc(85, 126, 80, 80, 180, 270);
  arc(875, 126, 80, 80, 270, 0);
  arc(85, 417, 80, 80, 70, 180);
  arc(874, 415, 80, 80, 0, 90);
  strokeWeight(10);

  noStroke();
  pop();
  noStroke();
  fill("grey");
  rect(0, 0, 1000, 100);
  rect(0, 0, 60, 600);
  rect(0, height - 100, 1000, 100);
  rect(width - 60, 0, 60, 600);
  fill("darkgrey");
  rect(0, 50, 1000, 50);
  rect(0, 440, 1000, 50);
  //using a loop to draw the bolts becuase I can 😎
  for (let hexysDrawn = 25; hexysDrawn < width; hexysDrawn = hexysDrawn + 70) {
    hexagon(hexysDrawn, 75, 0.1);
    hexagon(hexysDrawn, 465, 0.1);
  }
  //fill here is the exact rgb value of the css color tomato
  fill(255, 99, 71);
  //these \/ are also the coodinates of the box
  rect(0, 145, 60, 250);
  leftText(70, 175, 90);
  //drawing the other box on the right side
  fill("dodgerblue");
  rect(900, 145, 60, 250);
  push();
  fill(55, 55, 55);
  rect(0, 0, 1000, 50);

  pop();
}
//This hexagon function is not my code, but I am only using it to make the bolts
function hexagon(transX, transY, s) {
  push();
  stroke(255);
  strokeWeight(5);
  fill("grey");
  push();
  translate(transX, transY);
  scale(s);
  beginShape();
  vertex(-75, -130);
  vertex(75, -130);
  vertex(150, 0);
  vertex(75, 130);
  vertex(-75, 130);
  vertex(-150, 0);
  endShape(CLOSE);
  pop();
  pop();
}
//making another function for the text on the left
function leftText(x, y, r) {
  push();
  textSize(30);
  translate(x, y);
  rotate(r);
  fill(255, 255, 71);
  text("click to spawn", 0, 50);
  pop();
}
//Making a function for the energy bar at the bottom that determines how meny squares you can make
function healthBar() {
  push();
  fill("black");
  text("energery meter", 20, 500);
  fill("maroon");
  rect(15, 505, 410, 40);
  fill("tomato");
  rect(20, 510, healthAmmount * 2, 25);
  pop();
}
