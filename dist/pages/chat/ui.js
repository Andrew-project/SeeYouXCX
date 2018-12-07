'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chatInputJs = require('../../packages/chat-input/chat-input-js.js');

var chatInput = _interopRequireWildcard(_chatInputJs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 用户处理消息的收发UI更新
 */
var UI = function () {
    function UI(page) {
        _classCallCheck(this, UI);

        this._page = page;
    }

    /**
     * 接收到消息时，更新UI
     * @param msg
     */


    _createClass(UI, [{
        key: 'updateViewWhenReceive',
        value: function updateViewWhenReceive(msg) {
            this._page.data.chatItems.push(msg);
            this._page.setData({
                chatItems: this._page.data.chatItems.sort(UI._sortMsgListByTimestamp),
                scrollTopVal: this._page.data.chatItems.length * 999
            });
        }

        /**
         * 发送消息时，渲染消息的发送状态为 发送中
         * @param sendMsg
         * @param cbOk
         */

    }, {
        key: 'showItemForMoment',
        value: function showItemForMoment(sendMsg, cbOk) {
            if (!sendMsg) return;
            this.updateDataWhenStartSending(sendMsg);
            cbOk && cbOk(this._page.data.chatItems.length - 1);
        }

        /**
         * 设置消息发送状态为 发送中
         * @param sendMsg
         * @param addToArr
         * @param needScroll
         */

    }, {
        key: 'updateDataWhenStartSending',
        value: function updateDataWhenStartSending(sendMsg) {
            var addToArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var needScroll = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            chatInput.closeExtraView();
            sendMsg.sendStatus = 'sending';
            addToArr && this._page.data.chatItems.push(sendMsg);
            var obj = {};
            obj['textMessage'] = '';
            obj['chatItems'] = this._page.data.chatItems;
            needScroll && (obj['scrollTopVal'] = this._page.data.chatItems.length * 999);
            this._page.setData(obj);
        }

        /**
         * 设置消息发送状态为 发送成功
         * @param sendMsg
         * @param itemIndex
         */

    }, {
        key: 'updateViewWhenSendSuccess',
        value: function updateViewWhenSendSuccess(sendMsg, itemIndex) {
            console.log('发送成功', sendMsg);
            var that = this._page;
            var item = that.data.chatItems[itemIndex];
            item.timestamp = sendMsg.timestamp;
            this.updateSendStatusView('success', itemIndex);
        }
    }, {
        key: 'updateListViewBySort',
        value: function updateListViewBySort() {
            this._page.setData({
                chatItems: this._page.data.chatItems.sort(UI._sortMsgListByTimestamp)
            });
        }

        /**
         * 设置消息发送状态为 发送失败
         * @param itemIndex
         */

    }, {
        key: 'updateViewWhenSendFailed',
        value: function updateViewWhenSendFailed(itemIndex) {
            this.updateSendStatusView('failed', itemIndex);
        }
    }, {
        key: 'updateSendStatusView',
        value: function updateSendStatusView(status, itemIndex) {
            var that = this._page;
            that.data.chatItems[itemIndex].sendStatus = status;
            var obj = {};
            obj['chatItems[' + itemIndex + '].sendStatus'] = status;
            that.setData(obj);
        }
    }, {
        key: 'updateChatStatus',
        value: function updateChatStatus(content) {
            var open = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            this._page.setData({
                chatStatue: open ? 'open' : 'close',
                chatStatusContent: content
            });
        }
    }], [{
        key: '_sortMsgListByTimestamp',
        value: function _sortMsgListByTimestamp(item1, item2) {
            return item1.timestamp - item2.timestamp;
        }
    }]);

    return UI;
}();

exports.default = UI;