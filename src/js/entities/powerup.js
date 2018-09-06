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
  [12, 0],
  [12, 12],
  [0, 12]
];

function powerupUpdate(e){

}

function powerupDestroy(index){
  powerups.splice(index, 1);
}

function powerupDraw(e){
  ctx.save();
  ctx.translate(e[0] - cam[0], e[1]);
  setContextAttribute(17, 0);
  path(powerupShape);
  ctx.stroke();
  ctx.restore();

  if(DEBUG == true){
    fillRectangle([e[0], e[1], e[2], e[3]], 22, 1);
  }
}
