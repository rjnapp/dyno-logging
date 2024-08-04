import { LogLevel } from './enums'

export type OutWriteStream = NodeJS.WriteStream & { fd: 1 }
export type ErrWriteStream = NodeJS.WriteStream & { fd: 2 }

type LogLevelIndex = '10' | '20' | '30' | '40' | '50' | '60' | '70'

export type LogLabel =
  | 'TRACE'
  | 'DEBUG'
  | 'INFO'
  | 'WARN'
  | 'ERROR'
  | 'CRITICAL'
  | 'FATAL'
  | 'trace'
  | 'debug'
  | 'info'
  | 'warn'
  | 'error'
  | 'critical'
  | 'fatal'

export type LevelMapper = Record<LogLevelIndex, LogLabel>
export type LabelMapper = Record<LogLabel, LogLevelIndex>
export type LevelPayload = {
  level: LogLabel | LogLevel
}

export type TLevel = LogLevel | LogLabel

export type Payload = {
  level: TLevel
  [key: string]: any
}
export type Options = {
  minLevel: TLevel
  messageKey?: string
  base?: Record<string, any>
  timestamp: () => string
  formatContent: (payload: Payload) => string
  formatLevel: (level: LogLevel, label: LogLabel) => LevelPayload
}
export type MetaData = Record<string, any>

// interfaces
export interface IFormatter {
  format: (content: Payload) => any
}
export interface ITransport {
  writeContent: (content: Payload, formatter: (data: Payload) => string) => void
}
export interface ILogger {
  /**
   * Fatal
   * @public
   * @param {string} message
   * @param {MetaData} meta
   * @returns {void}
   */
  fatal(message: string, meta?: MetaData): void
  /**
   * Error
   * @public
   * @param {string} message
   * @param {MetaData} meta
   * @returns {void}
   */
  error(message: string, meta?: MetaData): void
  /**
   * Warning
   * @public
   * @param {string} message
   * @param {MetaData} meta
   * @returns {void}
   */
  warn(message: string, meta?: MetaData): void
  /**
   * Info
   * @public
   * @param {string} message
   * @param {MetaData} meta
   * @returns {void}
   */
  info(message: string, meta?: MetaData): void
  /**
   * Debug
   * @public
   * @param {string} message
   * @param {MetaData} meta
   * @returns {void}
   */
  debug(message: string, meta?: MetaData): void
  /**
   * Trace
   * @public
   * @param {string} message
   * @param {MetaData}meta
   * @returns {void}
   */
  trace(message: string, meta?: MetaData): void
  /**
   * Critical
   * @public
   * @param {string} message
   * @param {MetaData}meta
   * @returns {void}
   */
  critical(message: string, meta?: MetaData): void
}
