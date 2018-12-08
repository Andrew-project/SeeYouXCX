"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// let _page;
// let inputObj = {},
//   recorderManager;
// let windowHeight, windowWidth;
// // let voice$position = {toLeft: 0, toBottom: 0};
// let singleVoiceTimeCount = 0;
// let maxVoiceTime = 60,
//   minVoiceTime = 1,
//   startTimeDown = 54;
// let timer;
// let sendVoiceCbOk,
//   sendVoiceCbError,
//   startVoiceRecordCbOk,
//   tabbarHeigth = 0,
//   extraButtonClickEvent,
//   canUsePress = false,
//   voiceFormat;
// let cancelLineYPosition = 0;
// let status = {
//   START: 1,
//   SUCCESS: 2,
//   CANCEL: 3,
//   SHORT: 4,
//   FAIL: 5,
//   UNAUTH: 6
// };

exports.default = Component({
  properties: {
    inputObj: {
      type: Object
    },
    showVoicePart: {
      type: Number
    },
    textMessage: {
      type: String
    }
  },
  methods: {
    changeInputWayEvent: function changeInputWayEvent(e) {
      this.triggerEvent("changeInputWayEvent", e.detail);
    },
    chatInputSendTextMessage: function chatInputSendTextMessage(e) {
      this.triggerEvent("chatInputSendTextMessage", e.detail);
    },
    chatInputBindFocusEvent: function chatInputBindFocusEvent(e) {
      this.triggerEvent("chatInputBindFocusEvent", e.detail);
    },
    chatInputGetValueEvent: function chatInputGetValueEvent(e) {
      this.triggerEvent("chatInputGetValueEvent", e.detail);
    },
    chatInputBindBlurEvent: function chatInputBindBlurEvent(e) {
      this.triggerEvent("chatInputBindBlurEvent", e.detail);
    },
    chatInputSendTextMessage02: function chatInputSendTextMessage02(e) {
      this.triggerEvent("chatInputSendTextMessage02", e.detail);
    },
    chatInputExtraClickEvent: function chatInputExtraClickEvent(e) {
      this.triggerEvent("chatInputExtraClickEvent", e.detail);
    },
    chatInputExtraItemClickEvent: function chatInputExtraItemClickEvent(e) {
      this.triggerEvent("chatInputExtraItemClickEvent", e.detail);
    },
    longClickVoiceBtn: function longClickVoiceBtn(e) {
      this.triggerEvent("longClickVoiceBtn", e.detail.target);
    },
    sendVoiceMoveEvent: function sendVoiceMoveEvent(e) {
      this.triggerEvent("sendVoiceMoveEvent", e.detail);
    },
    sendVoiceMoveEndEvent: function sendVoiceMoveEndEvent(e) {
      this.triggerEvent("sendVoiceMoveEndEvent", e.detail.target);
    },
    extraItemClickEvent: function extraItemClickEvent(e) {
      this.triggerEvent("extraItemClickEvent", e.detail);
    }
    // let isRecordAuth = false;
  } });