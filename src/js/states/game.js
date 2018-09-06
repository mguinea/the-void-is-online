var camTarget = [0],
  currentLevel = 0,
	gameOver = 0,
  gameOverTimer = 0,
  camVelocity = 65; // 65;
/*
GameData
0: state = {0: playing, 1: gameover}
*/
var gameData = [];

var gameState = {
  init: function(){
    bgColor = colors[0];
    stateTimer = 0;

    gameData = [0];

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
    processGroup(explosions, explosionUpdate);
    processGroup(playerProjectiles, playerProjectileUpdate);
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
    processGroup(playerProjectiles, playerProjectileDraw);
    processGroup(powerups, powerupDraw);
    processGroup(stars, starDraw);

    playerHUDDraw();
    playerDraw();

		// Draw game over
    if(gameData[0] == 1){
      font ('GAME OVER', W / 2, H / 2, 17, 1, 1);
    }
  }
};
