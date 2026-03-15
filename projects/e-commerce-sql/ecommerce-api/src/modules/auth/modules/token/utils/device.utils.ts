export function getDeviceType(userAgent: string | null): string {
  if (!userAgent) return 'unknown';
  const ua = userAgent.toLowerCase();
  if (/mobile|android|iphone|ipad|tablet/.test(ua)) return 'Mobile';
  return 'Desktop';
}
