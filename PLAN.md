# Recordings Access and Payments Plan

## Objective
Deliver a reliable end-to-end member flow for paid recordings:
1. Display recordings catalog with locked/unlocked state.
2. Request access for a locked recording.
3. Complete payment through Stripe (via PHP API).
4. Send a recording-specific access link by email.
5. Allow playback only for the purchased recording.

## Current Status

### Implemented
- Next.js recordings catalog with locked/unlocked behavior.
- Protected recording detail route guarded by session entitlement or access token.
- Recording purchase page and checkout handoff button.
- Payment success/cancel pages.
- PHP sample API for:
  - Stripe checkout session creation
  - Stripe webhook fulfillment
  - MySQL purchase persistence
  - PHPMailer email with recording-specific access link
  - access token validation endpoint
- Reliability/security fixes applied:
  - Correct PHP include paths for all sample endpoints
  - Webhook idempotency guard to avoid duplicate sends
  - `emailed_at` updated only after successful mail send
  - Redirect URL origin validation for checkout endpoint
  - Fail-fast when `NEXT_APP_BASE_URL` is missing

### Known Existing (Unrelated) Repository Issues
- TypeScript compile has pre-existing errors in unrelated pages/components.
- These are outside the recordings/payment feature slice but block full `tsc --noEmit` green status.

## Pending Tasks

### P0 - Required for Production Use
- [ ] Provision production/secrets configuration.
  - [ ] Set frontend vars: `NEXT_PUBLIC_PAYMENTS_API_BASE_URL`, `RECORDING_ACCESS_VALIDATE_ENDPOINT`, `NEXT_PUBLIC_AUTH_API_BASE_URL` (if used).
  - [ ] Set PHP vars from `.env.example`.
- [ ] Deploy PHP API endpoints and verify public routing:
  - [ ] `POST /recordings/create-checkout-session.php`
  - [ ] `POST /recordings/validate-access.php`
  - [ ] `POST /webhooks/stripe-recordings.php`
- [ ] Register Stripe webhook for `checkout.session.completed`.
- [ ] Verify webhook signature (`STRIPE_WEBHOOK_SECRET`) in deployed environment.
- [ ] Configure SMTP and verify PHPMailer delivery to inbox/spam-safe.
- [ ] Create MySQL schema and validate write access.
- [ ] Perform live test purchase and confirm:
  - [ ] checkout redirects to Stripe
  - [ ] webhook writes purchase row
  - [ ] buyer receives email link
  - [ ] emailed link opens only purchased recording

### P1 - Access/Entitlement Consistency
- [ ] Decide and implement post-purchase entitlement strategy:
  - [ ] Option A: session cookie includes purchased slugs.
  - [ ] Option B: rely on emailed token links only.
  - [ ] Option C: hybrid (recommended) - cookie entitlement + token fallback.
- [ ] If Option A/C, add PHP auth/session endpoint logic to include purchased recording slugs in member session payload.
- [ ] Ensure catalog unlocked state reflects backend source of truth immediately after purchase (cookie refresh and/or server fetch strategy).

### P1 - Security Hardening
- [ ] Add rate limiting and abuse protection to:
  - [ ] checkout session endpoint
  - [ ] validate-access endpoint
- [ ] Add CORS allowlist and origin checks for API endpoints.
- [ ] Add stricter input validation/sanitization for all request payloads.
- [ ] Add token rotation/expiration policy decision (currently 30 days in sample).
- [ ] Add replay protection and audit logging for access token usage.

### P1 - Operational Reliability
- [ ] Add structured logging with correlation IDs (`stripe_session_id`, `recording_slug`, `buyer_email`).
- [ ] Add dead-letter/retry strategy for failed email sends.
- [ ] Add health check endpoint for PHP API and DB/SMTP dependency checks.
- [ ] Add alerting for webhook failures and mail send failures.

### P2 - Product/UX Improvements
- [ ] Add explicit "Request access" action flow (optional pre-payment intent capture) if separate from "Buy access" CTA.
- [ ] Show purchase status and entitlement provenance on recording detail page (session vs emailed link).
- [ ] Add receipt and support contact details on success page.
- [ ] Add "Resend link" self-service endpoint/page.

### P2 - Testing and QA
- [ ] Add automated API tests for PHP endpoints:
  - [ ] create-checkout-session happy path and validation errors
  - [ ] validate-access happy path and token errors
  - [ ] webhook idempotency and duplicate event behavior
- [ ] Add integration tests in Next app for guarded route behavior.
- [ ] Create Stripe CLI test script for local webhook simulation.
- [ ] Add end-to-end runbook for staging/prod verification.

### P2 - Repository Hygiene
- [ ] Fix unrelated TypeScript errors currently failing full compile.
- [ ] Add CI jobs for:
  - [ ] Next lint/type checks
  - [ ] PHP lint/static checks (if PHP is part of deployment)

## Acceptance Criteria
- [ ] Locked recordings are visible and purchasable from catalog.
- [ ] Payment starts only through PHP-backed Stripe checkout.
- [ ] Successful payment triggers exactly one purchase fulfillment email.
- [ ] Email link grants access only to the purchased recording.
- [ ] Unauthorized users cannot view protected recording content.
- [ ] Token validation rejects expired/invalid/wrong-recording tokens.
- [ ] Production monitoring shows webhook/email/db failures promptly.

## Suggested Execution Order
1. Environment + deployment + Stripe webhook wiring (P0).
2. Live happy-path verification and bug fixes (P0).
3. Entitlement model finalization (P1).
4. Security and operational hardening (P1).
5. UX polish, automation tests, and CI cleanup (P2).
