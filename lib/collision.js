// Ball.prototype.collideWithRect = function (rect) {
//   var x = this.pos[0],
//       y = this.pos[1],
//       dx = this.vel[0],
//       dy = this.vel[1];
//
//       //touching bottom
//   if ((x + dx > rect.pos[0] - this.radius) &&
//         (x + dx < rect.pos[0] + rect.width + this.radius) &&
//         (y + dy > rect.pos[1]) &&
//         (y + dy < rect.pos[1] + rect.height) &&
//         (y + dy > rect.pos[1] + this.radius) &&
//         (dy < 0)) {
//           console.log("hit bottom!");
//           this.bounceY();
//           return true;
//       //touching right
//   } else if ((y > rect.pos[1]) &&
//         (y < rect.pos[1] + rect.height) &&
//         (x > rect.pos[0]) &&
//         (x < rect.pos[0] + rect.width + dx)) {
//           console.log("hit right!");
//           this.bounceX();
//           return true;
//       //touching left
//   } else if ((y > rect.pos[1]) &&
//         (y < rect.pos[1] + rect.height) &&
//         (x > rect.pos[0] - rect.width + dx) &&
//         (x < rect.pos[0])) {
//           console.log("hit left!");
//           this.bounceX();
//           return true;
//       //touching top
//   } else if ((x + dx > rect.pos[0] - dx) &&
//         (x + dx < rect.pos[0] + rect.width + this.radius) &&
//         (y + dy + 4 < rect.pos[1]) &&
//         (y + dy + 4 > rect.pos[1] - 7) &&
//         (y + dy < rect.pos[1]) &&
//         (dy > 0)) {
//           console.log("hit top!");
//           this.bounceY();
//           return true;
//   } else {
//     return false;
//   }
//
// };
