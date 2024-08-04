import { LogLevel } from '../enums'
import {
  IFormatter,
  ITransport,
  Payload,
  OutWriteStream,
  ErrWriteStream,
} from '../types'
import { stdout, stderr } from 'process'
import { isLogLabel, isLogLevel } from '../utils'

const typeErrorLevel: string[] = [
  'ERROR',
  'CRITICAL',
  'FATAL',
  'error',
  'critical',
  'fatal',
]

/**
 * Class representing a Console transport for logging.
 * Implements the ITransport interface.
 */
class Console implements ITransport {
  /**
   * Output stream for standard logs.
   * @private
   * @type {OutWriteStream}
   */
  private outStream: OutWriteStream = stdout

  /**
   * Output stream for error logs.
   * @private
   * @type {ErrWriteStream}
   */
  private errorStream: ErrWriteStream = stderr

  /**
   * Creates an instance of Console.
   */
  constructor() {}

  /**
   * Writes content to the appropriate stream based on the log level.
   * Formats the content if a formatter is provided.
   *
   * @param {Payload} content - The log content to be written.
   * @param {IFormatter} formatter - The formatter to format the log content.
   */
  writeContent(content: Payload, formatter: (data: Payload) => string) {
    if (typeof content.level === 'undefined') {
      return
    }

    let stream: ErrWriteStream | OutWriteStream = this.outStream
    let writableContent: any = content

    if (
      (isLogLabel(content.level) && typeErrorLevel.includes(content.level)) ||
      (isLogLevel(content.level) && content.level >= 50)
    ) {
      stream = this.errorStream
    }
    if (formatter && formatter instanceof Function) {
      writableContent = formatter(content)
    }
    stream.write(writableContent + '\n')
  }
}
export default Console
