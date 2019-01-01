"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _system = require("./static/utils/system.js");

var _system2 = _interopRequireDefault(_system);

var _toast = require("./static/utils/toast.js");

var _toast2 = _interopRequireDefault(_toast);

var _appImDelegate = require("./static/delegate/app-im-delegate.js");

var _appImDelegate2 = _interopRequireDefault(_appImDelegate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = App({
  globalData: {
    userInfo: {}
  },
  token: "",
  env: "dev",
  hasSocket: false,
  onLaunch: function onLaunch(options) {
    _system2.default.attachInfo();
    this.appIMDelegate = new _appImDelegate2.default(this);
    this.appIMDelegate.onLaunch(options);
  },
  getIMHandler: function getIMHandler() {
    return this.appIMDelegate.getIMHandlerDelegate();
  },
  onUnload: function onUnload() {
    this.appIMDelegate.onHide();
  },
  onShow: function onShow(options) {
    var _this = this;

    console.log("是否开启websocket连接：", this.hasSocket);
    if (!this.hasSocket) {
      this.appIMDelegate.onShow(options, function () {
        _this.hasSocket = true;
      });
    }
  },

  // http 拦截
  cRequest: function cRequest(options) {
    var reqOpt = JSON.parse(JSON.stringify(options));
    reqOpt.success = options.success;
    var isHideToast = options.hideToast;
    var isHideError = options.hideError;
    switch (getApp().env) {
      case "mock":
        var baseURL = "http://yapi.youhujia.com/mock/39/weixin/v1/";
        break;
      case "dev":
        var baseURL = "http://192.168.0.102:3000/api/v1/wx/";
        break;
      case "pro":
        var baseURL = "https://api.yhcloud.youhujia.com/weixin/v1/";
        break;
      default:
        var baseURL = "http://yapi.youhujia.com/mock/39/weixin/v1/";
    }
    var wxReqOption = {
      method: "GET",
      header: {
        Authorization: wx.getStorageSync("openId"),
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    };
    try {
      delete options.hideToast;
      delete options.hideError;
    } catch (e) {}

    options.data = options.data || {};
    options.url = "" + baseURL + options.url;

    Object.assign(wxReqOption, options);
    Object.assign(wxReqOption, {
      success: function success(res) {
        _toast2.default.hidden();
        console.info("response:", res.data);
        var resp = res.data;
        if (resp && resp.result && resp.result.success) {
          options.success && options.success(resp.data || {});
        } else {
          if (resp.status === 500 || resp.status === 405 || resp.status === 404) {
            _toast2.default.show("warn", resp.error);
          } else if (resp.result.code == 401) {
            _toast2.default.show("warn", "登录失败", 2000, function () {});
          } else if (resp.result.code == 500) {
            _toast2.default.show("warn", "服务器错误");
          } else if (!resp.result.success && resp.result.displayMsg) {
            _toast2.default.show("warn", resp.result.displayMsg);
          }
          options.fail && options.fail(res);
        }
      },
      fail: function fail(res) {
        console.warn(res);
        _toast2.default.hidden();
        _toast2.default.show("warn", "请求失败");

        setTimeout(function () {
          _toast2.default.hidden();
        }, 4000);
        options.error && options.fail(res.data);
      },
      complete: function complete(res) {
        options.complete && options.complete(res.data);
      }
    });

    if (!isHideToast) {
      _toast2.default.showNormalLoading(wxReqOption.method == "GET" ? "加载中..." : "请求中...");
    }
    wx.request(wxReqOption);
  },
  setTokenFromOptions: function setTokenFromOptions(options) {
    if (options.token) {
      getApp().token = options.token;
    }
  }
});