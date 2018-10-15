function showToast(icon, title, duration, cb) {
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
            image: '/assets/image_success@2x.png',
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
            image: '/assets/image_fail@2x.png',
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

function showNormalToast(text, cb) {
    if (wx.showLoading) {
        wx.showLoading({
            title: text ? text : '加载中...',
            mask: true,
            success: function() {
                if (cb) {
                    setTimeout(() => {
                        cb();
                    }, 2000)
                }
            }
        })
    } else {
        wx.showToast({
            title: text,
            icon: 'none',
            duration: 2000,
            success: function() {
                if (cb) {
                    setTimeout(() => {
                        cb();
                    }, 2000)
                }
            }
        })
    }
}

function hiddenToast() {
    if (wx.showToast) {
        wx.hideToast();
    }
    if (wx.hideLoading) {
        wx.hideLoading();
    }
}

module.exports = {
    show: showToast,
    showNormalToast: showNormalToast,
    hidden: hiddenToast
};