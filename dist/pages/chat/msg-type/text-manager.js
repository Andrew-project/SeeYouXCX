"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextManager = function () {
    function TextManager(page) {
        _classCallCheck(this, TextManager);

        this._page = page;
    }

    /**
     * 接收到消息时，通过UI类的管理进行渲染
     * @param msg 接收到的消息，这个对象应是由 im-operator.js 中的createNormalChatItem()方法生成的。
     */


    _createClass(TextManager, [{
        key: "showMsg",
        value: function showMsg(_ref) {
            var msg = _ref.msg;

            //UI类是用于管理UI展示的类。
            this._page.UI.updateViewWhenReceive(msg);
        }

        /**
         * 发送消息时，通过UI类来管理发送状态的切换和消息的渲染
         * @param content 输入组件获取到的原始文本信息
         * @param type
         */

    }, {
        key: "sendOneMsg",
        value: function sendOneMsg(_ref2) {
            var _this = this;

            var content = _ref2.content,
                type = _ref2.type;

            this._page.UI.showItemForMoment(this._page.imOperator.createNormalChatItem({
                type: type,
                content: content
            }), function (itemIndex) {
                _this._page.sendMsg({
                    content: _this._page.imOperator.createChatItemContent({ type: type, content: content }),
                    itemIndex: itemIndex
                });
            });
        }
    }, {
        key: "resend",
        value: function resend(_ref3) {
            var _this2 = this;

            var type = _ref3.type,
                content = _ref3.content,
                duration = _ref3.duration,
                itemIndex = _ref3.itemIndex;

            this._page.sendMsg({
                content: this._page.imOperator.createChatItemContent({
                    type: type,
                    content: content,
                    duration: duration
                }),
                itemIndex: itemIndex,
                success: function success(msg) {
                    _this2._page.UI.updateListViewBySort();
                }
            });
        }
    }]);

    return TextManager;
}();

exports.default = TextManager;