function playerProjectileDestroy(index){
  playerProjectiles.splice(index, 1);
}

function playerProjectileDraw(e){
  fillRectangle([e[0], e[1], e[2], e[3]], 17);
}

function playerProjectileShot(){
  playerProjectiles.push([player[0][0] + 50, player[0][1] + 4, 16, 2, 600]);
}

function playerProjectileUpdate(e, params, i){
  e[0] += e[4] * dt;

  // End of screen view
  if(e[0] > camTarget[0] + W){
    playerProjectileDestroy(i);
  }
  // Collides with enemy
  for(var i = 0; i < enemies.length; ++i){
    if(AABBCollides(e, enemies[i])){
      enemyDestroy(i);
      playerProjectileDestroy(i);
    }
  }
}
