import { NextRequest, NextResponse } from "next/server"

type LoginPayload = {
  email?: string
  password?: string
  nextPath?: string
}

function setLocalDevSessionCookie(response: NextResponse, email: string) {
  const nameFromEmail = email.includes("@") ? email.split("@")[0] : email

  const cookiePayload = {
    user: {
      email,
      name: nameFromEmail,
      role: "member",
      plan: "standard",
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

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as LoginPayload
  const email = body.email?.trim()

  if (!email || !body.password) {
    return NextResponse.json(
      { success: false, message: "Email and password are required." },
      { status: 400 },
    )
  }

  const response = NextResponse.json({
    success: true,
    message: "Signed in successfully.",
    redirectUrl: body.nextPath || "/recordings",
  })

  return setLocalDevSessionCookie(response, email)
}
