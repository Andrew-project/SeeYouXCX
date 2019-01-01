"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toast = require("../../static/utils/toast.js");

var _toast2 = _interopRequireDefault(_toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var app = getApp();
exports.default = Page({
  data: {
    text: "",
    pictures: [],
    hasChooseImg: false
  },
  onShow: function onShow() {
    // if (!this.data.hasChooseImg) {
    //   this.setData({
    //     pictures: [
    //       "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    //     ]
    //   });
    // }
  },
  inputTextarea: function inputTextarea(e) {
    this.setData({
      text: e.detail.value
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
    var that = this;
    switch (app.env) {
      case "dev":
        var baseURL = "http://192.168.0.102:3000/api/v1/open/";
        break;
      case "pro":
        var baseURL = "https://api.yhcloud.youhujia.com/";
        break;
      default:
        var baseURL = "http://192.168.0.102:3000/api/v1/open/";
        break;
    }
    wx.chooseImage({
      count: 5 - this.data.pictures.length, // 默认9
      sizeType: ["compressed"],
      success: function success(res) {
        res.tempFilePaths.forEach(function (tempFilePath) {
          wx.uploadFile({
            url: baseURL + "file/uploadFile?folderName=image",
            filePath: tempFilePath,
            name: "file",
            header: {
              Accept: "application/json"
            },
            success: function success(res) {
              var imgData = JSON.parse(res.data);
              var pictures = [].concat(_toConsumableArray(that.data.pictures), [imgData.data]);
              that.setData({
                pictures: pictures
              });
            }
          });
        });
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
    app.cRequest({
      url: "record/add",
      method: "post",
      data: {
        text: this.data.text,
        pictures: this.data.pictures,
        address: wx.getStorageSync("localAddress")
      },
      success: function success(res) {
        console.log(res);
        _toast2.default.show("success", "发布成功", 2000, function () {
          wx.switchTab({
            url: "/pages/index/index",
            success: function success(res) {}
          });
        });
      }
    });
  }
});