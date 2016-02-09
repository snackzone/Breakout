(function () {
  var Breakout = window.Breakout = (window.Breakout || {});

  var GameView = Breakout.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    setInterval(function () {
      this.game.moveObjects();
      this.game.draw(this.ctx);
    }.bind(this), 20);
  };

  GameView.MOVES = {
    "left": -15,
    "right": 15
  };


  GameView.prototype.bindKeyHandlers = function () {
    var paddle = this.game.paddle;

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () {
        paddle.moveDir(move);
      });
    });

    key("space", function () { alert("BOOP."); });
  };

})();
