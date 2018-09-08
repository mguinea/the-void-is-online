/*
document.addEventListener('keypress', function(e){
  if(e.keyCode == 114){
    e.preventDefault();
  }
  keypressed = e.keyCode;
}, false);
//*/

document.addEventListener('keydown',function(e){
  lastPress = e.keyCode;
  pressing[e.keyCode] = true;
  // console.log(lastPress);
  // e.preventDefault();
}, false);

document.addEventListener('keyup',function(e){
  pressing[e.keyCode] = false;
  keypressed = null;
//  delete keysdown[e.key];
  // e.preventDefault();
}, false);

window.addEventListener("load", init, false);
