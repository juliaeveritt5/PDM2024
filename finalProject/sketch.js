let percy;
let bag;
let gBag;
let frameDel = 5;
let bags = [];
let bagColor = ["blue", "red", "pink"];
let time = 30;
let tries = 3;
let vel = 7;
let x = 0;
let hit = false;
let startTime;
let startTime2;

//arduino
let port;
let percyX = 400,
  percyY = 400;
let joyX = 0,
  joyY = 0,
  sw = 0;
let connectButton;
let speed = 7;

//sound
let sequence, square;
let melody = [
  "G4",
  "E4",
  "G4",
  ["F4", "E4", "D4"],
  "C4",
  ["B4", "A4"],
  "G4",
  ["F4", "E4", "D4"],
  ["B4", "A4"],
];

let win = [["G4", "F4", "E4"], ["E4", "D4", "C4"], "G4"];

square = new Tone.Synth({
  oscillator: {
    type: "square",
  },
  envelope: {
    attack: 0.1,
    decay: 0.1,
    sustain: 1,
    release: 0.1,
  },
}).toDestination();
square.volume.value = -8;

sequence = new Tone.Sequence(
  function (time, note) {
    square.triggerAttackRelease(note, 0.6);
  },
  melody,
  "6n"
);

let winSound = new Tone.Sequence(
  function (time, note) {
    square.triggerAttackRelease(note, 0.6);
  },
  win,
  "6n"
);

const wrongBag = new Tone.MembraneSynth().toDestination();

let bpm = 105;
Tone.Transport.start();
Tone.Transport.bpm.value = bpm;

function preload() {
  let bagAnimations = {
    blue: { row: 0, col: 0, frames: 1 },
    red: { row: 0, col: 1, frames: 1 },
    pink: { row: 0, col: 2, frames: 1 },
  };

  for (let i = 0; i < 15; i++) {
    bags.push(
      new Bags(
        random(25, 775),
        random(25, 775),
        50,
        50,
        "assets/bagsSprite.png",
        bagAnimations
      )
    );
  }

  let greenAnimations = {
    green: { row: 0, col: 3, frames: 1 },
  };

  gBag = new greenBag(
    random(25, 775),
    random(25, 775),
    50,
    50,
    "assets/bagsSprite.png",
    greenAnimations
  );

  let percyAnimations = {
    stand: { row: 0, col: 0, frames: 1 },
    walk: { row: 0, col: 2, frames: 3 },
  };

  percy = new Percy(
    percyX,
    percyY,
    50,
    50,
    "assets/percySprite.png",
    percyAnimations
  );
}

function setup() {
  port = createSerial();
  createCanvas(800, 800);
  connectButton = createButton("Connect");
  connectButton.mousePressed(connect);
  startTime = millis();
  startTime2 = millis();
}

function draw() {
  background("#ADD8E6");

  //rules
  let elapsedTime = millis() - startTime;
  if (elapsedTime < 7000 && !port.opened()) {
    fill("black");
    noStroke();
    textAlign(CENTER);
    textSize(30);
    text("Welcome to Cat in a Bag!", 400, 320);
    text("Percy is a gray cat who loves bags!", 400, 360);
    text("Help Percy find her favorite green bag!", 400, 400);
    text("You have 3 tries to select the right bag.", 400, 440);
  }

  let str = port.readUntil("\n");
  let values = str.split(",");
  sequence.start();

  if (port.opened() && time >= 0 && tries > 0 && !hit) {
    //time
    textAlign(LEFT);
    fill("black");
    textSize(20);
    text("Time Remaining: " + ceil(time), 20, 25);
    time -= deltaTime / 1000;

    //make bags move
    if (x == 0) {
      bags.forEach((bag) => {
        bag.sprite.vel.y = 6;
      });
      gBag.sprite.vel.y = 7;
      gBag.sprite.vel.x = 7;
      x++;
    }

    //other bags bounce
    bags.forEach((bag) => {
      if (bag.sprite.y + bag.sprite.height / 2 > height) {
        bag.sprite.vel.y = -6;
      } else if (bag.sprite.y - bag.sprite.height / 2 < 0) {
        bag.sprite.vel.y = 6;
      }
    });

    //green bag bounce
    if (gBag.sprite.y + gBag.sprite.height / 2 > height) {
      gBag.sprite.vel.y = -8;
      gBag.sprite.vel.x -= random(3);
    } else if (gBag.sprite.y - gBag.sprite.height / 2 < 0) {
      gBag.sprite.vel.y = 8;
      gBag.sprite.vel.x += random(3);
    } else if (gBag.sprite.x + gBag.sprite.width / 2 > width) {
      gBag.sprite.vel.x = -8;
      gBag.sprite.vel.y -= random(3);
    } else if (gBag.sprite.x - gBag.sprite.width / 2 < 0) {
      gBag.sprite.vel.x = 8;
      gBag.sprite.vel.y += random(3);
    }

    //joystick controls
    if (values.length > 2) {
      joyX = values[0];
      joyY = values[1];
      sw = Number(values[2]);

      if (joyX > 0) {
        percyX += speed;
        percy.walkRight();
      } else if (joyX < 0) {
        percyX -= speed;
        percy.walkLeft();
      }

      if (joyY > 0) {
        percyY += speed;
        percy.walkDown();
      } else if (joyY < 0) {
        percyY -= speed;
        percy.walkUp();
      }

      if (0 <= joyY && 5 >= joyY && 0 <= joyX && 5 >= joyX) {
        percy.stand();
      }
    }

    //percy location using joystick
    percy.sprite.y = percyY;
    percy.sprite.x = percyX;

    //check if bag clicked
    for (let i = 0; i < bags.length; i++) {
      bag = bags[i];
      //wrong bag clicked
      if (
        percyX > bag.sprite.x - bag.sprite.width / 2 &&
        percyX < bag.sprite.x + bag.sprite.width / 2 &&
        percyY > bag.sprite.y - bag.sprite.height / 2 &&
        percyY < bag.sprite.y + bag.sprite.height / 2 &&
        sw == 1
      ) {
        //make an LED turn off
        sw = 0;
        tries--;
        console.log(tries);
        switch (tries) {
          case 2:
            port.write("11");
            break;
          case 1:
            port.write("12");
            break;
          case 0:
            port.write("13");
            break;
        }
        //make a sound for clicking wrong bag colour
        wrongBag.triggerAttackRelease("E3", "8n");

        //green bag clicked
      } else if (
        percyX > gBag.sprite.x - gBag.sprite.width / 2 &&
        percyX < gBag.sprite.x + gBag.sprite.width / 2 &&
        percyY > gBag.sprite.y - gBag.sprite.height / 2 &&
        percyY < gBag.sprite.y + gBag.sprite.height / 2 &&
        sw == 1
      ) {
        //LED flash, go to win screen
        sw = 0;
        percy.stand();
        port.write("1");
        hit = true;
      }
    }
  } else {
    sequence.stop();
    //bags stop moving
    bags.forEach((bag) => {
      bag.sprite.vel.y = 0;
    });
    gBag.sprite.vel.x = 0;
    gBag.sprite.vel.y = 0;

    //win
    if (hit) {
      winSound.start();

      bags.forEach((bag) => {
        bag.sprite.remove();
      });

      textSize(100);
      textAlign(CENTER);
      stroke("black");
      strokeWeight(3);
      fill("pink");
      text("You did it!", 400, 300);
      textSize(40);
      text("Thanks for playing Cat in a Bag!", 400, 450);
    }

    //out of tries or out of time
    if (tries == 0 || time <= 1) {
      bags.forEach((bag) => {
        bag.sprite.remove();
      });
      percy.sprite.remove();
      gBag.sprite.remove();
      textSize(100);
      textAlign(CENTER);
      stroke("black");
      strokeWeight(3);
      fill("pink");
      text("Oh No!", 400, 300);
      textSize(40);
      text("You didn't find the right bag.", 400, 450);
      text("Play Again!", 400, 500);
    }
  }
}

function connect() {
  if (!port.opened()) {
    port.open("Arduino", 2000000);
  } else {
    port.close();
  }
}

class Percy {
  constructor(x, y, width, height, spriteSheet, animations) {
    this.sprite = new Sprite(x, y, width, height);
    this.sprite.spriteSheet = spriteSheet;
    this.sprite.collider = "none";
    this.sprite.anis.frameDelay = frameDel;
    this.sprite.addAnis(animations);
    this.sprite.changeAni("stand");
  }

  walkLeft() {
    this.sprite.changeAni("walk");
    this.sprite.scale.x = 1;
  }

  walkRight() {
    this.sprite.changeAni("walk");
    this.sprite.scale.x = -1;
  }

  walkUp() {
    this.sprite.changeAni("walk");
  }

  walkDown() {
    this.sprite.changeAni("walk");
  }

  stand() {
    this.sprite.changeAni("stand");
    this.sprite.vel.y = 0;
    this.sprite.vel.x = 0;
  }
}

class Bags {
  constructor(x, y, width, height, spriteSheet, animations) {
    this.sprite = new Sprite(x, y, width, height);
    this.sprite.spriteSheet = spriteSheet;
    this.sprite.collider = "none";
    this.sprite.addAnis(animations);
    this.sprite.changeAni(random(bagColor));
    this.sprite.vel.y = 5;
  }
}

class greenBag {
  constructor(x, y, width, height, spriteSheet, animations) {
    this.sprite = new Sprite(x, y, width, height);
    this.sprite.spriteSheet = spriteSheet;
    this.sprite.collider = "none";
    this.sprite.addAnis(animations);
    this.sprite.changeAni("green");
    this.sprite.vel.y = 6;
    this.sprite.vel.x = 6;
  }
}
