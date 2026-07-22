// Build an absolute API URL from the current origin.
// location.origin never includes userinfo (user:pass@), which avoids the
// browser error "Request cannot be constructed from a URL that includes
// credentials" when the site is opened via a credentialed tunnel URL.
export function apiUrl(path: string): string {
  if (typeof window === "undefined") return path;
  return `${window.location.origin}${path}`;
}
