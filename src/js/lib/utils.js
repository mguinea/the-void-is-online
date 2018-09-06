/*function path (pts, noclose) { // eslint-disable-line no-unused-vars
  ctx.beginPath();
  var mv = 1;
  for (var i = 0; pts && i<pts.length; ++i) {
    var p = pts[i];
    if (p) {
      if (mv) ctx.moveTo(p[0], p[1]);
      else ctx.lineTo(p[0], p[1]);
      mv = 0;
    }
    else mv = 1;
  }
  if (!noclose) ctx.closePath();
}*/

function padLeft(nr, n, str){
    return Array(n-String(nr).length+1).join(str||'0')+nr;
}

function random(min, max){
  return (Math.random() * (max - min) + min);
}

function srand(min = null, max = null) {
  var x = Math.sin(seed++) * 10000;
  var r = x - Math.floor(x);

  if(min !== null && max !== null){
    return (r * (max - min) + min);
  }else{
    return r;
  }
}

function AABBCollides(e1, e2){
    return(
            e1[0]  <   e2[0]      +   e2[2]   &&
            e1[0]  +   e1[2]  >   e2[0]       &&
            e1[1]  <   e2[1]      +   e2[3]   &&
            e1[1]  +   e1[3] >   e2[1]);
}

/*
A = Amplitude (Tallness) of the wave.
B = How many waves there are for each cycle.
C = How far to shift the wave’s X position.
D = How far to shift the wave’s Y position.
*/
function sineMovement(a, b, c, d, x){
  return a * ( Math.sin ( b * ( x - c ) ) ) + d;
}

function processGroup( group, func, params = null ) {
  for ( var i = group.length - 1; i >= 0; --i ) {
    func( group[i], params );
  }
}
