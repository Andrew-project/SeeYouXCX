"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _fileManager = require("./base/file-manager.js");

var _fileManager2 = _interopRequireDefault(_fileManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageManager = function (_FileManager) {
    _inherits(ImageManager, _FileManager);

    function ImageManager(page) {
        _classCallCheck(this, ImageManager);

        var _this = _possibleConstructorReturn(this, (ImageManager.__proto__ || Object.getPrototypeOf(ImageManager)).call(this, page));

        _this._page.imageClickEvent = function (e) {
            console.warn(e);
            wx.previewImage({
                current: e.detail.dataset.url, // 当前显示图片的http链接
                urls: [e.detail.dataset.url] // 需要预览的图片http链接列表
            });
        };
        return _this;
    }

    return ImageManager;
}(_fileManager2.default);

exports.default = ImageManager;