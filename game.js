const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gravity = 0.5;
const jumpPower = -10;
let gameSpeed = 3;

const player = {
  x: 50,
  y: 380,
  width: 32,
  height: 32,
  velocityY: 0,
  isSliding: false
};

const obstacle = {
  x: canvas.width,
  y: 380,
  width: 30,
  height: 30
};

let score = 0;

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

  // Gravity
  player.velocityY += gravity;
  player.y += player.velocityY;

  // Ground collision
  if (player.y > 380) {
    player.y = 380;
    player.velocityY = 0;
  }

  // Obstacle movement
  obstacle.x -= gameSpeed;

  // Reset obstacle
  if (obstacle.x + obstacle.width < 0) {
    resetObstacle();
    score++;
  }

  // Collision detection
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

  requestAnimationFrame(update);
}

document.getElementById("jumpBtn").addEventListener("click", () => {
  if (player.y >= 380) {
    player.velocityY = jumpPower;
  }
});

document.getElementById("slideBtn").addEventListener("click", () => {
  // Optional: implement slide logic
});

resetObstacle();
update();
