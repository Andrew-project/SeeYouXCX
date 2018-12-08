"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  properties: {
    chatInputExtraArr: {
      type: Array
    }
  },
  methods: {
    chatInputExtraItemClickEvent: function chatInputExtraItemClickEvent(e) {
      this.triggerEvent("extraItemClickEvent", e);
    }
  }
});