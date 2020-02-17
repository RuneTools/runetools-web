const DAYS_IN_WEEK = 7;
const MAX_DAY = 6;
const WEDNESDAY = 3;

export const dateToUtc = date => {
    return new Date(Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
    ));
};

export const isSameDayUtc = (date1, date2) => {
    return isSameMonthUtc(date1, date2)
        && date1.getUTCDate() === date2.getUTCDate();
};

export const isSameMonthUtc = (date1, date2) => {
    return date1.getUTCMonth() === date2.getUTCMonth()
        && date1.getUTCFullYear() === date2.getUTCFullYear();
};

export const isSameResetWeek = (date1, date2) => {
    // Formula to convert a day of week into a delta date offset to get to the Wednesday before the date.
    const dateDelta = n => MAX_DAY - ((MAX_DAY - n + WEDNESDAY) % DAYS_IN_WEEK);

    // Truncate the dates to the beginning of the reset period.
    date1 = truncateDateUtc(date1);
    date1.setUTCDate(date1.getUTCDate() - dateDelta(date1.getUTCDay()));
    date2 = truncateDateUtc(date2);
    date2.setUTCDate(date2.getUTCDate() - dateDelta(date2.getUTCDay()));

    return date1.getTime() === date2.getTime();
};

export const truncateDateUtc = date => {
    return new Date(Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate()
    ));
};
