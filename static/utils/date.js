const dayjs = require("dayjs");

function calcuDate(timestamp) {
    let timeStr = (dayjs().hour() < 10 ? '0' : '') + dayjs().hour() + ":" + (dayjs().minute() < 10 ? '0' : '') + dayjs().minute();
    const weekOfday =
        parseInt(dayjs().format("d"), 0) == 0 ?
        6 :
        parseInt(dayjs().format("d"), 0) - 1;
    const start = dayjs()
        .subtract(weekOfday, "day")
        .format("YYYY-MM-DD");
    const startWeekSt = dayjs(dayjs(start).startOf("day")).valueOf();
    var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    if (startWeekSt <= timestamp) {
        const nowDayStart = dayjs(dayjs().startOf('day')).valueOf();
        timeStr = (timestamp < nowDayStart ? weekday[dayjs(timestamp).day()] + ' ' : '') + (dayjs(timestamp).hour() < 10 ? '0' : '') + dayjs(timestamp).hour() + ":" + (dayjs(timestamp).minute() < 10 ? '0' : '') + dayjs(timestamp).minute();
    } else {
        timeStr = dayjs(timestamp).format('YYYY-MM-DD HH:mm');
    }
    return timeStr;
}

module.exports = {
    calcuDate
};