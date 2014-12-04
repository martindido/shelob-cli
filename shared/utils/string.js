'use strict';

function startsWith(str, starts){
    if (starts === '') {
        return true;
    }
    if (str == null || starts == null) {
        return false;
    }
    str = String(str);
    starts = String(starts);
    return str.length >= starts.length && str.slice(0, starts.length) === starts;
}

function endsWith(str, ends){
    if (ends === '') {
        return true;
    }
    if (str == null || ends == null) {
        return false;
    }
    str = String(str);
    ends = String(ends);
    return str.length >= ends.length && str.slice(str.length - ends.length) === ends;
}

module.exports = {
    startsWith: startsWith,
    endsWith: endsWith
};
