'use strict';

var dayjs = require('../../packages/dayjs/dayjs.min.js');

function calcuDate(timestamp) {
    var timeStr = (dayjs().hour() < 10 ? '0' : '') + dayjs().hour() + ":" + (dayjs().minute() < 10 ? '0' : '') + dayjs().minute();
    var weekOfday = parseInt(dayjs().format("d"), 0) == 0 ? 6 : parseInt(dayjs().format("d"), 0) - 1;
    var start = dayjs().subtract(weekOfday, "day").format("YYYY-MM-DD");
    var startWeekSt = dayjs(dayjs(start).startOf("day")).valueOf();
    var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    if (startWeekSt <= timestamp) {
        var nowDayStart = dayjs(dayjs().startOf('day')).valueOf();
        timeStr = (timestamp < nowDayStart ? weekday[dayjs(timestamp).day()] + ' ' : '') + (dayjs(timestamp).hour() < 10 ? '0' : '') + dayjs(timestamp).hour() + ":" + (dayjs(timestamp).minute() < 10 ? '0' : '') + dayjs(timestamp).minute();
    } else {
        timeStr = dayjs(timestamp).format('YYYY-MM-DD HH:mm');
    }
    return timeStr;
}

module.exports = {
    calcuDate: calcuDate
};