(function () {
  var Breakout = window.Breakout = (window.Breakout || {});

  var Ball = window.Breakout.Ball = function (game) {
    this.pos = [500, 250];
    this.vel = [5, 5];
    this.radius = 10;
    this.color = "#aaa";
    this.game = game;
  };

  Ball.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  Ball.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };

  Ball.prototype.isCollidedWith = function (otherObject) {
    var ballX = this.pos[0];
    var ballY = this.pos[1];
    var x1 = otherObject.pos[0];
    var y1 = otherObject.pos[1];
    var x2 = otherObject.pos[0] + otherObject.width;
    var y2 = otherObject.pos[1] + otherObject.height;

    var distance = Math.sqrt(Math.pow((x_1 - x_2), 2) + Math.pow((y_1 - y_2), 2));

    return distance < this.radius + otherObject.radius;
  };

  Ball.prototype.calcWallCollision = function () {
    var x = this.pos[0],
        y = this.pos[1],
        dx = this.vel[0],
        dy = this.vel[1],
        width = this.game.DIM_X,
        height = this.game.DIM_Y;

    if(x + dx > width-this.radius || x + dx < this.radius) {
      this.bounceX();
    }
    if(y + dy > height-this.radius || y + dy < this.radius) {
      this.bounceY();
    }
  };

  Ball.prototype.calcRectCollision = function (rect) {
    var x = this.pos[0],
        y = this.pos[1],
        dx = this.vel[0],
        dy = this.vel[1],
        bottomLeft = [rect.pos[0], rect.pos[1]],
        bottomRight = [rect.pos[0] + rect.width, rect.pos[1]],
        topLeft = [rect.pos[0], rect.pos[1] + rect.height],
        topRight = [rect.pos[0] + rect.width, rect.pos[1] + rect.height];

    
  };

  Ball.prototype.collide = function () {
    this.vel[0] = -this.vel[0];
    this.vel[1] = -this.vel[1];
  };

  Ball.prototype.bounceX = function () {
    console.log("Bounce X!");
    this.vel[0] = -this.vel[0];
  };

  Ball.prototype.bounceY = function () {
    console.log("Bounce Y!");
    this.vel[1] = -this.vel[1];
  };
})();


// Dist([x_1, y_1], [x_2, y_2]) = sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2)















//
