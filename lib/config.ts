import { DEFAULT_DATE_TIME_FORMAT, LogLevel } from './enums'
import { LevelPayload, LogLabel, Options, Payload } from './types'
import { formatDate } from './utils'

const defaultConfig: Options = {
  minLevel: 'info',
  messageKey: 'msg',
  timestamp: function (): string {
    return formatDate(new Date(), DEFAULT_DATE_TIME_FORMAT)
  },
  formatContent: function (payload: Payload): string {
    return JSON.stringify(payload)
  },
  formatLevel: function (level: LogLevel, label: LogLabel): LevelPayload {
    return { level: label }
  },
}

export default defaultConfig
