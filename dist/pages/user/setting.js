"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toast = require("../../static/utils/toast.js");

var _toast2 = _interopRequireDefault(_toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = getApp();
exports.default = Page({
  data: {
    genderRange: ["女", "男"],
    gender: 0,
    ageRange: [],
    ageIndex: 10,
    defalutAvatar: "",
    description: ""
  },
  onLoad: function onLoad() {
    var ages = ["14岁以下"];
    for (var i = 14; i < 51; i++) {
      ages.push("" + i);
    }
    this.setData({
      ageRange: [].concat(ages, ["50岁以上"])
    });
    try {
      var user = wx.getStorageSync("userInfo");
      if (user) {
        var ageRange = this.data.ageRange;
        this.setData({
          gender: user.gender == undefined ? 0 : user.gender,
          ageIndex: user.age == undefined ? 10 : ageRange.findIndex(function (age) {
            return age == user.age + '';
          }),
          userInfo: user
        });
      }
    } catch (e) {}
  },
  onShow: function onShow(e) {},
  chooseImage: function chooseImage() {
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
      count: 1, // 默认9
      sizeType: ["compressed"],
      success: function success(res) {
        var tempFilePath = res.tempFilePaths[0];
        wx.uploadFile({
          url: baseURL + "file/uploadFile?folderName=image",
          filePath: tempFilePath,
          name: "file",
          header: {
            Accept: "application/json"
          },
          success: function success(res) {
            var imgData = JSON.parse(res.data);
            that.setData({
              'userInfo.avatarUrl': imgData.data
            });
          }
        });
      },
      complete: function complete() {}
    });
  },
  bindGenderChange: function bindGenderChange(e) {
    this.setData({
      gender: parseInt(e.detail.value)
    });
  },
  bindAgeChange: function bindAgeChange(e) {
    this.setData({
      ageIndex: parseInt(e.detail.value)
    });
  },
  bindInputDesc: function bindInputDesc(e) {
    this.setData({
      description: e.detail.value
    });
  },
  formSubmit: function formSubmit(e) {
    console.log(e);
    console.log(this.data);
    // wx.navigateBack({
    //   delta: 1 // 回退前 delta(默认为1) 页面
    // });
    var value = e.detail.value;
    app.cRequest({
      url: 'user/information',
      method: 'post',
      data: {
        nickName: value.nickName,
        description: value.description,
        gender: value.gender,
        age: parseInt(this.data.ageRange[value.ageIndex]),
        avatarUrl: this.data.userInfo.avatarUrl
      },
      success: function success(res) {
        _toast2.default.show('success', '更新成功', 2000, function () {
          wx.setStorageSync("userInfo", res);
          wx.navigateBack({
            delta: 1
          });
        });
      }
    });
  }
});