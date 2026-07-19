export function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": process.env.WEB_ORIGIN ?? "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export function withCors(res: Response) {
  const headers = corsHeaders();
  Object.entries(headers).forEach(([key, value]) => res.headers.set(key, value));
  return res;
}
