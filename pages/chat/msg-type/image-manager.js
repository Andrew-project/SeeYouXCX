import FileManager from "./base/file-manager";

export default class ImageManager extends FileManager {
    constructor(page) {
        super(page);
        this._page.imageClickEvent = function(e) {
            console.warn(e)
            wx.previewImage({
                current: e.detail.dataset.url, // 当前显示图片的http链接
                urls: [e.detail.dataset.url] // 需要预览的图片http链接列表
            })
        }
    }
}