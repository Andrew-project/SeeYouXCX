"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _system = require("./static/utils/system.js");

var _system2 = _interopRequireDefault(_system);

var _toast = require("./static/utils/toast.js");

var _toast2 = _interopRequireDefault(_toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = App({
  globalData: {},
  token: "",
  env: "dev",
  onLaunch: function onLaunch() {
    _system2.default.attachInfo();
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
        var baseURL = "http://api-dev.flin.youhujia.com/weixin/v1/";
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
        Authorization: getApp().token,
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
            _toast2.default.show("warn", "登录失败", 2000, function () {
              try {
                var organizationId = wx.getStorageSync("orgId") || -1;
                if (organizationId) {
                  _toast2.default.show("loading", "重新登录中...");
                  getApp().login(organizationId, function (token) {
                    if (token) {
                      getApp().setTokenFromOptions({
                        token: token
                      });
                      getApp().cRequest(reqOpt);
                    } else {
                      wx.redirectTo({
                        url: "/pages/register/register"
                      });
                    }
                  });
                }
              } catch (e) {}
            });
          } else if (resp.result.code == 500) {
            _toast2.default.show("warn", "服务器错误");
          } else if (resp.result.code == 1002 || resp.result.code == 11514) {
            if (!isHideError) {
              _toast2.default.show("warn", resp.result.displaymsg, 2000, function () {
                wx.navigateTo({
                  url: "/pages/user/add-family/add-family"
                });
              });
            }
          } else if (!resp.result.success && resp.result.displaymsg) {
            _toast2.default.show("warn", resp.result.displaymsg);
          }
          options.fail && options.fail(res);
        }
      },
      fail: function fail(res) {
        console.warn(res);
        _toast2.default.hidden();
        _toast2.default.showNormalToast("请求失败");

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
      _toast2.default.showNormalToast(wxReqOption.method == "GET" ? "加载中..." : "请求中...");
    }
    wx.request(wxReqOption);
  },
  setTokenFromOptions: function setTokenFromOptions(options) {
    if (options.token) {
      getApp().token = options.token;
    }
  }
});