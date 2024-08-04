# dyno-logging

error-reporting and logging app, it allows console logging, file logging and remote logging

## Overview

This package provides a flexible and customizable logging solution for TypeScript applications. It includes a `Logger` class that implements the `ILogger` interface, allowing you to log messages at various levels with configurable options.

## Features

- **Configurable Log Levels:** Supports multiple log levels including TRACE, DEBUG, INFO, WARN, ERROR, CRITICAL, and FATAL.
- **Customizable Output:** Log messages can be formatted and written to various transports.
- **Namespace Support:** Categorize logs using namespaces.
- **Flexible Options:** Customize logging behavior with various options.

## Installation

To install the package, use npm:

```bash
npm install your-logger-package
```

Or with Yarn:

```bash
yarn add your-logger-package
```

## Usage

### Importing

To use the logger, import it into your TypeScript file:

```javascript
import { getLogger, LogLevel, Options } from '@rjnapp/dyno-logging'
```

### Creating a Logger Instance

```javascript
const options: Options = {
  minLevel: LogLevel.DEBUG,  // Minimum log level to be output
  messageKey: 'msg',         // Key used for log messages
  formatLevel: (level, levelString) => ({ level: levelString }),
  formatContent: (content) => JSON.stringify(content),
  timestamp: () => new Date().toISOString(),
};

const logger = getLogger('my-namespace', options);
```

### Logging Messages

Use the logger instance to log messages at different levels:

```javascript
logger.fatal('A fatal error occurred', { sessionId: 12345 })
logger.error('An error occurred')
logger.warn('A warning message')
logger.info('Informational message')
logger.debug('Debugging information')
logger.trace('Trace message')
logger.critical('A critical issue')
```

### Options

- **minLevel:** The minimum log level to output. Logs below this level will be ignored. Defaults to LogLevel.INFO.

- **messageKey:** The key used to represent the log message. Defaults to 'msg'.

- **formatLevel(level: LogLevel, levelString: string): { level: string }:** Function to format the log level.

- **formatContent(content: Payload): string:** Function to format the log content.

- **timestamp() => string:** Function to generate a timestamp for the log entry.

## API

### getLogger(namespace: string, options?: Options): ILogger

Returns a logger instance with the specified namespace and options.

**Parameters:**

- namespace: The namespace for the logger.
- options: Optional configuration options for the logger.

**Returns:**

- An instance of ILogger.

### Logger Class

The Logger class implements the ILogger interface with methods to log messages at various levels:

- fatal(message: string, meta?: MetaData): void
- error(message: string, meta?: MetaData): void
- warn(message: string, meta?: MetaData): void
- info(message: string, meta?: MetaData): void
- debug(message: string, meta?: MetaData): void
- trace(message: string, meta?: MetaData): void
- critical(message: string, meta?: MetaData): void

**Parameters for logging methods:**

- **message:** The message to log.
- **meta:** Optional metadata to include in the log.

## Contributing

We welcome contributions to this project. Please read our [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to contribute.
