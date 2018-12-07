"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chatInputJs = require("../../packages/chat-input/chat-input-js.js");

var chatInput = _interopRequireWildcard(_chatInputJs);

var _imOperator = require("./im-operator.js");

var _imOperator2 = _interopRequireDefault(_imOperator);

var _ui = require("./ui.js");

var _ui2 = _interopRequireDefault(_ui);

var _msgManager = require("./msg-manager.js");

var _msgManager2 = _interopRequireDefault(_msgManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * 聊天页面
 */
// pages/list/list.js
exports.default = Page({
  data: {
    textMessage: "",
    chatItems: [],
    latestPlayVoicePath: "",
    isAndroid: true,
    chatStatue: "open",
    NAV_HEIGHT: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT + "px"
  }
  /**
   * 页面的初始数据
   */
  ,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    var _this = this;

    var friend = JSON.parse(options.friend);
    console.log(friend);
    this.initData();
    wx.setNavigationBarTitle({
      title: friend.friendName || ""
    });
    this.imOperator = new _imOperator2.default(this, friend);
    this.UI = new _ui2.default(this);
    this.msgManager = new _msgManager2.default(this);

    this.imOperator.onSimulateReceiveMsg(function (msg) {
      _this.msgManager.showMsg({
        msg: msg
      });
    });
    this.UI.updateChatStatus("正在聊天中...");
  },
  initData: function initData() {
    var that = this;
    console.warn(chatInput);
    var systemInfo = wx.getSystemInfoSync();
    chatInput.init(this, {
      systemInfo: systemInfo,
      minVoiceTime: 1,
      maxVoiceTime: 60,
      startTimeDown: 56,
      format: "mp3", //aac/mp3
      sendButtonBgColor: "mediumseagreen",
      sendButtonTextColor: "white",
      extraArr: [{
        picName: "choose_picture",
        description: "照片"
      }, {
        picName: "take_photos",
        description: "拍摄"
      }, {
        picName: "close_chat",
        description: "自定义功能"
      }]
      // tabbarHeigth: 48
    });

    that.setData({
      pageHeight: systemInfo.windowHeight,
      isAndroid: systemInfo.system.indexOf("Android") !== -1
    });
    wx.setNavigationBarTitle({
      title: "好友"
    });
    that.textButton();
    that.extraButton();
    that.voiceButton();
  },
  textButton: function textButton() {
    var _this2 = this;

    chatInput.setTextMessageListener(function (e) {
      var content = e.detail.value;
      _this2.msgManager.sendMsg({
        type: _this2.imOperator.TextType(),
        content: content
      });
    });
  },
  voiceButton: function voiceButton() {
    var _this3 = this;

    chatInput.recordVoiceListener(function (res, duration) {
      var tempFilePath = res.tempFilePath;
      _this3.msgManager.sendMsg({
        type: _this3.imOperator.VoiceType(),
        content: tempFilePath,
        duration: duration
      });
    });
    chatInput.setVoiceRecordStatusListener(function (status) {
      _this3.msgManager.stopAllVoice();
    });
  },


  //模拟上传文件，注意这里的cbOk回调函数传入的参数应该是上传文件成功时返回的文件url，这里因为模拟，我直接用的savedFilePath
  simulateUploadFile: function simulateUploadFile(_ref) {
    var savedFilePath = _ref.savedFilePath,
        duration = _ref.duration,
        itemIndex = _ref.itemIndex,
        success = _ref.success,
        fail = _ref.fail;

    setTimeout(function () {
      var urlFromServerWhenUploadSuccess = savedFilePath;
      success && success(urlFromServerWhenUploadSuccess);
    }, 1000);
  },
  extraButton: function extraButton() {
    var _this4 = this;

    var that = this;
    chatInput.clickExtraListener(function (e) {
      var chooseIndex = parseInt(e.currentTarget.dataset.index);
      if (chooseIndex === 2) {
        that.myFun();
        return;
      }
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["compressed"],
        sourceType: chooseIndex === 0 ? ["album"] : ["camera"],
        success: function success(res) {
          _this4.msgManager.sendMsg({
            type: _this4.imOperator.ImageType(),
            content: res.tempFilePaths[0]
          });
        }
      });
    });
  },

  /**
   * 自定义事件
   */
  myFun: function myFun() {
    var _this5 = this;

    wx.showModal({
      title: "小贴士",
      content: "演示更新会话状态",
      confirmText: "确认",
      showCancel: true,
      success: function success(res) {
        if (res.confirm) {
          _this5.msgManager.sendMsg({
            type: _this5.imOperator.CustomType()
          });
        }
      }
    });
  },
  resetInputStatus: function resetInputStatus() {
    chatInput.closeExtraView();
  },
  sendMsg: function sendMsg(_ref2) {
    var _this6 = this;

    var content = _ref2.content,
        itemIndex = _ref2.itemIndex,
        _success = _ref2.success;

    this.imOperator.onSimulateSendMsg({
      content: content,
      success: function success(msg) {
        _this6.UI.updateViewWhenSendSuccess(msg, itemIndex);
        _success && _success(msg);
      },
      fail: function fail() {
        _this6.UI.updateViewWhenSendFailed(itemIndex);
      }
    });
  },

  /**
   * 重发消息
   * @param e
   */
  resendMsgEvent: function resendMsgEvent(e) {
    var itemIndex = parseInt(e.currentTarget.dataset.resendIndex);
    var item = this.data.chatItems[itemIndex];
    this.UI.updateDataWhenStartSending(item, false, false);
    this.msgManager.resend(Object.assign(item, {
      itemIndex: itemIndex
    }));
  }
});