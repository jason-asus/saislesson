/** settings */
// const NUMBER_OF_SAMPLES = 256;

//canvas
const canvas = document.getElementById("cnvs");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
const fileload = document.getElementById("fileload");
let audioSource;

let rects = [
  { x: 0, y: 100, vx: Math.random() * 4 + 1, vy: Math.random() * 4 + 2 },
  { x: 0, y: 100, vx: Math.random() * 4 + 1, vy: Math.random() * 4 + 2 },
];

fileload.addEventListener("change", function () {
  const audio1 = document.getElementById("audio1");
  audio1.src = URL.createObjectURL(this.files[0]);
  audio1.load();
  audio1.play();

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

  

   

      for (let rect of rects) {
    ctx.fillRect(rect.x, rect.y, 200, 200);
 rect.x += rect.vx;
     rect.y += rect.vy;
    }

    ctx.fillStyle = "red";

    requestAnimationFrame(animate);
  }
  animate();
});
