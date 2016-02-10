(function () {
  var Breakout = window.Breakout = (window.Breakout || {});

    var Game = Breakout.Game = function () {
      this.DIM_X = 1000;
      this.DIM_Y = 500;
      this.NUM_ROWS = 4;
      this.BRICKS_PER_ROW = 20;
      this.BACKGROUND_COLOR = "#000000";
      this.paddle = new Breakout.Paddle(this);
      this.bricks = [];
      this.ball = new Breakout.Ball(this);
      this.makeBricks();
    };

    Game.prototype.makeBricks = function () {
      var y = 75;
      for (var i = 0; i < this.NUM_ROWS; i++) {
        var x = 0;
        for (var j = 0; j < this.BRICKS_PER_ROW; j++) {
          pos = [x, y];
          this.bricks.push(new Breakout.Brick(this.game, pos, i));
          x += 50;
        }
        y += 25;
      }
    };

    Game.prototype.draw = function (ctx) {
      ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

      this.drawBackground(ctx);

      for(var i=0; i < this.bricks.length; i++) {
        this.bricks[i].draw(ctx);
      }

      this.ball.draw(ctx);
      this.paddle.draw(ctx);
    };

    Game.prototype.moveObjects = function () {
      // debugger
      if (this.ball.isMoving) {
        this.ball.move();
      } else {
        this.ball.getPosByPaddle(this.paddle);
      }
      this.paddle.move();
    };

    Game.prototype.step = function () {
      this.moveObjects();
      this.checkCollisions();
    };

    Game.prototype.drawBackground = function (ctx) {
      ctx.fillStyle = this.BACKGROUND_COLOR;
      ctx.opacity = 1;
      ctx.fillRect(0,0,this.DIM_X,this.DIM_Y);
    };

    Game.prototype.receiveMousePos = function (pos) {
      this.paddle.updatePos(pos);
    };

    Game.prototype.startBall = function () {
      this.ball.start();
    };

    Game.prototype.checkCollisions = function () {
      this.ball.calcWallCollision();
      this.ball.calcPaddleCollision(this.paddle);
      var bricks = this.bricks;
      for (var i = 0; i < bricks.length; i++) {
        if (this.ball.collideWithRect(bricks[i])) {
          this.destroyBrick(bricks[i]);
          this.ball.bounceY();
        }
      }
    };

    Game.prototype.ballOut = function () {
      window.setTimeout(function () {
        this.ball = new Breakout.Ball(this);
      }.bind(this), 1000);
    };

    Game.prototype.destroyBrick = function (brick) {
      var idx = this.bricks.indexOf(brick);
      this.bricks.splice(idx, 1);
      this.ball.adjustBrickLevel(brick);
    };
})();
