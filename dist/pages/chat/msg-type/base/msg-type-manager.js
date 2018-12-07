"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imOperator = require("../../im-operator.js");

var _imOperator2 = _interopRequireDefault(_imOperator);

var _voiceManager = require("../voice-manager.js");

var _voiceManager2 = _interopRequireDefault(_voiceManager);

var _textManager = require("../text-manager.js");

var _textManager2 = _interopRequireDefault(_textManager);

var _imageManager = require("../image-manager.js");

var _imageManager2 = _interopRequireDefault(_imageManager);

var _customManager = require("../custom-manager.js");

var _customManager2 = _interopRequireDefault(_customManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MsgTypeManager = function () {
    function MsgTypeManager(page) {
        _classCallCheck(this, MsgTypeManager);

        this.voiceManager = new _voiceManager2.default(page);
        this.textManager = new _textManager2.default(page);
        this.imageManager = new _imageManager2.default(page);
        this.customManager = new _customManager2.default(page);
    }

    _createClass(MsgTypeManager, [{
        key: "getMsgManager",
        value: function getMsgManager(_ref) {
            var type = _ref.type;

            var tempManager = null;
            switch (type) {
                case 'voice':
                    tempManager = this.voiceManager;
                    break;
                case 'image':
                    tempManager = this.imageManager;
                    break;
                case 'text':
                    tempManager = this.textManager;
                    break;
                case 'custom':
                    tempManager = this.customManager;
                    break;
            }
            return tempManager;
        }
    }, {
        key: "clear",
        value: function clear() {
            this.voiceManager = null;
            this.textManager = null;
            this.imageManager = null;
            this.customManager = null;
        }
    }]);

    return MsgTypeManager;
}();

exports.default = MsgTypeManager;