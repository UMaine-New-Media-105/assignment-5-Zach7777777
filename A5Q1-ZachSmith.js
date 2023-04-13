let bubbleRad = 50
function setup() {
  createCanvas(960, 540);
  frameRate(15)
}

function draw() {
  background(70,20,250);
  //creating bubbles
  let bubble1 = new bubble(100,100,50)
  let bubble2 = new bubble(200,400,50)
  let bubble3 = new bubble(700,150,50)
  let bubble4 = new bubble(400,250,50)
  let bubble5 = new bubble(850,400,50)

  //calling bubbles
  bubble1.move()
  bubble1.show()
  bubble2.move()
  bubble2.show()
  bubble3.move()
  bubble3.show()
  bubble4.move()
  bubble4.show()
  bubble5.move()
  bubble5.show()

  
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
    this.x = this.x + random(8);
    this.y = this.y+ random(8);
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
    ellipse(this.x-8, this.y-11, this.r -40);
    pop();
  }
}
