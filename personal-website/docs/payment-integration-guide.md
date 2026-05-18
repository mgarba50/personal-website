# Payment Integration Guide

The checkout route at `/checkout` is prepared for Stripe, Paystack, Flutterwave, and manual bank transfer.

## Digital products

1. Create an order with status `pending`.
2. Initialize Stripe, Paystack, or Flutterwave checkout.
3. Confirm payment through webhook.
4. Mark order `paid`.
5. Create a dashboard download record.
6. Send purchase confirmation and secure expiring download email.

## Courses

1. Create order.
2. Confirm payment.
3. Create course enrollment.
4. Unlock paid lessons.
5. Track progress in `course_enrollments`.
6. Issue certificate after completion.

## Consulting

1. Create booking request or paid order.
2. Send booking confirmation.
3. Add calendar link.
4. Notify admin.

## Manual bank transfer

1. User submits transfer reference and proof link.
2. Admin reviews `manual_payment_proofs`.
3. Admin marks proof verified.
4. Product, course, or membership access is unlocked manually.
