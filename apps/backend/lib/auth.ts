import { createHmac, timingSafeEqual } from "crypto";

function secret() {
  const s = process.env.CREDENTIAL_HASH_SECRET;
  if (!s) throw new Error("CREDENTIAL_HASH_SECRET is not set");
  return s;
}

export function verifyCredentials(user: string, password: string) {
  const expectedUser = process.env.ADMIN_USER ?? "";
  const expectedHash = process.env.ADMIN_PASSWORD_HASH ?? "";
  const passwordHash = createHmac("sha256", secret()).update(password).digest("hex");

  const userOk =
    user.length === expectedUser.length &&
    timingSafeEqual(Buffer.from(user), Buffer.from(expectedUser));
  const passOk =
    passwordHash.length === expectedHash.length &&
    timingSafeEqual(Buffer.from(passwordHash), Buffer.from(expectedHash));

  return userOk && passOk;
}

export function verifyServiceKey(req: Request) {
  const key = req.headers.get("x-service-key");
  return !!key && key === process.env.BACKEND_SERVICE_KEY;
}
