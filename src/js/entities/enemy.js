/*
Enemy
0: x
1: y
2: width
3: height
4: type
5: damage
6: cadency
7: init time
8: end time
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
    [0, 0],
    [12, -6],
    [24, -6],
    [36, 0],
    [24, 12],
    [12, 12]
  ]
];

function enemyCollidesWithPlayer(enemy, iEnemy, iPlayer){
  if(AABBCollides(player[iPlayer], enemy)){
    enemyDestroy(iEnemy, iPlayer);
    soundPlayer[3].play();
    explosions.push([player[iPlayer][0], player[iPlayer][1], stateTimer + player[iPlayer][13], 0]);
    player[iPlayer][6] = 3;                // Player state to dead
    player[iPlayer][8] -= 1;               // Remove a life
    player[iPlayer][12] = stateTimer + 2;  // Calculate when respawn
  }
}

function enemyDestroy(iEnemy, iPlayer){
  soundPlayer[4].play();
  player[iPlayer][11] += 10;
  explosions.push([enemies[iEnemy][0], enemies[iEnemy][1], stateTimer + 1, 0]);
  enemies.splice(iEnemy, 1);
}

function enemyDraw(e){
  // If game over...
  if(gameData[0] == 1) return;

  // Show
  switch(e[4]){
    case 0:
      strokePath(e[0] - cam[0] - 3, e[1] + 7, /*enemyShapes[e[4]]*/enemyShapes[0]);
    break;
    case 1:
      strokePath(e[0] - cam[0] - 3, e[1] + 7, /*enemyShapes[e[4]]*/enemyShapes[1]);
    break;
    case 2:
      strokePath(e[0] - cam[0] - 3, e[1] + 7, /*enemyShapes[e[4]]*/enemyShapes[2]);
    break;
  }

  if(DEBUG == true){
    fillRectangle([e[0], e[1], e[2], e[3]], 22, 1);
  }
}

function enemyExpires(i){
  enemies.splice(i, 1);
}

function enemyUpdate(e, i){
  // If game over...
  if(gameData[0] == 1) return;

  // Any enemy with X < 0 expires
  if(e[0] < camTarget[0]){
    enemyExpires(i);
  }

  // Behaviour
  switch(e[4]){
    case 0:
      e[0] -= 16 * dt;
      /*
      A = Amplitude (Tallness) of the wave.
      B = How many waves there are for each cycle.
      C = How far to shift the wave’s X position.
      D = How far to shift the wave’s Y position.
      */
      e[1] = sineMovement(80, 0.2, 0, H / 2, e[0]);
    break;
    case 1:
      e[0] -= 350 * dt;
    break;
    case 2:
      e[0] -= 256  * dt;
    break;
  }
}

function movementOne(time){
  var x = 0;
  var y = 0;
  return [x, y];
}
