/*
Enemy
0: x
1: y
2: width
3: height
4: type
5: damage
6: cadency
7: type // defines draw and behaviour
*/

var enemyShapes = [
  [
    [0, 0],
    [12, -6],
    [24, -6],
    [36, 0],
    [24, 12],
    [12, 12]
  ],
  [
    [0, 0],
    [12, 9],
    [50, 0],
    [12, -9],
    [0, 0]
  ],
  [
    [0*4, 0*4],
    [12*4, -6*4],
    [24*4, -6*4],
    [36*4, 0*4],
    [24*4, 12*4],
    [12*4, 12*4]
  ]
];

function enemyUpdate(e){
  if(gameOver == 1) return;

  if(e[4] == 0){
    e[0] -= 12 * dt;
    /*
    A = Amplitude (Tallness) of the wave.
    B = How many waves there are for each cycle.
    C = How far to shift the wave’s X position.
    D = How far to shift the wave’s Y position.
    */
    e[1] = sineMovement(64, 0.1, 0, H / 2, e[0]);
  }else if(e[4] == 1){
    e[0] -= 256 * dt;
  }
  // Any enemy with X < 0 expires
  if(e[0] < 0){
    enemyExpires(e);
  }
}

function enemyDraw(e){
  if(gameOver == 1) return;

  ctx.save();
  ctx.translate(e[0] - cam[0] - 3, e[1] + 7);
  setContextAttribute(17, 0);
  path(enemyShapes[e[4]]);
  ctx.stroke();
  ctx.restore();

  if(DEBUG == true){
    fillRectangle([e[0], e[1], e[2], e[3]], 22, 1);
  }
}

function enemyDestroy(i){
  soundPlayer[4].play();
  player[11] += 10;
  explosions.push([enemies[i][0], enemies[i][1], stateTimer + 1, 0]);
  enemies.splice(i, 1);
}

function enemyExpires(i){
  enemies.splice(i, 1);
}
