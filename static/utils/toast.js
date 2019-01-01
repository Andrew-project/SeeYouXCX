export default class Toast {
    static show(icon, title, duration, cb) {
        if (icon === 'loading') {
            wx.showToast({
                title: title,
                icon: 'loading',
                duration: duration ? duration : 2000,
                success: function() {
                    if (cb) {
                        setTimeout(() => {
                            cb();
                        }, duration || 2000)
                    }
                }
            })
        } else if (icon === 'success') {
            wx.showToast({
                title: title,
                icon: 'success',
                duration: duration ? duration : 2000,
                success: function() {
                    if (cb) {
                        setTimeout(() => {
                            cb();
                        }, duration || 2000)
                    }
                }
            })
        } else if (icon === 'warn') {
            wx.showToast({
                title: title,
                duration: duration ? duration : 2000,
                image: '../../image/global/loading_fail.png',
                success: function() {
                    if (cb) {
                        setTimeout(() => {
                            cb();
                        }, duration || 2000)
                    }
                }
            })
        } else if (icon == 'none') {
            wx.showToast({
                title: title,
                icon: 'none',
                duration: duration ? duration : 2000,
                success: function() {
                    if (cb) {
                        setTimeout(() => {
                            cb();
                        }, duration || 2000)
                    }
                }
            })
        }
    }

    static showNormalLoading(text) {
        if (wx.showLoading) {
            wx.showLoading({
                title: text ? text : '加载中...',
                mask: true
            })
        } else {
            wx.showToast({
                title: text,
                icon: 'loading',
                duration: 2000,
            })
        }
    }

    static hidden() {
        wx.hideToast();
        if (wx.hideLoading) {
            wx.hideLoading();
        }
    }
}