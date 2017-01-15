
window.onload = (function(){init()});

var canvas;

var ctx;

var color_input;

var color;

var mouseX = "";
var mouseY = "";

function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    color_input = document.getElementById('color')
    color = "#"+color_input.value;
    color_input.addEventListener('change', function(){color = "#"+color_input.value;})
    color_input.addEventListener('click', function(){color_input.value="";color = "#"+color_input.value;})
    canvas.addEventListener('mousemove', onMove, false);
    canvas.addEventListener('mousedown', onClick, false);
    canvas.addEventListener('mouseup', drawEnd, false);
    canvas.addEventListener('mouseout', drawEnd, false);
    window_load();
}

//マウス動いていて、かつ左クリック時に発火。
function onMove(e) {
  if (e.button === 1 || e.which === 1) {
      var rect = e.target.getBoundingClientRect();
      var X = ~~(e.clientX - rect.left);
      var Y = ~~(e.clientY - rect.top);
      //draw 関数にマウスの位置を渡す
      draw(X, Y);
  };
};

//マウスが左クリックされると発火。
function onClick(e) {
    var rect = e.target.getBoundingClientRect();
    var X = ~~(e.clientX - rect.left);
    var Y = ~~(e.clientY - rect.top);
    //draw 関数にマウスの位置を渡す
    drawPoint(X, Y);
};

//渡されたマウス位置を元に直線を描く関数
function draw(X, Y) {
    ctx.beginPath();
    ctx.globalAlpha = 1.0;
    //マウス継続値によって場合分け、直線の moveTo（スタート地点）を決定
    if (mouseX === "") {
        //継続値が初期値の場合は、現在のマウス位置をスタート位置とする
        ctx.moveTo(X, Y);
    } else {
        //継続値が初期値ではない場合は、前回のゴール位置を次のスタート位置とする
        ctx.moveTo(mouseX, mouseY);
    }
    //lineTo（ゴール地点）の決定、現在のマウス位置をゴール地点とする
    ctx.lineTo(X, Y);
    //直線の角を「丸」、サイズと色を決める
    ctx.lineCap = "round";
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.stroke();
    //マウス継続値に現在のマウス位置、つまりゴール位置を代入
    mouseX = X;
    mouseY = Y;
  };

  //渡されたマウス位置を元に直線を描く関数
  function drawPoint(X, Y) {
      ctx.beginPath();
      //直線の角を「丸」、サイズと色を決める
      ctx.fillStyle = color
      ctx.arc(X, Y, 1, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.moveTo(_this.x, _this.y);
      ctx.restore();
    };


  //左クリック終了、またはマウスが領域から外れた際、継続値を初期値に戻す
  function drawEnd() {
      mouseX = "";
      mouseY = "";
  }

  //サイズの表示
  function window_load() {
     var imgd = ctx.getImageData(0, 0, window.innerWidth -24, window.innerHeight-24);
	   canvas.width = window.innerWidth -24;
	   canvas.height = window.innerHeight-24;
     ctx = canvas.getContext('2d');
     ctx.putImageData(imgd, 0, 0);
  }
