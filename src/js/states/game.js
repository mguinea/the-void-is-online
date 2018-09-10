var camTarget = [0],
  currentLevel = 0,
	gameOver = 0,
  gameOverTimer = 0,
  camVelocity = 65; // 65;
/*
GameData
0: state = {0: playing, 1: gameover}
1: Options (style) = {0: simple, 1: Vectrex Scramble, 2: Colorful}
2: Options (volume) = {0-100}
3: state level : {0: playing, 1: finished, 2: boss}
4: timer when go to path state
*/

var gameData = [];

var gameState = {
  init: function(){
    bgColor = colors[0];
    stateTimer = 0;

    gameData = [0, 2, 100, 0, null];

    camTarget = [0],
    currentLevel = 0,
  	gameOver = 0,
    gameOverTimer = 0,
    camVelocity = 65;

    playerInit();

    wavesManagerInit();

    starsInit(64);

    camSet([camTarget[0], camTarget[1]]);
  },

  update: function(){
    playerUpdate();

    camTarget[0] += camVelocity * dt;
    player[0][0] += camVelocity * dt;
    player[1][0] += camVelocity * dt;

    wavesManagerSpawner();

    processGroup(bosses, bossUpdate);
    processGroup(enemies, enemyUpdate);
    processGroup(enemyProjectiles, enemyProjectileUpdate);
    processGroup(explosions, explosionUpdate);
    processGroup(playerProjectiles[0], playerProjectileUpdate, 0);
    processGroup(playerProjectiles[1], playerProjectileUpdate, 1);
    processGroup(powerups, powerupUpdate);
    processGroup(stars, starUpdate);

    switch(gameData[3]){
      case 0:
        camVelocity = 65;
      break;
      case 1:
        camVelocity = 65;
      break;
      case 2:
        camVelocity = 0;
      break;
    }

		// Check if game over
		if(players == 1){
			if(player[0][8] <= 0 && gameOverTimer == 0){
				camVelocity = 0;
				gameData[0] = 1;
        gameOverTimer = stateTimer + 3;

        var hi = storageGet('hi', 0);
        if(player[0][11] > hi){
          storageSet('hi', player[0][11]);
          storageSet('hip', 'PLAYER 1');
        }
        // Reset path state
        pathData = [0, 0, [0, 0, 1, 0, 0, 1, 0], null, null];
        // Reset seed
        seed = 1;
			}
		}else if(players == 2){
			if(player[0][8] <= 0 && player[1][8] <= 0 && gameOverTimer == 0){
				camVelocity = 0;
				gameData[0] = 1;
        gameOverTimer = stateTimer + 3;

        var hi = storageGet('hi', 0);
        if(player[0][11] > hi){
          storageSet('hi', player[0][11]);
          storageSet('hip', 'PLAYER 1');
        }

        var hi = storageGet('hi', 0);
        if(player[1][11] > hi){
          storageSet('hi', player[1][11]);
          storageSet('hip', 'PLAYER 2');
        }
        // Reset path state
        pathData = [0, 0, [0, 0, 1, 0, 0, 1, 0], null, null];
        // Reset seed
        seed = 1;
			}
		}

    if(gameData[4] !== null && gameData[4] < stateTimer){
      // set next level for path selection
      setState(pathState);
    }

    if(gameOverTimer != 0 && gameOverTimer < stateTimer){
      setState(menuState);
    }
    // Cam update
    camFocus(camTarget);
  },

  draw: function(){
    processGroup(bosses, bossDraw);
    processGroup(enemies, enemyDraw);
    processGroup(enemyProjectiles, enemyProjectileDraw);
    processGroup(explosions, explosionDraw);
    processGroup(playerProjectiles[0], playerProjectileDraw);
    processGroup(playerProjectiles[1], playerProjectileDraw);
    processGroup(powerups, powerupDraw);
    processGroup(stars, starDraw);

    playerHUDDraw();
    playerDraw();

    if(gameData[1] == 1){
      ctx.save();
      ctx.globalAlpha = 0.2;
      fillStaticRectangle([0, 0, W, H/4], 21);
      fillStaticRectangle([0, H/4, W, 3], 12);

      fillStaticRectangle([0, H - H/4 - 3, W, 3], 12);
      fillStaticRectangle([0, H - H/4, W, H/4], 22);
      ctx.restore();
    }

    switch(gameData[3]){
      case 0:
      break;
      case 1:
          font ('LEVEL COMPLETED!', W/2, H/2-32, 17, 3, 0, 'round', 3);
      break;
      case 2:
      break;
    }

		// Draw game over
    if(gameData[0] == 1){
      font ('GAME OVER', W / 2, 256, 17, 1, 1);
    }
  }
};
