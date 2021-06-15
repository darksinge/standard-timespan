import { Duration } from 'luxon'

export const DEFAULT_TIMESPAN = '0.00:00:00.00'

export const TIMESPAN_REGEXP = /^(\d+[.:])?(\d{2}):(\d{2}):(\d{2})(\.\d{1,7})?$/

/**
 * Return number of seconds represented by the time string 'd:HH:mm:ss.SSSS'
 * @param {String} time HH:mm:ss.SSSS
 */
export function timeToSeconds (time: string = ''): number {
  return time.split(':').reduce((acc, time) => 60 * acc + +time, 0)
}

/**
 * Converts a .NET TimeSpan string to an integer value in seconds (see
 * https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-timespan-format-strings)
 * @param {String} ts .NET TimeSpan string representing a positive value
 */
export function timespanToSeconds (ts: string): number {
  if (typeof ts === 'string') {
    const matches = ts.match(TIMESPAN_REGEXP)
    if (matches) {
      const [, days = '0', hours, minutes, seconds] = matches
      const daysToSeconds = parseInt(days.replace(/[.:]/g, '')) * 24 * 60 * 60
      return daysToSeconds + timeToSeconds(`${hours}:${minutes}:${seconds}`)
    }
  }

  return NaN
}

export function secondsToTimespan (seconds: number = 0): string {
  return Duration.fromMillis(seconds * 1000)
    .toFormat('d.hh:mm:ss.S')
}

/**
 * Preforms division on two timespans.
 * @param {string} a - the dividend
 * @param {string} b - the divisor
 */
export function divideTimespans (a, b) {
  const dividend = timespanToSeconds(a)
  const divisor = timespanToSeconds(b)
  return dividend / divisor
}
