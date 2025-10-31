// src/lib/api.ts
const BASE =
  process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080';

/**
 * Fetch list of experiences (optionally filtered by search query)
 */
export async function getExperiences(q?: string) {
  const url = q
    ? `${BASE}/experiences?q=${encodeURIComponent(q)}`
    : `${BASE}/experiences`;

  const res = await fetch(url, {
    cache: 'no-store', // disable Next.js fetch caching
  });

  if (!res.ok) {
    console.error('Failed to fetch experiences:', res.status, res.statusText);
    throw new Error('Failed to fetch experiences');
  }

  return res.json();
}

/**
 * Fetch single experience details by ID
 */
export async function getExperience(id: string) {
  const res = await fetch(`${BASE}/experiences/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    console.error('Failed to fetch experience:', res.status, res.statusText);
    throw new Error('Failed to fetch experience');
  }

  return res.json();
}

/**
 * Validate a promo code against the current subtotal
 */
export async function validatePromo(code: string, subtotal: number) {
  const res = await fetch(`${BASE}/promo/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, subtotal }),
    cache: 'no-store',
  });

  if (!res.ok) {
    console.error('Failed to validate promo:', res.status, res.statusText);
    throw new Error('Failed to validate promo');
  }

  return res.json();
}

/**
 * Create a new booking
 */
export async function createBooking(payload: any) {
  const res = await fetch(`${BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!res.ok) {
    console.error('Failed to create booking:', res.status, res.statusText);
    throw new Error('Failed to create booking');
  }

  return res.json();
}
