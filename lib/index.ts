import Logger from './logger'
import { ILogger, Options } from './types'
import defaultConfig from './config'

/**
 * Returns a logger instance with a specified namespace and configuration options.
 *
 * @param {string} namespace - The namespace for the logger. This helps categorize logs.
 * @param {Options} [options] - Optional configuration options to customize the logger behavior.
 * @returns {ILogger} A logger instance configured with the given namespace and options.
 */
export const getLogger = (namespace: string, options?: Options): ILogger => {
  return new Logger(namespace, { ...defaultConfig, ...options })
}

export * from './enums'
export * from './types'
