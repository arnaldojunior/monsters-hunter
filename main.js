//Create the canvas for the game to display in
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//Load the background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
    bgReady = true;
}
bgImage.src = "img/background.png";

//Load the hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function() {
    heroReady = true;
}
heroImage.src = "img/hero.png";

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function() {
    monsterReady = true;
}
monsterImage.src = "img/monster.png";