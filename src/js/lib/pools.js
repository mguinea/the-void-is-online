var pools = [];

function poolInit(id, amount, entity){
  var e = [];
  for(var i = 0; i < amount; ++i){
    e.push(entity);
  }
  pools[id] = e;
}

function poolGet(id){
  pools[id];
}
