// var drawBox= function (x, y, width, height, color) {
//     ctx.beginPath();
//     ctx.rect(x, y, width, height);
//     ctx.lineWidth = 2;
//     ctx.strokeStyle = color;
//     ctx.stroke();
// };

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random()*300); //I want my bugs to appear with random speeds
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + 1 + this.speed*dt; //EA: I add '1' here to avoid stationary bugs in case the speed randoms a '0'.

    if(this.x > ctx.canvas.width){
      this.x = -100;
    }
//EA: When the enemies reach end of canvas, this if block makes them to go back left
    this.hitbox = {x: this.x, y: this.y + 77, w: 99 , h:66};
};

// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //drawBox(this.x, this.y + 77, 99, 66, "yellow");
};

// Now write your own player class
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.score = 0;
}

// This class requires an update(), render() and
Player.prototype.update = function () {
    this.hitbox = {x: this.x + 16, y: this.y + 61, w: 67 , h: 76};

    if (player.y === -6) {
        this.resetPosition();
        this.score += 1;
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillStyle = "white";
    ctx.font = '24px Arial';
    ctx.fillText("score: " + this.score, 5, 70);
    //drawBox(this.x + 16, this.y + 61, 69, 79, "blue");
};

//EA: This is similar to the reset function in the engine.js except it does not reset the score coount
Player.prototype.resetPosition = function () {
    this.x = 200;
    this.y = 320;
};
// a handleInput() method.
Player.prototype.handleInput = function (keyCode) {
    if (keyCode === 'left' && this.x > 0) {
      this.x = this.x - 101.5;
    }
    if (keyCode === 'right' && this.x < 400) {
      this.x = this.x + 101.5;
    }
    if (keyCode === 'up' && this.y > 40) {
      this.y = this.y - 81.5;
    }
    if (keyCode === 'down' && this.y < 375) {
      this.y = this.y + 81.5;
    }
}; //EA: I don't like the fact that I used absolute values for movement boundaries, later I might work on to make those values relative to sprite & canvas dimensions

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(1,60), new Enemy(1, 145), new Enemy(1, 230), new Enemy(1, 60), new Enemy(1, 230)]; //EA
// Place the player object in a variable called player
var player = new Player(200, 320); //EA

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
