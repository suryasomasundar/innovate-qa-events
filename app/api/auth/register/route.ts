import { NextRequest, NextResponse } from "next/server"

type RegisterPayload = {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  password?: string
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as RegisterPayload

  if (!body.firstName?.trim() || !body.lastName?.trim() || !body.email?.trim() || !body.phone?.trim() || !body.password) {
    return NextResponse.json(
      { success: false, message: "All registration fields are required." },
      { status: 400 },
    )
  }

  return NextResponse.json({
    success: true,
    message: "Registration completed. You can now sign in.",
  })
}
