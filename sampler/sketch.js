let soundFX;
soundFX = new Tone.Players({
  clock: "assets/clock.mp3",
  drum: "assets/drum.mp3",
  goose: "assets/goose.mp3",
  rain: "assets/rain.mp3",
});

let button1, button2, button3, button4;
let delAmt = new Tone.FeedbackDelay("8n", 0.5);
let delaySlider;

soundFX.connect(delAmt);
delAmt.toDestination();

function setup() {
  createCanvas(400, 400);

  button1 = createButton("Clock");
  button1.position(100, 100);
  button1.mousePressed(() => soundFX.player("clock").start());

  button2 = createButton("Drum");
  button2.position(300, 100);
  button2.mousePressed(() => soundFX.player("drum").start());

  button3 = createButton("Goose");
  button3.position(100, 300);
  button3.mousePressed(() => soundFX.player("goose").start());

  button4 = createButton("Rain");
  button4.position(300, 300);
  button4.mousePressed(() => soundFX.player("rain").start());

  delaySlider = createSlider(0, 1, 0, 0.05);
  delaySlider.position(175, 200);
  delaySlider.mouseMoved(() => (delAmt.delayTime.value = delaySlider.value()));
}

function draw() {
  background(200, 300, 200);
}
