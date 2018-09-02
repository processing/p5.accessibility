
let x =0, speed =2;
let mycolor;
let backColor;
function setup() {
  createCanvas(200,200);
  mycolor=color(255,128,0);
  backColor=color(123,87,255);
}

function draw() {
  background(backColor);
  fill(mycolor);
  ellipse(20,20,20,20);
  fill('maroon');
  ellipse(20,50,20,20);
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