(function () {

  var Breakout = window.Breakout = (window.Breakout || {});

  var Infowindow = Breakout.Infowindow = function (game) {
    this.game = game;
  };

  Infowindow.prototype.draw = function (ctx) {
   ctx.fillStyle = "#fff";
   ctx.font = "20px VT323";
   ctx.fillText("SCORE: " + this.game.score, 5, 20);
   for (var i = 1; i < this.game.ballsLeft; i++) {
     var x = 1000 - i * 25;
     var y = 25;
     this.drawBall(ctx, [x, y]);
   }
  };

  Infowindow.prototype.drawBall = function (ctxm, pos) {
    ctx.fillStyle = "#aaa";

    ctx.beginPath();

    ctx.arc(
      pos[0],
      pos[1],
      10,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };





} ());
