const { format, getHours } = require('date-fns');
const { utcToZonedTime } = require('date-fns-tz');

function getGreeting(currentHour) {
    if (currentHour < 12) {
        return "Good morning";
    }   else if (currentHour >= 12 && currentHour < 18) {
        return "Good afternoon";
    }   else {
        return "Good evening";
    }

}

lambdaHandler = async(event) => {
    const sgTz = 'Asia/Singapore';
    const now = new Date();
    const sgTime = utcToZonedTime(now, sgTz);
    const currentTime = format(sgTime, 'dd-MM-yyyy HH:mm:ssXXX', { timeZone: sgTz });
    const currentHour = getHours(sgTime);

    const greeting = `${getGreeting(currentHour)}! The time now is ${currentTime}`;

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: greeting,
                input: event,
            },
            null,
            2
        ),
    }
}

module.exports = { lambdaHandler, getGreeting }