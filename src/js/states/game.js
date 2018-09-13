var camTarget = [0],
	gameOver = 0,
  gameOverTimer = 0,
	floor = [],
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
		//powerups.push([256, 256, 52, 32, 3]);
		enemies = [];
		bossProjectiles = [];
		floor = [];
		// init floor
		for(var i = 0; i < 10; ++i){
			var prev = (floor[i-1] != null ? floor[i-1][0] : 0);
			floor.push([prev + srand(64, 128), 32 - srand(0, 32)]);
		}

		asteroids = [];
		if(pathData[1] == 1 || pathData[1] == 3 || pathData[1] == 7 ){
			for(var i = 0; i < 16; ++i){
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
		}

		wavesMoment = [];
		bosses = [];
		gameData = [0, 2, 100, 0, null];

    camTarget = [0],
  	gameOver = 0,
    gameOverTimer = 0,
    camVelocity = 65;

    playerInit();

    wavesManagerInit();

    starsInit(64);

    camSet([camTarget[0], camTarget[1]]);
  },

  update: function(){
		// Change render mode
		if(keyPressedOnce(113)){
			gameData[1]++;
			if(gameData[1] > 2){
				gameData[1] = 0;
			}
		}

		if(keyPressedOnce(71)){ god = !god; console.log('GOD MODE: ' + god);}
    playerUpdate();

    camTarget[0] += camVelocity * dt;
    player[0][0] += camVelocity * dt;
    player[1][0] += camVelocity * dt;

    wavesManagerSpawner();

    processGroup(bosses, bossUpdate);
    processGroup(enemies, enemyUpdate);
		processGroup(bossProjectiles, bossProjectileUpdate);
    processGroup(enemyProjectiles, enemyProjectileUpdate);
    processGroup(explosions, explosionUpdate);
    processGroup(playerProjectiles[0], playerProjectileUpdate, 0);
    processGroup(playerProjectiles[1], playerProjectileUpdate, 1);
    processGroup(powerups, powerupUpdate);
		if(pathData[1] != 2 && pathData[1] != 5 && pathData[1] != 8 ){
	    processGroup(stars, starUpdate);
		}

		if(pathData[1] == 1 || pathData[1] == 3 || pathData[1] == 7 ){
	    processGroup(asteroids, asteroidUpdate);
		}

		// update floor
		if(pathData[1] == 2 || pathData[1] == 5 || pathData[1] == 8){
			if(floor[0][0] - cam[0] < camTarget[0]){
				var prev = floor[floor.length - 1][0];
				floor.push([prev + srand(64, 128), srand(0, 32)]);
			}
		}

    switch(gameData[3]){
      case 0:
        camVelocity = 65;
      break;
      case 1:
        camVelocity = 65;

        if(gameData[4] !== null && gameData[4] < stateTimer && pathData[0] < 9){
          // set next level for path selection
					pathData[0]++; // current level in path state
          setState(pathState);
        }
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

    if(gameOverTimer != 0 && gameOverTimer < stateTimer){
      setState(menuState);
    }
    // Cam update
    camFocus(camTarget);
  },

  draw: function(){
		// Draw planet floor and atmosphere
		if((pathData[1] == 2 || pathData[1] == 5 || pathData[1] == 8) && gameData[1] == 2){
			ctx.save();
			ctx.globalAlpha = 0.2;
			switch(pathData[1]){
				case 2:
	      	fillStaticRectangle([0, 0, W, H], 14);
				break;
				case 5:
					fillStaticRectangle([0, 0, W, H], 5);
				break;
				case 8:
					fillStaticRectangle([0, 0, W, H], 7);
				break;
			}
			ctx.restore();

		}

		if(pathData[1] == 2 || pathData[1] == 5 || pathData[1] == 8){
			// Draw floor
			strokePath (floor[0][0] - cam[0], H - 190, floor, true, 1, 17, 1);
		}

		if(pathData[1] == 1 || pathData[1] == 3 || pathData[1] == 7 ){
	    processGroup(asteroids, asteroidDraw);
		}

    processGroup(bosses, bossDraw);
    processGroup(enemies, enemyDraw);
		processGroup(bossProjectiles, bossProjectileDraw);
    processGroup(enemyProjectiles, enemyProjectileDraw);
    processGroup(explosions, explosionDraw);
    processGroup(playerProjectiles[0], playerProjectileDraw);
    processGroup(playerProjectiles[1], playerProjectileDraw);
    processGroup(powerups, powerupDraw);
		if(pathData[1] != 2 && pathData[1] != 5 && pathData[1] != 8 ){
	    processGroup(stars, starDraw);
		}

    playerHUDDraw();
    playerDraw();

    if(gameData[1] == 1){
      ctx.save();
      ctx.globalAlpha = 0.2;
      fillStaticRectangle([0, 0, 				W, H/4], 21);
      fillStaticRectangle([0, H/4, 			W, 3], 12);
			fillStaticRectangle([0, H/4 + 3, 	W, 18], 21);
			fillStaticRectangle([0, H/4 + 21, 			W, 5], 12);
			fillStaticRectangle([0, H/4 + 26, 	W, 18], 21);
			fillStaticRectangle([0, H/4 + 44, 			W, 9], 12);
			fillStaticRectangle([0, H/4 + 53, 	W, 4], 21);
			fillStaticRectangle([0, H/4 + 57, W, 12], 12);
			fillStaticRectangle([0, H/4 + 69, 	W, 2], 21);

			fillStaticRectangle([0, H/4 + 71, W, 180], 12);

			fillStaticRectangle([0, H/4 + 251, 	W, 2], 22);
			fillStaticRectangle([0, H/4 + 253, W, 12], 12);
			fillStaticRectangle([0, H/4 + 265, 	W, 4], 22);
			fillStaticRectangle([0, H/4 + 269, 			W, 9], 12);
			fillStaticRectangle([0, H/4 + 278, 	W, 18], 22);
			fillStaticRectangle([0, H/4 + 296, 			W, 5], 12);
			fillStaticRectangle([0, H/4 + 301, 	W, 18], 22);
			fillStaticRectangle([0, H/4 + 319, 			W, 3], 12);
			fillStaticRectangle([0, H/4 + 322, 				W, H/4], 22);

      //fillStaticRectangle([0, H - H/4 - 3, W, 3], 12);
      //fillStaticRectangle([0, H - H/4, W, H/4], 22);
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
      font ('GAME OVER', W / 2, 256, 17, 1, 0);
    }
  }
};
