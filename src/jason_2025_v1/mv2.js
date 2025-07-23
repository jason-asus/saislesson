/** settings */
// const NUMBER_OF_SAMPLES = 256;

//canvas
const canvas = document.getElementById("cnvs");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
const fileload = document.getElementById("fileload");
let audioSource;
let rectSize = 50

let rects = [];
for (let i = 0; i < 11; i++) {

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

    rects.forEach((rect, index) => {

      rects.forEach((_rect, _index) => {
        console.log(index,_index)///
        if (index != _index) {
          if (Math.abs(rect.x - _rect.x) <= rectSize && Math.abs(rect.y - _rect.y) < rectSize) {
            rect.vx *= -1
          } 
          if (Math.abs(rect.y - _rect.y) <= rectSize && Math.abs(rect.x - _rect.x) < rectSize) {
            rect.vy *= -1
          }
        }

      })
      //
      //draw rect
      ctx.fillRect(rect.x, rect.y, rectSize, rectSize);
      //rect vl 
      rect.x += rect.vx;
      rect.y += rect.vy;
      // X collision
      if (rect.x > canvas.width - rectSize) {
        rect.vx *= -1
      } else if (rect.x < 0) {
        rect.vx *= -1
      }
      // Y collision
      if (rect.y > canvas.height - rectSize) {
        rect.vy *= -1
      } else if (rect.y < 0) {
        rect.vy *= -1
      }

      ctx.fillStyle = `rgb(${rect.rgb.r},${rect.rgb.g},${rect.rgb.b})`;

    })

  requestAnimationFrame(animate);

}
  animate();
});
