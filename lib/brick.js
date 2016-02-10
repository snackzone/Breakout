(function () {
  var Breakout = window.Breakout = (window.Breakout || {});

  var Brick = Breakout.Brick = function (game, pos, row) {
    this.pos = pos;
    this.width = 50;
    this.height = 25;
    this.game = game;
    this.row = row;
    this.pointValue = game.NUM_ROWS - row;
    this.COLORS = ["#0000ff", "#00ff00", "#ffff00", "#ffa500", "#ff0000"].reverse();
  };

  Brick.prototype.draw = function(ctx) {
    this.color = this.COLORS[this.row];
    ctx.fillStyle = this.color;

    ctx.fillRect(this.pos[0],this.pos[1],this.width,this.height);
  };

  Brick.prototype.destroy = function () {
    var idx = this.game.bricks.indexOf(this);
    this.game.bricks.splice(idx, 1);
  };

}());
