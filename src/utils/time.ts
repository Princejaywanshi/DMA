import moment, { Moment } from 'moment';
export const dateFormate = 'YYYY-MM-DD HH:mm:ss';
export const TimeFormate = 'ddd DD MMM YYYY [at] hh:mmA';
export const getTimeDate = (date = new Date()) => {
  return moment(date).format(TimeFormate);
};

export const getDate = (date = new Date(), formate="DD/MM/YYYY") => {
  if (!date) {
    return null;
  }
  return moment(date).format(formate);
};
export const getDateCostumeType = (
  date: string | Date,
  input?: string,
  output?: string,
  hideTodyShow?:boolean
) => {
  return moment(date, input || '').format(output) ==
    moment().format(output || TimeFormate) && !hideTodyShow
    ? 'Today'
    : moment(date, input || '').format(output || TimeFormate);
};
export const dowDateTime = (formate: string) => moment().format(formate);
// moment('22-09-2021 10:43', 'DD-MM-YYYY hh:mm').add(9,'Hours').format("ddd MMM D YYYY [at] h:mm A z")
export function getCurrent(format: 'date' | 'datetime' | 'time'): Date | string {
  // Get the current date and time using Moment.js
  const now: moment.Moment = moment();

  // Return based on the requested format
  switch (format) {
      case 'time':
          // Return only the current time as a string
          return now.format('HH:mm:ss'); // Adjust format as needed

      case 'datetime':
          // Return the current date and time as a Date object
          return now.toDate();

      case 'date':
          // Return only the current date as a Date object
          return now.startOf('day').toDate();

      default:
          throw new Error('Invalid format specified. Use "date", "datetime", or "time".');
  }
}
export function formatDate(
  date: string | Date, 
  inputFormat: string, 
  outputFormat: string
): string {
  // Parse the input date using Moment.js
  // Parse the input date using Moment.js
  const parsedDate: Moment = moment(date, inputFormat, true); // Strict parsing

  // Check if the parsing was successful
  if (!parsedDate.isValid()) {
    throw new Error('Invalid date format');
  }

  // Get today's date in the local time zone
  const today: Moment = moment().startOf('day'); // Start of today

  // Compare if the parsed date is today
  if (parsedDate.isSame(today, 'day')) {
    return 'Today';
  }

  // Format the parsed date to the desired output format
  return parsedDate.format(outputFormat);
}
export const getDate2 = (date = new Date()) => {
  if (!date) {
    return null;
  }
  return moment(date).format('DD MMMM, YYYY');
};

export const getDate3 = (date = new Date()) => {
  if (!date) {
    return null;
  }
  return moment(date).format('MMM, DD, YYYY');
};

export const getDateFormat = (date = new Date(), format = 'MM/DD/YYYY', locale = "DD-MMM-YYYY HH:mm") => {
  if (!date) {
    return null;
  }
  return locale ? moment(date, locale).format(format) : moment(date).format(format);
};

export const getTime = (date = new Date()) => {
  if (!date) {
    return null;
  }
  return moment(date).format('hh:mmA');
};

export const getTimeRound = (date = new Date()) => {
  if (!date) {
    return null;
  }
  return moment(date).format('hh:00A');
};

export const checkHour = (date1 = new Date(), date2 = new Date()) => {
  const diffTime = moment(date1).diff(date2, 'hours');
  return (
    diffTime <= 1 &&
    diffTime >= -1 &&
    moment(date1).hours() === moment(date2).hours()
  );
};
export const checkMinute = (date1 = new Date(), date2 = new Date()) => {
  const diffTime = moment(date1).diff(date2, 'minutes');
  return (
    diffTime <= 1 &&
    diffTime >= -1 &&
    moment(date1).minutes() === moment(date2).minutes()
  );
};

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
export const startOfMonth = ( seltedDte:string | Date , formate?:string ) =>  moment(seltedDte).startOf('month').format(formate || 'YYYY-MM-DD');
export const endOfMonth = (  seltedDte:string| Date, formate?:string) =>  moment(seltedDte).endOf('month').format(formate || 'YYYY-MM-DD');
export const isAfter = (date1:Date, date2:Date) =>  moment(date1).isAfter(date2);
export const dateTimeUTC = ( serverDateTime?:string) =>  moment.utc(serverDateTime).toDate();
export const isBetween = (checkDate: Date, startDate: Date, endDate: Date): boolean => {
  return moment(checkDate).isBetween(moment(startDate), moment(endDate));
};
export const formatDuration = (ms: number) => {
  const duration = moment.duration(ms);
  if (duration.asHours() > 1) {
    return (
      Math.floor(duration.asHours()) +
      moment.utc(duration.asMilliseconds()).format(':mm:ss')
    );
  } else {
    return moment.utc(duration.asMilliseconds()).format('mm:ss');
  }
};
export function parseDateString(dateString: string, addHours: number = 0, subtractHours: number = 0, formatC = 'DD-MMM-YYYY HH:mm'): Date {
  // Define the format of the input date string
  const format: string = 'DD-MMM-YYYY HH:mm';
  
  // Parse the date string using Moment.js
  const momentDate: Moment = moment(dateString, formatC || format);
  
  // Check if the parsing was successful
  if (!momentDate.isValid()) {
      throw new Error('Invalid date format');
  }

  if (addHours > 0) {
      momentDate.add(addHours, 'hours');
  }
  if (subtractHours > 0) {
      momentDate.subtract(subtractHours, 'hours');
  }

  // Convert Moment.js object to JavaScript Date object and return it
  return momentDate.toDate();
}

export const currentDate = moment();
export const previousMonth = currentDate.subtract(1, 'months');
export const addMouths = (num:number) => currentDate.subtract(num, 'months');
// Get the first day of the previous month
export const firstDay = previousMonth.startOf('month').format('YYYY-MM-DD');
// Get the last day of the previous month
export const lastDay = previousMonth.endOf('month').format('YYYY-MM-DD');

export function adjustDate(
  baseDate: string | Date,
  days: number = 0,
  months: number = 0,
  years: number = 0
): Date {
  // Parse the base date using Moment.js
  const date: Moment = moment(baseDate);

  // Check if the date is valid
  if (!date.isValid()) {
      throw new Error('Invalid base date');
  }

  // Add or subtract days, months, and years
  date.add(days, 'days');
  date.add(months, 'months');
  date.add(years, 'years');

  // Return the adjusted date as a JavaScript Date object
  return date.toDate();
}
export const parseDate = (dateStr: string): Date => {
  if(!dateStr) return new Date(Number('2024'), 5, Number('20'));
  const monthNames: { [key: string]: number } = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3,
    'May': 4, 'Jun': 5, 'Jul': 6, 'Aug': 7,
    'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
  };

  const [day, month, year] = dateStr?.split('-');
  const monthIndex = monthNames[month] || monthNames[0];
  if (monthIndex === undefined) {
    throw new Error(`Invalid month: ${month}`);
  }

  return new Date(Number(year), monthIndex, Number(day));
};
type TimeFormat = '1 min' | `${number} mins` | `${number} hrs ${number} min`;
/**
 * Formats the time difference between two times.
 * 
 * @param startTime - The start time in "hh:mm A" format (e.g., "01:49 PM").
 * @param startDate - The date for the start time (optional, default is today).
 * @param endTime - The end time in "hh:mm A" format (optional, defaults to the current time if not provided).
 * @param endDate - The date for the end time (optional, default is today).
 * @returns A formatted string representing the time difference.
 */
// export const formatTimeDifference = (
//   startTime: string, 
//   startDate: string = moment().format('YYYY-MM-DD'), 
//   endTime?: string, 
//   endDate: string = moment().format('YYYY-MM-DD'),
//   endTimeZone: string = '+00:00' 
// ):TimeFormat => {
//   // Parse the start and end dates using Moment.js
//     const parseOffset = (offset: string) => {
//       const [hours, minutes] = offset.split(':').map(Number);
//       return hours * 60 + minutes;
//     };
//     const createDateWithOffset = (date: string, time: string, offset: number) => {
//       const dateTimeString = `${date}T${time}:00.000Z`;
//       const dateObj = new Date(dateTimeString);
//       const utcOffset = dateObj.getTimezoneOffset(); // Minutes offset from UTC
//       const localOffset = offset - utcOffset; // Convert to minutes from UTC
//       return new Date(dateObj.getTime() + localOffset * 60000); // Adjust by the offset
//     };
//     const endOffset = parseOffset(endTimeZone);
//     const startDateTime = moment(`${startDate} ${startTime}`, 'YYYY-MM-DD hh:mm A');
   
//     const endDateTime = endTime ? moment(`${endDate} ${endTime}`, 'YYYY-MM-DD hh:mm A') : moment();
    
//     // Calculate the duration
//     const duration = moment.duration(endDateTime.diff(startDateTime));
    
//     const minutes = duration.minutes();
//     const hours = duration.hours();
    
//     if (duration.asMinutes() < 1) {
//         return '1 min';
//     } else if (duration.asMinutes() < 60) {
//         return `${minutes} mins`;
//     } else {
//         return `${hours} hrs ${minutes} min`;
//     }
// }
export const formatTimeDifference = (
  startTime: string, 
  startDate: string = new Date().toISOString().split('T')[0], // Default to today's date if not provided
  endTime?: string, 
  endDate: string = new Date().toISOString().split('T')[0], // Default to today's date if not provided
  offset: string = '+00:00' // Single time zone offset
): string => {
  // Helper function to parse time zone offset in minutes
  const parseOffset = (offset: string) => {
    const [hours, minutes] = offset.split(':').map(Number);
    return (hours * 60) + minutes;
  };

  // Convert the offset to minutes
  const offsetInMinutes = parseOffset(offset);

  // Get system offset in minutes
  const systemOffsetInMinutes = new Date().getTimezoneOffset();

  // Helper function to parse time in "hh:mm A" format
  const parseTime = (time: string) => {
    const [timePart, meridiem] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);
    if (meridiem === 'PM' && hours < 12) hours += 12;
    if (meridiem === 'AM' && hours === 12) hours = 0;
    return { hours, minutes };
  };

  // Create a Date object for the specified date and time with the offset applied
  const createDateWithOffset = (date: string, time: string) => {
    const { hours, minutes } = parseTime(time);
    const dateTimeString = `${date}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00.000Z`;
    const dateObj = new Date(dateTimeString);
    // Adjust the dateObj based on the provided offset
    return new Date(dateObj.getTime() - offsetInMinutes * 60000);
  };

  // Calculate the start date and time with the offset
  let startDateTime = createDateWithOffset(startDate, startTime);

  // Determine the end date and time
  let endDateTime: Date;
  if (endTime) {
    const endDateTimeWithOffset = createDateWithOffset(endDate, endTime);
    endDateTime = endDateTimeWithOffset;
  } else {
    // If endTime is not provided, use the current system time and adjust it
    endDateTime = new Date();
  }

  // Adjust endDateTime if the offset matches the system's time zone offset
  if (offsetInMinutes === systemOffsetInMinutes) {
    // Adjust the start and end times
    startDateTime = new Date(startDateTime.getTime() + offsetInMinutes * 60000);
    endDateTime = new Date(endDateTime.getTime() + offsetInMinutes * 60000);
  }

  // Calculate the duration
  const durationMs = endDateTime.getTime() - startDateTime.getTime();
  const durationMinutes = Math.floor(durationMs / (1000 * 60));
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  if (durationMinutes < 1) {
    return '1 min';
  } else if (durationMinutes < 60) {
    return `${minutes} mins`;
  } else {
    return `${hours} hrs ${minutes} min`;
  }
};
/**
 * Checks if the current time is within 1 minute of the provided start time.
 * 
 * @param startTime - The start time in "hh:mm A" format (e.g., "11:00 AM").
 * @returns True if the current time is within 1 minute before or after the start time, otherwise false.
 */
export function isCurrentTimeNearStartTime(startTime: string): boolean {
  const todayDate = moment().format('YYYY-MM-DD');
  const startDateTime = moment(`${todayDate} ${startTime}`, 'YYYY-MM-DD hh:mm A');
  const currentDateTime = moment();
  const oneMinuteBefore = startDateTime.clone().subtract(1, 'minute');
  const oneMinuteAfter = startDateTime.clone().add(1, 'minute');

  const result =  currentDateTime.isBetween(oneMinuteBefore, oneMinuteAfter, null, '[)');
  return result
}

export const formatDateWithOrdinal = (dateStr: string, inputFormat: string): string => {
  // Parse the input date string into a moment object
  const date = moment(dateStr, inputFormat);
  
  if (!date.isValid()) {
    throw new Error('Invalid date format');
  }

  // Get the day and month
  const day = date.format('D'); // Day of the month without leading zeros
  const month = date.format('MMM'); // Abbreviated month name

  // Function to get the ordinal suffix
  const getOrdinalSuffix = (day: number): string => {
    if (day >= 11 && day <= 13) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  // Format the date to include the ordinal suffix
  return `${day}${getOrdinalSuffix(parseInt(day, 10))} ${month}`;
};

export const momentWithOffset = () => moment().utcOffset()