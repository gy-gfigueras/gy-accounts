import { sendLog as _sendLog, LogLevel, type LogData } from '@gycoding/nebula';
import { LogMessage } from './log.messages';

/**
 * Application-scoped wrapper around the shared `sendLog` from @gycoding/nebula.
 * Automatically sets the origin to GY-ACCOUNTS.
 */
export async function sendLog(
  level: LogLevel,
  message: string,
  data: LogData = {}
): Promise<void> {
  return _sendLog(level, message, 'GY-ACCOUNTS-DASHBOARD', data);
}

export { LogLevel, LogMessage };

