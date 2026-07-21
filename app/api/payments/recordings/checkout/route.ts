import { NextRequest, NextResponse } from "next/server"

type CheckoutPayload = {
  recordingSlug?: string
  recordingSku?: string
  title?: string
  unitAmount?: number
  currency?: string
  customerEmail?: string
  successUrl?: string
  cancelUrl?: string
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as CheckoutPayload

  if (!body.recordingSlug || !body.recordingSku || !body.title || !body.unitAmount || !body.currency) {
    return NextResponse.json(
      { success: false, message: "Missing required checkout fields." },
      { status: 400 },
    )
  }

  const origin = request.nextUrl.origin
  return NextResponse.json({
    success: true,
    message: "Checkout session created.",
    checkoutUrl: `${origin}/payments/success?recording=${encodeURIComponent(body.recordingSlug)}&simulated=1`,
  })
}
