
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const balls = [];
const ballSpeed = 5;
let spacePressed = false;

class Ball {
    constructor(x, y, dx, dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = 10;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

function shootBall() {
    const mouseX = canvas.width / 2; // Shoot from the center horizontally
    const mouseY = canvas.height / 2; // Shoot from the center vertically
    const angle = Math.atan2(mouseY - canvas.height / 2, mouseX - canvas.width / 2);
    const dx = Math.cos(angle) * ballSpeed;
    const dy = Math.sin(angle) * ballSpeed;

    balls.push(new Ball(canvas.width / 2, canvas.height / 2, dx, dy));
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Shoot balls if spacebar is pressed
    if (spacePressed) {
        shootBall();
    }

    // Update and draw all balls
    balls.forEach((ball, index) => {
        ball.update();

        // Remove ball if it goes out of the screen
        if (ball.x + ball.radius < 0 || ball.x - ball.radius > canvas.width ||
            ball.y + ball.radius < 0 || ball.y - ball.radius > canvas.height) {
            balls.splice(index, 1);
        }
    });
}

// Event listeners for spacebar
window.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        spacePressed = true;
    }
});

window.addEventListener('keyup', (event) => {
    if (event.code === 'Space') {
        spacePressed = false;
    }
});

animate();
