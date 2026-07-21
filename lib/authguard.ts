import { cookies } from "next/headers"
import { notFound, redirect } from "next/navigation"

export interface AuthUser {
  id?: string
  email?: string
  name?: string
  role?: string
  plan?: string
}

export interface AuthSession {
  isAuthenticated: true
  cookieName: string
  token: string
  raw: string
  user?: AuthUser
  entitledRecordingSlugs: string[]
}

export interface RecordingAccessGrant {
  source: "session" | "email-link"
  email?: string
  entitledRecordingSlugs: string[]
  expiresAt?: string
}

const DEFAULT_AUTH_COOKIE_NAMES = ["innovateqa_session", "member_session", "auth_token"]
const DEFAULT_RECORDING_ACCESS_PARAM_NAMES = ["access", "token", "recordingAccess"]
const SIGN_IN_PATH = process.env.AUTH_SIGNIN_PATH || "/signin"
const RECORDING_ACCESS_VALIDATE_ENDPOINT =
  process.env.RECORDING_ACCESS_VALIDATE_ENDPOINT || ""

function getAuthCookieNames() {
  const configuredNames = process.env.AUTH_COOKIE_NAMES
    ?.split(",")
    .map((name) => name.trim())
    .filter(Boolean)

  return configuredNames?.length ? configuredNames : DEFAULT_AUTH_COOKIE_NAMES
}

function tryParseJson<T>(value: string): T | null {
  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

function tryParseBase64Json<T>(value: string): T | null {
  try {
    const decoded = Buffer.from(value, "base64").toString("utf8")
    return JSON.parse(decoded) as T
  } catch {
    return null
  }
}

function normalizeRecordingSlugs(payload: Record<string, unknown>) {
  const candidates = [
    payload.recordingSlugs,
    payload.entitledRecordingSlugs,
    payload.allowedRecordingSlugs,
    payload.recordings,
    payload.entitlements,
  ]

  for (const candidate of candidates) {
    if (!Array.isArray(candidate)) {
      continue
    }

    const slugs = candidate.filter((value): value is string => typeof value === "string" && value.length > 0)

    if (slugs.length > 0) {
      return slugs
    }
  }

  if (typeof payload.recordingSlug === "string" && payload.recordingSlug.length > 0) {
    return [payload.recordingSlug]
  }

  if (typeof payload.allowedRecordingSlug === "string" && payload.allowedRecordingSlug.length > 0) {
    return [payload.allowedRecordingSlug]
  }

  return []
}

function extractDecodedPayload<T>(value: string): T | null {
  const decodedValue = decodeURIComponent(value)
  const parsedDirect = tryParseJson<T>(decodedValue)

  if (parsedDirect) {
    return parsedDirect
  }

  const strippedPrefix = decodedValue.startsWith("base64:") ? decodedValue.slice(7) : decodedValue
  return tryParseBase64Json<T>(strippedPrefix)
}

function getUserFromCookieValue(value: string): AuthUser | undefined {
  const payload = extractDecodedPayload<AuthUser & { user?: AuthUser }>(value)
  return payload ? payload.user || payload : undefined
}

function getRecordingEntitlementsFromValue(value: string) {
  const payload = extractDecodedPayload<Record<string, unknown> & { user?: Record<string, unknown> }>(value)

  if (!payload) {
    return []
  }

  const nestedUser = payload.user && typeof payload.user === "object" ? payload.user : undefined
  return normalizeRecordingSlugs(nestedUser ? { ...payload, ...nestedUser } : payload)
}

function getRecordingAccessParamNames() {
  const configuredNames = process.env.RECORDING_ACCESS_PARAM_NAMES
    ?.split(",")
    .map((name) => name.trim())
    .filter(Boolean)

  return configuredNames?.length ? configuredNames : DEFAULT_RECORDING_ACCESS_PARAM_NAMES
}

function hasEntitlement(slugs: string[], recordingSlug: string) {
  return slugs.includes("*") || slugs.includes(recordingSlug)
}

async function validateRecordingAccessTokenWithBackend(recordingSlug: string, accessToken: string) {
  if (!RECORDING_ACCESS_VALIDATE_ENDPOINT) {
    return null
  }

  try {
    const response = await fetch(RECORDING_ACCESS_VALIDATE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        recordingSlug,
        accessToken,
      }),
    })

    const payload = (await response.json().catch(() => null)) as
      | {
          success?: boolean
          email?: string
          expiresAt?: string
          entitledRecordingSlugs?: string[]
          allowedRecordingSlugs?: string[]
          recordingSlug?: string
        }
      | null

    if (!response.ok || !payload?.success) {
      return null
    }

    const entitledRecordingSlugs = normalizeRecordingSlugs(payload)

    if (!hasEntitlement(entitledRecordingSlugs, recordingSlug)) {
      return null
    }

    return {
      source: "email-link",
      email: payload.email,
      expiresAt: payload.expiresAt,
      entitledRecordingSlugs,
    } satisfies RecordingAccessGrant
  } catch {
    return null
  }
}

function validateRecordingAccessTokenLocally(recordingSlug: string, accessToken: string) {
  const payload = extractDecodedPayload<Record<string, unknown>>(accessToken)

  if (!payload) {
    return null
  }

  const entitledRecordingSlugs = normalizeRecordingSlugs(payload)

  if (!hasEntitlement(entitledRecordingSlugs, recordingSlug)) {
    return null
  }

  if (typeof payload.expiresAt === "string") {
    const expirationDate = new Date(payload.expiresAt)

    if (!Number.isNaN(expirationDate.getTime()) && expirationDate.getTime() < Date.now()) {
      return null
    }
  }

  return {
    source: "email-link",
    email: typeof payload.email === "string" ? payload.email : undefined,
    expiresAt: typeof payload.expiresAt === "string" ? payload.expiresAt : undefined,
    entitledRecordingSlugs,
  } satisfies RecordingAccessGrant
}

export function buildSignInRedirect(nextPath = "/recordings") {
  const params = new URLSearchParams({ next: nextPath })
  return `${SIGN_IN_PATH}?${params.toString()}`
}

export async function getAuthSession(): Promise<AuthSession | null> {
  const cookieStore = await cookies()

  for (const cookieName of getAuthCookieNames()) {
    const cookie = cookieStore.get(cookieName)

    if (!cookie?.value) {
      continue
    }

    return {
      isAuthenticated: true,
      cookieName,
      token: cookie.value,
      raw: cookie.value,
      user: getUserFromCookieValue(cookie.value),
      entitledRecordingSlugs: getRecordingEntitlementsFromValue(cookie.value),
    }
  }

  return null
}

export async function requireAuth(nextPath = "/recordings") {
  const session = await getAuthSession()

  if (!session) {
    redirect(buildSignInRedirect(nextPath))
  }

  return session
}

export function getRecordingAccessToken(searchParams?: Record<string, string | string[] | undefined>) {
  if (!searchParams) {
    return undefined
  }

  for (const paramName of getRecordingAccessParamNames()) {
    const value = searchParams[paramName]

    if (typeof value === "string" && value.length > 0) {
      return value
    }

    if (Array.isArray(value) && typeof value[0] === "string" && value[0].length > 0) {
      return value[0]
    }
  }

  return undefined
}

export async function requireRecordingAccess(options: {
  recordingSlug: string
  nextPath?: string
  accessToken?: string
}) {
  const { recordingSlug, nextPath = `/recordings/${options.recordingSlug}`, accessToken } = options

  const session = await getAuthSession()

  if (session && hasEntitlement(session.entitledRecordingSlugs, recordingSlug)) {
    return {
      source: "session",
      email: session.user?.email,
      entitledRecordingSlugs: session.entitledRecordingSlugs,
    } satisfies RecordingAccessGrant
  }

  if (accessToken) {
    const backendGrant = await validateRecordingAccessTokenWithBackend(recordingSlug, accessToken)

    if (backendGrant) {
      return backendGrant
    }

    const localGrant = validateRecordingAccessTokenLocally(recordingSlug, accessToken)

    if (localGrant) {
      return localGrant
    }

    notFound()
  }

  if (!session) {
    redirect(buildSignInRedirect(nextPath))
  }

  notFound()
}