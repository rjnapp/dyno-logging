import Logger from '../logger'
import { LogLevel } from '../enums'
import { ITransport, LogLabel, Options, Payload } from '../types'

// Mock transport class
class MockTransport implements ITransport {
  public logs: any[] = []

  writeContent(content: Payload, formatter: any) {
    this.logs.push({ content, formatter })
  }
}

// Define test options and formatter
const mockOptions: Options = {
  minLevel: LogLevel.DEBUG,
  messageKey: 'msg',
  formatLevel: (level: LogLevel, levelString: LogLabel) => ({
    level: levelString,
  }),
  formatContent: (content: Payload) => JSON.stringify(content),
  timestamp: () => new Date().toISOString(),
}

// Test suite for Logger
describe('Logger', () => {
  let logger: Logger
  let mockTransport: MockTransport

  beforeEach(() => {
    mockTransport = new MockTransport()
    logger = new Logger('test-namespace', mockOptions)
    ;(logger as any).universalTransport = mockTransport
  })

  test('should create a Logger instance with default values', () => {
    expect(logger).toBeInstanceOf(Logger)
    expect((logger as any).minLevel).toBe(LogLevel.DEBUG)
    expect((logger as any).namespace).toBe('test-namespace')
  })

  test('should log messages at different levels', () => {
    logger.info('Info message')
    logger.error('Error message', { error: 'some error' })

    expect(mockTransport.logs.length).toBe(2)

    // Check info log
    expect(mockTransport.logs[0].content).toEqual({
      level: 'INFO',
      timestamp: expect.any(String),
      namespace: 'test-namespace',
      msg: 'Info message',
    })

    // Check error log
    expect(mockTransport.logs[1].content).toEqual({
      level: 'ERROR',
      timestamp: expect.any(String),
      namespace: 'test-namespace',
      msg: 'Error message',
      error: 'some error',
    })
  })

  test('should not log messages below the minimum level', () => {
    logger.trace('Debug message')
    expect(mockTransport.logs.length).toBe(0) // No logs should be present
  })

  test('should log messages with a custom formatter', () => {
    const customFormatter = {
      format: (content: Payload) => `Formatted: ${JSON.stringify(content)}`,
    }

    logger = new Logger('test-namespace', {
      ...mockOptions,
      formatContent: customFormatter.format,
    })
    ;(logger as any).universalTransport = mockTransport
    logger.info('Custom format message')

    expect(mockTransport.logs[0].content).toEqual({
      level: 'INFO',
      timestamp: expect.any(String),
      namespace: 'test-namespace',
      msg: 'Custom format message',
    })

    expect(mockTransport.logs[0].formatter).toBe(customFormatter.format)
  })

  test('should handle log levels with label mapping', () => {
    logger = new Logger('test-namespace', {
      ...mockOptions,
      minLevel: 'trace', // Setting a lower level for testing
    })
    ;(logger as any).universalTransport = mockTransport
    logger.trace('Trace message')

    expect(mockTransport.logs.length).toBe(1)
    expect(mockTransport.logs[0].content).toEqual({
      level: 'TRACE',
      timestamp: expect.any(String),
      namespace: 'test-namespace',
      msg: 'Trace message',
    })
  })
})
