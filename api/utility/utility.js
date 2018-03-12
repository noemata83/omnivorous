const moment = require('moment');
const convertToMinutes = (timeData) => {
    return moment.duration(timeData)._data.minutes + (60 * moment.duration(timeData)._data.hours);
}

module.exports = {
    convertToMinutes
}