let bubbleRad = 50
function setup() {
  createCanvas(960, 540);
  bubbles = [0]
  //this is the code for incrementing the array 
  for (let bubDrawn = 0; bubDrawn < 50; bubDrawn++) {
    let thisX = random(width);
    let thisY = random(height);
    let bubRad = random(40,60);
    bubble[bubDrawn] = new bubble(thisX, thisY, bubRad);
  }
  frameRate(20)
}

function draw() {
  background(70,20,250);
  //This for loops draws the bubbles by incrementing an array 
  for (let bubShown = 0; bubShown < 50; bubShown++) {
    bubble[bubShown].move();
    bubble[bubShown].show();
  }
    
}
//making the bubble class with perameters for x , y , and radius 
class bubble {
  constructor(x, y , r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = "hsl(200, 50%, 50%)"
    this.color2 = "hsl(200, 90%, 50%)"

  }
  move() {
    this.x = this.x + random(-8,8);
    this.y = this.y+ random(-8,8);
    //reusing this from the lab it should hopefully make the bubbles stay on the canvass more
    //by reseting the x and y values when a bubble goes off the edge 
     let dotIsTooFarLeft = this.x < 0;
    let dotIsTooFarRight = this.x > width;
    let dotIsTooFarUp = this.y < 0
    let dotIsTooFarDown = this.y > height
    if (dotIsTooFarLeft || dotIsTooFarRight) {
      this.x = -this.x;
    }
    if (dotIsTooFarUp || dotIsTooFarDown){
      this.y = -this.y
    }
  }
  // decided to make the bubble out of 3 ellipses so it looks more like a bubble and less like a circle
  show() {
    push();
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.r)
    fill(this.color2);
    ellipse(this.x, this.y, this.r-8);
    fill("white");
    ellipse(this.x-8, this.y-11, this.r -45);
    pop();
  }
}
