"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    commit: "",
    pictures: [],
    hasChooseImg: false
  },
  onShow: function onShow() {
    if (!this.data.hasChooseImg) {
      this.setData({
        pictures: ["https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"]
      });
    }
  },
  inputTextarea: function inputTextarea(e) {
    this.setData({
      commit: e.detail.value
    });
  },
  onPreviewImg: function onPreviewImg(e) {
    this.setData({
      hasChooseImg: true
    });
    wx.previewImage({
      current: e.currentTarget.dataset.img, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.img] // 需要预览的图片http链接列表
    });
  },
  onAddImg: function onAddImg() {
    this.setData({
      hasChooseImg: true
    });
    wx.chooseImage({
      count: 5 - this.data.pictures.length, // 默认9
      sizeType: ["compressed"],
      success: function success(res) {
        console.log(res);
      }
    });
  },
  onDelImg: function onDelImg(e) {
    this.data.pictures.splice(e.currentTarget.dataset.idx, 1);
    this.setData({
      pictures: this.data.pictures || []
    });
  },
  onSubmit: function onSubmit(e) {
    console.log(this.data);
    console.log(e);
    wx.switchTab({
      url: "/pages/index/index",
      success: function success(res) {
        // success
      }
    });
  }
});