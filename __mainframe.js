// Declaring core global variables
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
let BGM;
let ship1;
let status = "alive";

// Setting up variables for diedScene
let explosion_sound;
let ending;
let explosion_ball;
let re_explosion_ball;
let start_explosion_ball;
let explosion_bgm = false;
let cam1;

// Setting up variables for startScene
let started = false;
let theStartPage;
let narratePoem;
let soundMap;

// Setting up variables for userControl
let xp;
let yp;
let maxSpeed = 15;

// Setting up variables for uiFunctions
let sb;
let displayPoem;
let space_age;

// Setting up variables for victoryScene
let victoryBGM;
let victory;

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
    "https://cdn.glitch.com/48b3940f-dc59-484b-bb22-aaa9c4991ca3%2Fplanet1.png?v=1616633287022"
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
  explosion_sound = loadSound(
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



function setup() {
  // Setup environment variables
  createCanvas(windowWidth, windowHeight, WEBGL);
  _W = windowWidth;
  _H = windowHeight;
  angleMode(DEGREES);
  smooth();
  frameRate(30);
  camZ = height / 2.0 / tan(30.0);
  //
  
  //
  sb = new Scoreboard(200);
  ship1 = new Spaceship(camX, camY, camZ - 350, 15, tiltZ, tiltX, spaceship);
  BGM.loop();
  //(DONT TURN ON FIRST)
  xp = width / 2;
  yp = height / 2;
  displayPoem = new DisplayWords(poem, 300);
  theStartPage = new startPage();
  cam1 = createCamera();
  victory = new WinningScene(camX, camY, camZ - 300, 65);
  soundMap = new Terrain(1400, 600, 20, 1, 0, 0.12, 0);
  // narratePoem.play();
  // let fov = PI/3;
  // let cameraZ = (height/2.0)/(height/2.0)
  // perspective(PI/3, (width)/(height), camZ/10.0, camZ/10.0);
  frustum(
    -windowWidth / 10000,
    windowWidth / 10000,
    windowHeight / 10000,
    -windowHeight / 10000,
    0.17,
    200000
  );
}



function mouseClicked() {
  if (status === "died") {
    planets = [];
    status = "justaliveAgain";
  }
}

//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////  -- DRAW IS HERE --  /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function draw() {
  console.log(status);
  if (!started) {
    theStartPage.draw();
    frameCount = 0;
    return;
  }
  if (startMillisNotInitialized === true) {
    startMillis = millis();
    startMillisNotInitialized = false;
  }

  if (status === "alive") {
    aliveScene();
    if (testCollision(planets, ship1)) {
      // narratePoem.stop();
      status = "justdied";
    }
  } else if (status === "justdied") {
    re_explosion_ball = new Re_explosion(
      ship1.getLocation().x,
      ship1.getLocation().y,
      ship1.getLocation().z,
      1000
    );
    ending = new EndScene(
      ship1.getLocation().x,
      ship1.getLocation().y,
      ship1.getLocation().z,
      sb.getScore()
    );
    status = "died";
  }
  
  
  if (status === "justaliveAgain") {
    start_explosion_ball = new start_explosion(
      ship1.getLocation().x,
      ship1.getLocation().y,
      ship1.getLocation().z
    );
    explosion_timer = 0;
    explosion_bgm = false; //timer_back
    status = "revivePlayer";
  }
  
  if (status === "revivePlayer") {
    reviveAnimation();
  }
  
  if (status === "died") {
    diedScene();
  }

  if (status === "victory") {
    victoryScene();
    ship1.draw(camX, camY, camZ - 450, 15, tiltZ, tiltX, spaceship);
  }

  if (sb.getScore() > 300 && status === "alive") {
    background(0);
    BGM.stop();
    victoryBGM.play();
    status = "victory";
  }
}

function keyPressed() {
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    started = true;
  }

  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    started = true;
  }

  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    started = true;
  }

  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    started = true;
  }

  if (keyIsDown(80)) {
    narratePoem.play();
  }

  if (keyIsDown(79)) {
    narratePoem.pause();
  }
}

//--------------------------------- START OF POSITION ---------------------------------
class Position {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.vector = createVector(x, y, z)
  }

  setPosition(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  
  getVectorTo(x1, y1, z1){
    return createVector(x1 - this.x, y1 - this.y, z1 - this.z)
  }
  
  getLocation(){
    return (this.x, this.y, this.z)
  }
  
  getPosition(){
    return {x: this.x, y: this.y, z: this.z}
  }
}
//--------------------------------- END OF POSITION ---------------------------------

//--------------------------------- START OF SPACESHIP ---------------------------------
class Spaceship {
  constructor(x, y, z, size, angleZ, angleX, shipModel) {
    this.size = size;
    this.angleZ = angleZ;
    this.angleX = angleX;
    this.shipModel = shipModel;
    this.radius = 155;
    this.position = new Position(x, y, z);
  }

  draw(x, y, z, size, angleZ, angleX, shipModel) {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    rotateZ(angleZ);
    rotateX(angleX);
    scale(this.size);
    model(this.shipModel);
    pop();
  }
  
  getLocation() {
    return this.position;
  }
}

//--------------------------------- END OF SPACESHIP ---------------------------------

/* global p5 sphere int detail random objPositon alpha blue brightness color green hue lerpColor lightness red saturation background clear colorMode fill noFill noStroke stroke erase noErase 2D Primitives arc ellipse circle line point quad rect square triangle ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight bezier bezierDetail bezierPoint bezierTangent curve curveDetail curveTightness curvePoint curveTangent beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex plane box sphere cylinder cone ellipsoid torus loadModel model HALF_PI PI QUARTER_PI TAU TWO_PI DEGREES RADIANS print frameCount deltaTime focused cursor frameRate noCursor displayWidth displayHeight windowWidth windowHeight windowResized width height fullscreen pixelDensity displayDensity getURL getURLPath getURLParams remove disableFriendlyErrors noLoop loop isLooping push pop redraw select selectAll removeElements changed input createDiv createP createSpan createImg createA createSlider createButton createCheckbox createSelect createRadio createColorPicker createInput createFileInput createVideo createAudio VIDEO AUDIO createCapture createElement createCanvas resizeCanvas noCanvas createGraphics blendMode drawingContext setAttributes boolean string number applyMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate storeItem getItem clearStorage removeItem createStringDict createNumberDict append arrayCopy concat reverse shorten shuffle sort splice subset float int str boolean byte char unchar hex unhex join match matchAll nf nfc nfp nfs split splitTokens trim deviceOrientation accelerationX accelerationY accelerationZ pAccelerationX pAccelerationY pAccelerationZ rotationX rotationY rotationZ pRotationX pRotationY pRotationZ turnAxis setMoveThreshold setShakeThreshold deviceMoved deviceTurned deviceShaken keyIsPressed key keyCode keyPressed keyReleased keyTyped keyIsDown movedX movedY mouseIsPressed mouseX mouseY pmouseX pmouseY winMouseX winMouseY pwinMouseX pwinMouseY mouseButton mouseWheel requestPointerLock exitPointerLock touches createImage saveCanvas saveFrames image tint noTint imageMode pixels blend copy filter get loadPixels set updatePixels loadImage loadJSON loadStrings loadTable loadXML loadBytes httpGet httpPost httpDo Output createWriter save saveJSON saveStrings saveTable day hour minute millis month second year abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt fract createVector noise noiseDetail noiseSeed randomSeed random randomGaussian acos asin atan atan2 cos sin tan degrees radians angleMode textAlign textLeading textSize textStyle textWidth textAscent textDescent loadFont text textFont orbitControl debugMode noDebugMode ambientLight specularColor directionalLight pointLight lights lightFalloff spotLight noLights loadShader createShader shader resetShader normalMaterial texture textureMode textureWrap ambientMaterial emissiveMaterial specularMaterial shininess camera perspective ortho frustum createCamera setCamera CENTER CORNER CORNERS POINTS WEBGL RGB ARGB HSB LINES CLOSE BACKSPACE DELETE ENTER RETURN TAB ESCAPE SHIFT CONTROL OPTION ALT UP_ARROW DOWN_ARROW LEFT_ARROW RIGHT_ARROW sampleRate freqToMidi midiToFreq soundFormats getAudioContext userStartAudio loadSound createConvolver setBPM saveSound getMasterVolume masterVolume soundOut chain drywet biquadFilter process freq res gain toggle setType freq setType pan phase triggerAttack triggerRelease setADSR attack decay sustain release dispose notes polyvalue AudioVoice noteADSR setADSR noteAttack noteRelease dispose isLoaded playMode set isLooping isPlaying isPaused setVolume pan getPan rate duration currentTime jump channels sampleRate frames getPeaks reverseBuffer onended setPath setBuffer processPeaks addCue removeCue clearCues save getBlob getLevel toggleNormalize waveform analyze getEnergy getCentroid linAverages logAverages getOctaveBands fade attackTime attackLevel decayTime decayLevel releaseTime releaseLevel setADSR setRange setExp triggerAttack triggerRelease r width setType input output stream mediaStream currentSource enabled amplitude getSources setSource bands process panner process positionX positionY positionZ orient orientX orientY orientZ setFalloff maxDist rollof leftDelay rightDelay process delayTime feedback filter setType process convolverNode process impulses addImpulse resetImpulse toggleImpulse sequence setBPM getBPM addPhrase removePhrase getPhrase replaceSequence onStep setBPM musicalTimeMode maxIterations synced bpm timeSignature interval iterations compressor process attack knee ratio threshold release reduction record isDetected update onPeak WaveShaperNode process getAmount getOversample amp setInput connect disconnect play pause stop set smooth start add mult loop */
