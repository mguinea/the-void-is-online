/*document.addEventListener('keypress', function(e){
  if(!(e.key in keysdown)) {
    keysdown[e.key] = true;
    // key first pressed
  }
}, false);*/

document.addEventListener('keydown',function(e){
  lastPress = e.keyCode;
  pressing[e.keyCode] = true;
  // console.log(lastPress);
  // e.preventDefault();
}, false);

document.addEventListener('keyup',function(e){
  pressing[e.keyCode] = false;

//  delete keysdown[e.key];
  // e.preventDefault();
}, false);

window.addEventListener("load", init, false);
