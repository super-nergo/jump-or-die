var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var gravity = 0.5;
var jumpPower = -10;
var gameSpeed = 3;
var score = 0;

var player = {
  x: 50,
  y: 380,
  width: 32,
  height: 32,
  velocityY: 0
};

var obstacle = {
  x: canvas.width,
  y: 380,
  width: 30,
  height: 30
};

function resetObstacle() {
  obstacle.x = canvas.width + Math.random() * 100;
}

function drawPlayer() {
  ctx.fillStyle = "#333";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacle() {
  ctx.fillStyle = "#555";
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

function drawScore() {
  ctx.fillStyle = "#fff";
  ctx.font = "16px monospace";
  ctx.fillText("Score: " + score, 10, 30);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // gravity
  player.velocityY += gravity;
  player.y += player.velocityY;

  if (player.y > 380) {
    player.y = 380;
    player.velocityY = 0;
  }

  // move obstacle
  obstacle.x -= gameSpeed;

  if (obstacle.x + obstacle.width < 0) {
    resetObstacle();
    score += 1;
  }

  // collision
  if (
    player.x < obstacle.x + obstacle.width &&
    player.x + player.width > obstacle.x &&
    player.y < obstacle.y + obstacle.height &&
    player.y + player.height > obstacle.y
  ) {
    alert("GAME OVER\nScore: " + score);
    document.location.reload();
  }

  drawPlayer();
  drawObstacle();
  drawScore();
}

// Jump
document.getElementById("jumpBtn").onclick = function() {
  if (player.y >= 380) {
    player.velocityY = jumpPower;
  }
};

// Slide (не реализовано)
document.getElementById("slideBtn").onclick = function() {
  // зарезервировано под slide-логику
};

resetObstacle();
setInterval(update, 1000 / 60); // 60 FPS
