var asteroid = [256, 256, 128, 128];

function asteroidUpdate(){
}

function asteroidDraw(){
  fillRectangle([asteroid[0], asteroid[1], asteroid[2], asteroid[3]], 19);
}

function asteroidDestroy(){
  asteroid[0]=-5000;
}
