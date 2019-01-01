"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require("../../static/utils/lodash.js");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = getApp();
exports.default = Page({
  data: {
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    signature: "",
    NAV_HEIGHT: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT + "px",
    recordsLen: 0,
    perVerbs: 0
  },
  // 跳转到我的记录
  toRecords: function toRecords() {
    wx.navigateTo({
      url: "/pages/user/myRecord"
    });
  },

  // 跳转到设置
  toDetails: function toDetails() {
    wx.navigateTo({
      url: "/pages/user/setting"
    });
  },

  // 跳转我的消息
  toInform: function toInform() {
    wx.navigateTo({
      url: "/pages/inform/inform"
    });
  },

  // 跳转意见反馈
  toFeedback: function toFeedback() {
    wx.navigateTo({
      url: "/pages/user/feedback"
    });
  },

  // 跳转关于我们
  toAaboutUs: function toAaboutUs() {
    wx.navigateTo({
      url: "/pages/user/aboutUs"
    });
  },
  onShow: function onShow() {
    var _this = this;

    try {
      var userInfo = wx.getStorageSync("userInfo");
      if (userInfo) {
        this.setData({
          userInfo: userInfo
        });
      }
    } catch (e) {}

    app.cRequest({
      url: "record/list/me",
      success: function success(res) {
        if (_lodash2.default.isArray(res)) {
          var vers = 0;
          res.forEach(function (it) {
            return vers += it.verbs.filter(function (v) {
              return v.isVerb == true;
            }).length;
          });
          _this.setData({
            perVerbs: _lodash2.default.ceil(vers / res.length),
            recordsLen: res.length
          });
          wx.setStorageSync("recordsByMe", res);
        }
      }
    });
  },

  onLoad: function onLoad() {
    // 查看是否授权
    wx.getSetting({
      success: function success(res) {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function success(res) {
              console.log(res.userInfo);
            }
          });
        }
      }
    });
  },
  bindGetUserInfo: function bindGetUserInfo(e) {
    console.log(e.detail.userInfo);
  }
});