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
8: behaviour data [
9: life (100)
10: init x position
11: sine oscillation
12 : init time
]
*/

var bossShapes = [
  [
    [0*4, 0*4],
    [12*4, -6*4],
    [24*4, -6*4],
    [36*4, 0*4],
    [24*4, 12*4],
    [12*4, 12*4]
  ]
];

function bossCollidesWithPlayer(boss, iBoss, iPlayer){
  if(AABBCollides(player[iPlayer], boss) && god == false){
    soundPlayer[3].play();
    explosions.push([player[iPlayer][0], player[iPlayer][1], stateTimer + player[iPlayer][13], 0]);
    player[iPlayer][6] = 3;                // Player state to dead
    player[iPlayer][8] -= 1;               // Remove a life
    player[iPlayer][12] = stateTimer + 2;  // Calculate when respawn
  }
}

function bossDamage(iBoss, iPlayer){
  var damage = (god ? 100 : 1);
  if(bosses[iBoss][9] > 0){
    bosses[iBoss][9] -= damage;
    soundPlayer[4].play();
    player[iPlayer][11] += 32;
  }
}

function bossDestroy(i){
  gameData[4] = stateTimer + 3;
  gameData[3] = 1; // finish level
  soundPlayer[7].play();
  for(var c = 0; c < 10; ++c){
    explosions.push([bosses[i][0] + srand(0, bosses[i][2]), bosses[i][1] + srand(0, bosses[i][3]), stateTimer + 2, 0]);
  }
  bosses.splice(i, 1);
}

function bossUpdate(e, iBoss){
  if(bosses[iBoss][9] <= 0){
    bossDestroy(iBoss);
  }

  /*
  A = Amplitude (Tallness) of the wave.
  B = How many waves there are for each cycle.
  C = How far to shift the wave’s X position.
  D = How far to shift the wave’s Y position.
  */
  e[11] = sineMovement(W, 1, 0, -W/2, stateTimer);
  e[0] = e[10] + e[11];


  // Shot
  if(e[12] < stateTimer){
    bossProjectileShot(e);
    e[12] = stateTimer + srand(e[6], e[6] + 0.5);
  }
}

function bossDraw(e){
  strokePath(e[0] - cam[0] - 18, e[1] + 22, bossShapes[0]);
  fillCircle(e[0] + 55, e[1] + 50, 4, 8);
  if(e[9] > 25) { strokeSemiCircle(e[0] + 55, e[1] + 50, 12, 2, 2); }
  if(e[9] > 50) { strokeSemiCircle(e[0] + 55, e[1] + 50, 12* 2, 2, 2); }
  if(e[9] > 75) { strokeSemiCircle(e[0]  + 55, e[1] + 50, 12* 3, 2, 2); }

  font ('BOSS', W/2, 64, 17, 1, 0);
  strokeStaticRectangle([W/2 + 32, 60, 100, 16], 17);
  fillStaticRectangle([W/2 + 32, 60, e[9], 16], 17);

  if(DEBUG){
    strokeRectangle(e, 22);
  }
}
