// August 11, 2026 at 12:00 AM America/Los_Angeles (PDT, UTC-7).
export const RECORDINGS_LAUNCH_AT =
  process.env.NEXT_PUBLIC_RECORDINGS_LAUNCH_AT || "2026-08-11T07:00:00.000Z"

export function hasRecordingsLaunched(now = Date.now()) {
  return now >= new Date(RECORDINGS_LAUNCH_AT).getTime()
}
