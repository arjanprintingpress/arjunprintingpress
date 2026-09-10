import { revalidateTag } from "next/cache";

/**
 * Bust the "sections" cache in BOTH this admin app and the public web app.
 * Admin uses tagged fetches so its own revalidateTag is enough locally;
 * the web app is a separate deployment, so we ping its revalidate route.
 */
export async function revalidateSections() {
  revalidateTag("sections", { expire: 0 });

  const webUrl = process.env.WEB_URL;
  if (!webUrl) return;

  try {
    await fetch(`${webUrl}/api/revalidate`, {
      method: "POST",
      headers: { "x-service-key": process.env.BACKEND_SERVICE_KEY ?? "" },
      cache: "no-store",
    });
  } catch {
    // ponytail: best-effort — web falls back to its own 60s revalidate window
  }
}
