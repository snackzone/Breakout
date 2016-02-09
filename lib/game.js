(function () {
  var Breakout = window.Breakout = (window.Breakout || {});

    var Game = Breakout.Game = function () {
      this.DIM_X = 1000;
      this.DIM_Y = 500;
      this.ball = new Breakout.Ball(this);
      this.paddle = new Breakout.Paddle(this);
    };


    Game.prototype.draw = function (ctx) {
      ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

      this.drawBackground(ctx);

      this.ball.draw(ctx);
      this.paddle.draw(ctx);
    };

    Game.prototype.moveObjects = function () {
      this.ball.move();
      this.paddle.move();
    };

    Game.prototype.step = function () {
      this.moveObjects();
      this.checkCollisions();
    };

    Game.prototype.drawBackground = function (ctx) {
      ctx.fillStyle = "#000000";
      ctx.opacity = 1;
      ctx.fillRect(0,0,this.DIM_X,this.DIM_Y);
    };

    Game.prototype.bricks = function () {
      return ([]);
    };

    Game.prototype.checkCollisions = function () {
      this.ball.calcWallCollision();
      this.ball.calcPaddleCollision(this.paddle);
      var objects = this.bricks();
      for (var i = 0; i < objects.length; i++) {
        if (this.ball.collidesWithRect(objects[i])) {
          this.ball.bounceY();
        }
      }
    };
})();
