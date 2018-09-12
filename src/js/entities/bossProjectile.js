function bossProjectileDestroy(iProjectile){
  bossProjectiles.splice(iProjectile, 1);
}

function bossProjectileDraw(projectile){
  fillCircle(projectile[0], projectile[1], 3, 17);
}

function bossProjectileShot(boss){
  soundPlayer[8].play();
  var dir = ~~srand(0, 3);
  bossProjectiles.push([boss[0], boss[1] + srand(-64, 64), 3, 3, dir]);
}

function bossProjectileUpdate(projectile, iProjectile){
  switch(projectile[4]){
    case 0:
      projectile[0] -= 128 * dt;
    break;
    case 1:
      projectile[0] += 128 * dt;
    break;
    case 2:
      projectile[1] -= 128 * dt;
    break;
    case 3:
      projectile[1] += 128 * dt;
    break;
  }
  // Move
  //projectile[0] += 32 * Math.cos((projectile[4]).toRad()) * dt;
  //projectile[1] += 32 * Math.sin((projectile[4]).toRad()) * dt;

  // End of screen view
  if(projectile[0] < camTarget[0] || projectiles[0] > camTarget[0] + W || projectile[1] < 0 || projectiles[1] > H){
    bossProjectileDestroy(iProjectile);
  }
}
