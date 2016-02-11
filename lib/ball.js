(function () {
  var Breakout = window.Breakout = (window.Breakout || {});

  var Ball = window.Breakout.Ball = function (game) {
    this.pos = this.getPosByPaddle(game.paddle);
    this.vel = [0, 0];
    this.radius = 10;
    this.color = "#aaa";
    this.game = game;
    this.speedLevel = game.NUM_ROWS - 1;
    this.isMoving = false;
    this.startSpeed = 6 + game.level;
    this.isInBounds = true;
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

  Ball.prototype.start = function () {
    if (!this.isMoving) {
      this.isMoving = true;
      this.vel[0] = this.startSpeed;
      this.vel[1] = -(this.startSpeed);
    }
  };

  Ball.prototype.getPosByPaddle = function (paddle) {
    var x = paddle.pos[0] + paddle.width - paddle.width / 3;
    var y = paddle.pos[1] - this.radius;
    this.pos = [x, y];
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

    if(y + dy < this.radius) {
      this.bounceY();
    }

    if (y + dy > height) {
      this.game.ballOut();
    }
  };

  Ball.prototype.collideWithRect = function (rect) {
    var x = this.pos[0],
        y = this.pos[1],
        dx = this.vel[0],
        dy = this.vel[1],
        bottomLeft = [rect.pos[0], rect.pos[1]],
        bottomRight = [rect.pos[0] + rect.width, rect.pos[1]],
        topLeft = [rect.pos[0], rect.pos[1] + rect.height],
        topRight = [rect.pos[0] + rect.width, rect.pos[1] + rect.height];

    return (
        x + dx + this.radius > rect.pos[0] &&
        x + dx - this.radius < rect.pos[0] + rect.width &&
        y + dy - this.radius < rect.pos[1] + rect.height &&
        y + dy + this.radius > rect.pos[1]
      );
  };

  Ball.prototype.calcPaddleCollision = function (paddle) {
    if (this.collideWithRect(paddle)) {
      this.bounceY();
      if ((this.pos[0] < (paddle.pos[0] + paddle.width * 0.25) && this.vel[0] > 0) ||
      ((this.pos[0] > (paddle.pos[0] + paddle.width - (paddle.width * 0.25))) && this.vel[0] < 0)) {
        this.bounceX();
      }
    }
  };

  Ball.prototype.bounceX = function () {
    this.vel[0] = -this.vel[0];
  };

  Ball.prototype.bounceY = function () {
    this.vel[1] = -this.vel[1];
  };

  Ball.prototype.adjustBrickLevel = function (brick) {
    if (brick.row < this.speedLevel) {
      this.game.increasePointMultiplier();
      this.increaseSpeedLevel();
    }
  };

  Ball.prototype.increaseSpeedLevel = function () {
    this.speedLevel--;

    if (this.vel[0] < 0) {
      this.vel[0]--;
    } else {
      this.vel[0]++;
    }

    if (this.vel[1] < 0) {
      this.vel[1]--;
    } else {
      this.vel[1]++;
    }
  };
})();


// Dist([x_1, y_1], [x_2, y_2]) = sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2)















//
