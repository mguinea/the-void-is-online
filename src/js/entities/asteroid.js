/*
Asteroid
0: x
1: y
2: width
3: height
4: rotation
5: velocity
6: life
7: scale
*/

var asteroidShape = [
  [0, 0],
  [32, 0],
  [32, 32],
  [0, 32],
  [0, 0]
];

function asteroidCollidesWithPlayer(asteroid, iAsteroid, iPlayer){
  if(AABBCollides(player[iPlayer], asteroid)){
    asteroidDestroy(iAsteroid, iPlayer);
    soundPlayer[3].play();
    explosions.push([player[iPlayer][0], player[iPlayer][1], stateTimer + player[iPlayer][13], 0]);
    player[iPlayer][6] = 3;                // Player state to dead
    player[iPlayer][8] -= 1;               // Remove a life
    player[iPlayer][12] = stateTimer + 2;  // Calculate when respawn
  }
}

function asteroidDestroy(iAsteroid){
  soundPlayer[4].play();
  explosions.push([asteroids[iAsteroid][0], asteroids[iAsteroid][1], stateTimer + 1, 0]);
  asteroids.splice(iAsteroid, 1);
}

function asteroidDraw(e){
  // If game over...
  if(gameData[0] == 1) return;

  // Show
  // x, y, pts, noclose, scale = 1, color = 17, lineWidth = 1, rotation = null, radius = null
  strokePath(e[0] - cam[0] + (e[2] / 2), e[1] + (e[3] / 2), asteroidShape, false, e[7], 17, 1, e[4], e[2]);

  if(DEBUG == true){
    strokeRectangle([e[0], e[1], e[2], e[3]], 22, 1);
  }
}

function asteroidExpires(i){
  asteroids.splice(i, 1);

  var sizes = [32, 64];
  var size = ~~srand(0, 2);
  var scale = size + 1;
  /*
  Asteroid
  0: x
  1: y
  2: width
  3: height
  4: rotation
  5: velocity
  6: life
  7: scale
  */
  asteroids.push([camTarget[0] + W + srand(0, 512), srand(64, H - 64), sizes[size], sizes[size], srand(0, 360), 0, 6, scale]);
}

function asteroidUpdate(e, i){
  // If game over...
  if(gameData[0] == 1) return;

  e[4] += 100 * dt;

  if(e[6] <= 0){
    asteroidDestroy(i);
  }

  // Any enemy with X < 0 expires
  if(e[0] < camTarget[0]){
    asteroidExpires(i);
  }
}
