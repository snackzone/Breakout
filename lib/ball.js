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

  Ball.prototype.calcPaddleCollision = function (paddle) {
    var x = this.pos[0],
        y = this.pos[1],
        dx = this.vel[0],
        dy = this.vel[1],
        bottomLeft = [paddle.pos[0], paddle.pos[1]],
        bottomRight = [paddle.pos[0] + paddle.width, paddle.pos[1]],
        topLeft = [paddle.pos[0], paddle.pos[1] + paddle.height],
        topRight = [paddle.pos[0] + paddle.width, paddle.pos[1] + paddle.height];

    if(y + dy + this.radius > paddle.pos[1] && (topLeft[0] < x + dx && x + dx < topRight[0])) {
      this.bounceY();
    }
  };

  Ball.prototype.collide = function () {
    this.vel[0] = -this.vel[0];
    this.vel[1] = -this.vel[1];
  };

  Ball.prototype.bounceX = function () {
    this.vel[0] = -this.vel[0];
  };

  Ball.prototype.bounceY = function () {
    this.vel[1] = -this.vel[1];
  };
})();


// Dist([x_1, y_1], [x_2, y_2]) = sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2)















//
