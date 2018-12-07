'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imOperator = require('../im-operator.js');

var _imOperator2 = _interopRequireDefault(_imOperator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CustomManager = function () {
    function CustomManager(page) {
        _classCallCheck(this, CustomManager);

        this._page = page;
    }

    /**
     * 接收到消息时，通过UI类的管理进行渲染
     * @param msg 接收到的消息，这个对象应是由 im-operator.js 中的createNormalChatItem()方法生成的。
     */


    _createClass(CustomManager, [{
        key: 'showMsg',
        value: function showMsg(_ref) {
            var msg = _ref.msg;

            //UI类是用于管理UI展示的类。
            this._page.UI.updateViewWhenReceive(msg);
            this._page.UI.updateChatStatus('会话已关闭', false);
        }

        /**
         * 发送消息时，通过UI类来管理发送状态的切换和消息的渲染
         */

    }, {
        key: 'sendOneMsg',
        value: function sendOneMsg() {
            var _this = this;

            var temp = _imOperator2.default.createCustomChatItem();
            this._page.UI.showItemForMoment(temp, function (itemIndex) {
                _this._page.sendMsg({
                    content: _this._page.imOperator.createChatItemContent({
                        type: _imOperator2.default.CustomType(),
                        content: temp.content
                    }),
                    itemIndex: itemIndex
                });
                _this._page.UI.updateChatStatus('会话已关闭', false);
            });
        }
    }]);

    return CustomManager;
}();

exports.default = CustomManager;