function playerProjectileDestroy(iProjectile, iPlayer){
  playerProjectiles[iPlayer].splice(iProjectile, 1);
}

function playerProjectileDraw(projectile){
  fillRectangle([projectile[0], projectile[1], projectile[2], projectile[3]], 17);
}

function playerProjectileShot(iPlayer){
  playerProjectiles[iPlayer].push([player[iPlayer][0] + 50, player[iPlayer][1] + 4, 16, 2, 600]);
}

function playerProjectileUpdate(projectile, iProjectile, iPlayer){
  projectile[0] += projectile[4] * dt;

  // End of screen view
  if(projectile[0] > camTarget[0] + W){
    playerProjectileDestroy(iProjectile, iPlayer);
  }
  // Collides with enemy
  for(var i = 0; i < enemies.length; ++i){
    if(AABBCollides(projectile, enemies[i])){
      enemyDestroy(i, iPlayer);
      playerProjectileDestroy(iProjectile, iPlayer);
    }
  }
}
