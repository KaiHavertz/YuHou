var container = null
var MIDISound = null
/**
 * 初始化界面
 */
function initUI(obj, sound) {
  container = obj
  MIDISound = sound
  var keys = Object.keys(MIDISound);
  // 白键的宽度 = 屏幕宽度 / 白键的数量
  var whiteWidth = container.clientWidth / 52;
  // 黑键的宽度 = 白键的宽度 * 3/5
  var blackWidth = (whiteWidth * 3) / 5;

  var beforeWhiteNumber = 0; // 前面的白键数量
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var div = document.createElement("div");
    div.classList.add("item"); // 添加类样式
    if (key.length === 2) {
      // 白键
      div.classList.add("white");
      div.style.width = whiteWidth + "px";
      // 白键的坐标 = 前面的白键数量 * 白键的宽度
      var left = beforeWhiteNumber * whiteWidth;
      div.style.left = left + "px";
      beforeWhiteNumber++;
    } else {
      // 黑键
      div.classList.add("black");
      div.style.width = blackWidth + "px";
      // 黑键的坐标 = 前面的白键数量 * 白键的宽度 - 黑键宽度的一半
      var left = beforeWhiteNumber * whiteWidth - blackWidth / 2;
      div.style.left = left + "px";
    }
    div.setAttribute("key", key);
    div.innerHTML = "<span>" + key + "</span>";
    container.appendChild(div);
    bindEvent(div); // 调用自定义函数bindEvent，给div注册各种乱七八糟的事件
  }
}


/**
 *
 */
function createAudio(key) {
  var aud = new Audio(MIDISound[key]);
  var timer = null; // 停止时，音量逐渐减少的计时器
  var div = document.querySelector("div[key=" + key + "]"); // 选中自定义属性key等于某个值的div
  return {
    play: function () {
      // 1. 播放声音
      clearInterval(timer); // 如果之前还在傻不拉几的减少音量，可以停止了
      aud.currentTime = 0; // 把播放进度归零
      aud.volume = 1; // 音量最大
      aud.play();
      // 2. 更改界面
      // 找到相应的div，加上active样式
      div.classList.add("active");
    },
    stop: function () {
      //1. 停止声音
      timer = setInterval(function () {
        // 不断的减少音量
        var v = aud.volume - 0.02; // 获取当前音量
        if (v <= 0) {
          // 静音
          aud.pause(); // 停止播放
          clearInterval(timer); // 不要再计时了
        } else {
          aud.volume = v;
        }
      }, 15);
      //2. 更改界面
      // 去掉类样式active
      div.classList.remove("active");
    },
  };
}

var aud = {};

/**
 * 初始化所有的音频
 */
function initAudio() {
  for (var key in MIDISound) {
    aud[key] = createAudio(key);
  }
}


/**
 * 给div绑定事件
 * @param {*} div
 */
function bindEvent(div) {
  div.onmousedown = function () {
    var key = div.getAttribute("key"); // 拿到自定义属性key
    aud[key].play();
  };
  div.onmouseup = function () {
    var key = div.getAttribute("key"); // 拿到自定义属性key
    aud[key].stop();
  };
  div.onmouseenter = function () {
    if (isDown) {
      // 只有鼠标按下时，才会播放
      var key = div.getAttribute("key"); // 拿到自定义属性key
      aud[key].play();
    }
  };
  div.onmouseleave = function () {
    var key = div.getAttribute("key"); // 拿到自定义属性key
    aud[key].stop();
  };
}

// 选择网页文字
document.documentElement.onselectstart = function () {
  return false;
};
var isDown = false; // 鼠标是否按下
window.onmousedown = function () {
  isDown = true;
};
window.onmouseup = function () {
  isDown = false;
};

// 键盘映射
var keyMap = {
  "1": "C3",
  "2": "D3",
  "3": "E3",
  "4": "F3",
  "5": "G3",
};

window.onkeydown = function (e) {
  var key = keyMap[e.key];
  if (key) {
    aud[key].play();
  }
};
window.onkeyup = function (e) {
  var key = keyMap[e.key];
  if (key) {
    aud[key].stop();
  }
};

export {
  initUI,
  initAudio
}