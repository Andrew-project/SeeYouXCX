"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = getApp();
exports.default = Page({
  data: {
    NAV_HEIGHT: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT + "px",
    getPngSecond: "../../static/images/plp/hx.png", //海星
    getPngThrid: "../../static/images/plp/plp.png", //漂流瓶
    isGet: false, //是否捡到了漂流瓶
    maskDisplay: "none",
    slideAnimation: {},
    slideHeight: 0,
    slideRight: 0,
    slideWidth: 0,
    isPlaying: false,
    plp: [],
    j: 1,
    contentText: "",
    // 语音
    jp: "../../static/images/plp/jp.png",
    ht: "../../static/images/plp/ht.png",
    isInput: true, //默认键盘输入
    jv: 1, //帧动画初始图片
    isSpeaking: false, //是否正在说话
    animationBottle: {}, //扔出漂流瓶动画
    bottle: false, //漂流瓶
    contentInput: "", //内容
    showMask: false
  },
  onLoad: function onLoad(param) {
    var _this = this;
    //获取屏幕宽高
    wx.getSystemInfo({
      success: function success(res) {
        var windowWidth = res.windowWidth;
        var windowHeight = res.windowHeight;
        console.log("windowWidth: " + windowWidth);
        console.log("windowHeight: " + windowHeight);
        _this.setData({
          imageWidth: windowWidth,
          imageHeight: windowHeight,
          slideHeight: res.windowHeight * 0.6,
          slideRight: res.windowWidth,
          slideWidth: res.windowWidth * 0.8
        });
      }
    });

    //去后台拉取漂流瓶数据,1.获取到文字,左边弹框;2.获取到语音,播放
    //1.获取语音
    // var _this = this;
    //获取语音漂流瓶
    // var queryRecord = new AV.Query("_File");
    // queryRecord
    //   .find()
    //   .then(function(myrecord) {
    //     console.log(myrecord);
    //     var audio = [];
    //     for (var i = 0; i < myrecord.length; i++) {
    //       //判断上传用户身份
    //       if (myrecord[i].attributes.name == "myRecord_dzp") {
    //         _this.data.plp = _this.data.plp.concat(myrecord[i].attributes.url);
    //       }
    //       console.log(myrecord[i].attributes.url);
    //     }
    //   })
    //   .catch(function(error) {
    //     alert(JSON.stringify(error));
    //   });

    //2.获取文本
    // var queryText = new AV.Query("TodoFolder");
    // 查询 name 是 myText 的漂流瓶内容
    // queryText.equalTo("name", "myText");
    // queryText.find().then(
    //   function(results) {
    //     var mytext = [];
    //     for (var i = 0; i < results.length; i++) {
    //       var query = new AV.Query("TodoFolder");
    //       console.log(results[i].id);
    //       query.get(results[i].id).then(
    //         function(todo) {
    //           // 成功获得实例
    //           // data 就是 id 为 57328ca079bc44005c2472d0 的 TodoFolder 对象实例
    //           console.log(todo.attributes.plp_content);
    //           _this.data.plp = _this.data.plp.concat(
    //             todo.attributes.plp_content
    //           );
    //         },
    //         function(error) {
    //           // 异常处理
    //         }
    //       );
    //     }
    //   },
    //   function(error) {}
    // );

    /**
     * 监听音乐停止
     */
    wx.onBackgroundAudioStop(function () {
      console.log("onBackgroundAudioStop");
      _this.setData({
        isPlaying: false
      });
      clearInterval(_this.timer);
    });
  },
  // 捡瓶子
  onPick: function onPick() {
    var num = Math.round(Math.random() * 9 + 1);
    console.log(num);
    if (num > 5) {
      //捡到漂流瓶
      this.setData({
        bgPng: this.data.getPngThrid,
        isGet: true,
        contentText: "~打开瓶子"
      });
    } else {
      //海星
      this.setData({
        bgPng: this.data.getPngSecond,
        isGet: false
      });
    }
    this.setData({
      maskDisplay: "block"
    });
  },
  // 扔瓶子
  onThrow: function onThrow() {
    console.log(this.data);
    this.setData({
      contentInput: "",
      showMask: true
    });
  },
  // 我的瓶子
  onMine: function onMine() {
    wx.switchTab({
      url: "/pages/chat-list/chat-list",
      success: function success(res) {
        // success
      },
      fail: function fail() {
        // fail
      },
      complete: function complete() {
        // complete
      }
    });
  },
  // 点击遮罩层
  onClickMask: function onClickMask(e) {
    this.setData({
      showMask: false
    });
  },
  // 点击内容遮罩层
  onClickShowMask: function onClickShowMask(e) {},
  //右上角关闭按钮
  onClick: function onClick() {
    var _this = this;
    //捡到海星,return
    if (!this.data.isGet) return;
    this.setData({
      isGet: false
    });
    console.log("打开漂流瓶");
    //随机获取一个索引
    var index = parseInt(Math.random() * this.data.plp.length);
    var content = this.data.plp[index];
    if (content.indexOf("http://") == 0) {
      wx.playBackgroundAudio({
        dataUrl: _this.data.plp[index],
        title: _this.data.plp[index],
        coverImgUrl: ""
      });
      playRecord.call(_this);
    } else {
      _this.setData({
        contentText: content
      });
      slideUp.call(_this);
    }
  },
  //遮罩点击  侧栏关闭
  slideCloseEvent: function slideCloseEvent() {
    slideDown.call(this);
  },
  //切换话筒和键盘
  inputSwitch: function inputSwitch() {
    this.setData({
      isInput: !this.data.isInput
    });
  },
  //手指按下
  touchdown: function touchdown() {
    var _this = this;
    //话筒的时候,点击按钮无效
    if (!this.data.isInput) return;
    this.data.contentInput;
    console.log("new date : " + new Date());
    speaking.call(this);
    this.setData({
      isSpeaking: true
    });
    //开始录音
    wx.startRecord({
      success: function success(res) {
        //临时路径,下次进入小程序时无法正常使用
        var tempFilePath = res.tempFilePath;
        console.log("tempFilePath: " + tempFilePath);
        //录音完成后直接上传,不再持久保存本地
        // new AV.File('myRecord_dzp', {
        //   blob: {
        //     uri: tempFilePath,
        //   },
        // }).save().then(
        //   file => console.log("录音地址:" + file.url())
        //   ).catch(console.error);
        //持久保存
        //wx.saveFile({
        // tempFilePath: tempFilePath,
        // success: function (res) {
        //持久路径
        //本地文件存储的大小限制为 100M
        //var savedFilePath = res.savedFilePath
        //console.log("savedFilePath: " + savedFilePath)
        // }
        //  })

        wx.showToast({
          title: "恭喜!录音成功",
          icon: "success",
          duration: 1000
        });
      },
      fail: function fail(res) {
        console.log(res);
        //录音失败
        wx.showModal({
          title: "提示",
          content: "录音的姿势不对!",
          showCancel: false,
          success: function success(res) {
            if (res.confirm) {
              console.log("用户点击确定");
              return;
            }
          }
        });
      }
    });
  },
  //手指抬起
  touchup: function touchup() {
    //话筒的时候,点击按钮无效

    if (!this.data.isInput) return;
    console.log("手指抬起了...");
    clearInterval(this.timer);
    wx.stopRecord();
    //开发工具测试有效.真机不执行.
    throwBottleAnimation.call(this);
    this.setData({
      isSpeaking: false
    });
  },
  //扔出去
  throwBottle: function throwBottle() {
    var _this = this;
    //键盘的时候,点击按钮无效
    //扔出漂流瓶动画
    if (this.data.isInput) return;
    //button获取焦点后,textarea才失去焦点,contentInput有值
    setTimeout(function () {
      if (_this.data.contentInput == "") {
        wx.showToast({
          title: "不能扔空瓶子哦~~",
          icon: "none",
          duration: 2000
        });
        return;
      }
      //将文本漂流瓶上传到leancloud
      // 执行 CQL 语句实现新增一个 TodoFolder 对象
      // AV.Query.doCloudQuery('insert into TodoFolder(name, priority,plp_content) values("myText", 1,"' + _this.data.contentInput + '")').then(function (data) {
      //   // data 中的 results 是本次查询返回的结果，AV.Object 实例列表
      //   var results = data.results;
      //   console.log(results)
      // }, function (error) {
      //   //查询失败，查看 error
      //   console.error(error);
      // });
      // //扔出漂流瓶动画
      throwBottleAnimation.call(_this);
    }, 50);
  },
  //获取多行输入框内容
  bindTextAreaBlur: function bindTextAreaBlur(e) {
    console.log(e.detail.value);
    this.setData({
      showMask: false,
      contentInput: e.detail.value
    });
  }
});

//侧栏展开

function slideUp() {
  var animation = wx.createAnimation({
    duration: 600
  });
  this.setData({
    maskDisplay: "block"
  });
  animation.translateX("110%").step();
  this.setData({
    slideAnimation: animation.export()
  });
}

//侧栏关闭
function slideDown() {
  var animation = wx.createAnimation({
    duration: 800
  });
  animation.translateX("-110%").step();
  this.setData({
    slideAnimation: animation.export()
  });
  this.setData({
    maskDisplay: "none"
  });
}

//播放动画
function playRecord() {
  var _this = this;
  this.setData({
    isPlaying: true
  });
  //话筒帧动画
  var i = 1;
  this.timer = setInterval(function () {
    i++;
    i = i % 5;
    _this.setData({
      jv: i
    });
  }, 200);
}

//麦克风帧动画
function speaking() {
  var _this = this;
  //话筒帧动画
  var i = 1;
  this.timer = setInterval(function () {
    i++;
    i = i % 5;
    _this.setData({
      jv: i
    });
  }, 200);
}

//扔出漂流瓶动画
function throwBottleAnimation() {
  var _this2 = this;

  this.setData({
    bottle: true
  });
  var animation = wx.createAnimation({
    duration: 1500 //动画持续时间
  });

  // 旋转同时缩小
  animation.translate(-150, -180).rotateZ(720).scale(0, 0).step();

  this.setData({
    showMask: false,
    animationBottle: animation.export()
  });

  setTimeout(function () {
    _this2.setData({
      animationBottle: {},
      bottle: false
    });
  }, 1500);
}