"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    genderRange: ["男", "女"],
    genderIndex: 1,
    gender: "女",
    ageRange: [],
    ageIndex: 10,
    age: 23,
    defalutAvatar: "",
    remark: ""
  },
  onShow: function onShow(e) {
    var ages = ["14岁以下"];
    for (var i = 14; i < 51; i++) {
      ages.push("" + i);
    }
    this.setData({
      ageRange: [].concat(ages, ["50岁以上"])
    });
  },
  chooseImage: function chooseImage() {
    var _this = this;

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ["compressed"],
      success: function success(res) {
        var tempFilePath = res.tempFilePaths[0];
        _this.setData({
          avatarUrl: tempFilePath
        });
        // wx.uploadFile({
        //   url:
        //     baseURL + `api/ultimatelaw/v1/upload/upload-file?folderName=image`,
        //   filePath: tempFilePath,
        //   name: "file",
        //   header: {
        //     Accept: "application/json"
        //   },
        //   success: function(res) {
        //     var data = JSON.parse(res.data);
        //     if (data.result.success) {
        //       that.setData({
        //         avatarUrl: data.data.url
        //       });
        //     }
        //   },
        //   fail: function(err) {
        //     toast.show("warn", err.errMsg);
        //   }
        // });
      },
      complete: function complete() {}
    });
  },
  bindGenderChange: function bindGenderChange(e) {
    this.setData({
      gender: this.data.genderRange[parseInt(e.detail.value)],
      genderIndex: parseInt(e.detail.value)
    });
  },
  bindAgeChange: function bindAgeChange(e) {
    this.setData({
      age: this.data.ageRange[parseInt(e.detail.value)],
      ageIndex: parseInt(e.detail.value)
    });
  },
  bindInputDesc: function bindInputDesc(e) {
    this.setData({
      remark: e.detail.value
    });
  },
  formSubmit: function formSubmit(e) {
    console.log(e);
    console.log(this.data);
    wx.navigateBack({
      delta: 1 // 回退前 delta(默认为1) 页面
    });
  }
});