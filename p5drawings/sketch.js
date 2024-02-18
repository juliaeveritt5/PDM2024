function setup() {
  createCanvas(1100, 1100);
}

function draw() {
  background(200);
  //first
  fill(57, 225, 20);
  noStroke();
  rect(50, 50, 500, 250);
  fill(700);
  stroke("black");
  strokeWeight(2);
  square(325, 90, 175);
  circle(200, 175, 175);

  //second
  noStroke();
  fill("white");
  square(50, 350, 400);
  fill(400, 125, 150, 90);
  circle(250, 500, 200);
  fill(75, 250, 150, 90);
  circle(325, 600, 200);
  fill(150, 150, 300, 90);
  circle(175, 600, 200);

  //third
  fill("black");
  rect(50, 800, 500, 250);
  fill("yellow");
  arc(175, 925, 200, 200, (5 * PI) / 4, (3 * PI) / 4);
  fill(225, 75, 50);
  square(320, 830, 190, 100, 100, 0, 0);
  stroke("white");
  strokeWeight(10);
  fill("blue");
  circle(365, 920, 50);
  circle(460, 920, 50);

  //fourth
  fill("navy");
  noStroke();
  square(600, 350, 400);
  stroke("white");
  strokeWeight(7);
  fill("green");
  circle(800, 550, 200);
  fill("red");
  beginShape(TESS);
  vertex(800, 450);
  vertex(825, 525);
  vertex(900, 525);
  vertex(845, 570);
  vertex(865, 630);
  vertex(800, 595);
  vertex(740, 635);
  vertex(755, 570);
  vertex(700, 525);
  vertex(775, 525);
  endShape(CLOSE);
}
