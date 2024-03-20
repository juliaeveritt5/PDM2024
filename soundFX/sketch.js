let osc = new Tone.FMSynth().toDestination();
let lfo = new Tone.LFO(7, 700, 1000).connect(osc.frequency).start();

function preload() {
  normalGoose = loadImage("assets/goose2.jpg");
  angryGoose = loadImage("assets/goose.jpg");
}

function setup() {
  createCanvas(512, 256);
}

function draw() {
  if (mouseIsPressed === true) {
    background(angryGoose);
  } else if (mouseIsPressed === false) {
    background(normalGoose);
    textSize(30);
    textAlign(CENTER);
    fill("white");
    text("Press Mouse", 256, 225);
  }
}

function mousePressed() {
  osc.triggerAttack();
}

function mouseReleased() {
  osc.triggerRelease();
}
