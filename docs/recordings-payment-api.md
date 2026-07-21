# Recordings Payment API Contract

This app now sends paid recording purchases to a PHP API that creates Stripe Checkout sessions.

A complete sample PHP backend now lives in [php-api-samples/recordings](e:/git/innovateqaevents-site/php-api-samples/recordings) with:

- Stripe Checkout session creation
- Stripe webhook fulfillment
- MySQL purchase storage
- PHPMailer email delivery
- recording-specific access-token validation

## Frontend Flow

1. Signed-in user opens `/recordings/[slug]/purchase`.
2. The page posts to `NEXT_PUBLIC_PAYMENTS_API_BASE_URL/recordings/create-checkout-session.php`.
3. The PHP API creates a Stripe Checkout Session and returns `checkoutUrl`.
4. Frontend redirects the user to Stripe.
5. After successful payment, Stripe returns to `/payments/success`.
6. Your PHP webhook or success handler stores the purchase, creates a recording-specific access token, and emails the access link with PHPMailer.

## Required Environment Variables

- `NEXT_PUBLIC_PAYMENTS_API_BASE_URL`
- or `NEXT_PUBLIC_AUTH_API_BASE_URL`

## Checkout Request

```json
{
  "recordingSlug": "agentic-testing-at-scale",
  "recordingSku": "IQA-REC-AGENTIC-2026",
  "title": "Agentic Testing at Scale",
  "unitAmount": 4900,
  "currency": "USD",
  "customerEmail": "buyer@example.com",
  "successUrl": "https://your-site.com/payments/success?recording=agentic-testing-at-scale&session_id={CHECKOUT_SESSION_ID}",
  "cancelUrl": "https://your-site.com/payments/cancel?recording=agentic-testing-at-scale"
}
```

## Checkout Response

```json
{
  "success": true,
  "checkoutUrl": "https://checkout.stripe.com/c/pay/cs_test_123..."
}
```

## Suggested PHP Endpoint

```php
<?php
require __DIR__ . '/../vendor/autoload.php';

\Stripe\Stripe::setApiKey($_ENV['STRIPE_SECRET_KEY']);

$payload = json_decode(file_get_contents('php://input'), true);

$session = \Stripe\Checkout\Session::create([
    'mode' => 'payment',
    'customer_email' => $payload['customerEmail'] ?? null,
    'line_items' => [[
        'price_data' => [
            'currency' => strtolower($payload['currency']),
            'product_data' => [
                'name' => $payload['title'],
                'metadata' => [
                    'recording_slug' => $payload['recordingSlug'],
                    'recording_sku' => $payload['recordingSku'],
                ],
            ],
            'unit_amount' => (int) $payload['unitAmount'],
        ],
        'quantity' => 1,
    ]],
    'success_url' => $payload['successUrl'],
    'cancel_url' => $payload['cancelUrl'],
    'metadata' => [
        'recording_slug' => $payload['recordingSlug'],
        'recording_sku' => $payload['recordingSku'],
    ],
]);

header('Content-Type: application/json');
echo json_encode([
    'success' => true,
    'checkoutUrl' => $session->url,
]);
```

## Post-Payment Email Step

After Stripe confirms payment:

1. Store purchase in MySQL with `buyer_email`, `recording_slug`, `stripe_session_id`, `paid_at`.
2. Generate a recording-specific token or entitlement.
3. Email the buyer using PHPMailer with a URL like:

```text
https://your-site.com/recordings/agentic-testing-at-scale?access=SIGNED_TOKEN
```

4. Configure `RECORDING_ACCESS_VALIDATE_ENDPOINT` if the Next app should call back to PHP to validate emailed tokens.

## Sample Backend Files

- [php-api-samples/recordings/README.md](e:/git/innovateqaevents-site/php-api-samples/recordings/README.md)
- [php-api-samples/recordings/public/recordings/create-checkout-session.php](e:/git/innovateqaevents-site/php-api-samples/recordings/public/recordings/create-checkout-session.php)
- [php-api-samples/recordings/public/recordings/validate-access.php](e:/git/innovateqaevents-site/php-api-samples/recordings/public/recordings/validate-access.php)
- [php-api-samples/recordings/public/webhooks/stripe-recordings.php](e:/git/innovateqaevents-site/php-api-samples/recordings/public/webhooks/stripe-recordings.php)
- [php-api-samples/recordings/database/schema.sql](e:/git/innovateqaevents-site/php-api-samples/recordings/database/schema.sql)

## Validation Contract

The Next.js authguard can call your PHP validator with:

```json
{
    "recordingSlug": "agentic-testing-at-scale",
    "accessToken": "SIGNED_TOKEN"
}
```

Expected success response:

```json
{
    "success": true,
    "email": "buyer@example.com",
    "expiresAt": "2026-08-09T18:00:00+00:00",
    "entitledRecordingSlugs": ["agentic-testing-at-scale"]
}
```