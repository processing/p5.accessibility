var x =0, speed =2;

function setup() {
  createCanvas(200,200);
}

function draw() {
  background(220);
  fill("red");
  ellipse(20,20,20,20);
  fill("blue");
  ellipse(50,x,10,10);
  fill("green");
  ellipse(150,200-x,10,10);
  x+=speed ;
  if(x>200 || x < 0) {
    speed = -speed;
  }
}
