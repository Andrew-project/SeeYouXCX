"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  properties: {
    item: {
      type: Object
    },
    length: {
      type: Number
    },
    index: {
      type: Number
    }
  },
  methods: {
    chatTextItemClickEvent: function chatTextItemClickEvent(e) {
      this.triggerEvent("chatTextItemClickEvent", e.detail);
    },
    imageClickEvent: function imageClickEvent(e) {
      this.triggerEvent("imageClickEvent", e.detail);
    },
    chatVoiceItemClickEvent: function chatVoiceItemClickEvent(e) {
      this.triggerEvent("chatVoiceItemClickEvent", e.detail);
    }
  }
});