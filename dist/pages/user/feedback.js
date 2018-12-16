"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    suggestion: ""
  },
  bindInputSuggestion: function bindInputSuggestion(e) {
    this.setData({
      suggestion: e.detail.value
    });
  },
  save: function save(e) {
    console.log(e.detail.formId);
    console.log(this.data);
    wx.navigateBack({
      delta: 1 // 回退前 delta(默认为1) 页面
    });
  }
});