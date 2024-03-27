let score = 0;
let time = 30;
let squished = false;
let frameDel = 7;
let velYneg = -1;
let velYpos = 1;
let bugs = [];
let bug;
let numSquish = 0;

let sequence, square;
let melody = [
  "D3",
  "C4",
  "B4",
  "D4",
  ["B4", "A4"],
  "C4",
  ["G4", "E4"],
  "D3",
  "D4",
  ["C4", "B4"],
  "A4",
  "D3",
  "F4",
];

let ending = ["B4", "A4", "C3", "F2"];

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
    square.triggerAttackRelease(note, 0.4);
  },
  melody,
  "5n"
);

let end = new Tone.Sequence(
  function (time, note) {
    square.triggerAttackRelease(note, 1);
  },
  ending,
  "3n"
);

let bpm = 130;
Tone.Transport.start();
Tone.Transport.bpm.value = bpm;

const squishSound = new Tone.MembraneSynth().toDestination();

function preload() {
  let animations = {
    stand: { row: 0, col: 0, frames: 1 },
    walk: { row: 0, col: 1, frames: 2 },
    squish: { row: 0, col: 3, frames: 1 },
  };

  for (let i = 0; i < 5; i++) {
    bugs.push(
      new Bug(
        random(25, 775),
        random(25, 775),
        50,
        50,
        "assets/bug4.png",
        animations
      )
    );
  }
}

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background("#E6FFE6");
  textSize(20);

  sequence.start();

  if (time >= 0) {
    text("Time Remaining: " + ceil(time), 20, 25);
    text("Score: " + score, 20, 50);
    time -= deltaTime / 1000;

    if (numSquish === 3) {
      moreBugs();
      numSquish = 0;
    }

    bugs.forEach((bug) => {
      if (bug.sprite.y + bug.sprite.height / 2 > height) {
        bug.walkUp();
      } else if (bug.sprite.y - bug.sprite.height / 2 < 0) {
        bug.walkDown();
      }
    });
  } else {
    sequence.stop();
    end.loop = 1;
    end.start();

    textAlign(CENTER);
    textSize(100);
    text("GAME OVER", 400, 300);
    text("Score: " + score, 400, 500);
    bugs.forEach((bug) => {
      if (!bug.squished) {
        bug.stand();
        bug.sprite.vel.y = 0;
        bug.squished = true;
      } else if (bug.squished) {
        bug.removeSprites();
      }
    });
  }
}

function mousePressed() {
  for (let i = 0; i < bugs.length; i++) {
    bug = bugs[i];
    if (
      mouseX > bug.sprite.x - bug.sprite.width / 2 &&
      mouseX < bug.sprite.x + bug.sprite.width / 2 &&
      mouseY > bug.sprite.y - bug.sprite.height / 2 &&
      mouseY < bug.sprite.y + bug.sprite.height / 2
    ) {
      if (!bug.squished) {
        squishSound.triggerAttackRelease("E3", "8n");
        bug.squish();
        bug.squished = true;
        score++;
        numSquish++;
        velYneg -= 0.5;
        velYpos += 0.5;
        frameDel -= 0.25;
      }
    }
  }
}

function moreBugs() {
  let animations = {
    stand: { row: 0, col: 0, frames: 1 },
    walk: { row: 0, col: 1, frames: 2 },
    squish: { row: 0, col: 3, frames: 1 },
  };

  for (let i = 0; i < 3; i++) {
    bugs.push(
      new Bug(
        random(25, 775),
        random(25, 775),
        50,
        50,
        "assets/bug4.png",
        animations
      )
    );
    bpm += 5;
    Tone.Transport.bpm.value = bpm;
  }
}

class Bug {
  constructor(x, y, width, height, spriteSheet, animations) {
    this.sprite = new Sprite(x, y, width, height);
    this.sprite.spriteSheet = spriteSheet;
    this.sprite.collider = "none";
    this.sprite.anis.frameDelay = frameDel;
    this.sprite.addAnis(animations);
    this.sprite.vel.y = velYneg;
    this.sprite.changeAni("walk");
  }

  walkUp() {
    this.sprite.changeAni("walk");
    this.sprite.scale.x = 1;
    this.sprite.scale.y = 1;
    this.sprite.vel.y = velYneg;
    this.sprite.vel.x = 0;
  }

  walkDown() {
    this.sprite.changeAni("walk");
    this.sprite.scale.x = 1;
    this.sprite.scale.y = -1;
    this.sprite.vel.y = velYpos;
    this.sprite.vel.x = 0;
  }

  squish() {
    this.sprite.changeAni("squish");
    this.sprite.vel.y = 0;
    this.sprite.vel.x = 0;
  }

  stand() {
    this.sprite.changeAni("stand");
    this.sprite.vel.y = 0;
    this.sprite.vel.x = 0;
  }
}
