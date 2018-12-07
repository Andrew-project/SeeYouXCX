"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  properties: {
    isMy: {
      type: Boolean
    },
    index: {
      type: Number
    },
    length: {
      type: Number
    },
    headUrl: {
      type: String
    },
    type: {
      type: String
    },
    content: {
      type: String
    },
    voiceDuration: {
      type: Number
    },
    sendStatus: {
      type: String
    }
  },
  methods: {
    chatTextItemClickEvent: function chatTextItemClickEvent(e) {
      this.triggerEvent("chatTextItemClickEvent", e);
    },
    imageClickEvent: function imageClickEvent(e) {
      this.triggerEvent("imageClickEvent", e);
    },
    chatVoiceItemClickEvent: function chatVoiceItemClickEvent(e) {
      this.triggerEvent("chatVoiceItemClickEvent", e);
    }
  }
});