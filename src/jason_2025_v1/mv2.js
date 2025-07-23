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
    x: i * 120,
    y: 100,
    rgb: {
      r: Math.random() * 255,
      g: Math.random() * 255,
      b: Math.random() * 255,
    },
    vx: Math.random() * 4 + 1,
    vy: Math.random() * 4 + 2,
  });
}

fileload.addEventListener("change", function () {
  const audio1 = document.getElementById("audio1");
  audio1.src = URL.createObjectURL(this.files[0]);
  audio1.load();
  audio1.play();

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let [index, rect] of rects.entries()) {
      //

      ctx.fillStyle = `rgb(${rect.rgb.r},${rect.rgb.g},${rect.rgb.b})`;
      //draw rect
      ctx.fillRect(rect.x, rect.y, rectSize, rectSize);
      // move position
      rect.x += rect.vx;
      rect.y += rect.vy;

      // X border collision
      if (rect.x > canvas.width - rectSize) {
        rect.vx *= -1;
      } else if (rect.x < 0) {
        rect.vx *= -1;
      }
      // Y border collision
      if (rect.y > canvas.height - rectSize) {
        rect.vy *= -1;
      } else if (rect.y < 0) {
        rect.vy *= -1;
      }
      // nested loop
      for (let [_index, _rect] of rects.entries()) {
        if (index != _index) {
          // horizontal collision
          if (
            Math.abs(rect.x - _rect.x) < rectSize+20 &&
            Math.abs(rect.x - _rect.x) > rectSize - 20 &&
            Math.abs(rect.y - _rect.y) < rectSize
          ) {
            rect.vx *= -1;
            if (rects.length < 30) {
              rects.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                rgb: {
                  r: Math.random() * 255,
                  g: Math.random() * 255,
                  b: Math.random() * 255,
                },
                vx: Math.random() * 4 + 1,
                vy: Math.random() * 4 + 2,
              });
            }
          }
          // vertical collision
          if (
            Math.abs(rect.y - _rect.y) < rectSize+20 &&
            Math.abs(rect.y - _rect.y) > rectSize - 20 &&
            Math.abs(rect.x - _rect.x) < rectSize
          ) {
            rect.vy *= -1;
            if (rects.length < 30) {
              rects.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                rgb: {
                  r: Math.random() * 255,
                  g: Math.random() * 255,
                  b: Math.random() * 255,
                },
                vx: Math.random() * 4 + 1,
                vy: Math.random() * 4 + 2,
              });
            }
          }
        }
      }
    }

    requestAnimationFrame(animate);
  }
  animate();
});
