const gameArea = document.getElementById('game-area');
const shooter = document.getElementById('shooter');

// Function to create a ball and shoot it towards the mouse position
function shootBall(event) {
  const ball = document.createElement('div');
  ball.classList.add('ball');
  gameArea.appendChild(ball);

  // Get mouse position
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  // Get shooter position
  const shooterRect = shooter.getBoundingClientRect();
  const shooterX = shooterRect.left + shooterRect.width / 2;
  const shooterY = shooterRect.top + shooterRect.height / 2;

  // Calculate direction
  const deltaX = mouseX - shooterX;
  const deltaY = mouseY - shooterY;
  const angle = Math.atan2(deltaY, deltaX);

  // Set initial position of the ball
  ball.style.left = `${shooterX}px`;
  ball.style.top = `${shooterY}px`;

  // Move the ball
  const speed = 5;
  const ballSize = 20; // Diameter of the ball
  let posX = shooterX;
  let posY = shooterY;

  const interval = setInterval(() => {
    posX += Math.cos(angle) * speed;
    posY += Math.sin(angle) * speed;
    ball.style.left = `${posX}px`;
    ball.style.top = `${posY}px`;

    // Remove the ball when it goes out of the screen
    if (posX < -ballSize || posX > window.innerWidth || posY < -ballSize || posY > window.innerHeight) {
      clearInterval(interval);
      ball.remove();
    }
  }, 20);
}

// Add event listener for mouse clicks
document.addEventListener('click', shootBall);
