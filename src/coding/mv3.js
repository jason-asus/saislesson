/** settings */
const NUMBER_OF_SAMPLES = 256

//canvas
const container = document.getElementById("container")
const canvas = document.getElementById("cnvs")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
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

  const barWidth = canvas.width / bufferLenght / 2
  let barHeight
  let x

    // draw recursion
  ;(function animate() {
    x = 0
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    analyser.getByteFrequencyData(dataArr) // array of values , each represents volume of the frequency

    musicVisualiser(bufferLenght, x, barWidth, barHeight, dataArr) //mv

    requestAnimationFrame(animate)
  })()
  // animate()
})

// Music Visualiser function
function musicVisualiser(bufferLenght, x, barWidth, barHeight, dataArr) {
  for (let i = 0; i < bufferLenght; i++) {
    barHeight = dataArr[i] * 2

    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((i * Math.PI * 2 * 1.5) / bufferLenght)
    // ctx.lineWidth = barHeight / 15

    const hue = (360 / NUMBER_OF_SAMPLES) * i * 2.5
    ctx.fillStyle = "hsl(" + hue + ",80%,50%)"

    ctx.fillRect(0, 0, barWidth, barHeight)

    x += barWidth
    ctx.restore()
  }
}
