/** Accept only HTTPS links hosted by Portaly; fail closed when unconfigured. */
export function portalyUrl(value: unknown): string | null {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return null;
    const domains = ['portaly.cc', 'portaly.ai'];
    if (!domains.some(domain => url.hostname === domain || url.hostname.endsWith(`.${domain}`))) return null;
    if (url.pathname === '/' || /^\/admin(?:\/|$)/.test(url.pathname)) return null;
    return url.href;
  } catch { return null; }
}
