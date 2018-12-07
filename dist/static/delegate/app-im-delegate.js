"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imFactory = require("../libs/im-sdk/im-factory.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppIMDelegate = function () {
    function AppIMDelegate(app) {
        _classCallCheck(this, AppIMDelegate);

        this._app = app;
    }

    _createClass(AppIMDelegate, [{
        key: "onLaunch",
        value: function onLaunch(options) {
            this.iIMHandler = _imFactory.getIMHandlerFactory;
        }
    }, {
        key: "onShow",
        value: function onShow(options) {
            this.iIMHandler.createConnection({
                options: {
                    url: 'ws://192.168.1.84:9527'
                }
            });
        }
    }, {
        key: "onHide",
        value: function onHide() {}
    }, {
        key: "getIMHandlerDelegate",
        value: function getIMHandlerDelegate() {
            return this.iIMHandler;
        }
    }]);

    return AppIMDelegate;
}();

exports.default = AppIMDelegate;