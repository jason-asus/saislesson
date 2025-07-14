/** settings */
// const NUMBER_OF_SAMPLES = 256;

//canvas
const canvas = document.getElementById("cnvs");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
const fileload = document.getElementById("fileload");
// let audioSource;
// let analyser;

fileload.addEventListener("change", function () {
  const audio1 = document.getElementById("audio1");
  audio1.src = URL.createObjectURL(this.files[0]);
  audio1.load();
  audio1.play();

  // analyze the music
  // const audioContext = new AudioContext()
  // audioSource = audioContext.createMediaElementSource(audio1)
  // analyser = audioContext.createAnalyser()
  // audioSource.connect(analyser)
  // analyser.connect(audioContext.destination)
  // analyser.fftSize = NUMBER_OF_SAMPLES
  // const bufferLenght = analyser.frequencyBinCount
  // const dataArr = new Uint8Array(bufferLenght)

  // const barWidth = canvas.width / bufferLenght / 2
  // let barHeight
  // let x
  let rectx = 0;
  let rectvx = 1;
  let recty = 100;
  let rectvy = 1;
  let rect2x = 400;
  let rect2vx = 1;
  let rect2y = 100;
  let rect2vy = 1;

  function animate() {
    // x = 0
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rectx += rectvx;
    recty += rectvy;
    ctx.fillStyle = "red ";
    ctx.fillRect(rectx, recty, 200, 200);
    if (rectx > canvas.width - 200) {
      rectvx = -1;
    } else if (rectx < 0) {
      rectvx = 1;
    }
    if (recty > canvas.height - 200) {
      rectvy = -1;
    } else if (recty < 0) {
      rectvy = 1;
    }
    rect2x += rect2vx;
    rect2y += rect2vy;
    ctx.fillStyle = " green ";
    ctx.fillRect(rect2x, rect2y, 200, 200);
    if (rect2x > canvas.width - 200) {
      rect2vx = -1;
    } else if (rect2x < 0) {
      rect2vx = 1;
    }
    if (rect2y > canvas.height - 200) {
      rect2vy = -1;
    } else if (rect2y < 0) {
      rect2vy = 1;
    }

    // analyser.getByteFrequencyData(dataArr) // array of values , each represents volume of the frequency

    // musicVisualiser(bufferLenght, x, barWidth, barHeight, dataArr) //mv

    requestAnimationFrame(animate);
  }
  animate();
});

// Music Visualiser function
// function musicVisualiser(bufferLenght, x, barWidth, barHeight, dataArr) {
//   for (let i = 0; i < bufferLenght; i++) {
//     barHeight = dataArr[i] * 2;

//     ctx.save();

//     // white block
//     ctx.fillStyle = "white";
//     ctx.fillRect(
//       canvas.width / 2 - x,
//       canvas.height - barHeight - 10,
//       barWidth,
//       10
//     );
//     ctx.fillRect(
//       canvas.width / 2 + x,
//       canvas.height - barHeight - 10,
//       barWidth,
//       10
//     );

//     // color bars
//     const hue = (360 * i) / bufferLenght;
//     ctx.fillStyle = "hsl(" + hue + ",80%,50%)";
//     ctx.fillRect(
//       canvas.width / 2 - x,
//       canvas.height - barHeight,
//       barWidth,
//       barHeight
//     );
//     ctx.fillRect(
//       canvas.width / 2 + x,
//       canvas.height - barHeight,
//       barWidth,
//       barHeight
//     );

//     x += barWidth;
//     ctx.restore();
//   }
// }
