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
*/


var gameData = [];

var gameState = {
  init: function(){
    bgColor = colors[0];
    stateTimer = 0;

    gameData = [0, 2];

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
    // Change style
    if(keypressed === 114){
      gameData[1] == 1;
    }

    playerUpdate();

    camTarget[0] += camVelocity * dt;
    player[0][0] += camVelocity * dt;
    player[1][0] += camVelocity * dt;

    wavesManagerSpawner();

    processGroup(bosses, bossUpdate);
    processGroup(enemies, enemyUpdate);
    processGroup(explosions, explosionUpdate);
    processGroup(playerProjectiles[0], playerProjectileUpdate, 0);
    processGroup(playerProjectiles[1], playerProjectileUpdate, 1);
    processGroup(powerups, powerupUpdate);
    processGroup(stars, starUpdate);

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
			}
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

		// Draw game over
    if(gameData[0] == 1){
      font ('GAME OVER', W / 2, H / 2, 17, 1, 1);
    }
  }
};
