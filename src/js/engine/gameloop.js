function gameLoop(){
  currentTime = (new Date()).getTime();
  dt = (currentTime - lastTime) / 1000;
  
  if(delegate !== null && pause == false){
    globalTimer += dt;
    stateTimer += dt;
    delegate.update();
    ctx.save();
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();

    delegate.draw();
    drawPostProcessing();
  }

  lastTime = currentTime;
  reqId = window.requestAnimationFrame(gameLoop);
}
