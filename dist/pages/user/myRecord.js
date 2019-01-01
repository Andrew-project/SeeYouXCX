"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    records: []
  },
  onLoad: function onLoad(e) {
    try {
      var records = wx.getStorageSync("recordsByMe");
      this.setData({
        records: records || []
      });
    } catch (e) {}
  }
});