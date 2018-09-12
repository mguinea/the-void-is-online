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
12: player[0] respawn (stateTimer + cadence)
13: player[0] repawn cadence
14: standard = 0, double shot = 1,
15: friend shot
*/

/*
playerControls

Player 1
0: Up
1: Down
2: Left
3: Right
4: Fire / Action

Player 2
5: Up
6: Down
7: Left
8: Right
9: Fire / Action
*/

var player = [[], []],
    playerControls = []
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
    playerShipsDrawIndex = [];

function playerInit(){
  player[0] = [64, H/6 * 2, 48, 12, 0, 128, 0, 0, 3, 0, 0.3, 0, 0, 2, 0, 0];
  player[1]= [64, H/6 * 4, 48, 12, 0, 128, 0, 0, 3, 0, 0.3, 0, 0, 2, 0, 0];

  playerControls = [87];
}

function playerUpdate(){
  if(gameData[0] == 1) return;

  // If player[0] is not dead
  if(player[0][6] != 3){
    player[0][6] = 0;

    // Movement
    if(pressing[playerControls[0]]){ // Up
      player[0][6] = 1;
      if(player[0][1] > 48){
        player[0][1] -= player[0][5] * dt;
      }else{
        player[0][1] = 48;
      }
    }else if(pressing[83]){ // Down
      player[0][6] = 2;
      if(player[0][1] < H - 160){
        player[0][1] += player[0][5] * dt;
      }else{
        player[0][1] = H - 160;
      }
    }

    if(pressing[65]){ // Left
      if(player[0][0] > camTarget[0] + 64){
        player[0][0] -= player[0][5] * dt;
      }else{
        player[0][0] =  camTarget[0] + 64;
      }

    }else if(pressing[68]){ // Right
      if(player[0][0] < camTarget[0] + W - 90){
        player[0][0] += player[0][5] * dt;
      }else{
        player[0][0] = camTarget[0] + W - 90;
      }
    }

    if(god == false){
			// Get damage by asteroid contact
			processGroup(asteroids, asteroidCollidesWithPlayer, 0);

      // Get damage by enemy contact
      processGroup(enemies, enemyCollidesWithPlayer, 0);

      // Get damage by boss contact
      processGroup(bosses, bossCollidesWithPlayer, 0);

			// Get damage by floor contact
			if(pathData[1] == 2 || pathData[1] == 5 || pathData[1] == 8 ){
        if(player[0][1] > H - 190){
          explosions.push([player[0][0], player[0][1], stateTimer + player[0][13], 0]);
          soundPlayer[3].play();
          player[0][6] = 3;                // Player state to dead
          player[0][8] -= 1;               // Remove a life
          player[0][12] = stateTimer + 2;  // Calculate when respawn
        }
			}

      // Get damage by enemy projectile
      for(var i = 0; i < enemyProjectiles.length; ++i){
        if(AABBCollides(player[0], enemyProjectiles[i])){
          explosions.push([player[0][0], player[0][1], stateTimer + player[0][13], 0]);
          soundPlayer[3].play();
          player[0][6] = 3;                // Player state to dead
          player[0][8] -= 1;               // Remove a life
          player[0][12] = stateTimer + 2;  // Calculate when respawn
        }
      }

			// Get damage by boss projectile
      for(var i = 0; i < bossProjectiles.length; ++i){
        if(AABBCollides(player[0], bossProjectiles[i])){console.log('collides');
          explosions.push([player[0][0], player[0][1], stateTimer + player[0][13], 0]);
          soundPlayer[3].play();
          player[0][6] = 3;                // Player state to dead
          player[0][8] -= 1;               // Remove a life
          player[0][12] = stateTimer + 2;  // Calculate when respawn
        }
      }
    }

    // Get powerup
    for(var i = 0; i < powerups.length; ++i){
      if(AABBCollides(player[0], powerups[i])){
        switch(powerups[i][4]){
          case 0:
            // Increase speed
            if(player[0][5] < 300){
              player[0][5] += 32;
            }
          break;
          case 1:
            // Increase life
            if(player[0][8] < 3){
              player[0][8]++;
            }else{
              player[0][11] += 100;
            }
          break;
          case 2:
            // Double shot
            player[0][14] = 1;
          break;
          case 3:
            // friend shot
            player[0][15] = 1;
          break;
        }
        soundPlayer[0].play();
        powerupDestroy(i);
      }
    }

    // Attack
    if(pressing[32] && player[0][9] < stateTimer){
      player[0][9] = stateTimer + player[0][10];
      soundPlayer[5].play();

      playerProjectileShot(0);
    }
  }

  // If player[1] is not dead
  if(player[1][6] != 3 && players == 2){
    player[1][6] = 0;

    // Movement
    if(pressing[38]){ // Up
      player[1][6] = 1;
      if(player[1][1] > 48){
        player[1][1] -= player[1][5] * dt;
      }else{
        player[1][1] = 48;
      }
    }else if(pressing[40]){ // Down
      player[1][6] = 2;
      if(player[1][1] < H - 160){
        player[1][1] += player[1][5] * dt;
      }else{
        player[1][1] = H - 160;
      }
    }

    if(pressing[37]){ // Left
      if(player[1][0] > camTarget[0] + 64){
        player[1][0] -= player[1][5] * dt;
      }else{
        player[1][0] =  camTarget[0] + 64;
      }

    }else if(pressing[39]){ // Right
      if(player[1][0] < camTarget[0] + W - 90){
        player[1][0] += player[1][5] * dt;
      }else{
        player[1][0] = camTarget[1] + W - 90;
      }
    }

    if(god == false){
			// Get damage by asteroid contact
      processGroup(asteroids, asteroidCollidesWithPlayer, 1);

      // Get damage by enemy contact
      processGroup(enemies, enemyCollidesWithPlayer, 1);

      // Get damage by boss contact
      processGroup(bosses, bossCollidesWithPlayer, 0);

			// Get damage by floor contact
			if(pathData[1] == 2 || pathData[1] == 5 || pathData[1] == 8 ){
        if(player[1][1] > H - 190){
          explosions.push([player[1][0], player[1][1], stateTimer + player[1][13], 0]);
          soundPlayer[3].play();
          player[1][6] = 3;                // Player state to dead
          player[1][8] -= 1;               // Remove a life
          player[1][12] = stateTimer + 2;  // Calculate when respawn
        }
			}

      // Get damage by enemy projectile
      for(var i = 0; i < enemyProjectiles.length; ++i){
        if(AABBCollides(player[1], enemyProjectiles[i])){
          explosions.push([player[1][0], player[1][1], stateTimer + player[1][13], 0]);
          soundPlayer[3].play();
          player[1][6] = 3;                // Player state to dead
          player[1][8] -= 1;               // Remove a life
          player[1][12] = stateTimer + 2;  // Calculate when respawn
        }
      }

			// Get damage by boss projectile
      for(var i = 0; i < bossProjectiles.length; ++i){
        if(AABBCollides(player[1], bossProjectiles[i])){
          explosions.push([player[1][0], player[1][1], stateTimer + player[1][13], 0]);
          soundPlayer[3].play();
          player[1][6] = 3;                // Player state to dead
          player[1][8] -= 1;               // Remove a life
          player[1][12] = stateTimer + 2;  // Calculate when respawn
        }
      }
    }

    // Get powerup
    for(var i = 0; i < powerups.length; ++i){
      if(AABBCollides(player[1], powerups[i])){
        switch(powerups[i][4]){
          case 0:
            // Increase speed
            if(player[1][5] < 300){
              player[1][5] += 32;
            }
          break;
          case 1:
            // Increase life
            if(player[1][8] < 3){
              player[1][8]++;
            }else{
              player[1][11] += 100;
            }
          break;
          case 2:
            // Double shot
            player[1][14] = 1;
          break;
          case 3:
            // friend shot
            player[1][15] = 1;
          break;
        }
        soundPlayer[0].play();
        powerupDestroy(i);
      }
    }

    // Attack
    if(pressing[17] && player[1][9] < stateTimer){
      player[1][9] = stateTimer + player[1][10];
      soundPlayer[5].play();

      playerProjectileShot(1);
    }
  }

  // Manage states
  switch(player[0][6]){
    case 0:
      playerShipsDrawIndex[0] = 0;
    break;
    case 1:
      playerShipsDrawIndex[0] = 1;
    break;
    case 2:
      playerShipsDrawIndex[0] = 2;
    break;
    case 3:
      // Reset defaults, revert all powerups
      player[0][5] = 128; // velocity
      player[0][14] = 0; // standard shot
      player[0][15] = 0;// friend shot
      // If player[0] is dead, place in initial position
      if(player[0][12] < stateTimer && player[0][8] > 0){
        player[0][6] = 0;
        player[0][0] = cam[0] + 64;
        player[0][1] = H/6 * 2;
      }
    break;
    case 4:
      playerShipsDrawIndex[0] = 0;
    break;
    default:
      playerShipsDrawIndex[0] = 0;
    break;
  }

	if(players == 2){
		switch(player[1][6]){
	    case 0:
	      playerShipsDrawIndex[1] = 0;
	    break;
	    case 1:
	      playerShipsDrawIndex[1] = 1;
	    break;
	    case 2:
	      playerShipsDrawIndex[1] = 2;
	    break;
	    case 3:
        // Reset defaults, revert all powerups
        player[1][5] = 128; // velocity
        player[1][14] = false; // double shot
        player[1][15] = 0;// friend shot
	      // If player[1] is dead, place in initial position
	      if(player[1][12] < stateTimer && player[1][8] > 0){
	        player[1][6] = 0;
	        player[1][0] = cam[0] + 64;
	        player[1][1] = H/6 * 4;
	      }
	    break;
	    case 4:
	      playerShipsDrawIndex[1] = 0;
	    break;
	    default:
	      playerShipsDrawIndex[1] = 0;
	    break;
	  }
	}
}

function playerDraw(){
  if(gameData[0] == 1) return;

  // If player[0] is not dead
  if(player[0][6] != 3){
    if(player[0][15] == 1){
      strokePath (player[0][0] - cam[0] - 16, player[0][1] - 32, playerShipDraws[playerShipsDrawIndex[0]], false, 0.5, 16);
    }
    strokePath (player[0][0] - cam[0], player[0][1], playerShipDraws[playerShipsDrawIndex[0]], false, 1, 16);
  }

  // If player[1] is not dead
  if(players == 2){
    if(player[1][6] != 3){
      if(player[1][15] == 1){
        strokePath (player[1][0] - cam[0] - 16, player[1][1] - 32, playerShipDraws[playerShipsDrawIndex[1]], false, 0.5, 6);
      }
      strokePath (player[1][0] - cam[0], player[1][1], playerShipDraws[playerShipsDrawIndex[1]], false, 1, 6);
    }
  }
}

function playerMenuDraw(x, y){
  ctx.save();
  ctx.translate(x, y);
  setContextAttribute(17, 0);
  setContextAttribute(26, 1);
  ctx.lineWidth = 2;
  path(playerShipDraws[0]);
  ctx.stroke();
  ctx.fill();
  ctx.restore();
}

function playerHUDDraw(){
  // font ('TIMER ' + (~~stateTimer), W/2, H - 128, 17, 1, 0);
  font ('1P  ' + padLeft(player[0][11], 7, 0), W/4, H - 128, 17, 1, 0);

  // Draw player[0] 1 lives
  for(var i = 0; i < player[0][8]; ++i){
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
    font ('2P  ' + padLeft(player[1][11],7, 0), W/4 * 3, H - 128, 17, 1, 0);

    // Draw player[0] 2 lives
    for(var i = 0; i < player[1][8]; ++i){
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
