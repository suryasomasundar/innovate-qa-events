import { NextRequest, NextResponse } from "next/server"

function setLocalDevSessionCookie(response: NextResponse, provider: string) {
  const providerName = provider === "linkedin" ? "LinkedIn" : "Google"
  const cookiePayload = {
    user: {
      email: `local-${provider}@innovateqa.local`,
      name: `${providerName} Local Tester`,
      role: "member",
      plan: "local-dev",
    },
    entitledRecordingSlugs: [],
  }

  response.cookies.set("innovateqa_session", encodeURIComponent(JSON.stringify(cookiePayload)), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })

  return response
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const provider = (searchParams.get("provider") || "").toLowerCase()
  const nextPath = searchParams.get("next") || "/recordings"

  if (provider !== "google" && provider !== "linkedin") {
    return NextResponse.json(
      { success: false, message: "Unsupported social provider." },
      { status: 400 },
    )
  }

  const response = NextResponse.redirect(new URL(nextPath, request.url))
  return setLocalDevSessionCookie(response, provider)
}
