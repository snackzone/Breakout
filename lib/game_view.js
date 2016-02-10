(function () {
  var Breakout = window.Breakout = (window.Breakout || {});

  var GameView = Breakout.GameView = function (game, ctx, canvas) {
    this.game = game;
    this.ctx = ctx;
    this.canvas = canvas;
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    setInterval(function () {
      this.game.step();
      this.game.draw(this.ctx);
    }.bind(this), 20);
  };

  GameView.MOVES = {
    "left": -15,
    "right": 15
  };


  GameView.prototype.bindKeyHandlers = function () {
    var paddle = this.game.paddle;
    document.addEventListener("keyup", keyUpHandler, false);

    function getMousePos(canvas, e) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }

    this.canvas.addEventListener("mousemove", function(e) {
      var mousePos = getMousePos(this.canvas, e);
      this.game.receiveMousePos(mousePos);
    }.bind(this));

    function keyUpHandler(e) {
      if(e.keyCode == 39 || e.keyCode == 37) {
          paddle.stop();
      }
    }

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () {
        paddle.moveDir(move);
      });
    });

    key("space", function () { alert("BOOP."); });
  };

})();
