function playerProjectileDestroy(iProjectile, iPlayer){
  playerProjectiles[iPlayer].splice(iProjectile, 1);
}

function playerProjectileDraw(projectile){
  fillRectangle([projectile[0], projectile[1], projectile[2], projectile[3]], 17);
}

function playerProjectileShot(iPlayer){
  if(player[iPlayer][14] == 0){
    playerProjectiles[iPlayer].push([player[iPlayer][0] + 50, player[iPlayer][1] + 4, 16, 2, 600]);
  }else if(player[iPlayer][14] == 1){
    playerProjectiles[iPlayer].push([player[iPlayer][0] + 50, player[iPlayer][1] + 4 - 4, 16, 2, 600]);
    playerProjectiles[iPlayer].push([player[iPlayer][0] + 50, player[iPlayer][1] + 4 + 4, 16, 2, 600]);
  }

  if(player[iPlayer][15] == 1){
    playerProjectiles[iPlayer].push([player[iPlayer][0] + 50 - 45, player[iPlayer][1] + 4 - 32, 16, 2, 600]);
  }
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

  // Collides with boss
  for(var i = 0; i < bosses.length; ++i){
    if(AABBCollides(projectile, bosses[i])){
      bossDamage(i, iPlayer);
      playerProjectileDestroy(iProjectile, iPlayer);
    }
  }
}
