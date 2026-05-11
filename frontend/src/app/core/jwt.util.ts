/** Decodifica el payload de un JWT sin verificar firma (solo datos ya emitidos por nuestra API). */
export function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    const payload = parts[1];
    if (!payload) return null;
    const padded = payload + '='.repeat((4 - (payload.length % 4)) % 4);
    const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(base64);
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function jwtPayloadIsStaff(payload: Record<string, unknown> | null): boolean {
  if (!payload) return false;
  const v = payload['is_staff'];
  return v === true || v === 'true';
}
