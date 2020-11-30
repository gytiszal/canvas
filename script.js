const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const UI = {
    testButton: document.querySelector(".testButton"),
    spaceShip: document.querySelector("#spaceshipSource")
}

class Asteroid {
    constructor(size, speed, yAxis) {
        this.size = size;
        this.x = -150;
        this.y = yAxis;
        this.friendly = true;
        this.speed = speed;
    }

    update(deltaTime) {
        this.x += deltaTime * this.speed;
    }

    draw() {
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

// class Spaceship {
//     constructor(position) {
//         this.size = 70;
//         this.x = 300;
//         this.y = 200;
//         this.position = position;
//     }
//     drawSpaceship() {

//         ctx.drawImage(UI.spaceShip, this.x, this.y, this.size, this.size);

//      //   requestAnimationFrame(this.drawSpaceship);
//     }
// }



const gameData = {
    points: 0,
    asteroids: [],
    spaceShips: [],
    previousFrameTime: 0
};

function frame() {
    updateGameData();
    clearFrame();
    drawFrame();
    // drawMySpaceship();

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

    gameData.previousFrameTime = currentTime;
}

function drawFrame() {
    for (let asteroid of gameData.asteroids) {
        asteroid.draw();
    }
}

// function drawMySpaceship() {
//     for (let spaceShip of gameData.spaceShips) {
//         spaceShip.drawSpaceship();
//     }
// }



function startGame() {
    gameData.asteroids.push(new Asteroid(50, 120, 0));
    gameData.asteroids.push(new Asteroid(30, 244, 100));
    gameData.asteroids.push(new Asteroid(100, 300, 150));
    gameData.asteroids.push(new Asteroid(120, 150, 222));
    gameData.asteroids.push(new Asteroid(80, 200, 365));
    gameData.asteroids.push(new Asteroid(40, 400, 428));
    // gameData.spaceShips.push(new Spaceship(200));
    
    frame();
}

function respawnAsteroids() {
    for (asteroid of gameData.asteroids) 
        
    if (asteroid.x >= 800) {
        asteroid.x = -150; 
        asteroid.y = Math.floor(Math.random() * 480)
    }  
}

UI.testButton.addEventListener("click", () => {
    startGame();
    updateSpaceShip();
    
})

setInterval(() => {
    respawnAsteroids();
}, 500);

                                                                //Spaceship on mouse
let mouseX = 0;
let mouseY = 0;
 
canvas.addEventListener("mousemove", setMousePosition, false);

 
function setMousePosition(e) {

  mouseX = e.clientX;
  mouseY = e.clientY;
}    

function updateSpaceShip() {
    ctx.beginPath();
    ctx.drawImage(UI.spaceShip, mouseX, mouseY, 70, 70);
    ctx.fillStyle = "#FF6A6A";
    ctx.fill();
   
    requestAnimationFrame(updateSpaceShip);
}




    
   
    












