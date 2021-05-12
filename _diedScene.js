//Variables declared in this page:
/* particles explosion_timer diedScene Particle Explosion Re_explosion start_explosion */

//Variables declared in other files:
/* _W _H universe startPng camZ spaceship earth planet1 planet2 planet3 planet4 planet5 planet6 planet7 planet8 planet9 planet10 BGM ship1 status explosion_sound ending explosion_ball start_explosion_ball explosion_bgm cam1 started theStartPage narratePoem soundMap terrainPic xp yp maxSpeed sb displayPoem space_age victoryBGM victory keyPressed Position Spaceship */
/* planetlist planets aliveScene planetCount Planet generatePlanet planetIsNotTooFar drawPlanets planetIsNotTooFar arePlanetsOverlapped isCollide testCollision Terrain */
/* EndScene */
/* reviveAnimation() */
/* startPage */
/* startMillis startMillisNotInitialized Scoreboard poem DisplayWords isClose getWarningLevel Warning drawBackground*/
/* camX camY tiltZ tiltX speedZ moveAround */
/* victoryScene winningRays WinningRay WinningScene rayIsNotBehind */

let particles = [];
let explosion_timer = 0;

function diedScene() {

  background(0);
  if (explosion_bgm === false) {
    explosion_sound.play();
    explosion_bgm = true;
  }
  
  if (explosion_timer < 250) {
    drawPlanets();
    ship1.draw(camX, camY, camZ - 450, 15, tiltZ, tiltX, spaceship);
    explosion_timer += 1;
    setCamera(cam1);
    angleMode(DEGREES);
    cam1.setPosition(
      2000 * sin(explosion_timer),
      0,
      2000 * cos(explosion_timer)
    );
    cam1.lookAt(camX, camY, camZ - 450);
    if (random(1) > 0.96) {
      var pos = createVector(camX, camY, camZ - 450);
      for (var i = 0; i < 100; i++) {
        var p = new Particle(pos);
        particles.push(p);
      }
    }
    for (var i = particles.length - 1; i >= 0; i--) {
      if (
        dist(
          particles[i].pos.x,
          particles[i].pos.y,
          particles[i].pos.z,
          0,
          0,
          0
        ) < 1000
      ) {
        particles[i].update();
        particles[i].show();
      } else {
        particles.splice(i, 1);
      }
    }
  } else {
    camera(camX, camY, camZ + 300, camX, camY, camZ - 100);
    re_explosion_ball.draw();
    ending.draw();
  }
}

class Particle {
  constructor(pos, c) {
    this.pos = createVector(pos.x, pos.y, pos.z);
    this.vel = p5.Vector.random3D()
      .normalize()
      .mult(random(4, 6));

    this.c = c;
  }
  update() {
    this.pos.add(this.vel);
  }
  show() {
    push();
    stroke(100);
    fill(255, 255, 255, 180);
    translate(this.pos.x, this.pos.y, this.pos.z);

    // rotateX(millis() / 10);
    // rotateY(millis() / 10);
    // rotateY(millis() / 10);
    box(20, 20, 20);

    pop();
  }
}

//--------------------------------- START OF EXPLOSION ---------------------------------

class Explosion extends Position {
  constructor(x, y, z, size, r, g, b, transparent) {
    super(x, y, z);
    this.size = size;
    this.r = r;
    this.g = g;
    this.b = b;
    this.transparent = transparent;
    this.explosion_status = false;
  }

  growBall() {
    if (this.transparent < 255) {
      this.transparent += 0.3;
    }
    if (this.size < 10) {
      this.size = this.size * (1.009 * 1.013);
      this.b += 1;
    }
    if (this.size > 10 && this.size < 70) {
      this.size = this.size * (1.0653 * 1.013);
      this.b += 1;
    }
    if (this.size > 70 && this.size < 100) {
      this.size = this.size * (1.0065 * 1.013);
      this.b += 0.08;
    }
    if (this.size > 100 && this.size < 900) {
      this.size = this.size * (1.04 * 1.013);
      this.b += 5;
    }
  }
  getSize() {
    return this.size;
  }

  draw() {
    this.growBall();
    if (this.explosion_status == false) {
      explosion_sound.play();
      this.explosion_status = true;
    }
    push();
    translate(this.x, this.y, this.z);
    noStroke();
    fill(this.r, this.g, this.b, this.transparent);
    for (let i = 1; i < 6; i++) {
      sphere(this.size + i * 5, 24, 16);
    }
    rotateX(60);
    fill(245, 245, 237);
    torus(this.size * 2.5, this.size * 0.07);
    pop();
  }
}

//--------------------------------- END OF EXPLOSION ---------------------------------

//--------------------------------- START OF RE_EXPLOSION ---------------------------------
class Re_explosion extends Position{
  constructor(x, y, z, size) {
    super(x, y, z);
    this.size = size;
    // this.explosion_status=false;
  }

  growBall() {
    if (this.size > 20) {
      this.size = this.size * 0.9;
    }
  }
  getSize() {
    return this.size;
  }

  draw() {
    this.growBall();

    // if(this.explosion_status == false){
    //   explosde_sound.play();
    //   this.explosion_status=true;
    // }

    push();
    translate(this.x, this.y, this.z);
    noStroke();
    fill(255);
    sphere(this.size, 24, 16);
    pop();
  }
}

//--------------------------------- END OF RE_EXPLOSION ---------------------------------

//--------------------------------- START OF start_explosion ---------------------------------
class start_explosion extends Position{
  constructor(x, y, z) {
    super(x, y, z);
    this.transparent = 255;
    this.strokeWeight = 6;
    this.size = 20;
    // this.explosion_status=false;
  }

  growBall() {
    if (this.size < 2000) {
      this.size = this.size * 1.08;
    }
    if (this.transparent > 0) {
      this.transparent -= 5;
      this.strokeWeight -= 0.1;
    }
  }
  getSize() {
    return this.size;
  }

  draw() {
    background(0);
    this.growBall();
    // if(this.explosion_status == false){
    //   explosde_sound.play();
    //   this.explosion_status=true;
    // }
    push();
    translate(this.x, this.y, this.z);
    stroke(255);
    strokeWeight(this.strokeWeight);
    fill(255, 255, 255, this.transparent);
    sphere(this.size, 24, 16);
    pop();
  }
}

//--------------------------------- END OF start_explosion ---------------------------------

/* global p5 sphere int detail random objPositon alpha blue brightness color green hue lerpColor lightness red saturation background clear colorMode fill noFill noStroke stroke erase noErase 2D Primitives arc ellipse circle line point quad rect square triangle ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight bezier bezierDetail bezierPoint bezierTangent curve curveDetail curveTightness curvePoint curveTangent beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex plane box sphere cylinder cone ellipsoid torus loadModel model HALF_PI PI QUARTER_PI TAU TWO_PI DEGREES RADIANS print frameCount deltaTime focused cursor frameRate noCursor displayWidth displayHeight windowWidth windowHeight windowResized width height fullscreen pixelDensity displayDensity getURL getURLPath getURLParams remove disableFriendlyErrors noLoop loop isLooping push pop redraw select selectAll removeElements changed input createDiv createP createSpan createImg createA createSlider createButton createCheckbox createSelect createRadio createColorPicker createInput createFileInput createVideo createAudio VIDEO AUDIO createCapture createElement createCanvas resizeCanvas noCanvas createGraphics blendMode drawingContext setAttributes boolean string number applyMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate storeItem getItem clearStorage removeItem createStringDict createNumberDict append arrayCopy concat reverse shorten shuffle sort splice subset float int str boolean byte char unchar hex unhex join match matchAll nf nfc nfp nfs split splitTokens trim deviceOrientation accelerationX accelerationY accelerationZ pAccelerationX pAccelerationY pAccelerationZ rotationX rotationY rotationZ pRotationX pRotationY pRotationZ turnAxis setMoveThreshold setShakeThreshold deviceMoved deviceTurned deviceShaken keyIsPressed key keyCode keyPressed keyReleased keyTyped keyIsDown movedX movedY mouseIsPressed mouseX mouseY pmouseX pmouseY winMouseX winMouseY pwinMouseX pwinMouseY mouseButton mouseWheel requestPointerLock exitPointerLock touches createImage saveCanvas saveFrames image tint noTint imageMode pixels blend copy filter get loadPixels set updatePixels loadImage loadJSON loadStrings loadTable loadXML loadBytes httpGet httpPost httpDo Output createWriter save saveJSON saveStrings saveTable day hour minute millis month second year abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt fract createVector noise noiseDetail noiseSeed randomSeed random randomGaussian acos asin atan atan2 cos sin tan degrees radians angleMode textAlign textLeading textSize textStyle textWidth textAscent textDescent loadFont text textFont orbitControl debugMode noDebugMode ambientLight specularColor directionalLight pointLight lights lightFalloff spotLight noLights loadShader createShader shader resetShader normalMaterial texture textureMode textureWrap ambientMaterial emissiveMaterial specularMaterial shininess camera perspective ortho frustum createCamera setCamera CENTER CORNER CORNERS POINTS WEBGL RGB ARGB HSB LINES CLOSE BACKSPACE DELETE ENTER RETURN TAB ESCAPE SHIFT CONTROL OPTION ALT UP_ARROW DOWN_ARROW LEFT_ARROW RIGHT_ARROW sampleRate freqToMidi midiToFreq soundFormats getAudioContext userStartAudio loadSound createConvolver setBPM saveSound getMasterVolume masterVolume soundOut chain drywet biquadFilter process freq res gain toggle setType freq setType pan phase triggerAttack triggerRelease setADSR attack decay sustain release dispose notes polyvalue AudioVoice noteADSR setADSR noteAttack noteRelease dispose isLoaded playMode set isLooping isPlaying isPaused setVolume pan getPan rate duration currentTime jump channels sampleRate frames getPeaks reverseBuffer onended setPath setBuffer processPeaks addCue removeCue clearCues save getBlob getLevel toggleNormalize waveform analyze getEnergy getCentroid linAverages logAverages getOctaveBands fade attackTime attackLevel decayTime decayLevel releaseTime releaseLevel setADSR setRange setExp triggerAttack triggerRelease r width setType input output stream mediaStream currentSource enabled amplitude getSources setSource bands process panner process positionX positionY positionZ orient orientX orientY orientZ setFalloff maxDist rollof leftDelay rightDelay process delayTime feedback filter setType process convolverNode process impulses addImpulse resetImpulse toggleImpulse sequence setBPM getBPM addPhrase removePhrase getPhrase replaceSequence onStep setBPM musicalTimeMode maxIterations synced bpm timeSignature interval iterations compressor process attack knee ratio threshold release reduction record isDetected update onPeak WaveShaperNode process getAmount getOversample amp setInput connect disconnect play pause stop set smooth start add mult loop */
