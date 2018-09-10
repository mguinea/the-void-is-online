var wavesMoment = [], totalLevelTime = 1, wavesPerLevel = 1, unitsToSpawn = [4, 6];

function wavesManagerInit(){
  var frequency = totalLevelTime / wavesPerLevel; // ex. 90 seconds every level, 10 waves => 90 / 10 => every 9 seconds

  // Depending on pathData[1] (level), we will spawn different type of enemies / asteroids and bosses
  var wavesConfiguration = [];
  switch(pathData[1]){
    case 0:
      wavesPerLevel = 1;
    break;
    case 1:
    break;
    case 2:
    break;
    case 3:
    break;
    case 4:
    break;
    case 5:
    break;
    case 6:
    break;
    case 7:
    break;
    case 8:
    break;
    case 9:
    break;
  }
  /*wavesMoment
  enemyTypes
  totalLevelTime
  wavesPerLevel*/

  for(var i = 0; i < wavesPerLevel; ++i){
    var enemyType = (~~srand(0, 3));
    wavesMoment.push([i * frequency, (~~srand(unitsToSpawn[0], unitsToSpawn[1])), enemyType]); /* 0: Time when spawn, 1: Units to spawn, 2: Units type */
  }
}

function wavesManagerSpawner(){
  // Check if there is any wave available at this moment
  var wave = null;
  for(var i = 0; i < wavesMoment.length; ++i){
    if(wavesMoment[i][0] == (~~stateTimer)){
      wave = wavesMoment.shift();
    }
  }

  // If there is a wave, spawn it
  if(wave !== null){
    for(var i = 0; i < wave[1]; ++i){
      /*
      Enemy
      0: x
      1: y
      2: width
      3: height
      4: type
      5: damage
      6: cadency
      7: init time
      8: end time
      */
      var cadency = srand(1, 3);
      enemies.push([W + camTarget[0] + (i * 48), srand(32, H - 160), 32, 20, wave[2], null, cadency, stateTimer + cadency, null]);
    }
  }

  // Stop level if state timer has arrived to its limit and spawn BOSS
  if(stateTimer > totalLevelTime){
    if(bosses.length <= 0 && gameData[3] == 0){
      gameData[3] = 2;
      bosses.push([W + camTarget[0], H/2, 100, 70, 10, null, null, 0, [], 100]);
      soundPlayer[6].play();
    }
  }
}
