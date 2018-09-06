var stars = [];

function starsInit(amount){
  stars = [];
  for(var i = 0; i < amount; ++i){
    var size = srand(1, 3);
    stars.push([srand(0, W), srand(0, H), size, size]);
  }
}

function starUpdate(star){
  if(star[0] + star[2] < camTarget[0]){
    star[0] = ~~(W + camTarget[0] + srand(star[2], 128));
    star[1] = ~~(srand(star[3], H - star[3]));
  }
}

function starDraw(star){
  fillRectangle([star[0], star[1], star[2], star[3]], 17);
}
