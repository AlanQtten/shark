const month31 = [1, 3, 5, 7, 8, 10, 12];
const month30 = [4, 6, 9, 11];
export default function isValidDate(dateStr): boolean {
  let yearMonthDay = dateStr;
  let hourMinuteSecond = '';
  if (dateStr.indexOf(' ') !== -1) {
    const [ymd, hms] = dateStr.split(' ');
    yearMonthDay = ymd;
    hourMinuteSecond = hms;

    const [hour, minute, second] = hourMinuteSecond.split(':');

    if (!checkHour(hour) || !checkMinute(minute) || !checkSecond(second)) {
      return false;
    }
  }

  const [year, month, day] = yearMonthDay.split('-');

  if (!checkYear(year) || !checkMonth(month) || !checkDay(year, month, day)) {
    return false;
  }

  return true;
}

function checkHour(hour: string): boolean {
  if (hour.length < 2) {
    return false;
  }
  const _hour = +hour;
  if (_hour >= 24 || _hour < 0 || Number.isNaN(_hour)) {
    return false;
  }

  return true;
}

function checkMinute(minute: string) {
  if (minute.length < 2) {
    return false;
  }
  const _minute = +minute;
  if (_minute >= 60 || _minute < 0 || Number.isNaN(_minute)) {
    return false;
  }

  return true;
}

function checkSecond(second: string): boolean {
  return checkMinute(second);
}

function checkYear(year: string): boolean {
  if (year.length < 4) {
    return false;
  }
  const _year = +year;
  if (_year < 0 || Number.isNaN(_year)) {
    return false;
  }

  return true;
}

function checkMonth(month: string): boolean {
  if (month.length < 2) {
    return false;
  }
  const _month = +month;
  if (_month > 12 || _month <= 0 || Number.isNaN(_month)) {
    return false;
  }
  return true;
}

function checkDay(year: string, month: string, day: string): boolean {
  if (day.length < 2) {
    return false;
  }
  const _day = +day;
  if (_day <= 0 || Number.isNaN(_day)) {
    return false;
  }

  const _month = +month;
  let supposeHasDayCount = 0;
  if (month30.includes(_month)) {
    supposeHasDayCount = 30;
  } else if (month31.includes(_month)) {
    supposeHasDayCount = 31;
  } else {
    supposeHasDayCount = isLeapYear(year) ? 29 : 28;
  }

  if (_day > supposeHasDayCount) {
    return false;
  }

  return true;
}

function isLeapYear(year: string) {
  const _year = +year;
  return (_year % 4 === 0 && _year % 100 !== 0) || _year % 400 === 0;
}
