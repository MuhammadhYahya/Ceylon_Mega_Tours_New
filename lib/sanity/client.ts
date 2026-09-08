import { createClient } from "next-sanity";

/**
 * Required config, read directly from env — no hardcoded fallback values.
 * `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` are not
 * secrets (Sanity bakes them into every API URL; `NEXT_PUBLIC_` vars ship in
 * the client bundle regardless), but they still belong in `.env.local`, not
 * hardcoded — a missing var should throw immediately, not fall back to
 * something that happens to work locally. See AGENTS.md's "no silent
 * fallbacks" rule.
 */
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const projectId = requireEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
const dataset = requireEnv("NEXT_PUBLIC_SANITY_DATASET");
const apiVersion = requireEnv("SANITY_API_VERSION");

/** Read-only client for fetching published content. Served from Sanity's CDN. */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

/**
 * Write-capable client for Server Actions only — never import this from a
 * Client Component. Requires `SANITY_API_WRITE_TOKEN` (an Editor-permission
 * token from sanity.io/manage), which is read lazily inside
 * `getWriteClient()` rather than at module load, so pages that only need
 * `sanityClient` don't fail to build when the write token isn't set.
 */
export function getWriteClient() {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    token: requireEnv("SANITY_API_WRITE_TOKEN"),
    useCdn: false,
  });
}
