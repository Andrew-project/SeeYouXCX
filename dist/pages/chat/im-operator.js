'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _time = require('../../static/utils/time.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 这个类是IM模拟类，作为示例仅供参考。
 */
var IMOperator = function () {
    _createClass(IMOperator, [{
        key: 'VoiceType',
        value: function VoiceType() {
            return 'voice';
        }
    }, {
        key: 'TextType',
        value: function TextType() {
            return 'text';
        }
    }, {
        key: 'ImageType',
        value: function ImageType() {
            return 'image';
        }
    }, {
        key: 'CustomType',
        value: function CustomType() {
            return 'custom';
        }
    }]);

    function IMOperator(page, opts) {
        _classCallCheck(this, IMOperator);

        this._opts = opts;
        this._latestTImestamp = 0; //最新消息的时间戳
        this._myHeadUrl = getApp().globalData.userInfo.myHeadUrl;
        this._otherHeadUrl = this._opts.friendHeadUrl;
    }

    _createClass(IMOperator, [{
        key: 'getFriendId',
        value: function getFriendId() {
            return this._opts.friendId;
        }
    }, {
        key: 'onSimulateReceiveMsg',
        value: function onSimulateReceiveMsg(cbOk) {
            var _this = this;

            getApp().getIMHandler().sendMsg({
                content: {
                    type: 'get-history',
                    userId: getApp().globalData.userInfo.userId,
                    friendId: this.getFriendId()
                }
            });
            getApp().getIMHandler().setOnReceiveMessageListener({
                listener: function listener(msg) {
                    if (!msg) {
                        return;
                    }
                    msg.isMy = msg.msgUserId === getApp().globalData.userInfo.userId;
                    var item = _this.createNormalChatItem(msg);
                    // const item = this.createNormalChatItem({type: 'voice', content: '上传文件返回的语音文件路径', isMy: false});
                    // const item = this.createNormalChatItem({type: 'image', content: '上传文件返回的图片文件路径', isMy: false});
                    _this._latestTImestamp = item.timestamp;
                    //这里是收到好友消息的回调函数，建议传入的item是 由 createNormalChatItem 方法生成的。
                    cbOk && cbOk(item);
                }
            });
        }
    }, {
        key: 'onSimulateSendMsg',
        value: function onSimulateSendMsg(_ref) {
            var _this2 = this;

            var content = _ref.content,
                _success = _ref.success,
                fail = _ref.fail;

            //这里content即为要发送的数据
            //这里的content是一个对象了，不再是一个JSON格式的字符串。这样可以在发送消息的底层统一处理。
            getApp().getIMHandler().sendMsg({
                content: content,
                success: function success(content) {
                    //这个content格式一样,也是一个对象
                    var item = _this2.createNormalChatItem(content);
                    _this2._latestTImestamp = item.timestamp;
                    _success && _success(item);
                },
                fail: fail
            });
        }
    }, {
        key: 'createChatItemContent',
        value: function createChatItemContent() {
            var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref2$type = _ref2.type,
                type = _ref2$type === undefined ? 'text' : _ref2$type,
                _ref2$content = _ref2.content,
                content = _ref2$content === undefined ? '' : _ref2$content,
                duration = _ref2.duration;

            if (!content.replace(/^\s*|\s*$/g, '')) return;
            return {
                content: content,
                type: type,
                conversationId: 0, //会话id，目前未用到
                userId: getApp().globalData.userInfo.userId,
                friendId: this.getFriendId(), //好友id
                duration: duration
            };
        }
    }, {
        key: 'createNormalChatItem',
        value: function createNormalChatItem() {
            var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref3$type = _ref3.type,
                type = _ref3$type === undefined ? 'text' : _ref3$type,
                _ref3$content = _ref3.content,
                content = _ref3$content === undefined ? '' : _ref3$content,
                _ref3$isMy = _ref3.isMy,
                isMy = _ref3$isMy === undefined ? true : _ref3$isMy,
                duration = _ref3.duration;

            if (!content) return;
            var currentTimestamp = Date.now();
            var time = (0, _time.dealChatTime)(currentTimestamp, this._latestTImestamp);
            var obj = {
                msgId: Math.random() * 100, //消息id
                friendId: this.getFriendId(), //好友id
                isMy: isMy, //我发送的消息？
                showTime: time.ifShowTime, //是否显示该次发送时间
                time: time.timeStr, //发送时间 如 09:15,
                timestamp: currentTimestamp, //该条数据的时间戳，一般用于排序
                type: type, //内容的类型，目前有这几种类型： text/voice/image/custom | 文本/语音/图片/自定义
                content: content, // 显示的内容，根据不同的类型，在这里填充不同的信息。
                headUrl: isMy ? this._myHeadUrl : this._otherHeadUrl, //显示的头像，自己或好友的。
                sendStatus: 'success', //发送状态，目前有这几种状态：sending/success/failed | 发送中/发送成功/发送失败
                voiceDuration: duration, //语音时长 单位秒
                isPlaying: false //语音是否正在播放
            };
            obj.saveKey = obj.friendId + '_' + obj.msgId; //saveKey是存储文件时的key
            return obj;
        }
    }], [{
        key: 'createCustomChatItem',
        value: function createCustomChatItem() {
            return {
                timestamp: Date.now(),
                type: 'custom',
                content: '会话已关闭'
            };
        }
    }]);

    return IMOperator;
}();

exports.default = IMOperator;