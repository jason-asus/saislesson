const NUMBER_OF_SAMPLES = 256
const ROTATE = 1 / 3

const canvas = document.getElementById("cnvs")
const ctx = canvas.getContext("2d")
const fileload = document.getElementById("fileload")
let audioSource
let analyser

fileload.addEventListener("change", function () {
  const audio1 = document.getElementById("audio1")
  audio1.src = URL.createObjectURL(this.files[0])
  audio1.load()
  audio1.play()

  // analyze the music
  const audioContext = new AudioContext()
  audioSource = audioContext.createMediaElementSource(audio1)
  analyser = audioContext.createAnalyser()
  audioSource.connect(analyser)
  analyser.connect(audioContext.destination)
  analyser.fftSize = NUMBER_OF_SAMPLES
  const bufferLenght = analyser.frequencyBinCount
  const dataArr = new Uint8Array(bufferLenght)

  const barWidth = canvas.width / bufferLenght
  let barHeight
  let x

  function animate() {
    x = 0
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    analyser.getByteFrequencyData(dataArr)

    musicVisualiser(bufferLenght, x, barWidth, barHeight, dataArr) //mv

    requestAnimationFrame(animate)
  }
  animate()
})

// Music Visualiser function
function musicVisualiser(bufferLenght, x, barWidth, barHeight, dataArr) {
  for (let i = 0; i < bufferLenght; i++) {
    barHeight = dataArr[i]

    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate(i * bufferLenght * ROTATE)
    ctx.lineWidth = barHeight / 15
    const hue = (i * 360 * 2) / bufferLenght

    // ctx.fillStyle = "hsl(" + hue + ",100%,50%)"
    // ctx.fillRect(0, 0, barWidth / 4, barHeight / 2)

    ctx.strokeStyle = "hsl(" + hue + ",100%,50%)"
    ctx.beginPath()
    ctx.moveTo(0, barHeight / 5)
    ctx.lineTo(barHeight / 5, barHeight / 4)
    ctx.stroke()
    x += barWidth
    ctx.restore()
  }
}
