function enemyProjectileDestroy(iProjectile, iEnemy){
  enemyProjectiles.splice(iProjectile, 1);
}

function enemyProjectileDraw(projectile){
  fillRectangle([projectile[0], projectile[1], projectile[2], projectile[3]], 17);
}

function enemyProjectileShot(iEnemy){
  enemyProjectiles.push([enemy[iEnemy][0] - 50, enemy[iEnemy][1] - 4, 16, 2, 200]);
}

function enemyProjectileUpdate(projectile, iProjectile, iPlayer){
  projectile[0] += projectile[4] * dt;

  // End of screen view
  if(projectile[0] > camTarget[0] + W){
    enemyProjectileDestroy(iProjectile, iPlayer);
  }
  // Collides with player
  for(var i = 0; i < enemies.length; ++i){
    if(AABBCollides(projectile, enemies[i])){
      enemyDestroy(i, iPlayer);
      enemyProjectileDestroy(iProjectile, iPlayer);
    }
  }
}
