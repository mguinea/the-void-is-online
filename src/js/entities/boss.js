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
  if(AABBCollides(player[iPlayer], boss)){
    soundPlayer[3].play();
    explosions.push([player[iPlayer][0], player[iPlayer][1], stateTimer + player[iPlayer][13], 0]);
    player[iPlayer][6] = 3;                // Player state to dead
    player[iPlayer][8] -= 1;               // Remove a life
    player[iPlayer][12] = stateTimer + 2;  // Calculate when respawn
  }
}

function bossDamage(iBoss, iPlayer){
  if(bosses[iBoss][9] > 0){
    bosses[iBoss][9] -= 1;
    soundPlayer[4].play();
    player[iPlayer][11] += 32;
  }
}

function bossDestroy(i){
  gameData[4] = stateTimer + 3;
  gameData[3] = 1; // finish level
  soundPlayer[7].play();
  player[0][11] += 300;
  for(var c = 0; c < 10; ++c){
    explosions.push([bosses[i][0] + srand(0, bosses[i][2]), bosses[i][1] + srand(0, bosses[i][3]), stateTimer + 2, 0]);
  }
  bosses.splice(i, 1);
}

function bossUpdate(e, iBoss){
  if(bosses[iBoss][9] <= 0){
    bossDestroy(iBoss);
  }

  switch(e[7]){
    case 0:
      var length = 10, rotation = (~~(stateTimer * 60) % 360), bounce = Math.cos( (rotation).toRad() ) * length;
      e[0] += bounce;
    break;
  }
}

function bossDraw(e){
  switch(e[7]){
    case 0:
      strokePath(e[0] - cam[0] - 18, e[1] + 22, bossShapes[0]);
    break;
  }

  font ('BOSS', W/2, 64, 17, 1, 0);
  strokeStaticRectangle([W/2 + 32, 60, 100, 16], 17);
  fillStaticRectangle([W/2 + 32, 60, e[9], 16], 17);

  strokeRectangle(e, 22);
}
