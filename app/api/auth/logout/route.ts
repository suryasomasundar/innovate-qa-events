import { NextRequest, NextResponse } from "next/server"

const DEFAULT_AUTH_COOKIE_NAMES = ["innovateqa_session", "member_session", "auth_token"]

function getAuthCookieNames() {
  const configuredNames = process.env.AUTH_COOKIE_NAMES
    ?.split(",")
    .map((name) => name.trim())
    .filter(Boolean)

  return configuredNames?.length ? configuredNames : DEFAULT_AUTH_COOKIE_NAMES
}

function clearAuthCookies(response: NextResponse) {
  for (const cookieName of getAuthCookieNames()) {
    response.cookies.set(cookieName, "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
    })
  }

  return response
}

export async function GET(request: NextRequest) {
  const nextPath = request.nextUrl.searchParams.get("next") || "/signin"
  const redirectUrl = new URL(nextPath, request.url)
  const response = NextResponse.redirect(redirectUrl)

  return clearAuthCookies(response)
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as { nextPath?: string }
  const nextPath = body.nextPath || "/signin"
  const redirectUrl = new URL(nextPath, request.url)
  const response = NextResponse.json({
    success: true,
    redirectUrl: redirectUrl.pathname + redirectUrl.search,
  })

  return clearAuthCookies(response)
}
