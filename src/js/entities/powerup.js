/*
Powerup
0: x
1: y
2: width
3: height
4: type = {0: speed, 1: double}
*/

var powerupShape = [
  [0, 0],
  [8, -6],
  [18, -6],
  [18+8, 0],
  [18, 6],
  [8, 6]
];

function powerupUpdate(e, i){
  /*
  A = Amplitude (Tallness) of the wave.
  B = How many waves there are for each cycle.
  C = How far to shift the wave’s X position.
  D = How far to shift the wave’s Y position.
  */
  // e[1] = sineMovement(12, 12, 0, H / 2, stateTimer);
}

function powerupDestroy(index){
  powerups.splice(index, 1);
}

function powerupDraw(e){
  strokePath (e[0] - cam[0], e[1] + 16, powerupShape, false, 2, 6);
  var text = '';
  switch(e[4]){
    case 0:
      text = 'VEL';
    break;
    case 1:
      text = '1UP';
    break;
    case 2:
      text = 'X2';
    break;
    case 3:
      text = 'FRI';
    break;
  }
  // txt, x, y, color, fontSize, align, lineJoint = 'round', lineWidth = 1
  font (text, e[0] - cam[0] + e[2] / 2, e[1] + 12, 17, 1, 0, 'round', 1);
  if(DEBUG == true){
    strokeRectangle([e[0], e[1], e[2], e[3]], 22, 1);
  }
}
