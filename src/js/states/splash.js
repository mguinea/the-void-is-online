var splashState = {
  init: function(){
    bgColor = '#000';
  },

  update: function(){
    if(stateTimer > 0.3){
      setState(gameState);
    }
  },

  draw: function(){
    font ('A MARC GUINEA GAME', W/2, H/2-32, 17, 3, 0, 'miter', 3);
  }
}
