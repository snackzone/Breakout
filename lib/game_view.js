(function () {
  var Breakout = window.Breakout = (window.Breakout || {});

  var GameView = Breakout.GameView = function (game, ctx, canvas) {
    this.game = game;
    this.ctx = ctx;
    this.canvas = canvas;
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    this.int = window.setInterval(function () {
      this.game.step();
      this.game.draw();
      if (this.game.isOver()) {
        window.clearInterval(this.int);
        this.gameOverSequence();
      }
    }.bind(this), 20);
  };

  GameView.prototype.gameOverSequence = function () {
    var banner = function () {
      this.x = 250;
      this.y = -50;
    };


    function playAgainCallback () {
      this.game.draw();
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0,0,this.game.DIM_X,this.game.DIM_Y);
      ctx.fillStyle = "#fff";
      ctx.font = "50px sans-serif";
      ctx.fillText("CLICK TO PLAY AGAIN", 250, 250);
      this.newGameListener = this.newGame.bind(this);
      this.canvas.addEventListener("click", this.newGameListener);
    }

    function displayScore () {
      this.game.draw();
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0,0,this.game.DIM_X,this.game.DIM_Y);
      ctx.fillStyle = "#fff";
      ctx.font = "50px sans-serif";
      ctx.fillText("SCORE:", 250, 250);
      var that = this;
      window.setTimeout(function () {
        ctx.fillText(that.game.score, 450, 250);
        window.setTimeout(playAgainCallback.bind(that), 1000);
      }, 500);
    }
    // debugger
    this.canvas.removeEventListener("mousemove", this.mouseCallback, false);

    this.banner = new banner();
    this.int = window.setInterval(function () {
      var ctx = this.ctx;
      var banner = this.banner;
      this.game.draw();
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0,0,this.game.DIM_X,this.game.DIM_Y);
      ctx.fillStyle = "#fff";
      ctx.font = "50px sans-serif";
      ctx.fillText("GAME OVER", banner.x, banner.y);
      if (banner.y < 250) {
        banner.y += 20;
      } else {
        window.clearInterval(this.int);
        window.setTimeout(displayScore.bind(this), 1000);
      }
    }.bind(this), 20);
  };

  GameView.prototype.newGame = function () {
    this.canvas.removeEventListener('click', this.newGameListener, false);
    this.game = new Breakout.Game(this.ctx, this.canvas);
    this.start();
  };

  GameView.MOVES = {
    "left": -15,
    "right": 15
  };

  var getMousePos = function (canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  var paddleListener = function (e) {
    var mousePos = getMousePos(e.currentTarget, e);
    this.game.receiveMousePos(mousePos);
  };

  GameView.prototype.bindKeyHandlers = function () {
    var paddle = this.game.paddle;
    document.addEventListener("keyup", keyUpHandler, false);
    this.mouseCallback = paddleListener.bind(this);
    this.canvas.addEventListener("mousemove", this.mouseCallback, false);

    function keyUpHandler(e) {
      if(e.keyCode == 39 || e.keyCode == 37) {
          paddle.stop();
      }
    }

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () {
        paddle.moveInDir(move);
      });
    });

    function startBall(e) {
      e.preventDefault();
      this.game.startBall();
    }

    key("space", startBall.bind(this));

    this.canvas.addEventListener("click", startBall.bind(this));
  };

})();
