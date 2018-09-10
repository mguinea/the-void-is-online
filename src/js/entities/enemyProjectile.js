function enemyProjectileDestroy(iProjectile){
  enemyProjectiles.splice(iProjectile, 1);
}

function enemyProjectileDraw(projectile){
  fillCircle(projectile[0], projectile[1], 3, 17);
}

function enemyProjectileShot(enemy, iEnemy){
  soundPlayer[8].play();
  enemyProjectiles.push([enemy[0] + 8, enemy[1] + 8, 16, 2, 300]);
}

function enemyProjectileUpdate(projectile, iProjectile, iPlayer){
  projectile[0] -= projectile[4] * dt;

  // End of screen view
  if(projectile[0] < camTarget[0]){
    enemyProjectileDestroy(iProjectile);
  }
}
