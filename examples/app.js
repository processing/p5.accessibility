var x =0, speed =2;
let red;

function setup() {
  createCanvas(200,200);
  red=color(255,0,0);
}

function draw() {
  background(220);
  fill(red);
  ellipse(20,20,20,20);
  fill(32,255,65);
  ellipse(50,x,10,10);
  fill("#00ffb2");
  ellipse(150,200-x,10,10);
  fill(150);
  rect(170,170,25,25);
  x+=speed ;
  if(x>200 || x < 0) {
    speed = -speed;
  }
}
