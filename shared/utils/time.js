'use strict';

var SECOND = 1000;
var MINUTE = 60 * SECOND;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
var MONTH = 30 * DAY;
var YEAR = 12 * MONTH;

function getDefaultFrom() {
    var from = new Date();

    from.setHours(from.getHours() - 1);
    return from;
}

module.exports = {
    SECOND: SECOND,
    MINUTE: MINUTE,
    HOUR: HOUR,
    DAY: DAY,
    MONTH: MONTH,
    YEAR: YEAR,
    getDefaultFrom: getDefaultFrom
};
