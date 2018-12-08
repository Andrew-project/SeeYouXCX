"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = getApp();
exports.default = Page({
  data: {
    conversations: [],
    NAV_HEIGHT: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT + "px"
  },
  onLoad: function onLoad(options) {},
  toChat: function toChat(e) {
    console.log(e);
    var item = e.detail.currentTarget.dataset.item;
    delete item.latestMsg;
    delete item.unread;
    delete item.content;
    wx.navigateTo({
      url: "../chat/chat?friend=" + JSON.stringify(item)
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    var _this = this;

    app.getIMHandler().setOnReceiveMessageListener({
      listener: function listener(msg) {
        console.log("会话列表", msg);
        msg.type === "get-conversations" && _this.setData({
          conversations: msg.conversations.map(function (item) {
            return _this.getConversationsItem(item);
          })
        });
      }
    });
    app.getIMHandler().sendMsg({
      content: {
        type: "get-conversations",
        userId: getApp().globalData.userInfo.userId
      },
      success: function success() {
        console.log("获取会话列表消息发送成功");
      },
      fail: function fail(res) {
        console.log("获取会话列表失败", res);
      }
    });
  },
  getConversationsItem: function getConversationsItem(item) {
    return Object.assign(item, JSON.parse(item.latestMsg));
  }
});