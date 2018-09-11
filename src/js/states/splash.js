var splashState = {
  init: function(){
    bgColor = colors[0];
  },

  update: function(){
    if(stateTimer > 3){
      setState(menuState);
    }
  },

  draw: function(){
    font ('A MARC GUINEA GAME', W/2, H/2-32, 17, 3, 0, 'miter', 3);
  }
}
