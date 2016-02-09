(function () {
  var Breakout = window.Breakout = (window.Breakout || {});

  var Brick = Breakout.Brick = function (game, pos, rowNum) {
    this.pos = pos;
    this.color = "#ffaa00";
    this.width = 50;
    this.height = 25;
    this.game = game;
    this.rowNum = rowNum;
  };

  Brick.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;

    ctx.fillRect(this.pos[0],this.pos[1],this.width,this.height);
  };

  Brick.prototype.destroy = function () {
    var idx = this.game.bricks.indexOf(this);
    this.game.bricks.splice(idx, 1);
  };

}());
