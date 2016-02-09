(function () {
  var Breakout = window.Breakout = (window.Breakout || {});

  var Paddle = Breakout.Paddle = function (game) {
    this.pos = [500, 450];
    this.color = "#0000ff";
    this.width = 100;
    this.height = 10;
    this.vel = [0,0];
    this.game = game;
  };

  Paddle.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;

    ctx.fillRect(this.pos[0],this.pos[1],this.width,this.height);
  };

  Paddle.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };

  Paddle.prototype.moveDir = function (impulse) {
    this.vel = [impulse, 0];
  };






}());
