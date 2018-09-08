//var canvas = document.getElementById('c'),
//ctx = canvas.getContext('2d'),
var glprops = {preserveDrawingBuffer: true};
var gl = c.getContext('webgl',glprops) || c.getContext('experimental-webgl', glprops),
    ctx = g.getContext('2d'),
cam = [0, 0],
currentTime = (new Date()).getTime(),
dt = 0,
lastTime = (new Date()).getTime(),
globalTimer = 0,
stateTimer = 0,
delegate = null,
bgColor = '#aaa',
fadeInColor = '#000',
scale = 1,
mouse = {x:0, y:0},
seed = 1,
pressing = [],
lastPress = null,
keypressed = null,
players = 1,
FW = 800,
FH = 640,
GAME_MARGIN = 0,
GAME_Y_MARGIN = GAME_MARGIN,
GAME_INC_PADDING = 80,
W = FW - 2 * GAME_MARGIN,
H = FH - 2 * GAME_Y_MARGIN,
borderLength = 2*(W+H+2*GAME_INC_PADDING),
localStorageId = 'tvio-js13k-2018',
DEBUG = false;

/* DOM setup */
d.style.webkitTransformOrigin = d.style.transformOrigin = "0 0";
g.width = c.width = W;
g.height = c.height = H;
c.style.top = GAME_Y_MARGIN + "px";
c.style.left = GAME_MARGIN + "px";

document.oncontextmenu = function (e) {
  e.preventDefault();
};

/* WebGL setup */
gl.viewport(0, 0, W, H);
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  -1.0, -1.0,
  1.0, -1.0,
  -1.0,  1.0,
  -1.0,  1.0,
  1.0, -1.0,
  1.0,  1.0
]), gl.STATIC_DRAW);

var glowShader = glCreateShader("vertex-shader-static", "fragment-shader-glow");
gl.uniform2f(glUniformLocation(glowShader, 'dim'), W, H);
var crtShader = glCreateShader("vertex-shader-static", "fragment-shader-crt");
gl.uniform2f(glUniformLocation(crtShader, 'dim'), W, H);

// Create buffers
var fbo1 = glCreateFBO();
var fbo2 = glCreateFBO();

var textureGame = glCreateTexture();

/* Engine functions */
function setState(state){
  if(state.init !== undefined){
    state.init();
  }
  delegate = state;
  stateTimer = 0;
}

function init(){
  setState(splashState);
  requestAnimationFrame(gameLoop);
}

// Request animation frame setup
window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame        ||
            window.webkitRequestAnimationFrame  ||
            window.mozRequestAnimationFrame     ||
            function(callback){window.setTimeout(callback, 17);};
})();
