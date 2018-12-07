"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _page = void 0;
var inputObj = {},
    recorderManager = void 0;
var windowHeight = void 0,
    windowWidth = void 0;
// let voice$position = {toLeft: 0, toBottom: 0};
var singleVoiceTimeCount = 0;
var maxVoiceTime = 60,
    minVoiceTime = 1,
    startTimeDown = 54;
var timer = void 0;
var sendVoiceCbOk = void 0,
    sendVoiceCbError = void 0,
    startVoiceRecordCbOk = void 0,
    tabbarHeigth = 0,
    extraButtonClickEvent = void 0,
    canUsePress = false,
    voiceFormat = void 0;
var cancelLineYPosition = 0;
var status = {
  START: 1,
  SUCCESS: 2,
  CANCEL: 3,
  SHORT: 4,
  FAIL: 5,
  UNAUTH: 6
};

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
      console.log(e);
      this.triggerEvent("longClickVoiceBtn", e.detail.target);
    },
    sendVoiceMoveEvent: function sendVoiceMoveEvent(e) {
      this.triggerEvent("sendVoiceMoveEvent", e.detail.target);
    },
    sendVoiceMoveEndEvent: function sendVoiceMoveEndEvent(e) {
      this.triggerEvent("sendVoiceMoveEndEvent", e.detail.target);
    }
    // let isRecordAuth = false;
  } });