const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

class Asteroid {
    constructor(speed) {
        this.size = 40;
        this.x = 0;
        this.y = 0;
        this.friendly = true;
        this.speed = speed;
    }

    update(deltaTime) {
        this.x += deltaTime * this.speed;

        if (this.x > 800)
            this.spawnAtRandomPosition();
    }

    draw() {
        if (this.friendly)
            ctx.fillStyle = "#2ecc71";
        else
            ctx.fillStyle = "#e74c3c";

        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    spawnAtRandomPosition() {
        this.x = -100;
        this.y = Math.random() * 600;
        this.size = 40 + Math.round(Math.random() * 60);
        this.friendly = Math.random() > 0.5;
    }
}

class Player {
    constructor() {
        this.x = 375;
        this.y = 275;
        this.size = 50;
        this.speed = 400;
    }

    update(deltaTime) {
        if (isKeyDown("w"))
            this.y -= this.speed * deltaTime;
            
        if (isKeyDown("s"))
            this.y += this.speed * deltaTime;    

        if (isKeyDown("a"))
            this.x -= this.speed * deltaTime;

        if (isKeyDown("d"))
            this.x += this.speed * deltaTime;

        for (let asteroid of gameData.asteroids) {
            // Patikrinsime, ar žaidėjas liečiasi su bloguoju asteroidu
            if (asteroid.x + asteroid.size >= this.x && 
                asteroid.x <= this.x + this.size &&
                asteroid.y + asteroid.size >= this.y &&
                asteroid.y <= this.y + this.size) {

                    if (asteroid.friendly) {
                        console.log("Žaidėjas susidūrė su geruoju asteroidu");
                        asteroid.spawnAtRandomPosition();
                    } else {
                        console.log("Žaidėjas susidūrė su bloguoju asteroidu");
                        restartGame();
                    }
                }

        }
    }

    draw() {
        ctx.fillStyle = "#2c3e50";
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

}

const gameData = {
    points: 0,
    asteroids: [],
    previousFrameTime: 0,
    player: undefined,
    currentInputKeys: []
};

function frame() {
    updateGameData();
    clearFrame();
    drawFrame();

    window.requestAnimationFrame(frame);
}

function clearFrame() {
    ctx.clearRect(0, 0, 800, 600);
}

function updateGameData() {
    const currentTime = Date.now();
    let deltaTime = (currentTime - gameData.previousFrameTime) / 1000;

    if (!gameData.previousFrameTime)
        deltaTime = 0;

    for (let asteroid of gameData.asteroids) {
        asteroid.update(deltaTime);
    }

    gameData.player.update(deltaTime);

    gameData.previousFrameTime = currentTime;
}

function drawFrame() {
    for (let asteroid of gameData.asteroids) {
        asteroid.draw();
    }

    gameData.player.draw();
}

function restartGame() {
    gameData.asteroids = [];

    for (let i = 0; i < 20; i++) {
        const asteroid = new Asteroid(200 + Math.random() * 200);
        asteroid.spawnAtRandomPosition();
        gameData.asteroids.push(asteroid);
    }

    gameData.player = new Player();

    frame();
}

document.addEventListener("keydown", (e) => {
    const key = e.key;

    const keyIndex = gameData.currentInputKeys.indexOf(key);

    if (keyIndex === -1) {
        gameData.currentInputKeys.push(key);
    }
});

document.addEventListener("keyup", (e) => {
    const key = e.key;

    const keyIndex = gameData.currentInputKeys.indexOf(key);

    if (keyIndex !== -1) {
        gameData.currentInputKeys.splice(keyIndex, 1);
    }
});

function isKeyDown(key) {
    const keyIndex = gameData.currentInputKeys.indexOf(key);

    return keyIndex !== -1;
}

// Pradedam žaidimą
restartGame();