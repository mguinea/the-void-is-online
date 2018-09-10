function keyPressedOnce(keyCode){
  if(keyPressed[keyCode] == true && keyPressedAvailable[keyCode] == true){
    keyPressed[keyCode] = false;
    keyPressedAvailable[keyCode] = false;
    return true;
  }
}

document.addEventListener('keydown',function(e){
  lastPress = e.keyCode;
  pressing[e.keyCode] = true;

  if(keyPressedAvailable[e.keyCode] == true || keyPressedAvailable[e.keyCode] == null){
    keyPressed[e.keyCode] = true;
    keyPressedAvailable[e.keyCode] = true;
  }

}, false);

document.addEventListener('keyup',function(e){
  pressing[e.keyCode] = false;

  keyPressed[e.keyCode] = false;
  keyPressedAvailable[e.keyCode] = true;

}, false);

window.onfocus = function() {
  pause = false;
  reqId = window.requestAnimationFrame(gameLoop);
}

window.onblur = function() {
  pause = true;
  cancelAnimationFrame(reqId);
}

window.addEventListener("load", init, false);
