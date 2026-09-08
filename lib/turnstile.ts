const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";


export async function verifyTurnstile(token: string | null): Promise<boolean> {
  if (!token) return false;

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    throw new Error("Missing required environment variable: TURNSTILE_SECRET_KEY");
  }

  const body = new URLSearchParams({ secret, response: token });
  const res = await fetch(VERIFY_URL, { method: "POST", body });
  if (!res.ok) return false;

  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}
