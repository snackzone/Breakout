(function () {
  var Breakout = window.Breakout = (window.Breakout || {});

    var GameView = Breakout.GameView = function (game, ctx) {
      this.game = game;
      this.ctx = ctx;
    };

    GameView.prototype.start = function () {
      setInterval(function () {
        this.game.moveObjects();
        this.game.draw(this.ctx);
      }.bind(this), 20);
    };

})();
