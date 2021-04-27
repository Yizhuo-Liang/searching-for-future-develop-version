// Declaring variables for setup()
let _W;
let _H;
let camZ;
let sb;
let ship1;
let displayPoem;
let xp;  //what is this?
let yp;  //what is this?
let theStartPage;
let scenes;
let cam1;
let victoryScene;
let currentCamera;

//


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  _W = windowWidth;
  _H = windowHeight;
  angleMode(DEGREES);
  smooth();
  frameRate(30);
  camZ = height / 2.0 / tan(30.0);
  sb = new Scoreboard(200);
  ship1 = new Spaceship(camX, camY, camZ - 350, 15, tiltZ, tiltX, spaceship);
  BGM.loop();
  //(DONT TURN ON FIRST)
  xp = width / 2;
  yp = height / 2;
  displayPoem = new DisplayWords(poem, 300);
  // detail = createSlider(3, 24, 14);
  // detail.position(10, height - 30);
  // detail.style("width", "80px");
  theStartPage = new startPage();
  scenes = new background_scenes();
  //create explosion camera
  cam1 = createCamera();
  victoryScene = new WinningScene(camX, camY, camZ - 300, 65);
  currentCamera = 1;
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

function draw() {
  console.log(status);
  orbitControl();
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
    background(0);
    moveAround();
    ship1.draw(camX, camY, camZ - 350, 15, tiltZ, tiltX, spaceship);
    if (frameCount === 1 || frameCount % 180 == 0) {
      generatePlanet(ship1);
      // console.log(planets.length);
    }

    drawPlanets();
    getWarningLevel(ship1, planets);
    sb.draw(
      ship1.getLocation().x + _W / 4,
      ship1.getLocation().y - _H / 4,
      ship1.getLocation().z
    );

    displayPoem.draw(
      ship1.getLocation().x,
      ship1.getLocation().y + _H / 4,
      ship1.getLocation().z
    );

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
  } else if (status === "justaliveAgain") {
    start_explosion_ball = new start_explosion(
      ship1.getLocation().x,
      ship1.getLocation().y,
      ship1.getLocation().z
    );
    explosion_timer = 0;
    explosion_bgm = false; //timer_back
    status = "aliveagain";
  } else if (status === "aliveagain") {
    if (start_explosion_ball.getSize() < 500) {
      start_explosion_ball.draw();
      ending.draw();
    } else if (start_explosion_ball.getSize() < 2000) {
      clear();
      start_explosion_ball.draw();
    } else {
      status = "alive";
    }
  } else if (status === "died") {
    background(0);
    if (explosion_bgm === false) {
      explosde_sound.play();
      explosion_bgm = true;
    }

    if (explosion_timer < 250) {
      drawPlanets();
      ship1.draw(camX, camY, camZ - 450, 15, tiltZ, tiltX, spaceship);
      // ellipsoid(30, 40, 40);
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

  if (status === "victory") {
    victoryScene.draw();
    ship1.draw(camX, camY, camZ - 450, 15, tiltZ, tiltX, spaceship);
  } else if (sb.getScore() > 1270 && status === "alive") {
    background(0);
    BGM.stop();
    victoryBGM.play();
    status = "victory";
  }
}

/* global p5 sphere int detail random objPositon alpha blue brightness color green hue lerpColor lightness red saturation background clear colorMode fill noFill noStroke stroke erase noErase 2D Primitives arc ellipse circle line point quad rect square triangle ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight bezier bezierDetail bezierPoint bezierTangent curve curveDetail curveTightness curvePoint curveTangent beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex plane box sphere cylinder cone ellipsoid torus loadModel model HALF_PI PI QUARTER_PI TAU TWO_PI DEGREES RADIANS print frameCount deltaTime focused cursor frameRate noCursor displayWidth displayHeight windowWidth windowHeight windowResized width height fullscreen pixelDensity displayDensity getURL getURLPath getURLParams remove disableFriendlyErrors noLoop loop isLooping push pop redraw select selectAll removeElements changed input createDiv createP createSpan createImg createA createSlider createButton createCheckbox createSelect createRadio createColorPicker createInput createFileInput createVideo createAudio VIDEO AUDIO createCapture createElement createCanvas resizeCanvas noCanvas createGraphics blendMode drawingContext setAttributes boolean string number applyMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate storeItem getItem clearStorage removeItem createStringDict createNumberDict append arrayCopy concat reverse shorten shuffle sort splice subset float int str boolean byte char unchar hex unhex join match matchAll nf nfc nfp nfs split splitTokens trim deviceOrientation accelerationX accelerationY accelerationZ pAccelerationX pAccelerationY pAccelerationZ rotationX rotationY rotationZ pRotationX pRotationY pRotationZ turnAxis setMoveThreshold setShakeThreshold deviceMoved deviceTurned deviceShaken keyIsPressed key keyCode keyPressed keyReleased keyTyped keyIsDown movedX movedY mouseIsPressed mouseX mouseY pmouseX pmouseY winMouseX winMouseY pwinMouseX pwinMouseY mouseButton mouseWheel requestPointerLock exitPointerLock touches createImage saveCanvas saveFrames image tint noTint imageMode pixels blend copy filter get loadPixels set updatePixels loadImage loadJSON loadStrings loadTable loadXML loadBytes httpGet httpPost httpDo Output createWriter save saveJSON saveStrings saveTable day hour minute millis month second year abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt fract createVector noise noiseDetail noiseSeed randomSeed random randomGaussian acos asin atan atan2 cos sin tan degrees radians angleMode textAlign textLeading textSize textStyle textWidth textAscent textDescent loadFont text textFont orbitControl debugMode noDebugMode ambientLight specularColor directionalLight pointLight lights lightFalloff spotLight noLights loadShader createShader shader resetShader normalMaterial texture textureMode textureWrap ambientMaterial emissiveMaterial specularMaterial shininess camera perspective ortho frustum createCamera setCamera CENTER CORNER CORNERS POINTS WEBGL RGB ARGB HSB LINES CLOSE BACKSPACE DELETE ENTER RETURN TAB ESCAPE SHIFT CONTROL OPTION ALT UP_ARROW DOWN_ARROW LEFT_ARROW RIGHT_ARROW sampleRate freqToMidi midiToFreq soundFormats getAudioContext userStartAudio loadSound createConvolver setBPM saveSound getMasterVolume masterVolume soundOut chain drywet biquadFilter process freq res gain toggle setType freq setType pan phase triggerAttack triggerRelease setADSR attack decay sustain release dispose notes polyvalue AudioVoice noteADSR setADSR noteAttack noteRelease dispose isLoaded playMode set isLooping isPlaying isPaused setVolume pan getPan rate duration currentTime jump channels sampleRate frames getPeaks reverseBuffer onended setPath setBuffer processPeaks addCue removeCue clearCues save getBlob getLevel toggleNormalize waveform analyze getEnergy getCentroid linAverages logAverages getOctaveBands fade attackTime attackLevel decayTime decayLevel releaseTime releaseLevel setADSR setRange setExp triggerAttack triggerRelease r width setType input output stream mediaStream currentSource enabled amplitude getSources setSource bands process panner process positionX positionY positionZ orient orientX orientY orientZ setFalloff maxDist rollof leftDelay rightDelay process delayTime feedback filter setType process convolverNode process impulses addImpulse resetImpulse toggleImpulse sequence setBPM getBPM addPhrase removePhrase getPhrase replaceSequence onStep setBPM musicalTimeMode maxIterations synced bpm timeSignature interval iterations compressor process attack knee ratio threshold release reduction record isDetected update onPeak WaveShaperNode process getAmount getOversample amp setInput connect disconnect play pause stop set smooth start add mult loop */
