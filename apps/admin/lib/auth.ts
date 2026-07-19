import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "app_admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 8; // 8h

function secret() {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error("SESSION_SECRET is not set");
  return s;
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
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

export function createSessionCookie() {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = `${expires}`;
  const token = `${payload}.${sign(payload)}`;
  return { name: COOKIE_NAME, value: token, maxAge: MAX_AGE_SECONDS };
}

export function verifySessionCookie(token: string | undefined) {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  if (sign(payload) !== signature) return false;
  return Number(payload) > Date.now();
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
