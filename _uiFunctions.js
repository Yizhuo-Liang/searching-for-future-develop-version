//Variables declared in this page:
/* startMillis startMillisNotInitialized Scoreboard poem DisplayWords isClose getWarningLevel Warning drawBackground*/

//Variables declared in other files:
/* _W _H universe startPng camZ spaceship earth planet1 planet2 planet3 planet4 planet5 planet6 planet7 planet8 planet9 planet10 BGM ship1 status explosion_sound ending explosion_ball start_explosion_ball explosion_bgm cam1 started theStartPage narratePoem soundMap terrainPic xp yp maxSpeed sb displayPoem space_age victoryBGM victory keyPressed Position Spaceship */
/* planetlist planets aliveScene planetCount Planet generatePlanet planetIsNotTooFar drawPlanets planetIsNotTooFar arePlanetsOverlapped isCollide testCollision Terrain */
/* particles explosion_timer diedScene Particle Explosion Re_explosion start_explosion */
/* EndScene */
/* reviveAnimation() */
/* startPage */
/* camX camY tiltZ tiltX speedZ moveAround */
/* victoryScene winningRays WinningRay WinningScene rayIsNotBehind */

//--------------------------------- START OF SCOREBOARD ---------------------------------
let startMillis;
let startMillisNotInitialized = true;
class Scoreboard {
  constructor(size) {
    this.size = size;
    this.expand_value = 0;
    this.graphics = createGraphics(200, 200);
  }

  draw(x, y, z) {
    push();
    let distance = int((millis() - startMillis) / 100);
    this.graphics.clear();
    this.graphics.fill(255);
    this.graphics.textSize(20);
    this.graphics.textFont(space_age);
    this.graphics.text(distance + "kM", 10, 80, 700, 700);
    texture(this.graphics);
    translate(x, y, z);
    if (distance % 10 == 1) {
      this.expand_value = this.size / 2;
    }
    noStroke();
    plane(this.size + this.expand_value);
    pop();
  }
  getScore() {
    return int(millis() / 100);
  }
}

//--------------------------------- END OF SCOREBOARD ---------------------------------

class ScanBoard extends Position {
  constructor(x, y, z, size) {
    super(x, y, z);
    this.size = size;
    this.graphics = createGraphics(200, 200);
  }
  
  scanPlanet(planets, camZ){
    for (let p in planets){
      if (p.z < camZ - 10000){
        if (mouseIsClose(p.x, p.y)){
          this.draw("a", "b", "c", "d", "e");
          return;
        }
      }
    }
    this.draw("","","","","");
  }

  draw(planetName, planetClimate, planetLivability, surfaceWater, livability) {
    push();
    this.graphics.clear();
    this.graphics.fill(255);
    this.graphics.textSize(20);
    this.graphics.textFont(space_age);
    this.graphics.text(
    "Name:", planetName,
    "Climate:", planetClimate,
    "Surface Water:", surfaceWater,
    "Livability:", livability
    );
    texture(this.graphics);
    translate(this.x, this.y, this.z);
    // noStroke();
    plane(this.size);
    pop();
  }
}

function mouseIsClose(objX, objY) {
	// console.log(mouseX, mouseY, objX, objY);
  let distance = dist(
    mouseX - _W/2,
    mouseY - _H/2,
		0,
    objX,
    objY,
		0
  );
	console.log(distance);
  return distance - 1000 < 0;
}


// START OF POEM

let poem = [
  "Life is strange is it not?",
  "You wake up everyday not knowing what’s in store.",
  "You go to sleep only to journey yet again.",
  "Our universe is so vast and yet it is so detailed.",
  "Everything has a story, including you.",
  "You may not be the first person to exist.",
  "You definitely won’t be the last.",
  "But you are the only you that exists.",
  "You’re unique from everyone else in your own special way.",
  "Life is a journey.",
  "You will hit many bumps along the way.",
  "But you’ll keep moving on.",
  "As cheesy as it sounds its not the destination that matters, it’s the journey.",
  "That’s what makes life so wonderful.",
  "The good and the bad moments we go through.",
  "The people we meet.",
  "The places we go.",
  "And the goals we accomplish.",
  "It shows how incredible we can be and what we can do if we keep pushing on.",
  "If we keep on living.",
  "If you keep being you.",
  "So life may be strange but it’s also very beautiful and you are a part of it.",
  "So live your life the way you want to.",
  "Do what you wanna do.",
  "Be who you wanna be.",
  "Just be you and never stop being you.",
  "So don’t cry.",
  "Keep pushing on.",
  "And smile for all of the universe to see!",
  "So I wish you the best on your journey through this strange thing we call:",
  "Life."
];

class DisplayWords {
  constructor(wordList, size) {
    this.wordList = wordList;
    this.index = 0;
    this.size = size;
    this.graphics = createGraphics(this.size * 3, this.size);
  }

  draw(x, y, z) {
    push();
    this.graphics.clear();
    this.graphics.fill(255);
    this.graphics.textFont(space_age);
    this.graphics.textSize(this.size / 8);
    if (frameCount % 122 == 0) {
      this.index += 1;
    }
    this.graphics.textAlign(CENTER, CENTER);
    this.graphics.text(
      this.wordList[this.index],
      0,
      0,
      this.size * 3,
      this.size
    );
    texture(this.graphics);
    translate(x, y, z);
    noStroke();
    plane(this.size, this.size / 3);
    pop();
  }
}

// END OF POEM
function isClose(objPosition, trgtPosition, objRadius, trgtRadius) {
  let distance = dist(
    objPosition.x,
    objPosition.y,
    objPosition.z,
    trgtPosition.x,
    trgtPosition.y,
    trgtPosition.z
  );
  return distance - 700 < objRadius + trgtRadius;
}

function testIsClose(myShip, planets) {
  console.log("testing");
  if (planets === []) {
    return false;
  }
  for (let i = 0; i < planets.length; i++) {
    if (isClose(myShip.position, planets[i], 155, planets[i].radius)) {
      console.log("ShipIsClose");
      return true;
    }
  }
  return false;
}

function getWarningLevel(myShip, planets) {
  if (testIsClose(myShip, planets) === true && frameCount % 30 > 15) {
    console.log("ShipIsClose");
    let war = new Warning(camX + 40, camY - 140, -600);
    war.draw();
    return;
  } else {
    return;
  }
}

class Warning {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  draw() {
    
    push();
    translate(this.x, this.y, this.z);
    noStroke();
    fill(255, 0, 0);
    sphere(30, 20, 20);
    translate(0, -120, 0);
    box(35, 90, 100);
    pop();
  }
}

function drawBackground() {
  push();
  noStroke();
  translate(0,0, -5000);
  texture(universe);
  // plane(20*windowWidth, 20*windowHeight)
  sphere(10*windowWidth);
  pop();
}


/* global p5 sphere int detail random objPositon alpha blue brightness color green hue lerpColor lightness red saturation background clear colorMode fill noFill noStroke stroke erase noErase 2D Primitives arc ellipse circle line point quad rect square triangle ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight bezier bezierDetail bezierPoint bezierTangent curve curveDetail curveTightness curvePoint curveTangent beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex plane box sphere cylinder cone ellipsoid torus loadModel model HALF_PI PI QUARTER_PI TAU TWO_PI DEGREES RADIANS print frameCount deltaTime focused cursor frameRate noCursor displayWidth displayHeight windowWidth windowHeight windowResized width height fullscreen pixelDensity displayDensity getURL getURLPath getURLParams remove disableFriendlyErrors noLoop loop isLooping push pop redraw select selectAll removeElements changed input createDiv createP createSpan createImg createA createSlider createButton createCheckbox createSelect createRadio createColorPicker createInput createFileInput createVideo createAudio VIDEO AUDIO createCapture createElement createCanvas resizeCanvas noCanvas createGraphics blendMode drawingContext setAttributes boolean string number applyMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate storeItem getItem clearStorage removeItem createStringDict createNumberDict append arrayCopy concat reverse shorten shuffle sort splice subset float int str boolean byte char unchar hex unhex join match matchAll nf nfc nfp nfs split splitTokens trim deviceOrientation accelerationX accelerationY accelerationZ pAccelerationX pAccelerationY pAccelerationZ rotationX rotationY rotationZ pRotationX pRotationY pRotationZ turnAxis setMoveThreshold setShakeThreshold deviceMoved deviceTurned deviceShaken keyIsPressed key keyCode keyPressed keyReleased keyTyped keyIsDown movedX movedY mouseIsPressed mouseX mouseY pmouseX pmouseY winMouseX winMouseY pwinMouseX pwinMouseY mouseButton mouseWheel requestPointerLock exitPointerLock touches createImage saveCanvas saveFrames image tint noTint imageMode pixels blend copy filter get loadPixels set updatePixels loadImage loadJSON loadStrings loadTable loadXML loadBytes httpGet httpPost httpDo Output createWriter save saveJSON saveStrings saveTable day hour minute millis month second year abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt fract createVector noise noiseDetail noiseSeed randomSeed random randomGaussian acos asin atan atan2 cos sin tan degrees radians angleMode textAlign textLeading textSize textStyle textWidth textAscent textDescent loadFont text textFont orbitControl debugMode noDebugMode ambientLight specularColor directionalLight pointLight lights lightFalloff spotLight noLights loadShader createShader shader resetShader normalMaterial texture textureMode textureWrap ambientMaterial emissiveMaterial specularMaterial shininess camera perspective ortho frustum createCamera setCamera CENTER CORNER CORNERS POINTS WEBGL RGB ARGB HSB LINES CLOSE BACKSPACE DELETE ENTER RETURN TAB ESCAPE SHIFT CONTROL OPTION ALT UP_ARROW DOWN_ARROW LEFT_ARROW RIGHT_ARROW sampleRate freqToMidi midiToFreq soundFormats getAudioContext userStartAudio loadSound createConvolver setBPM saveSound getMasterVolume masterVolume soundOut chain drywet biquadFilter process freq res gain toggle setType freq setType pan phase triggerAttack triggerRelease setADSR attack decay sustain release dispose notes polyvalue AudioVoice noteADSR setADSR noteAttack noteRelease dispose isLoaded playMode set isLooping isPlaying isPaused setVolume pan getPan rate duration currentTime jump channels sampleRate frames getPeaks reverseBuffer onended setPath setBuffer processPeaks addCue removeCue clearCues save getBlob getLevel toggleNormalize waveform analyze getEnergy getCentroid linAverages logAverages getOctaveBands fade attackTime attackLevel decayTime decayLevel releaseTime releaseLevel setADSR setRange setExp triggerAttack triggerRelease r width setType input output stream mediaStream currentSource enabled amplitude getSources setSource bands process panner process positionX positionY positionZ orient orientX orientY orientZ setFalloff maxDist rollof leftDelay rightDelay process delayTime feedback filter setType process convolverNode process impulses addImpulse resetImpulse toggleImpulse sequence setBPM getBPM addPhrase removePhrase getPhrase replaceSequence onStep setBPM musicalTimeMode maxIterations synced bpm timeSignature interval iterations compressor process attack knee ratio threshold release reduction record isDetected update onPeak WaveShaperNode process getAmount getOversample amp setInput connect disconnect play pause stop set smooth start add mult loop */
