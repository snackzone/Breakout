(function () {
  var Breakout = window.Breakout = (window.Breakout || {});

    var Game = Breakout.Game = function () {
      this.DIM_X = 1000;
      this.DIM_Y = 500;
      this.ball = new Breakout.Ball(this);
    };


    Game.prototype.draw = function (ctx) {
      ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

      this.drawBackground(ctx);

      this.ball.draw(ctx);
    };

    Game.prototype.moveObjects = function () {
      this.ball.move();
    };

    Game.prototype.drawBackground = function (ctx) {
      ctx.fillStyle = "#000000";
      ctx.opacity = 1;
      ctx.fillRect(0,0,this.DIM_X,this.DIM_Y);
    };



































})();
