/**  part-1: variables */
let gameBoard;
let gameWidth = 500;
let gameHeight = 500;
let context;
let scoreText;
let resetBtn;
let boardbackground = "forestgreen";
let paddle1Color = "lightblue";
let paddle2Color = "red";
let paddleBorder = "black";
let ballColor = "yellow";
let ballBorderColor = "black";
let ballRadius = 12.5;
let paddleSpeed = 50;
let intervalID;
let ballSpeed = 1;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
let paddle1 = {
  width: 25,
  height: 100,
  x: 0,
  y: 0,
};
let paddle2 = {
  width: 25,
  height: 100,
  x: gameWidth - 25,
  y: gameHeight - 100,
};

/** part-2: window.onload : start! */
window.onload = () => {
  gameBoard = document.getElementById("gameBoard");
  gameBoard.width = gameWidth;
  gameBoard.height = gameHeight;
  context = gameBoard.getContext("2d");
  scoreText = document.getElementById("scoreText");
  resetBtn = document.getElementById("resetBtn");

  window.addEventListener("keydown", changeDirection);
  resetBtn.addEventListener("click", resetGame);

  gameStart();
  drawPaddles();
};

/** part-3: functions */
const gameStart = () => {
  createBall();
  nextTick();
};
const nextTick = () => {
  intervalID = setTimeout(() => {
    clearBoard();
    drawPaddles();
    moveBall();
    drawBall(ballX, ballY);
    checkCollision();
    nextTick();
  }, 10);
};
const clearBoard = () => {
  context.fillStyle = boardbackground;
  context.fillRect(0, 0, gameWidth, gameHeight);
};
const drawPaddles = () => {
  context.strokeStyle = paddleBorder;

  context.fillStyle = paddle1Color;
  context.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
  context.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

  context.fillStyle = paddle2Color;
  context.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
  context.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
};
const createBall = () => {
  ballSpeed = 1;
  if (Math.round(Math.random()) == 1) {
    ballXDirection = 1;
  } else {
    ballXDirection = -1;
  }
  if (Math.round(Math.random()) == 1) {
    ballYDirection = 1;
  } else {
    ballYDirection = -1;
  }
  ballX = gameWidth / 2;
  ballY = gameHeight / 2;
  drawBall(ballX, ballY);
};
const moveBall = () => {
  ballX += ballSpeed * ballXDirection;
  ballY += ballSpeed * ballYDirection;
};
const drawBall = () => {
  context.fillStyle = ballColor;
  context.strokeStyle = ballBorderColor;
  context.lineWidth = 2;
  context.beginPath();
  context.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
  context.stroke();
  context.fill();
};
const checkCollision = () => {
  if (ballY <= 0 + ballRadius) {
    ballYDirection *= -1;
  }
  if (ballY >= gameHeight - ballRadius) {
    ballYDirection *= -1;
  }
  if (ballX <= 0) {
    player2Score += 1;
    updateScore();
    createBall();
    return;
  }
  if (ballX >= gameWidth) {
    player1Score += 1;
    updateScore();
    createBall();
    return;
  }
  if (ballX <= paddle1.x + paddle1.width + ballRadius) {
    if (ballY > paddle1.y && ballY < paddle1.y + paddle1.height) {
      ballX = paddle1.x + paddle1.width + ballRadius;
      ballXDirection *= -1;
      ballSpeed += 0.3;
    }
  }
  if (ballX >= paddle2.x - ballRadius) {
    if (ballY > paddle2.y && ballY < paddle2.y + paddle2.height) {
      ballX = paddle2.x - ballRadius;
      ballXDirection *= -1;
      ballSpeed += 0.3;
    }
  }
};
const changeDirection = (event) => {
  const keyPressed = event.keyCode;
  const paddle1Up = 87;
  const paddle1Down = 83;
  const paddle2Up = 38;
  const paddle2Down = 40;

  switch (keyPressed) {
    case paddle1Up:
      if (paddle1.y > 0) {
        paddle1.y -= paddleSpeed;
      }
      break;

    case paddle1Down:
      if (paddle1.y < gameHeight - paddle1.height) {
        paddle1.y += paddleSpeed;
      }
      break;
    case paddle2Up:
      if (paddle2.y > 0) {
        paddle2.y -= paddleSpeed;
      }
      break;

    case paddle2Down:
      if (paddle2.y < gameHeight - paddle2.height) {
        paddle2.y += paddleSpeed;
      }
      break;
  }
};
const updateScore = () => {
  scoreText.textContent = `${player1Score}:${player2Score}`;
};
const resetGame = () => {
  player1Score = 0;
  player2Score = 0;

  paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0,
  };
  paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100,
  };
  ballX = 0;
  ballY = 0;
  ballXDirection = 0;
  ballYDirection = 0;
  updateScore();
  clearInterval(intervalID);
  gameStart();
};
