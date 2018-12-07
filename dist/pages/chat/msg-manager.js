"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imOperator = require("./im-operator.js");

var _imOperator2 = _interopRequireDefault(_imOperator);

var _msgTypeManager = require("./msg-type/base/msg-type-manager.js");

var _msgTypeManager2 = _interopRequireDefault(_msgTypeManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MsgManager = function (_MsgTypeManager) {
    _inherits(MsgManager, _MsgTypeManager);

    function MsgManager(page) {
        _classCallCheck(this, MsgManager);

        return _possibleConstructorReturn(this, (MsgManager.__proto__ || Object.getPrototypeOf(MsgManager)).call(this, page));
    }

    _createClass(MsgManager, [{
        key: "showMsg",
        value: function showMsg(_ref) {
            var msg = _ref.msg;

            this.getMsgManager({
                type: msg.type
            }).showMsg({
                msg: msg
            });
        }
    }, {
        key: "sendMsg",
        value: function sendMsg(_ref2) {
            var _ref2$type = _ref2.type,
                type = _ref2$type === undefined ? 'text' : _ref2$type,
                content = _ref2.content,
                duration = _ref2.duration;

            this.getMsgManager({
                type: type
            }).sendOneMsg(arguments[0]);
        }
    }, {
        key: "resend",
        value: function resend(_ref3) {
            var type = _ref3.type,
                content = _ref3.content,
                duration = _ref3.duration,
                itemIndex = _ref3.itemIndex;

            this.getMsgManager({
                type: type
            }).resend(arguments[0]);
        }
    }, {
        key: "stopAllVoice",
        value: function stopAllVoice() {
            this.voiceManager.stopAllVoicePlay();
        }
    }]);

    return MsgManager;
}(_msgTypeManager2.default);

exports.default = MsgManager;