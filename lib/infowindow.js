(function () {

  var Breakout = window.Breakout = (window.Breakout || {});

  var Infowindow = Breakout.Infowindow = function (game) {
    this.game = game;
    this.score = 0;
  };

  Infowindow.prototype.draw = function (ctx) {
   ctx.fillStyle = "#fff";
   ctx.font = "20px sans-serif";
   ctx.fillText(this.score, 5, 20);
  };

  Infowindow.prototype.updateScore = function (points, multiplier) {
    console.log(this.score);
    this.score += points * multiplier * 100;
  };






} ());
