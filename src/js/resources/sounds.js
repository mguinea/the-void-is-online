// 0: powerup
// 1: menu Change
// 2: menu selected
// 3: player[0] explosion
// 4: enemy explosion
// 5: player[0] basic shot
// 6: Spawn Boss
// 7: Boss destroyed
// 8: Enemy shot

var sounds = [
  [0,,0.01,,0.4093,0.4157,,0.2003,,,,,,0.0559,,,,,1,,,,,0.5],
  [0,,0.1619,,0.018,0.3566,,,,,,,,0.1854,,,,,1,,,0.1,,0.5],
  [0,,0.0283,0.546,0.4775,0.4413,,,,,,0.3201,0.6073,,,,,,1,,,,,0.5],
  [3,,0.3531,0.3026,0.2567,0.1492,,-0.0454,,,,0.2691,0.7328,,,,,,1,,,,,0.5],
  [3,,0.2052,0.4437,0.3754,0.0623,,0.1472,,,,,,,,,,,1,,,,,0.5],
  [0,,0.2217,,0.0384,0.9784,0.4757,-0.2905,,,,,,0.7169,-0.483,,,,1,,,,,0.5],
  [1,,0.3979,,0.4921,0.2499,,0.2093,,,,,,,,0.5583,,,1,,,,,0.5],
  [3,,0.2997,0.7647,0.4932,0.1329,,0.2426,,,,-0.2198,0.6621,,,0.793,-0.128,-0.2447,1,,,,,0.5],
  [2,,0.2112,,0.0831,0.8645,0.3455,-0.2075,,,,,,0.7352,-0.397,,,,1,,,0.2695,,0.3]
];

var soundPlayer = [];

for(var i = 0; i < sounds.length; ++i){
  var player = new Audio();
  player.src = jsfxr(sounds[i]);
  soundPlayer.push(player);
}
