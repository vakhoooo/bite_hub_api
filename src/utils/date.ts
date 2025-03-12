import * as moment from 'moment';

export const calculateRangeTime = (date1: string, date2: string) => {
  const start = moment(date1);
  const end = moment(date2);

  const diffMinutes = Math.abs(end.diff(start, 'minutes')); // Minute Diffs

  return diffMinutes;
};

export const localeMS = (date: string) => {
  return moment(date).local().valueOf(); // Get local time in milliseconds
};

export const convertToLocalTime = (utcDateString: string) => {
  return moment(utcDateString).local().format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ');
};
