const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const zombieImage = new Image();
zombieImage.src = 'zombie.png'; // You need to provide a zombie image

const bulletImage = new Image();
bulletImage.src = 'bullet.png'; // You need to provide a bullet image

let zombies = [];
let bullets = [];

class Zombie {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.health = 2;
    }

    draw() {
        ctx.drawImage(zombieImage, this.x, this.y, this.width, this.height);
    }

    update() {
        this.x += (Math.random() - 0.5) * 2;
        this.y += (Math.random() - 0.5) * 2;
    }
}

class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
    }

    draw() {
        ctx.drawImage(bulletImage, this.x, this.y, this.width, this.height);
    }

    update() {
        this.y -= 5;
    }
}

function spawnZombie() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    zombies.push(new Zombie(x, y));
}

function shootBullet(x, y) {
    bullets.push(new Bullet(x, y));
}

function checkCollisions() {
    bullets.forEach((bullet, bulletIndex) => {
        zombies.forEach((zombie, zombieIndex) => {
            if (bullet.x < zombie.x + zombie.width &&
                bullet.x + bullet.width > zombie.x &&
                bullet.y < zombie.y + zombie.height &&
                bullet.y + bullet.height > zombie.y) {
                zombie.health--;
                bullets.splice(bulletIndex, 1);
                if (zombie.health <= 0) {
                    zombies.splice(zombieIndex, 1);
                    spawnZombie();
                }
            }
        });
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    zombies.forEach(zombie => {
        zombie.update();
        zombie.draw();
    });

    bullets.forEach((bullet, index) => {
        bullet.update();
        bullet.draw();
        if (bullet.y + bullet.height < 0) {
            bullets.splice(index, 1);
        }
    });

    checkCollisions();

    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    shootBullet(x, y);
});

// Initial spawn
for (let i = 0; i < 5; i++) {
    spawnZombie();
}

gameLoop();
