function collides (rect, circle) {
  var topLeft = rect.pos;
  var topRight = [rect.pos[0] + rect.width, rect.pos[1]];
  var bottomLeft = [rect.pos[0], rect.pos[1] + rect.height];
  var bottomRight = [rect.pos[0] + rect.width, rect.pos[1] + rect.height];

  if (
    circle.velX > 0 &&
    circle.pos[0] + circle.radius > topLeft[0] &&
    circle.pos[1] > topLeft[1] &&
    circle.pos[1] < bottomRight[1]
  ) {
    console.log("collides with left side");

  } else if (
    circle.velX < 0 &&
    circle.pos[0] - circle.radius < topRight[0] &&
    circle.pos[1] > topRight[1] &&
    circle.pos[1] < bottomRight[1]
  ) {
    console.log("collides with right side");

  } else if (
    circle.velY > 0 &&
    circle.pos[0] > topLeft[0] &&
    circle.pos[0] < topRight[0] &&
    circle.pos[1] > topLeft[1]
  ) {
    console.log("collides with top");

  } else if (
    circle.velY < 0 &&
    circle.pos[0] > topLeft[0] &&
    circle.pos[0] < topRight[0] &&
    circle.pos[1] < bottomLeft[1]
  ) {
    console.log("collides with bottom");
  }
}
