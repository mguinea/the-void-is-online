var cam = [0, 0], // 0: x, 1: y
    camOffset = [0, 0], // 0: x, 1: y
    camTrap = [0, 0, 128, 16]; // 0: x, 1: y, 2: width, 3: height

function camSet(offset){
  camOffset = offset;
  //trap[0] = player[0][0] - trap[3] / 2;
  //cam[0] = trap[0] - cam[2];
}

function camFocus(point){
    cam[0] = point[0] + camOffset[0];
/*
  if(point[0] > camTrap[0] + camTrap[2]){
    camTrap[0] = point[0] - camTrap[2];
  }else if(point[0] < camTrap[0]){
    camTrap[0] = point[0];
  }else{
    cam[0] = point[0] + camOffset[0];
  }
*/


  //cam[0] = point[0] + camOffset[0];

  //cam[0] = cam[0] - (cam[0] - camOffset[0]);

  /*
  if(cam[0] < camTrap[0]){
    camTrap[0] = point[0];
  }else if(point[0] > camTrap[0] + camTrap[2]){
    camTrap[0] = point[0] - camTrap[2];
  }
  cam[0] = cam[0] -(cam[0] - camTrap[0] + camOffset[0]);
  //*/
}
