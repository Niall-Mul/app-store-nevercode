/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

interface Logger {
  debug: (msg: string, ...supplementaryData: any[]) => void;
  info: (msg: string, ...supplementaryData: any[]) => void;
  warn: (msg: string, ...supplementaryData: any[]) => void;
  error: (msg: string, ...supplementaryData: any[]) => void;
  sendLogMessage: (
    msgType: 'debug' | 'info' | 'warn' | 'error',
    msg: string,
    ...supplementaryData: any[]
  ) => void;
}

const logger: Logger = {
  debug(msg: string, ...supplementaryData: any[]): void {
    logger.sendLogMessage('debug', msg, supplementaryData);
  },

  info(msg: string, ...supplementaryData: any[]): void {
    logger.sendLogMessage('info', msg, supplementaryData);
  },

  warn(msg: string, ...supplementaryData: any[]): void {
    logger.sendLogMessage('warn', msg, supplementaryData);
  },

  error(msg: string, ...supplementaryData: any[]): void {
    logger.sendLogMessage('error', msg, supplementaryData);
  },

  sendLogMessage(
    msgType: 'debug' | 'info' | 'warn' | 'error',
    msg: string,
    ...supplementaryData: any[]
  ): void {
    const logLevel = msgType === 'debug' ? 'log' : msgType;
    if (supplementaryData.length > 0) {
      console[logLevel](msg, supplementaryData);
    } else {
      console[logLevel](msg);
    }
  },
};

export { logger };
