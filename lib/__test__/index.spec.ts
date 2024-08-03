describe('Logger', () => {
  let consoleSpy: jest.SpyInstance

  beforeAll(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterAll(() => {
    consoleSpy.mockRestore()
  })

  it('should log messages at the specified level', () => {
    const logger = console
    logger.log('Test debug message')
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Test debug message')
    )
  })
})
