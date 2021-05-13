//Variables declared in this page:
/* _W _H uiTextbox universe startPng camZ spaceship earth planet1 planet2 planet3 planet4 planet5 planet6 planet7 planet8 planet9 planet10 BGM ship1 status explosion_sound ending explosion_ball start_explosion_ball explosion_bgm cam1 started theStartPage narratePoem soundMap terrainPic xp yp maxSpeed sb displayPoem space_age victoryBGM victory keyPressed Position Spaceship */

//Variables declared in other files:
/* global planetlist planets aliveScene planetCount Planet generatePlanet planetIsNotTooFar drawPlanets planetIsNotTooFar arePlanetsOverlapped isCollide testCollision Terrain */
/* global particles explosion_timer diedScene Particle Explosion Re_explosion start_explosion */
/* global EndScene */
/* global reviveAnimation() */
/* global startPage */
/* global startMillis startMillisNotInitialized Scoreboard poem DisplayWords isClose getWarningLevel Warning drawBackground*/
/* global camX camY tiltZ tiltX speedZ moveAround */
/* global victoryScene winningRays WinningRay WinningScene rayIsNotBehind */


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
  planet10,
    terrainPic;
let BGM;
let ship1;
let status = "start";

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

// Setting up variables for prologue
let prologueLines;
let prologue_txt;
let prologue_y = 0;

// Setting up variables for returnQuestion
let returnQLines;
let returnQ_txt;

// Setting up variables for userControl
let xp;
let yp;
let maxSpeed = 15;

// Setting up variables for uiFunctions
let displayPoem;
let space_age;
let uiTextbox;
let dimfont;
let paragraphfont;

// Setting up variables for victoryScene
let victoryBGM;
let victory;

function preload() {
  prologueLines = loadStrings("_prologue.txt")
  returnQLines = loadStrings("_endingScript.txt")
  paragraphfont = loadFont("https://cdn.glitch.com/fb372d77-9c17-4766-a6ef-4c29f473176b%2FTechnaSans-Regular.otf?v=1620846805552")
  space_age = loadFont(
    "https://cdn.glitch.com/48b3940f-dc59-484b-bb22-aaa9c4991ca3%2FNasa.ttf?v=1617322691693"
  );
  spaceship = loadModel("assets/spaceship2.obj");
  universe = loadImage(
    "https://cdn.glitch.com/fb372d77-9c17-4766-a6ef-4c29f473176b%2Fbackground2.jfif?v=1620149004479"
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
  terrainPic = loadImage("https://cdn.glitch.com/fb372d77-9c17-4766-a6ef-4c29f473176b%2Fvolcanicterrain.jfif?v=1620149747779");
  nb_tree = loadModel("assets/tree.obj");
  nb_tree_2 = loadModel("assets/tree_2.obj");
  nb_tree_3 = loadModel("assets/tree_3.obj");
  forestSky = loadImage(
    "https://cdn.glitch.com/0d62f7df-1918-459f-b472-1f38130432c1%2FVizPeople_non_commercial_hdr_v1_03-1920x928.jpg?v=1620699036011"
  );
  grass = loadImage(
    "https://cdn.glitch.com/0d62f7df-1918-459f-b472-1f38130432c1%2Fgrass2.jpg?v=1619493619708");
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
  ship1 = new Spaceship(camX, camY - 100, camZ - 600, 15, tiltZ, tiltX, spaceship);
  BGM.loop();
  xp = width / 2;
  yp = height / 2;
  displayPoem = new DisplayWords(poem, 300);
  theStartPage = new startPage(camX, camY - _H/20, camZ - 450);
  cam1 = createCamera();
  victory = new WinningScene(camX, camY, camZ - 300, 65);
  // soundMap = new Terrain(camX - 400, camY + 100, camZ - 1000, 1400, 600, 20, 1, 0, 0.12, 0);
  // narratePoem.play();
  // let fov = PI/3;
  // perspective(PI/3, (width)/(height), camZ/10.0, camZ/10.0);
  frustum(
    -windowWidth / 10000,
    windowWidth / 10000,
    windowHeight / 10000,
    -windowHeight / 10000,
    0.17,
    200000
  );
  scanResults = new ScanBoard((_W/2)-300, (_H/2)-300, camZ);
  uiTextbox = new Textbox(_W, _H*0.2);
  prologue_txt = join(prologueLines, '\n');
  returnQ_txt = join(returnQLines, '\n');
  prologue_y = height / 2;
  startAnimation = new openBallAnimation(camX, camY, camZ-600);
  
  // Starfield
  sfCanva = createGraphics(windowWidth, windowHeight);
  sfCanvaWidth = windowWidth;
  sfCanvaHeight = windowHeight;
  for (let i = 0; i < maxIntroStars; i++) {
    introStars.push(new Star(1));
  }
  for (let i = 0; i < maxStars; i++) {
    fakeStars.push(new Star(0));
  }
  // For forest
  grass.resize(500,0)
}

function mouseClicked() {
  if (status === "start"){
    animationtrigger = 1;
  } 
  else if (status === "prologue"){
    animationtrigger = 1;
    frameCount = 0;
  }
  else if (status === "died") {
    planets = [];
    status = "justaliveAgain";
  } else if(status === "returnEarth"){
    status = "forest"
  }
}

//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////  -- DRAW IS HERE --  /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function draw() {
  console.log(status);
  if (status == "start") {
    theStartPage.draw();
    uiTextbox.draw(status);
    if (animationtrigger == 1){
      startAnimation.draw("prologue");
    }
    return
  }
  
  else if (status === "prologue"){
    if (animationtrigger == 2){
      startAnimation.drawClose();
    }
    prologueScene(prologue_txt);
    uiTextbox.draw(status);
    if (animationtrigger == 1){
      startAnimation.draw("alive");
    }
  }
  
  if (startMillisNotInitialized === true) {
    startMillis = millis();
    startMillisNotInitialized = false;
  }

  if (status === "alive") {
    prologue_y = height / 2;
    if (animationtrigger == 2){
      startAnimation.drawClose();
    }
    aliveScene();
    drawBackground();
    let warning = moveAround();
    if (keyIsDown(70)){
      let nearestPlanet = null;
      let d = 10000;
      for (let planet of planets) {
        if (planet.z < ship1.getLocation().z) {    
          let d1 = dist(planet.x, planet.y, planet.z, ship1.getLocation().x, ship1.getLocation().y, ship1.getLocation().z)
          if (d1 < d) {
            d = d1
            nearestPlanet = planet
          }
        }
      }
      _planetconditions = nearestPlanet.getConditions().slice()
    }
    uiTextbox.draw(status, warning);
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
      camZ - 450,
      uiTextbox.getScore()
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
    if (animationtrigger == 2){
      startAnimation.drawClose();
    }
    drawBackground();
    diedScene();
  }

  else if (status == "returnQ") {
    if (animationtrigger == 2){
      startAnimation.drawClose();
    }
    background(0);
    prologueScene(returnQ_txt);
    uiTextbox.draw(status);
  }
  if (status == "returnEarth"){
    drawStarfield();
  }
  else if (status == "forest"){
    drawForest();
  }
  
  
  // else if (status = "returnEarth") {
  //   if (animationtrigger == 2){
  //     startAnimation.drawClose();
  //   }
  //   // drawStarfield();
  // }
  
  if (uiTextbox.getScore() > 300 && status === "alive") {
    background(0);
    BGM.stop();
    victoryBGM.play();
    status = "returnQ"
  }
}

function keyPressed() {
  if (keyIsDown(89)){
    if (status == "returnQ"){
      status = "returnEarth"
    }
  }
  
  if (keyIsDown(78)){
    if (status == "returnQ"){
      status = "justdied"
    }
  }
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
  
//   getLocation(){
//     return (this.x, this.y, this.z)
//   }
  
  getLocation(){
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
