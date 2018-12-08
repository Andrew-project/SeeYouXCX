'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _iImHandler = require('../interface/i-im-handler.js');

var _iImHandler2 = _interopRequireDefault(_iImHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WebSocketHandlerImp = function (_IIMHandler) {
    _inherits(WebSocketHandlerImp, _IIMHandler);

    function WebSocketHandlerImp() {
        _classCallCheck(this, WebSocketHandlerImp);

        var _this = _possibleConstructorReturn(this, (WebSocketHandlerImp.__proto__ || Object.getPrototypeOf(WebSocketHandlerImp)).call(this));

        _this._onSocketOpen();
        _this._onSocketMessage();
        _this._onSocketError();
        _this._onSocketClose();
        return _this;
    }

    /**
     * 创建WebSocket连接
     * 如：this.imWebSocket = new IMWebSocket();
     *    this.imWebSocket.createSocket({url: 'ws://10.4.97.87:8001'});
     * 如果你使用本地服务器来测试，那么这里的url需要用ws，而不是wss，因为用wss无法成功连接到本地服务器
     * @param options 建立连接时需要的配置信息，这里是传入的url，即你的服务端地址，端口号不是必需的。
     */


    _createClass(WebSocketHandlerImp, [{
        key: 'createConnection',
        value: function createConnection(_ref) {
            var options = _ref.options;

            !this._isLogin && wx.connectSocket({
                url: options.url,
                header: {
                    'content-type': 'application/json'
                },
                method: 'GET'
            });
        }
    }, {
        key: '_sendMsgImp',
        value: function _sendMsgImp(_ref2) {
            var content = _ref2.content,
                _success = _ref2.success,
                _fail = _ref2.fail;

            wx.sendSocketMessage({
                data: JSON.stringify(content),
                success: function success() {
                    _success && _success(content);
                },
                fail: function fail(res) {
                    _fail && _fail(res);
                }
            });
        }

        /**
         * 关闭webSocket
         */

    }, {
        key: 'closeConnection',
        value: function closeConnection() {
            wx.closeSocket();
        }
    }, {
        key: '_onSocketError',
        value: function _onSocketError(cb) {
            var _this2 = this;

            wx.onSocketError(function (res) {
                _this2._isLogin = false;
                console.log('WebSocket连接打开失败，请检查！', res);
            });
        }
    }, {
        key: '_onSocketClose',
        value: function _onSocketClose(cb) {
            var _this3 = this;

            wx.onSocketClose(function (res) {
                _this3._isLogin = false;
                console.log('WebSocket 已关闭！', res);
            });
        }
    }, {
        key: '_onSocketOpen',
        value: function _onSocketOpen() {
            wx.onSocketOpen(function (res) {
                console.log('WebSocket连接已打开！');
            });
        }

        /**
         * webSocket是在这里接收消息的
         * 在socket连接成功时，服务器会主动给客户端推送一条消息类型为login的信息，携带了用户的基本信息，如id，头像和昵称。
         * 在login信息接收前发送的所有消息，都会被推到msgQueue队列中，在登录成功后会自动重新发送。
         * 这里我进行了事件的分发，接收到非login类型的消息，会回调监听函数。
         * @private
         */

    }, {
        key: '_onSocketMessage',
        value: function _onSocketMessage() {
            var _this4 = this;

            wx.onSocketMessage(function (res) {
                var msg = JSON.parse(res.data);
                if ('login' === msg.type) {
                    _this4._isLogin = true;
                    getApp().globalData.userInfo = msg.userInfo;
                    getApp().globalData.friendsId = msg.friendsId;
                    if (_this4._msgQueue.length) {
                        while (temp = _this4._msgQueue.shift()) {
                            _this4.sendMsg({
                                content: Object.assign(temp, {
                                    userId: msg.userInfo.userId
                                })
                            });
                        }
                    }
                } else {
                    _this4._receiveListener && _this4._receiveListener(msg);
                }
            });
        }
    }]);

    return WebSocketHandlerImp;
}(_iImHandler2.default);

exports.default = WebSocketHandlerImp;