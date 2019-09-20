// CANVAS CREATION
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);
document.body.style.textAlign = "center";

// IMG ELEMENTS
var bgImage = new Image();
bgImage.src = "img/background.png";

var heroImage = new Image();
heroImage.src = "img/hero.png";

var monsterImage = new Image();
monsterImage.src = "img/monster.png";

// GAME OBJECTS
var game = {};
var hero = {
    speed: 256,
    ready: true,
    width: 31,
    height: 28
};
var monster = {
    ready: true,
    width: 32,
    height: 32
};
var keysDown = {};

// Stores the keys pressed by the player.
addEventListener("keydown", function(key) {
    keysDown[key.keyCode] = true;
});

// Delete the released keys.
addEventListener("keyup", function(key) {
    delete keysDown[key.keyCode];
});

var counterId;

/**
 * Initiates game parameters.
 */
var init = function() {
	counterId = setInterval(counter, 1000);
    game.finished = false;
    game.time = 10;
    game.monstersCaught = 0;
    hero.x = canvas.width / 2 - 15;
    hero.y = canvas.height / 2 - 14;
    hero.ready = true;
    monster.ready = true;
    reset();
    canvas.removeEventListener("click", init);
}

/**
 * Decrements game's time one by one.
 */
var counter = function() {
    game.time--;
    if (game.time <= 0) {
        clearInterval(counterId);
        game.finished = true;
        hero.ready = false;
        monster.ready = false;
    }
}

/**
 * Updates monster position randomly.
 */
var reset = function() {
    monster.x = 32 + (Math.random() * (canvas.width - 96));
    monster.y = 32 + (Math.random() * (canvas.height - 96));
}

/**
 * Updates hero's position based on a modifier.
 * @param {*} modifier 
 */
var update = function(modifier) {
    if (37 in keysDown) { // left
        if (hero.x > 15) {
            hero.x -= hero.speed * modifier;
            heroImage.src = "img/hero_left.png";
            hero.width = 14;
        }
    }
    if (38 in keysDown) { // up
        if (hero.y > 15) {
            hero.y -= hero.speed * modifier;
            heroImage.src = "img/hero_up.png";
            hero.width = 31;
        }
    }
    if (39 in keysDown) { // right
        if (hero.x + hero.width < canvas.width - 15) {
            hero.x += hero.speed * modifier;
            heroImage.src = "img/hero_right.png";
            hero.width = 14;
        }
    }
    if (40 in keysDown) { // down
        if (hero.y + hero.height < canvas.height - 15) {
            hero.y += hero.speed * modifier;
            heroImage.src = "img/hero.png";
            hero.width = 31;
        }
    }

    // check if a collision has occurs.
    if (hero.x <= (monster.x + monster.width)
        && monster.x <= (hero.x + hero.width)
        && hero.y <= (monster.y + monster.height)
        && monster.y <= (hero.y + hero.height)
    ) {
        game.monstersCaught++;
        reset();
    } 
}

/**
 * Renders the game elements on canvas.
 */
var render = function() {
    ctx.drawImage(bgImage, 0, 0);
    ctx.drawImage(heroImage, hero.x, hero.y);
    ctx.drawImage(monsterImage, monster.x, monster.y);

    ctx.font = "22px Arial";
    ctx.textBaseline = "top";
    ctx.fillStyle = "white";
    ctx.fillText("Monsters caught: "+ game.monstersCaught, 20, 20);
    ctx.fillText("Time: "+ game.time, 20, 50);

    if (game.finished) {
        ctx.fillText("Game over!", 200, 220);
        ctx.fillText("Click to start again!", 160, 260);
        canvas.addEventListener("click", init);
    }
}

/**
 * Main loop of game.
 */
var main = function() {
    if (game.finished == false) {
        update(0.02);
    }
    render();
    window.requestAnimationFrame(main);
}

init();
main();