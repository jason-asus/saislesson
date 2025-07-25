/** settings */
// const NUMBER_OF_SAMPLES = 256;

//canvas
const canvas = document.getElementById("cnvs");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
const fileload = document.getElementById("fileload");
let audioSource;
let rectSize = 50;

let rects = [];
for (let i = 0; i < 5; i++) {
  rects.push({
    x: i * 200 + 10,
    y: i * 100 + 10,
    rgb: {
      r: Math.random() * 255,
      g: Math.random() * 255,
      b: Math.random() * 255,
    },
    vx: Math.random() * 4 + 2,
    vy: Math.random() * 4 + 2,
  });
}

const addRect = () => {
  if (rects.length < 50) {
    rects.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      rgb: {
        r: Math.random() * 255,
        g: Math.random() * 255,
        b: Math.random() * 255,
      },
      vx: Math.random() * 4 + 2,
      vy: Math.random() * 4 + 2,
    });
  }
};

fileload.addEventListener("change", function () {
  const audio1 = document.getElementById("audio1");
  audio1.src = URL.createObjectURL(this.files[0]);
  audio1.load();
  audio1.play();
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let [index, rect] of rects.entries()) {
    //

    // nested loop
    for (let [indez, rectz] of rects.entries()) {
      if (index != indez) {
        if (rectz.x + rectSize < rect.x && rectz.x < rect.x && Math.abs( rectz.y - rect.y)<rectSize){
          rect.vx = Math.abs(rect.vx);
              rectz.vx = Math.abs(rectz.vx) *-1;
        } else if (rectz.x < rect.x + rectSize && rectz.x > rect.x  && Math.abs( rectz.y - rect.y)<rectSize) {
          rect.vx = Math.abs(rect.vx) *-1;
             rectz.vx = Math.abs(rectz.vx) *1;
        }
      }
    }

    //

    // X border collision
    if (rect.x >= canvas.width - rectSize) {
      rect.vx *= -1;
    } else if (rect.x <= 0) {
      rect.vx *= -1;
    }
    // Y border collision
    if (rect.y >= canvas.height - rectSize) {
      rect.vy *= -1;
    } else if (rect.y <= 0) {
      rect.vy *= -1;
    }
    //
    ctx.fillStyle = `rgb(${rect.rgb.r},${rect.rgb.g},${rect.rgb.b})`;
    //draw rect
    ctx.fillRect(rect.x, rect.y, rectSize, rectSize);
    // move position
    rect.x += rect.vx;
    rect.y += rect.vy;
  }

  requestAnimationFrame(animate);
}
animate();
