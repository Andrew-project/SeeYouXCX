"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  properties: {
    navTitle: {
      type: String,
      value: ""
    },
    isBack: {
      type: Boolean,
      value: false
    },
    isHome: {
      type: Boolean,
      value: false
    }
  },
  data: {
    statusBarHeight: wx.STATUS_BAR_HEIGHT,
    titleBarHeight: wx.DEFAULT_HEADER_HEIGHT
  }
});