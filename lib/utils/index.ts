import { LogLevel } from '../enums'
import { LogLabel, TLevel } from '../types'

/**
 * Formats a date according to the specified format string.
 * The format string can contain the following placeholders:
 * - YYYY: 4-digit year
 * - MM: 2-digit month (01-12)
 * - DD: 2-digit day (01-31)
 * - HH: 2-digit hour (00-23)
 * - mm: 2-digit minute (00-59)
 * - ss: 2-digit second (00-59)
 *
 * @param {Date} date - The date to format.
 * @param {string} format - The format string.
 * @returns {string} The formatted date string.
 */
export const formatDate = (date: Date, format: string): string => {
  const map: { [key: string]: string } = {
    YYYY: date.getFullYear().toString(),
    MM: (date.getMonth() + 1).toString().padStart(2, '0'),
    DD: date.getDate().toString().padStart(2, '0'),
    HH: date.getHours().toString().padStart(2, '0'),
    mm: date.getMinutes().toString().padStart(2, '0'),
    ss: date.getSeconds().toString().padStart(2, '0'),
  }

  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (matched) => map[matched])
}

/**
 * Parses a date string according to the specified format string.
 * The format string can contain the following placeholders:
 * - YYYY: 4-digit year
 * - MM: 2-digit month (01-12)
 * - DD: 2-digit day (01-31)
 * - HH: 2-digit hour (00-23)
 * - mm: 2-digit minute (00-59)
 * - ss: 2-digit second (00-59)
 *
 * @param {string} dateString - The date string to parse.
 * @param {string} format - The format string.
 * @returns {Date} The parsed date.
 * @throws {Error} If the date string does not match the format.
 */
export const parseDate = (dateString: string, format: string): Date => {
  const formatParts = format.match(/YYYY|MM|DD|HH|mm|ss/g)
  const dateParts = dateString.match(/\d+/g)

  if (!formatParts || !dateParts || formatParts.length !== dateParts.length) {
    throw new Error('Invalid date format')
  }

  const dateComponents: { [key: string]: number } = {}

  formatParts.forEach((part, index) => {
    dateComponents[part] = parseInt(dateParts[index], 10)
  })

  return new Date(
    dateComponents['YYYY'],
    (dateComponents['MM'] || 1) - 1,
    dateComponents['DD'] || 1,
    dateComponents['HH'] || 0,
    dateComponents['mm'] || 0,
    dateComponents['ss'] || 0
  )
}

/**
 * Type guard to check if a given level is of type LogLevel.
 *
 * @param {TLevel} level - The level to be checked.
 * @returns {level is LogLevel} True if the level is of type LogLevel, otherwise false.
 */
export function isLogLevel(level: TLevel): level is LogLevel {
  return typeof level === 'number'
}

/**
 * Type guard to check if a given level is of type LogLabel.
 *
 * @param {TLevel} level - The level to be checked.
 * @returns {level is LogLabel} True if the level is of type LogLabel, otherwise false.
 */
export function isLogLabel(level: TLevel): level is LogLabel {
  return typeof level === 'string'
}
