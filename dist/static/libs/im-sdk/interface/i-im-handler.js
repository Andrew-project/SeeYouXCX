"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 由于JavaScript没有接口的概念，所以我编写了这个IM基类
 * 将你自己的IM的实现类继承这个类就可以了
 * 我把IM通信的常用方法封装在这里，
 * 有些实现了具体细节，但有些没实现，是作为抽象函数，由子类去实现细节，这点是大家需要注意的
 */
var IIMHandler = function () {
    function IIMHandler() {
        _classCallCheck(this, IIMHandler);

        this._isLogin = false;
        this._msgQueue = [];
        this._receiveListener = null;
    }

    /**
     * 创建IM连接
     * @param options 传入你建立连接时需要的配置信息，比如url
     */


    _createClass(IIMHandler, [{
        key: "createConnection",
        value: function createConnection(_ref) {
            var options = _ref.options;
        }
        // 作为抽象函数


        /**
         * 发送消息
         * @param content 需要发送的消息，是一个对象，如{type:'text',content:'abc'}
         * @param success 发送成功回调
         * @param fail 发送失败回调
         */

    }, {
        key: "sendMsg",
        value: function sendMsg(_ref2) {
            var content = _ref2.content,
                success = _ref2.success,
                fail = _ref2.fail;

            if (this._isLogin) {
                this._sendMsgImp({ content: content, success: success, fail: fail });
            } else {
                this._msgQueue.push(content);
            }
        }

        /**
         * 消息接收监听函数
         * @param listener
         */

    }, {
        key: "setOnReceiveMessageListener",
        value: function setOnReceiveMessageListener(_ref3) {
            var listener = _ref3.listener;

            this._receiveListener = listener;
        }
    }, {
        key: "closeConnection",
        value: function closeConnection() {
            // 作为抽象函数
        }
    }, {
        key: "_sendMsgImp",
        value: function _sendMsgImp(_ref4) {
            // 作为抽象函数

            var content = _ref4.content,
                success = _ref4.success,
                fail = _ref4.fail;
        }
    }]);

    return IIMHandler;
}();

exports.default = IIMHandler;