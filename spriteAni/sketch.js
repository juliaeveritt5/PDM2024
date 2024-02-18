let sprite1;
let sprite2;

function preload() {
  sprite1 = new Sprite(200, 100, 80, 80);
  sprite2 = new Sprite(200, 250, 80, 80);
  sprite1.spriteSheet = "assets/sprite1.png";
  sprite2.spriteSheet = "assets/sprite2.png";
  let animations = {
    stand: { row: 0, frames: 1 },
    walkRight: { row: 0, col: 1, frames: 8 },
  };
  sprite1.anis.frameDelay = 7;
  sprite2.anis.frameDelay = 7;
  sprite1.addAnis(animations);
  sprite2.addAnis(animations);
  sprite1.changeAni("stand");
  sprite2.changeAni("stand");
}

function setup() {
  createCanvas(400, 400);
  sprite1.vel.x = 0;
  sprite2.vel.x = 0;
}

function draw() {
  background(220);

  if (keyIsDown(LEFT_ARROW)) {
    walkLeft();
  } else if (keyIsDown(RIGHT_ARROW)) {
    walkRight();
  } else {
    stand();
  }

  if (sprite1.x + sprite1.width / 4 > width) {
    walkLeft();
  } else if (sprite1.x - sprite1.width / 4 < 0) {
    walkRight();
  }
}

function walkRight() {
  sprite1.changeAni("walkRight");
  sprite2.changeAni("walkRight");
  sprite1.scale.x = 1;
  sprite2.scale.x = 1;
  sprite1.vel.x = 2;
  sprite2.vel.x = 2;
}

function walkLeft() {
  sprite1.changeAni("walkRight");
  sprite2.changeAni("walkRight");
  sprite1.scale.x = -1;
  sprite2.scale.x = -1;
  sprite1.vel.x = -2;
  sprite2.vel.x = -2;
}

function stand() {
  sprite1.changeAni("stand");
  sprite2.changeAni("stand");
  sprite1.vel.x = 0;
  sprite2.vel.x = 0;
}
