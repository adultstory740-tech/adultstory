/**
 * Error class tailored for our API responses,
 * making it easy to handle frontend errors smoothly.
 */
export class ApiError extends Error {
  public status: number;
  public data?: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * Advanced configurations we might want when fetching data
 */
export interface FetchOptions extends Omit<RequestInit, "body"> {
  body?: any; // We allow passing objects, the client stringifies them
  /**
   * Next.js specific cache configuration
   * @example { revalidate: 3600, tags: ['categories'] }
   */
  next?: { revalidate?: number | false; tags?: string[] };
  /**
   * If true, base URL resolving is bypassed. Useful for calling external APIs.
   */
  isExternal?: boolean;
}

/**
 * Gets the base URL safely in both Server and Client environments
 */
export function getBaseUrl(): string {
  // If we are in the browser (Client Components), relative URLs are fully fine and often preferred.
  if (typeof window !== "undefined") return "";
  
  // If running completely on Vercel
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  
  // Custom Environment variable
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  
  // Default Localhost 
  return "http://localhost:3000";
}

/**
 * Internal wrapper that executes the fetch call and handles parsing & errors.
 */
async function fetchClient<T>(url: string, options: FetchOptions = {}): Promise<T> {
  const { body, next, isExternal, headers: customHeaders, ...restOptions } = options;

  const targetUrl = isExternal ? url : `${getBaseUrl()}${url.startsWith("/") ? url : `/${url}`}`;

  // Default headers (can be overridden)
  const headers = new Headers(customHeaders);
  
  if (!headers.has("Content-Type") && body && !(body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  // Handle body stringification if needed
  let finalBody = body;
  if (body && typeof body === "object" && !(body instanceof FormData)) {
    finalBody = JSON.stringify(body);
  }

  try {
    const response = await fetch(targetUrl, {
      ...restOptions,
      headers,
      body: finalBody,
      next, // Important for Next.js App Router caching
    });

    // Attempt to parse JSON response. Some Apis might return empty 204.
    let parsedData: any;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      parsedData = await response.json();
    } else {
      parsedData = await response.text();
    }

    if (!response.ok) {
      const errorMessage = parsedData?.error || parsedData?.message || response.statusText || "An API Error Occurred";
      throw new ApiError(errorMessage, response.status, parsedData);
    }

    return parsedData as T;
  } catch (error) {
    // If it's already an ApiError (from !response.ok), throw it up.
    if (error instanceof ApiError) {
      throw error;
    }
    // Network failures or other things:
    throw new ApiError(
      error instanceof Error ? error.message : "Network failure",
      500
    );
  }
}

/**
 * A highly optimized and reusable API client wrapper tailored for Next.js.
 * Features:
 * - Native TS Support
 * - Automated JSON parsing & stringifying
 * - Standardized error handling via `ApiError`
 * - Next.js Caching support (`next: { revalidate, tags }`)
 */
export const apiClient = {
  get: <T>(url: string, options?: FetchOptions) =>
    fetchClient<T>(url, { ...options, method: "GET" }),

  post: <T>(url: string, body?: any, options?: FetchOptions) =>
    fetchClient<T>(url, { ...options, body, method: "POST" }),

  put: <T>(url: string, body?: any, options?: FetchOptions) =>
    fetchClient<T>(url, { ...options, body, method: "PUT" }),

  patch: <T>(url: string, body?: any, options?: FetchOptions) =>
    fetchClient<T>(url, { ...options, body, method: "PATCH" }),

  delete: <T>(url: string, options?: FetchOptions) =>
    fetchClient<T>(url, { ...options, method: "DELETE" }),
};
