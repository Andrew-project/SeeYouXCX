"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require("../../static/utils/lodash.js");

var lodash = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = Page({
  data: {},
  onLoad: function onLoad() {
    var openId = wx.getStorageSync("openId");
    if (openId) {
      wx.switchTab({
        url: "/pages/index/index"
      });
    }
  },
  onShow: function onShow() {
    var that = this;
    wx.login({
      success: function success(res) {
        getApp().cRequest({
          url: "auth/getOpenId",
          method: "post",
          data: {
            wxCode: res.code
          },
          success: function success(res) {
            wx.setStorageSync("openId", res.openId);
          }
        });
      },
      fail: function fail() {
        // fail
      },
      complete: function complete() {
        // complete
      }
    });
  },
  register: function register(e) {
    if (lodash.get(e.detail, "userInfo")) {
      getApp().cRequest({
        url: "auth/login",
        method: "post",
        hideToast: true,
        data: Object.assign({ wxCode: this.data.wxCode }, e.detail.userInfo),
        success: function success(res) {
          if (res) {
            wx.setStorageSync("userInfo", res);
            wx.switchTab({
              url: "/pages/index/index"
            });
          }
        }
      });
    }
  }
});