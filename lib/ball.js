(function () {
  var Breakout = window.Breakout = (window.Breakout || {});

  var Ball = window.Breakout.Ball = function (game) {
    this.pos = [500, 250];
    this.vel = [1, 1];
    this.radius = 10;
    this.color = "#aaa";
    this.game = game;
  };

  Ball.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  Ball.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };

  Ball.prototype.isCollidedWith = function (otherObject) {
    var x_1 = this.pos[0];
    var y_1 = this.pos[1];
    var x_2 = otherObject.pos[0];
    var y_2 = otherObject.pos[1];

    var distance = Math.sqrt(Math.pow((x_1 - x_2), 2) + Math.pow((y_1 - y_2), 2));

    return distance < this.radius + otherObject.radius;
  };
})();


// Dist([x_1, y_1], [x_2, y_2]) = sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2)















//
