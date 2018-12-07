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
    toChatHandler: function toChatHandler(e) {
      this.triggerEvent("toChat", e);
    }
  }
});