import {
  timespanToSeconds,
  secondsToTimespan,
  DEFAULT_TIMESPAN,
  TIMESPAN_REGEXP
} from './time/time'

export default class TimeSpan {
  static DEFAULT_TIMESTAMP: string = DEFAULT_TIMESPAN;

  static TIMESPAN_REGEXP = TIMESPAN_REGEXP;

  static fromSeconds (seconds: number = 0): TimeSpan {
    return new TimeSpan(secondsToTimespan(seconds));
  }

	private _invalid: boolean = false;
	private _ts: string;

  constructor (ts: TimeSpan | string | number = TimeSpan.DEFAULT_TIMESTAMP) {
    if (typeof ts === 'string') {
      if (!TimeSpan.TIMESPAN_REGEXP.test(ts)) {
        this._invalid = true
      }
      this._ts = ts
    } else if (typeof ts === 'number') {
      this._ts = secondsToTimespan(ts)
    } else if (ts instanceof TimeSpan) {
      this._ts = ts._ts
    } else {
      this._invalid = true
    }
  }

	get isValid(): boolean {
		return this._invalid
	}

  toSeconds(): number {
    return timespanToSeconds(this._ts)
  }

  /**
   * Compute the quotient of two timespans, with `this` as the dividend and
   * `other` as the divisor.
   *
   * @example:
   * ```
   * > const a = new Timespan('0.00:00:04.00')
   * > const b = new Timespan('0.00:00:02.00')
   * > console.log(a.div(b))
   * 2
   * ```
   *
   * @param {TimeSpan | string | number} other - The divisor as a Timespan,
   * valid timespan string, or number of seconds
   */
  div (other: TimeSpan | string | number): number {
    return this.toSeconds() / new TimeSpan(other).toSeconds()
  }

  add (other: TimeSpan | string | number) {
    return this.toSeconds() + new TimeSpan(other).toSeconds()
  }

  diff (other: TimeSpan | string | number) {
    return this.toSeconds() - new TimeSpan(other).toSeconds()
  }

  mul (other: TimeSpan | string | number) {
    return this.toSeconds() * new TimeSpan(other).toSeconds()
  }
}
