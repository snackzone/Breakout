(function () {
  var Breakout = window.Breakout = (window.Breakout || {});

    var Game = Breakout.Game = function (ctx, canvas) {
      this.ctx = ctx;
      this.canvas = canvas;
      this.DIM_X = 1000;
      this.DIM_Y = 500;
      this.NUM_ROWS = 4;
      this.BRICKS_PER_ROW = 20;
      this.BACKGROUND_COLOR = "#000000";
      this.paddle = new Breakout.Paddle(this);
      this.bricks = [];
      this.level = 0;
      this.ball = new Breakout.Ball(this);
      this.infowindow = new Breakout.Infowindow(this);
      this.pointMultiplier = 1;
      this.ballsLeft = 3;
      this.score = 0;
      this.makeBricks(this);
    };

    Game.prototype.makeBricks = function (game) {
      var y = 75;
      var level = 0;
      if (this.level > 0) {
        level++;
      }
      for (var i = 0; i < this.NUM_ROWS + level; i++) {
        var x = 0;
        for (var j = 0; j < this.BRICKS_PER_ROW; j++) {
          pos = [x, y];
          this.bricks.push(new Breakout.Brick(game, pos, i));
          x += 50;
        }
        y += 25;
      }
    };

    Game.prototype.draw = function () {
      var ctx = this.ctx;
      ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

      this.drawBackground(ctx);

      for(var i = 0; i < this.bricks.length; i++) {
        this.bricks[i].draw(ctx);
      }

      this.infowindow.draw(ctx);
      this.ball.draw(ctx);
      this.paddle.draw(ctx);

      for (var j = 0; j < Breakout.Particles.length; j++) {
        Breakout.Particles[j].draw(ctx);
      }
    };

    Game.prototype.moveObjects = function () {
      if (this.ball.isMoving) {
        this.ball.move();
      } else {
        this.ball.getPosByPaddle(this.paddle);
      }
      this.paddle.move();

      for (var j = 0; j < Breakout.Particles.length; j++) {
        Breakout.Particles[j].update(50);
      }
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
      this.ball.collidesWithWall();
      this.ball.collidesWithPaddle(this.paddle);
      var bricks = this.bricks;
      for (var i = 0; i < bricks.length; i++) {
        this.ball.collidesWithBrick(bricks[i]);
      }
    };

    Game.prototype.ballOut = function () {
      if (this.ball.isInBounds) {
        this.ball.isInBounds = false;
        window.setTimeout(function () {
          this.ball = new Breakout.Ball(this);
          this.ballsLeft--;
          this.resetPointMultiplier();
        }.bind(this), 1000);
      }
    };

    Game.prototype.destroyBrick = function (brick) {
      var idx = this.bricks.indexOf(brick);
      this.bricks.splice(idx, 1);
      this.ball.adjustBrickLevel(brick);
      Breakout.Particle.explosion(brick.pos[0], brick.pos[1], brick.color);
      this.updateScore(brick.pointValue, this.pointMultiplier);
      if (this.bricks.length === 0) {
        this.levelUp();
      }
    };

    Game.prototype.levelUp = function () {
      this.level++;
      this.makeBricks(this);
      this.ball = new Breakout.Ball(this);
    };

    Game.prototype.resetPointMultiplier = function () {
      this.pointMultiplier = 1;
    };

    Game.prototype.increasePointMultiplier = function () {
      this.pointMultiplier++;
    };

    Game.prototype.updateScore = function (points, multiplier) {
      this.score += points * multiplier * 100;
    };

    Game.prototype.isOver = function () {
      return this.ballsLeft < 1;
    };
})();
