/*
Explosion
0: x
1: y
2: end time
3: shape
*/

var explosionShape = [
  [
    [0, 0],
    [-12, -12],
    [0, 0],
    [12, 12],
    [0, 0],
    [16, 0],
    [0, 0],
    [9, 16],
    [0, 0],
    [-12, 18],
    [0, 0],
    [-6, 0]
  ],
  [
    [0, 0],
    [-8, -8],
    [0, 0],
    [8, 8],
    [0, 0],
    [18, 0],
    [0, 0],
    [10, 18],
    [0, 0],
    [-6, 12],
    [0, 0],
    [-7, 0]
  ]
];

function explosionUpdate(e, params, i){
  if(e[2] < stateTimer){
    explosions.splice(i, 1);
  }
  // ~~(elapsedTime * framesPerSecond) % totalFrames)
  e[3] = ~~((stateTimer * 10) % 2);
}

function explosionDraw(e){
  ctx.save();
  ctx.translate(e[0] - cam[0], e[1]);
  setContextAttribute(17, 0);
  path(explosionShape[e[3]], true);
  ctx.stroke();
  ctx.restore();
}
