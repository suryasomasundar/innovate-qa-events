"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, CreditCard, AlertCircle, MailCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

const CREATE_CHECKOUT_ENDPOINT = "/api/payments/recordings/checkout"

interface RecordingPurchaseButtonProps {
  slug: string
  sku: string
  title: string
  price: string
  priceCents: number
  currency: string
  customerEmail?: string
}

export function RecordingPurchaseButton({
  slug,
  sku,
  title,
  price,
  priceCents,
  currency,
  customerEmail,
}: RecordingPurchaseButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null)

  const handleCheckout = async () => {
    setIsLoading(true)
    setMessage(null)

    try {
      const origin = window.location.origin
      const successUrl = `${origin}/payments/success?recording=${encodeURIComponent(slug)}&session_id={CHECKOUT_SESSION_ID}`
      const cancelUrl = `${origin}/payments/cancel?recording=${encodeURIComponent(slug)}`

      const response = await fetch(CREATE_CHECKOUT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recordingSlug: slug,
          recordingSku: sku,
          title,
          unitAmount: priceCents,
          currency,
          customerEmail,
          successUrl,
          cancelUrl,
        }),
      })

      const payload = (await response.json().catch(() => null)) as
        | {
            success?: boolean
            message?: string
            checkoutUrl?: string
          }
        | null

      if (!response.ok || !payload?.success || !payload.checkoutUrl) {
        throw new Error(payload?.message || `We could not start Stripe checkout for ${price}.`)
      }

      setMessage({
        type: "success",
        text: "Redirecting to checkout. After payment, your member session will unlock this recording.",
      })

      window.location.href = payload.checkoutUrl
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Unexpected error while starting checkout.",
      })
    } finally {
      setIsLoading(false)
      router.refresh()
    }
  }

  return (
    <div className="space-y-3">
      {message && (
        <div
          className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${
            message.type === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
        >
          {message.type === "error" ? (
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          ) : (
            <MailCheck className="mt-0.5 h-4 w-4 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <Button className="w-full" size="lg" onClick={handleCheckout} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Starting checkout...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            Purchase access for {price}
          </>
        )}
      </Button>
    </div>
  )
}