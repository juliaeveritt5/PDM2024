let color;
function setup() {
  createCanvas(1000, 600);
}

function draw() {
  let dragging = false;
  let colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "cyan",
    "blue",
    "magenta",
    "#8B4513",
    "white",
    "black",
  ];
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    if (i == 8) {
      stroke("gray");
    } else {
      noStroke();
    }
    square(5, 5 + 45 * i, 40);
  }
}

function mouseClicked() {
  if (mouseX > 5 && mouseX < 45 && mouseY > 5 && mouseY < 45) {
    color = "red";
  } else if (mouseX > 5 && mouseX < 45 && mouseY > 50 && mouseY < 90) {
    color = "orange";
  } else if (mouseX > 5 && mouseX < 45 && mouseY > 95 && mouseY < 135) {
    color = "yellow";
  } else if (mouseX > 5 && mouseX < 45 && mouseY > 140 && mouseY < 180) {
    color = "green";
  } else if (mouseX > 5 && mouseX < 45 && mouseY > 185 && mouseY < 225) {
    color = "cyan";
  } else if (mouseX > 5 && mouseX < 45 && mouseY > 230 && mouseY < 270) {
    color = "blue";
  } else if (mouseX > 5 && mouseX < 45 && mouseY > 275 && mouseY < 315) {
    color = "magenta";
  } else if (mouseX > 5 && mouseX < 45 && mouseY > 320 && mouseY < 360) {
    color = "#8B4513";
  } else if (mouseX > 5 && mouseX < 45 && mouseY > 365 && mouseY < 405) {
    color = "white";
  } else if (mouseX > 5 && mouseX < 45 && mouseY > 410 && mouseY < 450) {
    color = "black";
  }
}

function mousePressed() {
  dragging = true;
}

function mouseReleased() {
  dragging = false;
}

function mouseDragged() {
  if (dragging) {
    fill(color);
    circle(mouseX, mouseY, 10);
  }
}
