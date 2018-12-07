"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  properties: {
    voiceObj: {
      type: Object
    },
    canUsePress: {
      type: Boolean
    },
    inputType: {
      type: String
    }
  },
  methods: {
    "longClickVoiceBtn": function longClickVoiceBtn(e) {
      this.triggerEvent("longClickVoiceBtn", e);
    },
    "sendVoiceMoveEvent": function sendVoiceMoveEvent(e) {
      this.triggerEvent("sendVoiceMoveEvent", e);
    },
    "sendVoiceMoveEndEvent": function sendVoiceMoveEndEvent(e) {
      this.triggerEvent("sendVoiceMoveEndEvent", e);
    }
  }
});