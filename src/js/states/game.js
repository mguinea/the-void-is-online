var camTarget = [0],
  currentLevel = 0,
	gameOver = 0,
  gameOverTimer = 0,
  camVelocity = 65; // 65;

var gameState = {
  init: function(){
    bgColor = colors[0];
    gameOver = 0;
    gameOverTimer = 0;

    wavesManagerInit();

    starsInit(64);

    camSet([camTarget[0], camTarget[1]]);
  },

  update: function(){
    playerUpdate();

    camTarget[0] += camVelocity * dt;
    player[0] += camVelocity * dt;
    player2[0] += camVelocity * dt;

    wavesManagerSpawner();

    processGroup(bosses, bossUpdate);
    processGroup(enemies, enemyUpdate);
    processGroup(explosions, explosionUpdate);
    processGroup(playerProjectiles, playerProjectileUpdate);
    processGroup(powerups, powerupUpdate);
    processGroup(stars, starUpdate);

		// Check if game over
		if(players == 1){
			if(player[8] <= 0 && gameOverTimer == 0){
				camVelocity = 0;
				gameOver = 1;
        gameOverTimer = stateTimer + 3;
			}
		}/*else{
			if(player[8] <= 0 && player2[8] <= 0 && gameOverTimer == 0){
				camVelocity = 0;
				gameOver = 1;
        gameOverTimer = stateTimer + 3;
			}
		}*/

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
    if(gameOver == 1){
      font ('GAME OVER', W / 2, H / 2, 17, 1, 1);
    }
  }
};
