let stars = [];
let introStars = [];
let fakeStars = [];
let maxStars = 300;
let maxIntroStars = 300;
let introFrames = 100;
let sfCanva;
let sfCanvaWidth;
let sfCanvaHeight;

function setup () {
  createCanvas(windowWidth, windowHeight, WEBGL);
  sfCanva = createGraphics(windowWidth, windowHeight);
  sfCanvaWidth = windowWidth;
  sfCanvaHeight = windowHeight;
  for (let i = 0; i < maxIntroStars; i++) {
    introStars.push(new Star(1));
  }
  for (let i = 0; i < maxStars; i++) {
    fakeStars.push(new Star(0));
  }
}

function draw () {
  sfCanva.background(0);
  sfCanva.fill(255);
  sfCanva.stroke(255);
  sfCanva.translate(width/2, height/2);
  sfCanva.strokeWeight(2);
  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }

  sfCanva.strokeWeight(1);
  for (let i = 0; i < fakeStars.length; i++) {
    point(fakeStars[i].x, fakeStars[i].y);
  }

  sfCanva.strokeWeight(2);
  if (introFrames > 0) {
    for (let i = 0; i < floor(maxStars/100); i++) {
      stars.push(new Star(1));
    }

    for (let i = 0; i < introStars.length; i++) {
      introStars[i].update();
      introStars[i].show();
    }
    
    fill("rgba(244, 66, 66, 255)");
    introFrames-=0.5;
  }
  texture(sfCanva);
  translate(0,0, (height/2.0) / tan(PI*30.0 / 180.0) -350);
  plane(windowWidth, windowHeight);
}

class Star {
  constructor (type) {
    if (type == 1) {
      // Moving stars
      let r = random(width/60);
      let angle = random(0, 2*PI);
      this.x = r * Math.cos(angle);
      this.y = r * Math.sin(angle);
      this.z = random(0.95*width,width);
      this.life = 0;
    } else {
      // Background stars
      this.x = random(-width/2, width/2);
      this.y = random(-height/2, height/2);
    }
  }

  update () {
    this.z -= 10;
    this.life++;
    if (this.z < 1) {
      this.x = random(-width/20, width/20);
      this.y = random(-height/20, height/20);
      this.z = random(width*0.5, width);
      this.life = 0;
    }
  }

  show () {
    let tempx = map (this.x / this.z, -0.5, 0.5, -width/2, width/2);
    let tempy = map (this.y / this.z, -0.5*height/width, 0.5*height/width, -height/2, height/2);
    
    let r = map(this.z, 1, width, 40, 0.1) * Math.min(1, this.life/15);
    let angle = Math.atan2(this.y, this.x);
    
    let x1 = tempx + r * Math.cos(angle);
    let y1 = tempy + r * Math.sin(angle);
    
    sfCanva.line(tempx, tempy, x1, y1);
  }
}

/* global p5 sphere int detail random objPositon alpha blue brightness color green hue lerpColor lightness red saturation background clear colorMode fill noFill noStroke stroke erase noErase 2D Primitives arc ellipse circle line point quad rect square triangle ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight bezier bezierDetail bezierPoint bezierTangent curve curveDetail curveTightness curvePoint curveTangent beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex plane box sphere cylinder cone ellipsoid torus loadModel model HALF_PI PI QUARTER_PI TAU TWO_PI DEGREES RADIANS print frameCount deltaTime focused cursor frameRate noCursor displayWidth displayHeight windowWidth windowHeight windowResized width height fullscreen pixelDensity displayDensity getURL getURLPath getURLParams remove disableFriendlyErrors noLoop loop isLooping push pop redraw select selectAll removeElements changed input createDiv createP createSpan createImg createA createSlider createButton createCheckbox createSelect createRadio createColorPicker createInput createFileInput createVideo createAudio VIDEO AUDIO createCapture createElement createCanvas resizeCanvas noCanvas createGraphics blendMode drawingContext setAttributes boolean string number applyMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate storeItem getItem clearStorage removeItem createStringDict createNumberDict append arrayCopy concat reverse shorten shuffle sort splice subset float int str boolean byte char unchar hex unhex join match matchAll nf nfc nfp nfs split splitTokens trim deviceOrientation accelerationX accelerationY accelerationZ pAccelerationX pAccelerationY pAccelerationZ rotationX rotationY rotationZ pRotationX pRotationY pRotationZ turnAxis setMoveThreshold setShakeThreshold deviceMoved deviceTurned deviceShaken keyIsPressed key keyCode keyPressed keyReleased keyTyped keyIsDown movedX movedY mouseIsPressed mouseX mouseY pmouseX pmouseY winMouseX winMouseY pwinMouseX pwinMouseY mouseButton mouseWheel requestPointerLock exitPointerLock touches createImage saveCanvas saveFrames image tint noTint imageMode pixels blend copy filter get loadPixels set updatePixels loadImage loadJSON loadStrings loadTable loadXML loadBytes httpGet httpPost httpDo Output createWriter save saveJSON saveStrings saveTable day hour minute millis month second year abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt fract createVector noise noiseDetail noiseSeed randomSeed random randomGaussian acos asin atan atan2 cos sin tan degrees radians angleMode textAlign textLeading textSize textStyle textWidth textAscent textDescent loadFont text textFont orbitControl debugMode noDebugMode ambientLight specularColor directionalLight pointLight lights lightFalloff spotLight noLights loadShader createShader shader resetShader normalMaterial texture textureMode textureWrap ambientMaterial emissiveMaterial specularMaterial shininess camera perspective ortho frustum createCamera setCamera CENTER CORNER CORNERS POINTS WEBGL RGB ARGB HSB LINES CLOSE BACKSPACE DELETE ENTER RETURN TAB ESCAPE SHIFT CONTROL OPTION ALT UP_ARROW DOWN_ARROW LEFT_ARROW RIGHT_ARROW sampleRate freqToMidi midiToFreq soundFormats getAudioContext userStartAudio loadSound createConvolver setBPM saveSound getMasterVolume masterVolume soundOut chain drywet biquadFilter process freq res gain toggle setType freq setType pan phase triggerAttack triggerRelease setADSR attack decay sustain release dispose notes polyvalue AudioVoice noteADSR setADSR noteAttack noteRelease dispose isLoaded playMode set isLooping isPlaying isPaused setVolume pan getPan rate duration currentTime jump channels sampleRate frames getPeaks reverseBuffer onended setPath setBuffer processPeaks addCue removeCue clearCues save getBlob getLevel toggleNormalize waveform analyze getEnergy getCentroid linAverages logAverages getOctaveBands fade attackTime attackLevel decayTime decayLevel releaseTime releaseLevel setADSR setRange setExp triggerAttack triggerRelease r width setType input output stream mediaStream currentSource enabled amplitude getSources setSource bands process panner process positionX positionY positionZ orient orientX orientY orientZ setFalloff maxDist rollof leftDelay rightDelay process delayTime feedback filter setType process convolverNode process impulses addImpulse resetImpulse toggleImpulse sequence setBPM getBPM addPhrase removePhrase getPhrase replaceSequence onStep setBPM musicalTimeMode maxIterations synced bpm timeSignature interval iterations compressor process attack knee ratio threshold release reduction record isDetected update onPeak WaveShaperNode process getAmount getOversample amp setInput connect disconnect play pause stop set smooth start add mult loop */
