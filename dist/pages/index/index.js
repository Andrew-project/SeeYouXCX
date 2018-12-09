"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = getApp();

var QQMapWX = require("../../static/libs/qqmap-wx-jssdk.min.js");
var qqmapsdk;
exports.default = Page({
  data: {
    NAV_HEIGHT: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT + "px",
    itemStyle: {
      "border-color": "#0dc1ae",
      color: "#0dc1ae",
      "font-size": "14px"
    },
    activeItemStyle: {
      color: "#fff",
      "background-color": "#0dc1ae"
    },
    swiperCurrent: 0,
    items: [{
      src: "http://images.uileader.com/20171110/e5b64484-b5e0-472a-bf52-ac95fb5685d3.jpg",
      title: "放肆玩乐，轻巧办公"
    }, {
      src: "http://images.uileader.com/20171110/e33376a8-c599-42e5-87ed-84aec360a61d.jpg",
      title: "高温保护，一路驰骋"
    }, {
      src: "http://images.uileader.com/20171110/37cc4a4e-a253-4fcd-a4f6-d9710e8f63e8.jpg",
      title: "七夕好货，独家礼赠"
    }],
    imgSrc: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    mockImgs: ["https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"],
    focus: false,
    inputTop: 0,
    comment: '',
    textareaPlaceHolder: ''
  },
  swiperChange: function swiperChange(e) {
    this.setData({
      swiperCurrent: e.detail.current
    });
  },
  onLoad: function onLoad() {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: "YVKBZ-OOCRF-FFPJE-NZHVT-SWGU7-SCFES"
    });
  },
  onShow: function onShow() {
    // console.log("开始http请求");
    // app.cRequest({
    //   url: "/home",
    //   success: res => {
    //     console.log(res);
    //   }
    // });
    this.getUserLocation();
  },
  focusContent: function focusContent(e) {
    this.setData({
      focus: true,
      comment: '',
      textareaPlaceHolder: '请赞美你的ta吧~~~~',
      inputTop: e.detail.y + 20
    });
  },
  bindTextAreaBlur: function bindTextAreaBlur(e) {
    this.setData({
      focus: false,
      comment: '',
      textareaPlaceHolder: '请赞美你的ta吧~~~~',
      inputTop: 0
    });
  },
  // 回复其他人信息
  commentToOther: function commentToOther(e) {
    this.focusContent(e);
    this.setData({
      textareaPlaceHolder: '@xxx:'
    });
  },
  confirmComment: function confirmComment(e) {
    console.info(e);
  },
  routePlp: function routePlp() {
    wx.navigateTo({
      url: "/pages/plp/plp",
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
  getUserLocation: function getUserLocation() {
    var vm = this;
    wx.getSetting({
      success: function success(res) {
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting["scope.userLocation"] != undefined && res.authSetting["scope.userLocation"] != true) {
          wx.showModal({
            title: "请求授权当前位置",
            content: "需要获取您的地理位置，请确认授权",
            success: function success(res) {
              if (res.cancel) {
                wx.showToast({
                  title: "拒绝授权",
                  icon: "none",
                  duration: 1000
                });
              } else if (res.confirm) {
                wx.openSetting({
                  success: function success(dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: "授权成功",
                        icon: "success",
                        duration: 1000
                      });
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: "授权失败",
                        icon: "none",
                        duration: 1000
                      });
                    }
                  },
                  fail: function fail(err) {
                    console.debug(err);
                  }
                });
              }
            }
          });
        } else if (res.authSetting["scope.userLocation"] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        } else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    });
  },
  // 微信获得经纬度
  getLocation: function getLocation() {
    var vm = this;
    wx.getLocation({
      type: "wgs84",
      success: function success(res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        var speed = res.speed;
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude);
      },
      fail: function fail(res) {
        console.log("fail" + JSON.stringify(res));
      }
    });
  },
  // 获取当前地理位置
  getLocal: function getLocal(latitude, longitude) {
    var vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function success(res) {
        console.log(res);
        var province = res.result.ad_info.province;
        var city = res.result.ad_info.city;
        vm.setData({
          province: province,
          city: city,
          latitude: latitude,
          longitude: longitude
        });
      },
      fail: function fail(res) {
        console.log(res);
      },
      complete: function complete(res) {
        // console.log(res);
      }
    });
  }
});