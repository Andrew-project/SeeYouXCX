"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIMHandlerFactory = undefined;

var _webSocketHandlerImp = require("./sdk/web-socket-handler-imp.js");

var _webSocketHandlerImp2 = _interopRequireDefault(_webSocketHandlerImp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getIMHandlerFactory = exports.getIMHandlerFactory = new _webSocketHandlerImp2.default();