"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fileSaveManager = require("../../file-save-manager.js");

var _fileSaveManager2 = _interopRequireDefault(_fileSaveManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FileManager = function () {
    function FileManager(page) {
        _classCallCheck(this, FileManager);

        this._page = page;
    }

    /**
     * 接收到消息时，通过UI类的管理进行渲染
     * @param msg 接收到的消息，这个对象应是由 im-operator.js 中的createNormalChatItem()方法生成的。
     */


    _createClass(FileManager, [{
        key: "showMsg",
        value: function showMsg(_ref) {
            var _this = this;

            var msg = _ref.msg;

            var url = msg.content;
            var localFilePath = _fileSaveManager2.default.get(msg);
            if (!localFilePath) {
                wx.downloadFile({
                    url: url,
                    success: function success(res) {
                        // console.log('下载成功', res);
                        _fileSaveManager2.default.saveFileRule({
                            tempFilePath: res.tempFilePath,
                            success: function success(savedFilePath) {
                                msg.content = savedFilePath;
                                _this._page.UI && _this._page.UI.updateViewWhenReceive(msg);
                                _fileSaveManager2.default.set(msg, savedFilePath);
                            },
                            fail: function fail(res) {
                                // console.log('存储失败', res);
                                _this._page.UI && _this._page.UI.updateViewWhenReceive(msg);
                            }
                        });
                    }
                });
            } else {
                msg.content = localFilePath;
                this._page.UI.updateViewWhenReceive(msg);
            }
        }

        /**
         * 发送文件类型消息
         * @param type 消息类型
         * @param content 由输入组件接收到的临时文件路径
         * @param duration 由输入组件接收到的录音时间
         */

    }, {
        key: "sendOneMsg",
        value: function sendOneMsg(_ref2) {
            var _this2 = this;

            var type = _ref2.type,
                content = _ref2.content,
                duration = _ref2.duration;

            _fileSaveManager2.default.saveFileRule({
                tempFilePath: content,
                success: function success(savedFilePath) {
                    _this2._sendFileMsg({ content: savedFilePath, duration: duration, type: type });
                }, fail: function fail(res) {
                    _this2._sendFileMsg({ content: content, type: type, duration: duration });
                }
            });
        }
    }, {
        key: "_sendFileMsg",
        value: function _sendFileMsg(_ref3) {
            var _this3 = this;

            var content = _ref3.content,
                duration = _ref3.duration,
                type = _ref3.type;

            var temp = this._page.imOperator.createNormalChatItem({
                type: type,
                content: content,
                duration: duration
            });
            this._page.UI.showItemForMoment(temp, function (itemIndex) {
                _this3.uploadFileAndSend({ content: content, duration: duration, itemIndex: itemIndex, type: type });
            });
        }
    }, {
        key: "uploadFileAndSend",
        value: function uploadFileAndSend(_ref4) {
            var _this4 = this;

            var content = _ref4.content,
                duration = _ref4.duration,
                type = _ref4.type,
                itemIndex = _ref4.itemIndex;

            this._page.simulateUploadFile({
                savedFilePath: content, duration: duration, itemIndex: itemIndex,
                success: function success(content) {
                    _this4._page.sendMsg({
                        content: _this4._page.imOperator.createChatItemContent({ type: type, content: content, duration: duration }),
                        itemIndex: itemIndex,
                        success: function success(msg) {
                            _fileSaveManager2.default.set(msg, content);
                        }
                    });
                }, fail: function fail() {}
            });
        }
    }, {
        key: "resend",
        value: function resend(_ref5) {
            //文件的重发在商业版中已经实现，开源版中需要你自行实现

            _objectDestructuringEmpty(_ref5);
        }
    }]);

    return FileManager;
}();

exports.default = FileManager;