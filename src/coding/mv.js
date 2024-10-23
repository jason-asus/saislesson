const container = document.getElementById("container")
const canvas = document.getElementById("cnvs")
const ctx = canvas.getContext("2d")
const fileload = document.getElementById("fileload")
let audioSource
let analyser

container.addEventListener("click", function () {
  //   audio1.play()
})

fileload.addEventListener("change", function () {
  // load and play music file
  console.log("load file", this.files)
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
  analyser.fftSize = 64
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
    barHeight = dataArr[i] / 2
    ctx.fillStyle = "white"
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
    x += barWidth
  }
}
