/* pathData
0: current position (column)
1: selected point (index)
2: path is auto = 0 or selectable = 1
3: -
4: when to change state
*/
var pathData = [0, 0, [0, 0, 1, 0, 0, 1, 0], null, null];
var r = 0, up = pathData[1], down = pathData[1] + 1;

var pathState = {
  init: function(){
    bgColor = colors[0];
    stateTimer = 0;

    pathData[2] = [0, 0, 1, 0, 0, 1, 0];
    pathData[4] = null;

    switch(pathData[0]){
      case 0:
        pathData[1] = 0;
      break;
      case 1:
        pathData[1] = 1;
      break;
      case 2:
        pathData[1] = 2;
      break;
      case 3:
        if(pathData[1] == 2){
          pathData[1] = 3;
        }else if(pathData[1] == 3){
          pathData[1] = 5;
        }
      break;
      case 4:
        pathData[1] = 6;
      break;
      case 5:
        pathData[1] = 7;
      break;
      case 6:
        pathData[1] = 9;
      break;
    }
    up = pathData[1];
    down = pathData[1] + 1;
    limitDown = pathData[1] - 1;
    limitUp = pathData[1] + 1;
  },

  update: function(){
    r = (~~(stateTimer * 30) % 12);
    if(pathData[4] == null){
      if(pathData[2][pathData[0]] == 1){
        if(pressing[87] || pressing[38]){ // Up
          if(pathData[1] > up){

            pathData[1] = up;

            if(pathData[0] == 2){
              pathData[1] = 2;
            }

            soundPlayer[1].play();
          }
        }else if(pressing[83] || pressing[40]){ // Down
          if(pathData[1] < down){

            pathData[1] = down;

            if(pathData[0] == 2){
              pathData[1] = 3;
            }

            soundPlayer[1].play();
          }
        }
      }
    }

    if(keyPressedOnce(13)){
      // pathData[1] = 3; // DEBUG
      pathData[4] = stateTimer + 1;
      soundPlayer[2].play();
    }

    if(pathData[4] != null && pathData[4] < stateTimer){
      setState(gameState);
    }
  },

  draw: function(){
    font ('JS13K 2018', W/2, 64, 17, 1, 0);
    font ('THE PATH', W/2, 128, 17, 2, 0, 'round', 7);

    font (selectPointTitle(pathData[1]), W/2, 190, 17, 2, 0, 'round', 1);

    if(pathData[4] == null){
      font ('PRESS ENTER', W/2, H - 200, 17, 1, 0, 'round', 1);
    }else if( (~~(stateTimer * 10) % 2) == 1 ){
      font ('PRESS ENTER', W/2, H - 200, 17, 1, 0, 'round', 1);
    }

    fillStaticCircle(128, H/2, selectPointEffect(0));

    fillStaticCircle(128 + 80, H/2, selectPointEffect(1));

    fillStaticCircle(128 + 80 * 2, H/2 - 64, selectPointEffect(2));
    fillStaticCircle(128 + 80 * 2, H/2 + 64, selectPointEffect(3));

    fillStaticCircle(128 + 80 * 3, H/2 - 64, selectPointEffect(4));
    fillStaticCircle(128 + 80 * 3, H/2 + 64, selectPointEffect(5));

    fillStaticCircle(128 + 80 * 4, H/2, selectPointEffect(6));

    fillStaticCircle(128 + 80 * 5, H/2 - 64, selectPointEffect(7));
    fillStaticCircle(128 + 80 * 5, H/2 + 64, selectPointEffect(8));

    fillStaticCircle(128 + 80 * 6 + 12, H/2, selectPointEffect(9));


    drawLine(128, H/2, 80, 0);

    drawLine(128 + 80, H/2, 80, -64);
    drawLine(128 + 80, H/2, 80, +64);

    drawLine(128 + 80 * 2, H/2-64, 80, 0);
    drawLine(128 + 80 * 2, H/2+64, 80, 0);

    drawLine(128 + 80 * 3, H/2-64, 80, +64);
    drawLine(128 + 80 * 3, H/2+64, 80, -64);

    drawLine(128 + 80 * 4, H/2, 80, -64);
    drawLine(128 + 80 * 4, H/2, 80, +64);

    drawLine(128 + 80 * 5, H/2-64, 95, +64);
    drawLine(128 + 80 * 5, H/2+64, 95, -64);
  }
}

function selectPointEffect(point){
  if(point == pathData[1]){
    return r;
  }
  return 6;
}

function selectPointTitle(point){
  switch(point){
    case 0:
      return 'SECTOR X';
    break;
    case 1:
      return 'ASTEROIDS';
    break;
    case 2:
      return 'PLANET TITAN';
    break;
    case 3:
      return 'ASTEROIDS';
    break;
    case 4:
      return 'BLACK HOLE';
    break;
    case 5:
      return 'PLANET MEGACLITE';
    break;
    case 6:
      return 'SECTOR Z';
    break;
    case 7:
      return 'ASTEROIDS';
    break;
    case 8:
      return 'PLANET GANYMEDE';
    break;
    case 9:
      return 'THE VOID';
    break;
    default:
      return '';
    break;
  }
}
