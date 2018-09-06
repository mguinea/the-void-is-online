/* menuData
0: Option selected
1: Options positions
2: Change cadence
3: Change next time
4: Go to next state {0: false, 1: true}
*/

var menuData = [0, null, 0.2, 0, 0];

var menuState = {
  init: function(){
    bgColor = colors[0];

    menuData[1] = [
      [W/2 - 32, 320],
      [W/2 - 32, 352],
      [W/2 - 32, 384]
    ];
  },

  update: function(){
    if(menuData[4] == 0){
      if((pressing[87] || pressing[38]) && menuData[3] < stateTimer){ // Up
        menuData[3] = stateTimer + menuData[2];
        if(menuData[0] > 0){
          menuData[0] -= 1;
          soundPlayer[1].play();
        }
      }else if((pressing[83] || pressing[40]) && menuData[3] < stateTimer){ // Down
        menuData[3] = stateTimer + menuData[2];
        if(menuData[0] < 2){
          menuData[0] += 1;
          soundPlayer[1].play();
        }
      }

      if(pressing[13]){
        menuData[4] = 1;
        menuData[3] = stateTimer + 1;
        soundPlayer[2].play();
      }
    }

    if(menuData[4] == 1 && menuData[3] < stateTimer){
      players = menuData[0] + 1;
      setState(gameState);
    }
  },

  draw: function(){
    font ('JS13K 2018', W/2, 64, 17, 1, 0);
    font ('THE VOID IS ONLINE', W/2, 128, 17, 2, 0, 'round', 7);

    font ('HI ' + '000000', W/2, 256, 17, 1, 0);

    font ('1 PLAYER', menuData[1][0][0], menuData[1][0][1], 17, 1, 1);
    font ('2 PLAYERS', menuData[1][1][0], menuData[1][1][1], 17, 1, 1);
    font ('OPTIONS', menuData[1][2][0], menuData[1][2][1], 17, 1, 1);
    if(menuData[4] == 0){
      playerMenuDraw(menuData[1][menuData[0]][0] - 80, menuData[1][menuData[0]][1]);
    }else{
      if( (~~(stateTimer * 10) % 2) == 1){
        playerMenuDraw(menuData[1][menuData[0]][0] - 80, menuData[1][menuData[0]][1]);
      }
    }
  }
}
