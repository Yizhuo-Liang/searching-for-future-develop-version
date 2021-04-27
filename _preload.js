let _W;
let _H;

let universe;
let startPng;
let camZ;
let spaceship;
let earth,
  planet1,
  planet2,
  planet3,
  planet4,
  planet5,
  planet6,
  planet7,
  planet8,
  planet9,
  planet10;
let explosionEffect;
let BGM;

let explosde_sound;
let ending;
let assemble_ball;
let explosion_ball;
let re_explosion_ball;
let start_explosion_ball;

let xp;
let yp;
let maxSpeed = 15;

let started = false;
let theStartPage;
let narratePoem;

let newboard;
let generate_interval = 100;
let victoryBGM;
let space_age;
let victoryTime;

function preload() {
  space_age = loadFont(
    "https://cdn.glitch.com/48b3940f-dc59-484b-bb22-aaa9c4991ca3%2FNasa.ttf?v=1617322691693"
  );
  spaceship = loadModel("assets/spaceship2.obj");
  universe = loadImage(
    "https://cdn.glitch.com/48b3940f-dc59-484b-bb22-aaa9c4991ca3%2Funiverse-background-1.jpg?v=1617194401240"
  );
  startPng = loadImage(
    "https://cdn.glitch.com/48b3940f-dc59-484b-bb22-aaa9c4991ca3%2FNew%20Project.png?v=1617291457112"
  );
  earth = loadImage(
    "https://cdn.glitch.com/48b3940f-dc59-484b-bb22-aaa9c4991ca3%2Fearth.jpg?v=1616633286407"
  );
  planet1 = loadImage(
    "https://cdn.glitch.com/48b3940f-dc59-484b-bb22-aaa9c4991ca3%2Fplanet2.jpg?v=1616633287289"
  );
  planet2 = loadImage(
    "https://cdn.glitch.com/48b3940f-dc59-484b-bb22-aaa9c4991ca3%2Fplanet2.jpg?v=1616633287289"
  );
  planet3 = loadImage(
    "https://cdn.glitch.com/48b3940f-dc59-484b-bb22-aaa9c4991ca3%2Fplanet3.jpg?v=1616633288086"
  );
  planet4 = loadImage(
    "https://cdn.glitch.com/48b3940f-dc59-484b-bb22-aaa9c4991ca3%2Fplanet4.jpg?v=1616633289270"
  );
  planet5 = loadImage(
    "https://cdn.glitch.com/48b3940f-dc59-484b-bb22-aaa9c4991ca3%2Fplanet5.png?v=1616633291018"
  );
  planet6 = loadImage(
    "https://cdn.glitch.com/48b3940f-dc59-484b-bb22-aaa9c4991ca3%2Fplanet6.jfif?v=1617298849359"
  );
  planet7 = loadImage(
    "https://cdn.glitch.com/48b3940f-dc59-484b-bb22-aaa9c4991ca3%2Fplanet7.jfif?v=1617298851576"
  );
  planet8 = loadImage(
    "https://cdn.glitch.com/48b3940f-dc59-484b-bb22-aaa9c4991ca3%2Fplanet8.jpg?v=1617298854353"
  );
  planet9 = loadImage(
    "https://cdn.glitch.com/48b3940f-dc59-484b-bb22-aaa9c4991ca3%2Fplanet9.jpg?v=1617298856293"
  );
  planet10 = loadImage(
    "https://cdn.glitch.com/48b3940f-dc59-484b-bb22-aaa9c4991ca3%2Fplanet10.jpg?v=1617298858415"
  );
  soundFormats("mp3", "ogg");
  explosde_sound = loadSound(
    "https://cdn.glitch.com/48b3940f-dc59-484b-bb22-aaa9c4991ca3%2F11369.mp3?v=1617032492745"
  );
  BGM = loadSound(
    "https://cdn.glitch.com/48b3940f-dc59-484b-bb22-aaa9c4991ca3%2FBGM.mp3?v=1617047619315"
  );
  narratePoem = loadSound(
    "https://cdn.glitch.com/48b3940f-dc59-484b-bb22-aaa9c4991ca3%2Fmedia-deee5997.mp3?v=1617183652881"
  );
  victoryBGM = loadSound(
    "https://cdn.glitch.com/48b3940f-dc59-484b-bb22-aaa9c4991ca3%2FStar%20Wars%20Main%20Theme%20(Full).mp3?v=1617319295463"
  );
}