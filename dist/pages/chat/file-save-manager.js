'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MAX_SIZE = 10400000;
var wholeSize = 0;
setTimeout(function () {
    wx.getSavedFileList({
        success: function success(savedFileInfo) {
            var fileList = savedFileInfo.fileList;

            !!fileList && fileList.forEach(function (item) {
                wholeSize += item.size;
            });
            // console.log(wholeSize, '总大小');
        }
    });
});

var FileSaveManager = function () {
    function FileSaveManager() {
        _classCallCheck(this, FileSaveManager);
    }

    _createClass(FileSaveManager, null, [{
        key: 'set',
        value: function set(msg, localPath) {
            wx.setStorage({ key: msg.saveKey, data: localPath });
        }
    }, {
        key: 'get',
        value: function get(msg) {
            return wx.getStorageSync(msg.saveKey);
        }
    }, {
        key: 'saveFileRule',
        value: function saveFileRule(_ref) {
            var tempFilePath = _ref.tempFilePath,
                _success = _ref.success,
                fail = _ref.fail;

            wx.getFileInfo({
                filePath: tempFilePath,
                success: function success(tempFailInfo) {
                    var tempFileSize = tempFailInfo.size;
                    // console.log('本地临时文件大小', tempFileSize);
                    if (tempFileSize > MAX_SIZE) {
                        !!fail && fail('文件过大');
                        return;
                    }
                    wx.getSavedFileList({
                        success: function success(savedFileInfo) {
                            var fileList = savedFileInfo.fileList;

                            console.log('文件列表', fileList);
                            if (!fileList) {
                                !!fail && fail('获取到的fileList为空，请检查你的wx.getSavedFileList()函数的success返回值');
                                return;
                            }
                            //这里计算需要移除的总文件大小
                            var sizeNeedRemove = wholeSize + tempFileSize - MAX_SIZE;
                            if (sizeNeedRemove >= 0) {
                                //按时间戳排序，方便后续移除文件
                                fileList.sort(function (item1, item2) {
                                    return item1.createTime - item2.createTime;
                                });
                                var sizeCount = 0;
                                for (var i = 0, len = fileList.length; i < len; i++) {
                                    // console.log('移除的文件1', sizeCount);
                                    if ((sizeCount += fileList[i].size) >= sizeNeedRemove) {
                                        var _loop = function _loop(j) {
                                            // console.log('移除的文件2', fileList[j].filePath);
                                            wx.removeSavedFile({
                                                filePath: fileList[j].filePath,
                                                success: function success() {
                                                    wholeSize -= fileList[j].size;
                                                    // console.log('移除成功', wholeSize);
                                                }
                                            });
                                        };

                                        for (var j = 0; j < i; j++) {
                                            _loop(j);
                                        }
                                        break;
                                    }
                                }
                            }

                            wx.saveFile({
                                tempFilePath: tempFilePath,
                                success: function success(res) {
                                    wholeSize += tempFileSize;
                                    typeof _success === "function" && _success(res.savedFilePath);
                                },
                                fail: fail
                            });
                        },
                        fail: fail
                    });
                }
            });
        }
    }]);

    return FileSaveManager;
}();

exports.default = FileSaveManager;