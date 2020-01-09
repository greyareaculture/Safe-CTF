document.getElementById("dial_number").innerHTML = 0;

var myImg = document.getElementById("image2");
var myContainer = document.getElementById("container1");
var angle = 0;
var combination = Create(function(reset, comb1, comb2, comb3) {});

myImg.onmousemove = function(e) {
  if (myImg.dataset.isValid == "true") {
    e = e || myContainer.event;
    x = (e.clientX - parseInt(myImg.getBoundingClientRect().left) - parseInt(myImg.getBoundingClientRect().width / 2));
    y = -1 * (e.clientY - parseInt(myImg.getBoundingClientRect().top) - parseInt(myImg.getBoundingClientRect().height / 2));
    var target = e.target || e.srcElement;
    angle = -1 * (parseInt(calcAngleDegrees(x, y)) + 360) % 360;
    var t = setTimeout(function() {
      rotate(myImg, angle);
      calcDialNumber(angle, 11, 22, 34);
    }, 16);
  }
}

myImg.onmousedown = function(e) {
  myImg.dataset.isValid = true;
};

myImg.onmouseup = function(e) {
  myImg.dataset.isValid = false;
};

function calcAngleDegrees(x, y) {
  return Math.atan2(y, x) * 180 / Math.PI;
}

function rotate(element, target_angle) {
  element.style.transform = 'rotate(' + (target_angle) + 'deg)';
}

function calcDialNumber(deg, comb1, comb2, comb3) {
  dial = parseInt(deg / 9) * -1;
  document.getElementById("dial_number").innerHTML = dial;

  let reset = combination.getReset();
  if (dial == comb1 & combination.getReset()) {
    combination.setComb1(true);
  }
  if (dial == comb2 & combination.getReset() & combination.getComb1()) {
    combination.setComb2(true);
  }
  if (dial == comb3 & combination.getReset() & combination.getComb1() & combination.getComb2()) {
    combination.setComb3(true);
    console.log('unlockled!')
  }

  if (dial > comb1 & dial < comb2 & combination.getComb1()) {
    combination.setReset(false);
  }

  if (dial == 0 & !combination.getReset()) {
    combination.setComb1(false);
    combination.setComb2(false);
    combination.setComb3(false);
    combination.setReset(true);

  }


}


function Create(callback) {
  var reset = true;
  var comb1 = false;
  var comb2 = false;
  var comb3 = false;

  return {
    getReset: function() {
      return reset;
    },
    setReset: function(p) {
      reset = p;
      callback(reset);
    },
    getComb1: function() {
      return comb1;
    },
    setComb1: function(p) {
      comb1 = p;
      callback(comb1);
    },
    getComb2: function() {
      return comb2;
    },
    setComb2: function(p) {
      comb2 = p;
      callback(comb2);
    },
    getComb3: function() {
      return comb3;
    },
    setComb3: function(p) {
      comb3 = p;
      callback(comb3);
    }
  }

}
