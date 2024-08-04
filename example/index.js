const { getLogger, LogLevel } = require('../dist')

const logger = getLogger('Example', {
  minLevel: LogLevel.DEBUG,
  formatContent: (payload) => {
    return `[${payload.level}] [${payload.timestamp}] [${payload.namespace}] ${payload.msg}`
  },
})

logger.debug('Hello', { name: 'world' })
logger.error('Hello Error', { name: 'logger' })
