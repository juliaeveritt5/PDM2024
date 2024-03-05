let synth = new Tone.PolySynth(Tone.MonoSynth);
let change = new Tone.PitchShift();

change.pitch = 0;

synth.connect(change);
change.toDestination();

function setup() {
  createCanvas(400, 400);
  pitchSlider = createSlider(0, 12, 1, 0.1);
  pitchSlider.position(120, 200);
  pitchSlider.mouseMoved(() => (change.pitch = pitchSlider.value()));
}

let notes = {
  a: "C4",
  s: "D4",
  d: "E4",
  f: "F4",
  g: "G4",
  h: "A4",
  j: "B4",
  k: "C5",
};

function keyPressed() {
  let playNotes = notes[key];
  synth.triggerAttack(playNotes);
}

function keyReleased() {
  let playNotes = notes[key];
  synth.triggerRelease(playNotes, "+0.03");
}

function draw() {
  background("dodgerBlue");
  textSize(15);
  text("Play a-k for synth", 130, 100);
  text("Use slider to change pitch", 100, 180);
}
