export const ADMIN_HEADER = "x-admin-password";

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "airfroid-admin";
}

export function isAuthorized(request: Request): boolean {
  const provided = request.headers.get(ADMIN_HEADER);
  return !!provided && provided === getAdminPassword();
}
