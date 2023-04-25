let sound, fft, amplitude, r = 150, dr = 70

function preload () {
  sound = loadSound('gg.mp3')
}
function setup () {
  createCanvas(400, 400)
  fft = new p5.FFT()
  //FFT 一個演算法數據化音頻頻率
  fft.setInput(sound)
  sound.play()
  amplitude = new p5.Amplitude()// 震幅
  amplitude.setInput(sound)
}
function draw () {
  background(50, 30)
  translate(width / 2, height / 2)
  let waveform = fft.waveform()// 幅度值
  console.log("WaveForm: " + waveform[0])
  console.log("amplitude: " + amplitude.getLevel())
  ellipse(0, 0, 800 * amplitude.getLevel(), 800 * amplitude.getLevel())
  noFill()
  beginShape()
  let amLevel = amplitude.getLevel()
  if (amLevel <= 0.03 && amLevel >= 0.01) {
    stroke(0, 255, 159)
    strokeWeight(1)
  }
  else if (amLevel <= 0.06 && amLevel > 0.03) {
    stroke(0, 184, 255)
    strokeWeight(1)
  }
  else if (amLevel <= 0.09 && amLevel > 0.06) {
    stroke(0, 30, 255)
    strokeWeight(2)
  }

  else if (amLevel <= 0.15 && amLevel > 0.09) {
    stroke(189, 0, 255)
    strokeWeight(3)
  }

  else if (amLevel <= 0.5 && amLevel > 0.15) {
    stroke(214, 0, 255)
    strokeWeight(2.5)
  }
  else {
    stroke(224, 225, 221)
    strokeWeight(1)
  }

  //形成一個環狀的結構
  for (let i = 0; i < waveform.length; i += 15) {
    let ang = i * 360 / waveform.length
    let x = (r) * cos(radians(ang))
    let y = (r) * sin(radians(ang))
    let a = map(waveform[i], -1, 1, r - dr, r + dr) * cos(radians(ang))
    let b = map(waveform[i], -1, 1, r - dr, r + dr) * sin(radians(ang))
    vertex(a, b)//連接兩個點
    push()
    strokeWeight(2)
    let data = waveform[0]
    if (data > 0 && data < 0.2) {
      stroke(255, 204, 0)
    } else {
      stroke(255, 100)
    }
    line(x, y, a, b)
    pop()
    push()
    if (waveform[1] > 0.1) {
      stroke(255)

    } else {
      stroke('white')
    }
    strokeWeight(1)
    point(a, b)
    pop()
  }
  endShape()
}

function mousePressed () {
  if (!sound.isPlaying()) {
    sound.play()
    console.log('mousePressed')

  }
}