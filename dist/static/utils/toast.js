'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Toast = function () {
    function Toast() {
        _classCallCheck(this, Toast);
    }

    _createClass(Toast, null, [{
        key: 'show',
        value: function show(icon, title, duration) {
            if (icon === 'loading') {
                wx.showToast({
                    title: title,
                    icon: 'loading',
                    duration: duration ? duration : 2000
                });
            } else if (icon === 'success') {
                wx.showToast({
                    title: title,
                    icon: 'success',
                    duration: duration ? duration : 2000
                });
            } else if (icon === 'warn') {
                wx.showToast({
                    title: title,
                    duration: duration ? duration : 2000,
                    image: '../../image/global/loading_fail.png'
                });
            }
        }
    }, {
        key: 'showNormalLoading',
        value: function showNormalLoading(text) {
            if (wx.showLoading) {
                wx.showLoading({
                    title: text ? text : '加载中...',
                    mask: true
                });
            } else {
                wx.showToast({
                    title: text,
                    icon: 'loading',
                    duration: 2000
                });
            }
        }
    }, {
        key: 'hidden',
        value: function hidden() {
            wx.hideToast();
            if (wx.hideLoading) {
                wx.hideLoading();
            }
        }
    }]);

    return Toast;
}();

exports.default = Toast;