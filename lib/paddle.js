(function () {
  var Breakout = window.Breakout = (window.Breakout || {});

  var Paddle = Breakout.Paddle = function (game) {
    this.pos = [500, 450];
    this.color = "#0000ff";
    this.width = 100;
    this.height = 10;
    this.vel = [0,0];
    this.game = game;
    this.moveDir = 0;
  };

  Paddle.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;

    ctx.fillRect(this.pos[0],this.pos[1],this.width,this.height);
  };

  Paddle.prototype.move = function() {
    var newPos = [
      this.pos[0] + this.vel[0],
      this.pos[1] + this.vel[1]
    ];

    if (this.willBeOutOfBounds(newPos)) {
      this.stop();

    } else {
      this.pos = newPos;

    }
  };

  Paddle.prototype.moveInDir = function (dir) {
    this.vel = [dir, 0];
  };

  Paddle.prototype.willBeOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[0] + this.width > this.game.DIM_X);
  };

  Paddle.prototype.stop = function () {
    this.vel = [0,0];
  };

  Paddle.prototype.updatePos = function (pos) {
    var newX = pos.x - this.width / 2;
    var newPos = [newX, this.pos[1]];
    if (this.willBeOutOfBounds(newPos)) {
      this.stop();
    } else {
      if (this.pos[0] < newX) {
        this.moveDir = 1;
      } else if (this.pos[1] > newX) {
        this.moveDir = -1;
      } else {
        this.moveDir = 0;
      }
      this.pos[0] = newX;
    }
  };






}());
