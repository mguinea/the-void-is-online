/*
Enemy
0: x
1: y
2: width
3: height
4: type
5: damage
6: cadency
7: type // defines draw and behaviour
*/

var bossShapes = [
  [
    [0*4, 0*4],
    [12*4, -6*4],
    [24*4, -6*4],
    [36*4, 0*4],
    [24*4, 12*4],
    [12*4, 12*4]
  ]
];

function bossDestroy(i){
  soundPlayer[4].play();
  player[0][11] += 1000;
  //explosions.push([enemies[i][0], enemies[i][1], stateTimer + 1, 0]);
  bosses.splice(i, 1);
}

function bossUpdate(e){

}

function bossDraw(e){

}
