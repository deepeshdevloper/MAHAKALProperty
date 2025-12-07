export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(endpoint, {
    ...options,
    credentials: 'include',
  });
  return response;
}

export function getApiUrl(endpoint: string) {
  return endpoint;
}

export function getUploadsUrl(path: string) {
  if (path.startsWith('http')) return path;
  return path;
}
