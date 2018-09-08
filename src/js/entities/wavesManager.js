var wavesMoment = [], totalLevelTime = 90, wavesPerLevel = 10;

function wavesManagerInit(){
  enemies = []; wavesMoment = []; totalLevelTime = 90; wavesPerLevel = 10;

  // 90 seconds every level, 10 waves => 90 / 10 => every 9 seconds

  var frequency = totalLevelTime / wavesPerLevel;
  for(var i = 0; i < wavesPerLevel; ++i){
    /* 0: Time when spawn, 1: Units to spawn, 2: Units type */
    var type = 2; // (~~srand(0, 3));
    wavesMoment.push([i * frequency, (~~srand(4, 8)), type]);
  }

  // bosses.push([W-64, H/2, 100, 100, 10]);
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
      enemies.push([W + camTarget[0] + (i * 48), /*srand(16, H - 160)*/ H / 2, 32, 20, wave[2]]);
    }
  }

  // Stop level if state timer has arrived to its limit and spawn BOSS
  if(stateTimer > totalLevelTime){
    camVelocity = 0;
    /*
    if(bosses.length > 0){
      var boss = bosses.shift();
      bosses.push(boss);
    }
    //*/
  }
}
