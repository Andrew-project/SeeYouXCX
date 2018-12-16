"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    signature: "",
    NAV_HEIGHT: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT + "px"
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

  // 页面执行后从缓存中获取设置的签名，有接口后可不需要这样操作
  onShow: function onShow() {
    this.setData({
      signature: wx.getStorageSync("signature") || "用一句话介绍下自己吧"
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