"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  properties: {
    item: {
      type: Object
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