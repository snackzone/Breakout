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
      console.log(this.vel);
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

  Ball.prototype.collidesWithWall = function () {
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

  Ball.prototype.collidesWithBrick = function (brick) {
    var topLeft = brick.pos;
    var topRight = [brick.pos[0] + brick.width, brick.pos[1]];
    var bottomLeft = [brick.pos[0], brick.pos[1] + brick.height];
    var bottomRight = [brick.pos[0] + brick.width, brick.pos[1] + brick.height];
    var dx = this.vel[0];
    var dy = this.vel[1];

    if (
      //collides with left side
      dx > 0 &&
      this.pos[0] + this.radius > topLeft[0] &&

      this.pos[0] - this.radius < topLeft[0] &&

      this.pos[1] > topLeft[1] &&
      this.pos[1] < bottomLeft[1]
    ) {
      this.bounceX();
      this.game.destroyBrick(brick);
    } else if (
      //collides with right side
      dx < 0 &&
      this.pos[0] - this.radius < topRight[0] &&

      this.pos[0] + this.radius > topRight[0] &&

      this.pos[1] > topRight[1] &&
      this.pos[1] < bottomRight[1]
    ) {
      this.bounceX();
      this.game.destroyBrick(brick);
    } else if (
      //collides with top
      dy > 0 &&
      this.pos[1] + this.radius > topLeft[1] &&

      this.pos[1] - this.radius < topLeft[1] &&

      this.pos[0] > topLeft[0] &&
      this.pos[0] < topRight[0]
    ) {
      this.bounceY();
      this.game.destroyBrick(brick);
    } else if (
      //collides with bottom
      dy < 0 &&
      this.pos[1] - this.radius < bottomLeft[1] &&

      this.pos[1] + this.radius > bottomLeft[1] &&

      this.pos[0] > topLeft[0] &&
      this.pos[0] < topRight[0]
    ) {
      this.bounceY();
      this.game.destroyBrick(brick);
    }
  };

  Ball.prototype.collidesWithPaddle = function (paddle) {
    var topLeft = paddle.pos;
    var topRight = [paddle.pos[0] + paddle.width, paddle.pos[1]];
    var bottomLeft = [paddle.pos[0], paddle.pos[1] + paddle.height];
    var bottomRight = [paddle.pos[0] + paddle.width, paddle.pos[1] + paddle.height];
    var dx = this.vel[0];
    var dy = this.vel[1];

    if (
      //collides with left side
      dx > 0 &&
      this.pos[0] + this.radius > topLeft[0] &&

      this.pos[0] - this.radius < topLeft[0] &&

      this.pos[1] > topLeft[1] &&
      this.pos[1] < bottomLeft[1]
    ) {
      this.bounceX();
    } else if (
      //collides with right side
      dx < 0 &&
      this.pos[0] - this.radius < topRight[0] &&

      this.pos[0] + this.radius > topRight[0] &&

      this.pos[1] > topRight[1] &&
      this.pos[1] < bottomRight[1]
    ) {
      this.bounceX();
    } else if (
      //collides with top
      dy > 0 &&
      this.pos[1] + this.radius > topLeft[1] &&

      this.pos[1] - this.radius < topLeft[1] &&

      this.pos[0] > topLeft[0] &&
      this.pos[0] < topRight[0]
    ) {

      //slicing, spinning, paddle logic
      if ((this.pos[0] < (paddle.pos[0] + paddle.width * 0.25) && this.vel[0] > 0) ||
      ((this.pos[0] > (paddle.pos[0] + paddle.width - (paddle.width * 0.25))) && this.vel[0] < 0)) {
        this.bounceX();
      }

      if (this.vel[0] > 0 && paddle.moveDir === -1) {
        this.increaseSpeedLevel();
      }

      if (this.vel[0] < 0 && paddle.moveDir === 1) {
        this.decreaseSpeedLevel();
      }


      this.bounceY();

    } else if (
      //collides with bottom
      dy < 0 &&
      this.pos[1] - this.radius < bottomLeft[1] &&

      this.pos[1] + this.radius > bottomLeft[1] &&

      this.pos[0] > topLeft[0] &&
      this.pos[0] < topRight[0]
    ) {
      this.bounceY();
    }
  };

  // Ball.prototype.collides = function (rect) {
  //   var x = this.pos[0],
  //       y = this.pos[1],
  //       dx = this.vel[0],
  //       dy = this.vel[1];
  //
  //   return (
  //       x + dx + this.radius > rect.pos[0] &&
  //       x + dx - this.radius < rect.pos[0] + rect.width &&
  //       y + dy - this.radius < rect.pos[1] + rect.height &&
  //       y + dy + this.radius > rect.pos[1]
  //     );
  // };

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

  Ball.prototype.decreaseSpeedLevel = function () {
    this.speedLevel++;

    if (this.vel[0] < 0) {
      this.vel[0]++;
    } else {
      this.vel[0]--;
    }

    if (this.vel[1] < 0) {
      this.vel[1]++;
    } else {
      this.vel[1]--;
    }
  };
})();
