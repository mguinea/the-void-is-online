function padLeft(nr, n, str){
    return Array(n-String(nr).length+1).join(str||'0')+nr;
}

function rand(min, max){
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

function angleTo ( e1, e2 ) {
    return Math.atan2(
        (e2[1]) - (e1[1]),
        (e2[0]) - (e1[0])
    );
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
    func( group[i], i, params );
  }
}

// Local Storage functions
function storageIsSupported() {
  if (typeof localStorage !== 'object') return false;
  try {
    localStorage.setItem('localStorage', 1);
    localStorage.removeItem('localStorage');
  }
  catch (e) {
    return false;
  }
  return true;
}

function storageSet(key, value) {
  localStorage.setItem(localStorageId + '.' + key, storageEncode(value));
}

function storageGet(key, defaultValue) {
  var raw = localStorage.getItem(localStorageId + '.' + key);
  if (raw === null) return defaultValue;
  try {
    return storageDecode(raw);
  }
  catch (e) {
    return raw;
  }
}

function storageRemove(key) {
  localStorage.removeItem(localStorageId + '.' + key);
}

function storageEncode(val) {
  return JSON.stringify(val);
}

function storageDecode(str) {
  return JSON.parse(str);
}
