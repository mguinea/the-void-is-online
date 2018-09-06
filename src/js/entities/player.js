/*
Player
0: x
1: y
2: width
3: height
4: angle
5: velocity
6: state = {0: idle, 1: up, 2: down, 3: dead, 4: invencible}
7: -
8: lives
9: shot next available (stateTimer + cadence)
10: cadence shot
11: score
12: player respawn (stateTimer + cadence)
13: player repawn cadence
*/
var player = [],
    player2 = [],
    playerShipDraws = [
      [
    		[-6, 6],
        [6, 14],
        [6, 22],
        [14, 22],
        [26, 14],
        [58, 6],
        [6, 0]
    	],
      [
        [-6, 6],
        [6, 14],
        [6, 18],
        [14, 18],
        [26, 14],
        [58, 6],
        [6, 2]
    	],
      [
        [-6, 6],
        [6, 14],
        [6, 24],
        [14, 24],
        [26, 14],
        [58, 6],
        [26, -2],
        [14, -6],
        [6, -6],
        [6, -2],
        [-6, 6]
    	]
    ],
    playerShipsDrawIndex = 0;

function playerInit(){
  player = [64, H/4 * 2, 48, 12, 0, 150, 0, 0, 3, 0, 0.2, 0, 0, 2];
  player2= [64, H/4 * 3, 48, 12, 0, 150, 0, 0, 3, 0, 0.2, 0, 0, 2];
}

function playerUpdate(){
  if(gameData[0] == 1) return;

  // If player is not dead
  if(player[6] != 3){
    player[6] = 0;

    // Movement
    if(pressing[87]){ // Up
      player[6] = 1;
      if(player[1] > 32){
        player[1] -= player[5] * dt;
      }else{
        player[1] = 32;
      }
    }else if(pressing[83]){ // Down
      player[6] = 2;
      if(player[1] < H - 160){
        player[1] += player[5] * dt;
      }else{
        player[1] = H - 160;
      }
    }

    if(pressing[65]){ // Left
      if(player[0] > camTarget[0] + 64){
        player[0] -= player[5] * dt;
      }else{
        player[0] =  camTarget[0] + 64;
      }

    }else if(pressing[68]){ // Right
      if(player[0] < camTarget[0] + W - 90){
        player[0] += player[5] * dt;
      }else{
        player[0] = camTarget[0] + W - 90;
      }
    }

    // Get damage by enemy contact
    processGroup(enemies, enemyCollidesWithPlayer);

    // Get damage by enemy projectile
    for(var i = 0; i < enemyProjectiles.length; ++i){
      if(AABBCollides(player, enemyProjectiles[i])){
        // enemyDestroy(i);
        explosions.push([player[0], player[1], stateTimer + player[13], 0]);
        soundPlayer[3].play();
        player[6] = 3;                // Player state to dead
        player[8] -= 1;               // Remove a life
        player[12] = stateTimer + 2;  // Calculate when respawn
      }
    }

    // Get powerup
    for(var i = 0; i < powerups.length; ++i){
      if(AABBCollides(player, powerups[i])){
        soundPlayer[0].play();
        powerupDestroy(i);
        // explosions.push([player[0], player[1], stateTimer + player[13], 0]);

        // player[6] = 3;                // Player state to dead
        // player[8] -= 1;               // Remove a life
        // player[12] = stateTimer + 2;  // Calculate when respawn
      }
    }

    // Attack
    if(pressing[32] && player[9] < stateTimer){
      player[9] = stateTimer + player[10];
      soundPlayer[5].play();

      playerProjectileShot();
    }
  }

  // Manage states
  switch(player[6]){
    case 0:
      playerShipsDrawIndex = 0;
    break;
    case 1:
      playerShipsDrawIndex = 1;
    break;
    case 2:
      playerShipsDrawIndex = 2;
    break;
    case 3:
      // If player is dead, change state to invencible after period of time and place in initial position
      if(player[12] < stateTimer){
        player[6] = 0;
        player[0] = cam[0] + 64;
        player[1] = H / 2;
      }
    break;
    case 4:
      playerShipsDrawIndex = 0;
    break;
    default:
      playerShipsDrawIndex = 0;
    break;
  }
}

function playerDraw(){
  if(gameData[0] == 1) return;

  // If player is not dead
  if(player[6] != 3){
    ctx.save();
    ctx.translate(player[0] - cam[0], player[1]);
    setContextAttribute(17, 0);
    setContextAttribute(26, 1);
    ctx.lineWidth = 2;
    // ctx.strokeStyle = '#f0f';
    path(playerShipDraws[playerShipsDrawIndex]);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }

  // If player2 is not dead
  if(players == 2){
    if(player2[6] != 3){
      ctx.save();
      ctx.translate(player2[0] - cam[0], player[1]);
      setContextAttribute(17, 0);
      setContextAttribute(26, 1);
      ctx.lineWidth = 2;
      // ctx.strokeStyle = '#f0f';
      path(playerShipDraws[playerShipsDrawIndex]);
      ctx.stroke();
      ctx.fill();
      ctx.restore();
    }
  }
}

function playerMenuDraw(x, y){
  ctx.save();
  ctx.translate(x, y);
  setContextAttribute(17, 0);
  setContextAttribute(26, 1);
  ctx.lineWidth = 2;
  path(playerShipDraws[playerShipsDrawIndex]);
  ctx.stroke();
  ctx.fill();
  ctx.restore();
}

function playerHUDDraw(){
  // font ('TIMER ' + (~~stateTimer), W/2, H - 128, 17, 1, 0);
  font ('1P  ' + padLeft(player[11], 7, 0), W/4, H - 128, 17, 1, 0);

  // Draw player 1 lives
  for(var i = 0; i < player[8]; ++i){
    ctx.save();
    ctx.translate(W/4 + (i * 48) - 54, H - 100);
    setContextAttribute(17, 0);
    ctx.lineWidth = 2;
    path(playerShipDraws[0], false, .5);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }

  if(players == 2){
    font ('2P  ' + padLeft(player2[11],7, 0), W/4 * 3, H - 128, 17, 1, 0);

    // Draw player 2 lives
    for(var i = 0; i < player2[8]; ++i){
      ctx.save();
      ctx.translate(W/4 * 3 + (i * 48) - 54, H - 100);
      setContextAttribute(17, 0);
      ctx.lineWidth = 2;
      path(playerShipDraws[0], false, .5);
      ctx.stroke();
      ctx.fill();
      ctx.restore();
    }
  }
}
