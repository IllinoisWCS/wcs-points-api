const secrets = require('./config/secrets');
const moment = require('moment')
const twix = require('twix')

const generateEventKey = () => {

    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}

const validateNetid = netid => {
    const re = new RegExp('\\b[a-z]+\\d{1,3}\\b');
    return re.test(netid);
}

/*
*    IMPORTANT: this function is currently not in use and may not work correctly
*/
const validateTime = (event) => {
    const startDate = moment(event.startDate).format('YYYY-MM-DD')
    const endDate = moment(event.endDate).format('YYYY-MM-DD')
    
    // checking if w/in time range
    const range = moment(`${startDate} ${event.startTime}`).twix(`${endDate} ${event.endTime}`);
    return range.isCurrent()
}

const validateUser = netid => {

    return secrets.officers.includes(netid)
}

module.exports = {
    generateEventKey,
    validateNetid,
    validateTime,
    validateUser,
}