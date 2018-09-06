function gameLoop(){
  currentTime = (new Date()).getTime();
  dt = (currentTime - lastTime) / 1000;
  globalTimer += dt;
  stateTimer += dt;

  if(delegate !== null){
    delegate.update();
    // ctx.setTransform(1,0,0,1,0,0);
    ctx.save();
    ctx.fillStyle = bgColor;//"#001900"; //colors[0]//bgColor;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();

    delegate.draw();
    drawPostProcessing();
  }

  lastTime = currentTime;
  requestAnimationFrame(gameLoop);
}
