import { sendLog as _sendLog, LogLevel, type LogData } from '@gycoding/nebula';



enum LogMessage {
  // ── Session ──
  SESSION_RETRIEVED = 'Session retrieved [{id}]',
  SESSION_NOT_FOUND = 'No active session found',

  // ── Config ──
  CONFIG_GY_API_MISSING = 'GY_API environment variable is not defined',

  // ── Profile ──
  PROFILE_RETRIEVED = 'Profile retrieved',
  PROFILE_RETRIEVE_FAILED = 'Profile could not be retrieved',
  PROFILE_UPDATED = 'Profile updated',
  PROFILE_UPDATE_FAILED = 'Profile could not be updated',

  // ── API Key ──
  APIKEY_UPDATED = 'API key updated',
  APIKEY_UPDATE_FAILED = 'API key could not be updated',

  // ── Generic ──
  METHOD_NOT_ALLOWED = 'Method not allowed',
  UNKNOWN_ERROR = 'Unknown error',
}

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

/**
 * Descriptive, domain-specific log messages.
 *
 * Naming convention:  DOMAIN_ACTION(_RESULT)
 *   - DOMAIN  → the bounded context (SESSION, CONFIG, PROFILE, APIKEY)
 *   - ACTION  → what happened (RETRIEVED, UPDATED, …)
 *   - RESULT  → optional qualifier (FAILED, NOT_FOUND)
 */