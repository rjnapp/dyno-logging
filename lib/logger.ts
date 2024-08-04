import { LogLevel } from './enums'
import transport from './transport'
import {
  ILogger,
  ITransport,
  LabelMapper,
  LevelMapper,
  MetaData,
  Options,
  Payload,
  TLevel,
} from './types'
import { isLogLabel } from './utils'

/**
 * Maps numeric log levels to their string representations.
 * @type {LevelMapper}
 */
const levelMapper: LevelMapper = {
  '10': 'TRACE',
  '20': 'DEBUG',
  '30': 'INFO',
  '40': 'WARN',
  '50': 'ERROR',
  '60': 'CRITICAL',
  '70': 'FATAL',
}

/**
 * Maps string log labels to their numeric representations.
 * @type {LabelMapper}
 */
const labelMapper: LabelMapper = {
  TRACE: '10',
  DEBUG: '20',
  INFO: '30',
  WARN: '40',
  ERROR: '50',
  CRITICAL: '60',
  FATAL: '70',
  trace: '10',
  debug: '20',
  info: '30',
  warn: '40',
  error: '50',
  critical: '60',
  fatal: '70',
}

/**
 * Class representing a Logger.
 * Implements the ILogger interface.
 */
class Logger implements ILogger {
  /**
   * Minimum log level for the logger.
   * @private
   * @type {TLevel}
   */
  private minLevel: TLevel = LogLevel.INFO

  /**
   * Key used for log messages.
   * @private
   * @type {string}
   */
  private messageKey: string = 'msg'

  /**
   * Namespace for the logger.
   * @private
   * @type {string}
   */
  private namespace: string = ''

  /**
   * Universal transport for logging.
   * @private
   * @type {ITransport}
   */
  private universalTransport: ITransport = new transport.Console()

  /**
   * Options for the logger.
   * @private
   * @type {Options}
   */
  private options: Options

  /**
   * Creates an instance of Logger.
   * @param {string} namespace - Namespace for the logger.
   * @param {Options} options - Options for configuring the logger.
   */
  constructor(namespace: string, options: Options) {
    if (typeof namespace !== 'undefined') {
      this.namespace = namespace
    }
    if (typeof options.minLevel !== 'undefined') {
      this.minLevel = options.minLevel
    }
    if (typeof options.messageKey !== 'undefined') {
      this.messageKey = options.messageKey
    }
    this.options = options
  }

  /**
   * Determines if a log with a given level should be logged based on the minimum level.
   * @private
   * @param {TLevel} level - Log level to check.
   * @param {TLevel} minLevel - Minimum level to compare against.
   * @returns {boolean} True if the log level is greater than or equal to the minimum level, otherwise false.
   */
  private shouldLog(level: TLevel, minLevel: TLevel): boolean {
    const logLevel: number = ((isLogLabel(level) && labelMapper[level]) ||
      level) as number
    const minLevelShouldLog: number = ((isLogLabel(minLevel) &&
      labelMapper[minLevel]) ||
      minLevel) as number
    return logLevel >= minLevelShouldLog
  }

  /**
   * Logs the payload if the level meets the minimum logging level.
   * Formats the payload and writes it to the transport.
   * @private
   * @param {Payload} payload - The payload to log.
   */
  private log({ level, ...payload }: Payload): void {
    if (!this.shouldLog(level, this.options.minLevel)) {
      return
    }
    const writableContent: Payload = {
      level: this.options?.formatLevel(
        level as LogLevel,
        levelMapper[level as LogLevel]
      ).level,
      timestamp: this.options?.timestamp(),
      namespace: this.namespace,
      ...payload,
    }
    this.universalTransport.writeContent(
      writableContent,
      this.options.formatContent
    )
  }

  /**
   * Logs a fatal message.
   * @param {string} message - The message to log.
   * @param {MetaData} [meta] - Optional metadata to include in the log.
   */
  fatal(message: string, meta?: MetaData): void {
    this.log({ level: LogLevel.FATAL, [this.messageKey]: message, ...meta })
  }

  /**
   * Logs an error message.
   * @param {string} message - The message to log.
   * @param {MetaData} [meta] - Optional metadata to include in the log.
   */
  error(message: string, meta?: MetaData): void {
    this.log({ level: LogLevel.ERROR, [this.messageKey]: message, ...meta })
  }

  /**
   * Logs a warning message.
   * @param {string} message - The message to log.
   * @param {MetaData} [meta] - Optional metadata to include in the log.
   */
  warn(message: string, meta?: MetaData): void {
    this.log({ level: LogLevel.WARN, [this.messageKey]: message, ...meta })
  }

  /**
   * Logs an informational message.
   * @param {string} message - The message to log.
   * @param {MetaData} [meta] - Optional metadata to include in the log.
   */
  info(message: string, meta?: MetaData): void {
    this.log({ level: LogLevel.INFO, [this.messageKey]: message, ...meta })
  }

  /**
   * Logs a debug message.
   * @param {string} message - The message to log.
   * @param {MetaData} [meta] - Optional metadata to include in the log.
   */
  debug(message: string, meta?: MetaData): void {
    this.log({ level: LogLevel.DEBUG, [this.messageKey]: message, ...meta })
  }

  /**
   * Logs a trace message.
   * @param {string} message - The message to log.
   * @param {MetaData} [meta] - Optional metadata to include in the log.
   */
  trace(message: string, meta?: MetaData): void {
    this.log({ level: LogLevel.TRACE, [this.messageKey]: message, ...meta })
  }

  /**
   * Logs a critical message.
   * @param {string} message - The message to log.
   * @param {MetaData} [meta] - Optional metadata to include in the log.
   */
  critical(message: string, meta?: MetaData): void {
    this.log({ level: LogLevel.CRITICAL, [this.messageKey]: message, ...meta })
  }
}

export default Logger
