"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _date = require("../../static/utils/date.js");

var _toast = require("../../static/utils/toast.js");

var _toast2 = _interopRequireDefault(_toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var app = getApp();
exports.default = Component({
  properties: {
    records: {
      type: Array,
      value: [],
      observer: function observer(value) {
        (value || []).map(function (it) {
          it.updatedAtStr = (0, _date.calcuDate)(it.updatedAt);
          return it;
        });
        this.setData({
          records: value
        });
      }
    },
    focus: {
      type: Boolean,
      value: false
    },
    inputTop: {
      type: Number,
      value: 0
    },
    comment: {
      type: String,
      value: ""
    },
    textareaPlaceHolder: {
      type: String
    }
  },
  data: {
    records: []
  },
  methods: {
    previewImg: function previewImg(e) {
      console.log(e);
      var that = this;
      wx.previewImage({
        current: e.currentTarget.dataset.url, // 当前显示图片的http链接
        urls: [e.currentTarget.dataset.url], // 需要预览的图片http链接列表
        success: function success(e) {
          that.triggerEvent("hasPreviewImg", {
            isPreview: true
          });
        }
      });
    },
    focusContent: function focusContent(e) {
      this.setData({
        focus: true,
        comment: "",
        textareaPlaceHolder: "请赞美你的ta吧~~~~",
        inputTop: e.detail.y + 20
      });
    },
    bindTextAreaBlur: function bindTextAreaBlur(e) {
      this.setData({
        focus: false,
        comment: "",
        textareaPlaceHolder: "请赞美你的ta吧~~~~",
        inputTop: 0
      });
    },
    // 回复其他人信息
    commentToOther: function commentToOther(e) {
      this.focusContent(e);
      this.setData({
        textareaPlaceHolder: "@xxx:"
      });
    },
    confirmComment: function confirmComment(e) {
      console.info(e);
    },
    addVerb: function addVerb(e) {
      var _this = this;

      var verbs = e.currentTarget.dataset.verbs || [];
      if (verbs.filter(function (v) {
        return v.isVerb == true && v.fromId == wx.getStorageSync("openId");
      }).length) {
        _toast2.default.show("none", "您已经点赞了~");
        return;
      }
      app.cRequest({
        url: "record/verb",
        method: "post",
        hideToast: true,
        data: {
          id: parseInt(e.currentTarget.dataset.id),
          isVerb: true
        },
        success: function success(res) {
          if (res) {
            res.updatedAtStr = (0, _date.calcuDate)(res.updatedAt);
            _this.setData(_defineProperty({}, "records[" + parseInt(e.currentTarget.dataset.idx) + "]", res));
          }
        }
      });
    }
  }
});