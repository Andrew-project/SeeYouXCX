"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chatInputJs = require("../../../packages/chat-input/chat-input-js.js");

var _imOperator = require("../im-operator.js");

var _imOperator2 = _interopRequireDefault(_imOperator);

var _fileManager = require("./base/file-manager.js");

var _fileManager2 = _interopRequireDefault(_fileManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VoiceManager = function (_FileManager) {
    _inherits(VoiceManager, _FileManager);

    function VoiceManager(page) {
        _classCallCheck(this, VoiceManager);

        var _this = _possibleConstructorReturn(this, (VoiceManager.__proto__ || Object.getPrototypeOf(VoiceManager)).call(this, page));

        _this.isLatestVersion = (0, _chatInputJs.isVoiceRecordUseLatestVersion)();
        //判断是否需要使用高版本语音播放接口
        if (_this.isLatestVersion) {
            _this.innerAudioContext = wx.createInnerAudioContext();
        }
        //在该类被初始化时，绑定语音点击播放事件
        _this._page.chatVoiceItemClickEvent = function (e) {
            var dataset = e.detail.currentTarget.dataset;
            console.log('语音Item', dataset);
            _this._playVoice({
                dataset: dataset
            });
        };
        return _this;
    }

    /**
     * 停止播放所有语音
     */


    _createClass(VoiceManager, [{
        key: "stopAllVoicePlay",
        value: function stopAllVoicePlay() {
            var _this2 = this;

            var that = this._page;
            if (this._page.data.isVoicePlaying) {
                this._stopVoice();
                that.data.chatItems.forEach(function (item) {
                    if (_this2._page.imOperator.VoiceType() === item.type) {
                        item.isPlaying = false;
                    }
                });
                that.setData({
                    chatItems: that.data.chatItems,
                    isVoicePlaying: false
                });
            }
        }

        /**
         * 停止播放 兼容低版本语音播放
         * @private
         */

    }, {
        key: "_stopVoice",
        value: function _stopVoice() {
            if (this.isLatestVersion) {
                this.innerAudioContext.stop();
            } else {
                wx.stopVoice();
            }
        }
    }, {
        key: "_playVoice",
        value: function _playVoice(_ref) {
            var _this3 = this;

            var dataset = _ref.dataset;

            var that = this._page;
            if (dataset.voicePath === that.data.latestPlayVoicePath && that.data.chatItems[dataset.index].isPlaying) {
                this.stopAllVoicePlay();
            } else {
                this._startPlayVoice(dataset);
                var localPath = dataset.voicePath; //优先读取本地路径，可能不存在此文件

                this._myPlayVoice(localPath, dataset, function () {
                    console.log('成功读取了本地语音');
                }, function () {
                    console.log('读取本地语音文件失败，一般情况下是本地没有该文件，需要从服务器下载');
                    wx.downloadFile({
                        url: dataset.voicePath,
                        success: function success(res) {
                            console.log('下载语音成功', res);
                            _this3.__playVoice({
                                filePath: res.tempFilePath,
                                success: function success() {
                                    _this3.stopAllVoicePlay();
                                },
                                fail: function fail(res) {
                                    console.log('播放失败了', res);
                                }
                            });
                        }
                    });
                });
            }
        }

        /**
         * 播放语音 兼容低版本语音播放
         * @param filePath
         * @param success
         * @param fail
         * @private
         */

    }, {
        key: "__playVoice",
        value: function __playVoice(_ref2) {
            var _this4 = this;

            var filePath = _ref2.filePath,
                success = _ref2.success,
                fail = _ref2.fail;

            if (this.isLatestVersion) {
                this.innerAudioContext.src = filePath;
                this.innerAudioContext.startTime = 0;
                this.innerAudioContext.play();
                this.innerAudioContext.onError(function (error) {
                    _this4.innerAudioContext.offError();
                    fail && fail(error);
                });
                this.innerAudioContext.onEnded(function () {
                    _this4.innerAudioContext.offEnded();
                    success && success();
                });
            } else {
                wx.playVoice({
                    filePath: filePath,
                    success: success,
                    fail: fail
                });
            }
        }
    }, {
        key: "_myPlayVoice",
        value: function _myPlayVoice(filePath, dataset, cbOk, cbError) {
            var _this5 = this;

            var that = this._page;
            if (dataset.isMy || that.data.isAndroid) {
                this.__playVoice({
                    filePath: filePath,
                    success: function success() {
                        _this5.stopAllVoicePlay();
                        typeof cbOk === "function" && cbOk();
                    },
                    fail: function fail(res) {
                        console.log('播放失败了1', res);
                        typeof cbError === "function" && cbError(res);
                    }
                });
            } else {
                wx.downloadFile({
                    url: dataset.voicePath,
                    success: function success(res) {
                        console.log('下载语音成功', res);
                        _this5.__playVoice({
                            filePath: res.tempFilePath,
                            success: function success() {
                                _this5.stopAllVoicePlay();
                                typeof cbOk === "function" && cbOk();
                            },
                            fail: function fail(res) {
                                console.log('播放失败了', res);
                                typeof cbError === "function" && cbError(res);
                            }
                        });
                    }
                });
            }
        }
    }, {
        key: "_startPlayVoice",
        value: function _startPlayVoice(dataset) {
            var that = this._page;
            var chatItems = that.data.chatItems;
            console.log(chatItems);
            console.log('开始播放');
            console.log(dataset.index);
            chatItems[dataset.index].isPlaying = true;
            console.log(chatItems);
            if (that.data.latestPlayVoicePath && that.data.latestPlayVoicePath !== chatItems[dataset.index].content) {
                //如果重复点击同一个，则不将该isPlaying置为false
                for (var i = 0, len = chatItems.length; i < len; i++) {
                    if ('voice' === chatItems[i].type && that.data.latestPlayVoicePath === chatItems[i].content) {
                        chatItems[i].isPlaying = false;
                        break;
                    }
                }
            }
            console.log(chatItems);
            that.setData({
                chatItems: chatItems,
                isVoicePlaying: true
            });
            that.data.latestPlayVoicePath = dataset.voicePath;
        }
    }]);

    return VoiceManager;
}(_fileManager2.default);

exports.default = VoiceManager;