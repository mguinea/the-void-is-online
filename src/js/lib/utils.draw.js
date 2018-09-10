function setContextAttribute(index, attribute, custom){
	ctx[['strokeStyle','fillStyle','lineWidth'][attribute||0]] = custom||colors[index];
}

// Draw functions
/*
function drawLine(x, y, r, l, w){
	ctx.save();
	ctx.lineWidth = w;
	ctx.translate(x, y);
	ctx.beginPath();

	var rpx = Math.cos( (r).toRad() ) * l,
		rpy = Math.sin( (r).toRad() ) * l;

	ctx.moveTo(0, 0);
	ctx.lineTo(rpx, rpy);
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
}
//*/
function drawLine(x1, y1, x2, y2, w = 1, color = 17){
	ctx.save();
	ctx.lineWidth = w;
	if(gameData[1] == 0){color = 17;}
	setContextAttribute(color, 0);
	ctx.translate(x1, y1);
	ctx.beginPath();

	ctx.moveTo(0, 0);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
}

function fillRectangle(rect, index){
	ctx.save();
  setContextAttribute(index, 1);
  ctx.fillRect(rect[0] - cam[0], rect[1], rect[2], rect[3]);
	ctx.restore();
}

function fillStaticRectangle(rect, index){
	ctx.save();
  setContextAttribute(index, 1);
  ctx.fillRect(rect[0], rect[1], rect[2], rect[3]);
	ctx.restore();
}

function strokeRectangle(rect, index, size = 1){
  ctx.save();
  setContextAttribute(index, 0);
  ctx.lineWidth = size;
  ctx.strokeRect(rect[0] - cam[0], rect[1], rect[2], rect[3]);
	ctx.restore();
}

function strokeStaticRectangle(rect, index, size = 1){
  ctx.save();
  setContextAttribute(index, 0);
  ctx.lineWidth = size;
  ctx.strokeRect(rect[0], rect[1], rect[2], rect[3]);
	ctx.restore();
}

function fillCircle(x, y, r, color = 17){
	ctx.save();
	if(gameData[1] == 0){color = 17;}
	setContextAttribute(color, 1);
	ctx.beginPath();
	ctx.translate(x - cam[0], y);
	ctx.arc(0, 0, r, 0, Math.PI * 2, true);
	ctx.fill();
	ctx.closePath();
	ctx.restore();
}

function strokeCircle(x, y, r){
	ctx.save();
	ctx.beginPath();
	ctx.translate(x-cam[0], y-cam[1]);
	ctx.arc(0, 0, r, 0, Math.PI * 2, true);
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
}
/*
function strokePath (x, y, r, pts, d) {
	ctx.save();
	ctx.lineJoin = "round";
	ctx.beginPath();
	ctx.translate(x - cam[0], y - cam[1]);
	//ctx.rotate((r).toRad());

	var mv = 1;
	for (var i = 0; pts && i<pts.length; ++i) {
		var p = pts[i];
		if (p) {
			if (mv) ctx.moveTo(p[0] * d, p[1] * d);
			else ctx.lineTo(p[0] * d, p[1] * d);
			mv = 0;
		}
		else mv = 1;
	}
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
	return ctx;
}*/

function strokePath (x, y, pts, noclose, scale = 1, color = 17, lineWidth = 1) {
	ctx.save();
  ctx.translate(x, y);
	ctx.lineWidth = lineWidth;
	if(gameData[1] == 0){color = 17;}
  setContextAttribute(color, 0);
  ctx.beginPath();
  var mv = 1;
  for (var i = 0; pts && i<pts.length; ++i) {
    var p = pts[i];
    if (p) {
      if (mv) ctx.moveTo(p[0] * scale, p[1] * scale);
      else ctx.lineTo(p[0] * scale, p[1] * scale);
      mv = 0;
    }
    else mv = 1;
  }
  if (!noclose) ctx.closePath();

	ctx.stroke();
  ctx.restore();
}

function path (pts, noclose, scale = 1) { // eslint-disable-line no-unused-vars
  ctx.beginPath();
  var mv = 1;
  for (var i = 0; pts && i<pts.length; ++i) {
    var p = pts[i];
    if (p) {
      if (mv) ctx.moveTo(p[0] * scale, p[1] * scale);
      else ctx.lineTo(p[0] * scale, p[1] * scale);
      mv = 0;
    }
    else mv = 1;
  }
  if (!noclose) ctx.closePath();
}

function scalePath(path, scale){
	if(scale == 1){
		return path;
	}
	var newPath = [];
	for(var i = path.length - 1; i >= 0; --i){
		newPath.push([path[i][0] * scale, path[i][1] * scale]);
	}
	return newPath;
}
