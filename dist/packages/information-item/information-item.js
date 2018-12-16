"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Component({
	properties: {
		mockImgs: {
			type: Array
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
			value: ''
		},
		textareaPlaceHolder: {
			type: String
		}
	},
	methods: {
		previewImg: function previewImg(e) {
			console.log(e);
			var that = this;
			wx.previewImage({
				current: e.currentTarget.dataset.url, // 当前显示图片的http链接
				urls: [e.currentTarget.dataset.url], // 需要预览的图片http链接列表
				success: function success(e) {
					that.triggerEvent("hasPreviewImg", { isPreview: true });
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
		}
	}
});